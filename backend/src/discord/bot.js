const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;
const apiBaseUrl = process.env.DISCORD_BACKEND_URL;
const lockFilePath = path.resolve(__dirname, "../../.discord-bot.lock");

const acquireBotLock = () => {
    try {
        if (fs.existsSync(lockFilePath)) {
            const existingPid = Number(fs.readFileSync(lockFilePath, "utf8").trim());
            if (existingPid && !Number.isNaN(existingPid)) {
                try {
                    process.kill(existingPid, 0);
                    console.warn(`⚠️ Another Discord bot instance is already running with PID ${existingPid}.`);
                    return false;
                } catch {
                    fs.unlinkSync(lockFilePath);
                }
            }
        }

        fs.writeFileSync(lockFilePath, String(process.pid));
        const cleanupLock = () => {
            try {
                if (fs.existsSync(lockFilePath) && fs.readFileSync(lockFilePath, "utf8").trim() === String(process.pid)) {
                    fs.unlinkSync(lockFilePath);
                }
            } catch (error) {
                console.warn("⚠️ Could not remove Discord bot lock file:", error.message);
            }
        };

        process.once("exit", cleanupLock);
        process.once("SIGINT", () => process.exit(0));
        process.once("SIGTERM", () => process.exit(0));
        return true;
    } catch (error) {
        console.warn("⚠️ Could not create Discord bot lock file:", error.message);
        return true;
    }
};

if (!token) {
    console.warn("⚠️ Discord bot disabled: DISCORD_BOT_TOKEN is not set.");
} else if (!acquireBotLock()) {
    console.warn("⚠️ Discord bot startup skipped because another instance is already running.");
} else {
    const { Client, GatewayIntentBits, Events, EmbedBuilder } = require("discord.js");

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    console.log("🔄 Attempting to log in Discord bot...");

    client.once(Events.ClientReady, (readyClient) => {
        console.log(`✅ Discord bot logged in as ${readyClient.user.tag}`);
    });

    client.on(Events.Error, (error) => {
        console.error("❌ Discord bot error:", error);
    });

    client.on(Events.Warn, (warning) => {
        console.warn("⚠️ Discord bot warning:", warning);
    });

    const buildDiscordEmbed = (title, description, color, fields = [], footerText = "") => {
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();

        if (fields.length) {
            embed.addFields(fields);
        }

        if (footerText) {
            embed.setFooter({ text: footerText });
        }

        return embed;
    };

    const buildRoomStatusSummary = (rooms = []) => {
        const summaries = rooms
            .filter((room) => room?.name)
            .map((room) => {
                const devices = Array.isArray(room?.devices) ? room.devices : [];
                const fansOn = devices.filter((device) => device?.type === "Fan" && device?.status).length;
                const lightsOn = devices.filter((device) => device?.type === "Light" && device?.status).length;

                if (fansOn === 0 && lightsOn === 0) {
                    return `🏠 ${room.name}\n   • All systems idle`;
                }

                const parts = [];
                if (fansOn > 0) {
                    parts.push(`🌀 ${fansOn} ${fansOn === 1 ? "fan" : "fans"} ON`);
                }
                if (lightsOn > 0) {
                    parts.push(`💡 ${lightsOn} ${lightsOn === 1 ? "light" : "lights"} ON`);
                }

                return `🏠 ${room.name}\n   • ${parts.join(" • ")}`;
            });

        return summaries.join("\n");
    };

    const handleCommand = async (message, command, args) => {
        const baseUrl = `${apiBaseUrl}/api/v1`;

        try {
            if (command === "dashboard") {
                const response = await axios.get(`${baseUrl}/dashboard`);
                const data = response?.data?.data || {};
                const fields = [
                    { name: "Total Power", value: `${data.totalPower ?? 0}W`, inline: true },
                    { name: "Devices", value: `${data.devices?.length ?? 0}`, inline: true },
                    { name: "Alerts", value: `${data.alerts?.length ?? 0}`, inline: true },
                ];
                await message.reply({ embeds: [buildDiscordEmbed("🏢 Office Dashboard", "Live office summary", 0x2563EB, fields, "Smart Office Assistant")] });
                return;
            }

            if (command === "power") {
                const response = await axios.get(`${baseUrl}/power`);
                const data = response?.data?.data || {};
                const fields = Object.entries(data.roomPower || {}).map(([room, power]) => ({ name: room, value: `${power}W`, inline: true }));
                await message.reply({ embeds: [buildDiscordEmbed("⚡ Power Overview", `Current total usage: ${data.totalPower ?? 0}W`, 0x10B981, fields, "Power monitoring")] });
                return;
            }

            if (command === "devices") {
                const response = await axios.get(`${baseUrl}/devices`);
                const devices = response?.data?.data || [];
                const sortedDevices = [...devices].sort((a, b) => {
                    const roomA = a?.room?.name || "";
                    const roomB = b?.room?.name || "";
                    if (roomA === roomB) {
                        return (a?.name || "").localeCompare(b?.name || "");
                    }
                    return roomA.localeCompare(roomB);
                });
                const fields = sortedDevices.map((device) => ({
                    name: device?.name || "Unnamed device",
                    value: `${device?.status ? "● ON" : "○ OFF"} • ${device?.room?.name || "Unknown room"}`,
                    inline: false,
                }));
                await message.reply({ embeds: [buildDiscordEmbed("📱 Devices", `Tracked devices: ${sortedDevices.length}`, 0x5865F2, fields, "Device inventory")] });
                return;
            }

            if (command === "rooms") {
                const response = await axios.get(`${baseUrl}/rooms`);
                const rooms = response?.data?.data || [];
                const fields = rooms.map((room) => ({ name: room?.name || "Unnamed room", value: `Devices: ${room?.devices?.length ?? 0} • Power: ${room?.totalPower ?? 0}W`, inline: true }));
                await message.reply({ embeds: [buildDiscordEmbed("🏠 Rooms", "Current office rooms", 0xF59E0B, fields, "Room status")] });
                return;
            }

            if (command === "alerts") {
                const response = await axios.get(`${baseUrl}/alerts`);
                const alerts = response?.data?.data || [];
                const fields = alerts.length ? alerts.slice(0, 5).map((alert) => ({ name: alert?.message || "Alert", value: alert?.severity || "Active", inline: false })) : [{ name: "Status", value: "No active alerts", inline: false }];
                await message.reply({ embeds: [buildDiscordEmbed("🚨 Active Alerts", alerts.length ? `${alerts.length} active alert(s)` : "Everything looks normal", 0xEF4444, fields, "Alert monitoring")] });
                return;
            }

            if (command === "analytics") {
                const response = await axios.get(`${baseUrl}/analytics`);
                const data = response?.data?.data || {};
                const fields = [
                    { name: "Peak Power", value: `${data.peakPower ?? 0}W`, inline: true },
                    { name: "Average Power", value: `${data.averagePower ?? 0}W`, inline: true },
                    { name: "Active Devices", value: `${data.activeDevices ?? 0}`, inline: true },
                ];
                await message.reply({ embeds: [buildDiscordEmbed("📊 Analytics", "Performance and usage insights", 0x8B5CF6, fields, "Analytics")]} );
                return;
            }

            if (command === "insight") {
                const response = await axios.get(`${baseUrl}/ai`);
                const data = response?.data?.data;
                const insight = (typeof data === "string" ? data : data?.insight || data?.answer) || "No insight available.";
                await message.reply({ embeds: [buildDiscordEmbed("🤖 AI Insight", insight, 0x14B8A6, [], "AI recommendation")] });
                return;
            }

            if (command === "device") {
                const input = args.join(" ");
                const nameMatch = input.match(/name:(.+?)(?:\s+action:|$)/i);
                const actionMatch = input.match(/action:(\w+)/i);
                const nameArg = nameMatch?.[1]?.trim();
                const actionArg = actionMatch?.[1]?.trim();

                if (!nameArg) {
                    await message.reply({ embeds: [buildDiscordEmbed("⚙️ Device Control", "Usage: /office device name:Light 3\nOr: /office device name:Light 3 action:on", 0xF59E0B, [], "Interactive control")] });
                    return;
                }

                const response = await axios.get(`${baseUrl}/devices`);
                const devices = response?.data?.data || [];
                const normalizedName = nameArg.toLowerCase();
                const device = devices.find((item) => {
                    const itemName = (item?.name || "").toLowerCase();
                    return itemName === normalizedName || itemName.includes(normalizedName);
                });

                if (!device) {
                    await message.reply({ embeds: [buildDiscordEmbed("⚠️ Device Not Found", `No device matched ${nameArg}`, 0xEF4444, [], "Device control")] });
                    return;
                }

                if (!actionArg) {
                    await message.reply({ embeds: [buildDiscordEmbed("📱 Device Status", `Device: ${device.name}\nStatus: ${device.status ? "ON" : "OFF"}\nRoom: ${device.room?.name || "Unknown"}`, 0x2563EB, [], "Device lookup")] });
                    return;
                }

                const status = actionArg.toLowerCase() === "on";
                const patchResponse = await axios.patch(`${baseUrl}/devices/${device._id}/status`, { status });
                const updated = patchResponse?.data?.data || {};
                await message.reply({ embeds: [buildDiscordEmbed("✅ Device Updated", `Device: ${updated.name || device.name}\nStatus: ${status ? "ON" : "OFF"}\nRoom: ${updated.room?.name || device.room?.name || "Unknown"}`, 0x22C55E, [], "Device control")] });
                return;
            }

            if (command === "status") {
                const [roomsRes, dashboardRes] = await Promise.all([
                    axios.get(`${baseUrl}/rooms`),
                    axios.get(`${baseUrl}/dashboard`),
                ]);
                const rooms = roomsRes?.data?.data || [];
                const dashboard = dashboardRes?.data?.data || {};
                const customSummary = args.join(" ").trim();
                const summaryText = customSummary || buildRoomStatusSummary(rooms);
                const fields = [
                    { name: "Devices", value: `${dashboard.devices?.length ?? 0}`, inline: true },
                    { name: "Active", value: `${dashboard.devices?.filter((d) => d.status).length ?? 0}`, inline: true },
                    { name: "Rooms", value: `${rooms.length}`, inline: true },
                ];

                await message.reply({ embeds: [buildDiscordEmbed("🟢 Smart Office Status", summaryText.replace(/\n/g, "\n"), 0x22C55E, fields, "Status overview")] });
                return;
            }

            if (command === "room") {
                const roomName = args.join(" ").trim();
                if (!roomName) {
                    await message.reply({ embeds: [buildDiscordEmbed("🏠 Room Lookup", "Usage: !room <room name>", 0xF59E0B, [], "Room lookup")] });
                    return;
                }

                const response = await axios.get(`${baseUrl}/rooms`);
                const rooms = response?.data?.data || [];
                const normalizedRoom = roomName.toLowerCase();
                const room = rooms.find((item) => {
                    const itemName = (item?.name || "").toLowerCase();
                    return itemName === normalizedRoom || itemName.includes(normalizedRoom);
                });

                if (!room) {
                    await message.reply({ embeds: [buildDiscordEmbed("⚠️ Room Not Found", `No room matched ${roomName}`, 0xEF4444, [], "Room lookup")] });
                    return;
                }

                const fields = [
                    { name: "Devices", value: `${room.devices?.length ?? 0}`, inline: true },
                    { name: "Power", value: `${room.totalPower ?? 0}W`, inline: true },
                ];
                await message.reply({ embeds: [buildDiscordEmbed(`🏠 ${room.name}`, room.description || "Room overview", 0xF59E0B, fields, "Room status")] });
                return;
            }

            if (command === "usage") {
                const [dashboardRes, powerRes] = await Promise.all([
                    axios.get(`${baseUrl}/dashboard`),
                    axios.get(`${baseUrl}/power`),
                ]);
                const dashboard = dashboardRes?.data?.data || {};
                const power = powerRes?.data?.data || {};

                // Total Power = sum of all device powerRatings (max capacity)
                const allDevices = dashboard.devices || [];
                const totalPowerRating = allDevices.reduce((sum, d) => sum + (d.powerRating ?? 0), 0);

                // Today's Estimated Usage from power history
                const historyRes = await axios.get(`${baseUrl}/power/history`);
                const logs = historyRes?.data?.data || [];
                const now = new Date();
                const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const todayLogs = logs.filter((log) => new Date(log.createdAt) >= startOfDay);

                let estimatedUsage = "0 Wh";
                if (todayLogs.length > 0) {
                    const avgPower = todayLogs.reduce((sum, log) => sum + (log.totalPower ?? 0), 0) / todayLogs.length;
                    // Each log is ~1 minute apart, so total energy = avgPower * (number of intervals) / 60 hours
                    const hoursElapsed = todayLogs.length / 60;
                    const usageWh = Math.round(avgPower * hoursElapsed);
                    estimatedUsage = usageWh >= 1000 ? `${(usageWh / 1000).toFixed(2)} kWh` : `${usageWh} Wh`;
                }

                const customUsage = args.join(" ").trim();
                const fields = [
                    { name: "Current Power", value: `${power.totalPower ?? 0}W`, inline: true },
                    { name: "Total Power", value: `${totalPowerRating}W`, inline: true },
                    { name: "Today's Est. Usage", value: estimatedUsage, inline: true },
                    { name: "Active Devices", value: `${allDevices.filter((d) => d.status).length}`, inline: true },
                ];

                if (customUsage) {
                    fields.unshift({ name: "Usage Note", value: customUsage, inline: false });
                }

                await message.reply({ embeds: [buildDiscordEmbed("⚡ Usage Overview", customUsage ? "Live usage summary" : "Current office usage", 0x10B981, fields, "Energy monitoring")] });
                return;
            }

            await message.reply({ embeds: [buildDiscordEmbed("🧭 Available Commands", "Use: !dashboard, !power, !devices, !rooms, !alerts, !analytics, !insight, !device, !status, !room, !usage, or /office ...", 0x2563EB, [], "Smart Office Assistant")] });
        } catch (error) {
            console.error("Discord bot command failed", error.message);
            await message.reply({ embeds: [buildDiscordEmbed("❌ Command Failed", "The request could not be completed right now.", 0xEF4444, [], "Smart Office Assistant")] });
        }
    };

    const tokenizeCommandInput = (input) => {
        const trimmed = input?.trim() || "";
        if (!trimmed) {
            return [];
        }

        const tokens = trimmed.match(/"[^"]*"|'[^']*'|\S+/g) || [];
        return tokens.map((token) => token.replace(/^['"]|['"]$/g, "").trim()).filter(Boolean);
    };

    const parseIncomingMessage = (content) => {
        const trimmed = content?.trim() || "";
        if (!trimmed) {
            return null;
        }

        const lower = trimmed.toLowerCase();

        if (trimmed.startsWith("/office")) {
            const withoutPrefix = trimmed.slice("/office".length).trim();
            const tokens = withoutPrefix.split(/\s+/).filter(Boolean);
            const commandToken = tokens[0]?.toLowerCase();
            return {
                command: commandToken || "dashboard",
                args: tokens.slice(1),
            };
        }

        if (trimmed.startsWith("!")) {
            const withoutPrefix = trimmed.slice(1).trim();
            const tokens = tokenizeCommandInput(withoutPrefix);
            const commandToken = tokens[0]?.toLowerCase();
            return {
                command: commandToken || "dashboard",
                args: tokens.slice(1),
            };
        }

        if (/\bshow\b.*\ball\b.*\broom(s)?\b/i.test(lower) || /\b(list|get)\b.*\broom(s)?\b/i.test(lower)) {
            return { command: "rooms", args: [] };
        }

        if (/\bshow\b.*\ball\b.*\bdevice(s)?\b/i.test(lower) || /\b(list|get)\b.*\bdevice(s)?\b/i.test(lower)) {
            return { command: "devices", args: [] };
        }

        return null;
    };

    const handledMessages = new Set();

    client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot) return;

        // Use message.id as the dedup key — it's a unique snowflake per message,
        // so even if the event fires multiple times or multiple instances exist,
        // only the first one to process it will reply.
        if (handledMessages.has(message.id)) return;
        handledMessages.add(message.id);
        setTimeout(() => handledMessages.delete(message.id), 30000);

        const content = message.content?.trim() || "";
        const parsed = parseIncomingMessage(content);
        if (!parsed) return;

        await handleCommand(message, parsed.command, parsed.args);
    });

    client.login(token).catch((error) => {
        console.error("❌ Discord bot is offline. Login failed:", error.message);
    });
}
