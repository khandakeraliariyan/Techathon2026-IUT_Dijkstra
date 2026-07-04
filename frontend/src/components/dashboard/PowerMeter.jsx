import { motion } from "framer-motion";
import { FaFan, FaLightbulb } from "react-icons/fa";

const PowerMeter = ({ rooms, roomPower = {}, totalPower = 0, lastUpdated }) => {
    const roomEntries = rooms.map((room) => ({
        name: room.name,
        value: room.totalPower ?? roomPower[room.name] ?? 0,
    }));

    const maxValue = Math.max(totalPower, ...roomEntries.map((entry) => entry.value), 1);
    const fanCount = rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Fan").length, 0);
    const lightCount = rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Light").length, 0);

    return (
        <section className="glass-panel relative flex flex-col overflow-hidden rounded-2xl border-cyan-400/15 px-6 py-7 sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-[80px]" />

            <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
                <div>
                    <p className="eyebrow text-cyan-200/80">
                        Live Power Meter
                    </p>
                    <h2 className="text-primary mt-2 text-3xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {totalPower}<span className="text-muted text-lg">W</span>
                    </h2>
                    <p className="text-muted mt-1 text-sm">
                        Total office draw across all connected devices
                    </p>
                </div>

                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-center sm:text-right">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">
                        Status
                    </p>
                    <p className="flex items-center justify-end gap-1.5 text-sm font-semibold text-emerald-300">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Live
                    </p>
                </div>
            </div>

            <div className="border-muted surface-muted relative mt-6 rounded-xl border px-5 py-5 text-center sm:px-6 sm:py-6">
                <div className="text-faint flex flex-col items-center gap-1 text-xs uppercase tracking-[0.22em] sm:flex-row sm:justify-between sm:gap-0">
                    <span>Room split</span>
                    <span>{lastUpdated ? new Date(lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Auto refresh"}</span>
                </div>

                <div className="mt-5 space-y-5">
                    {roomEntries.map((room, index) => {
                        const width = Math.max((room.value / maxValue) * 100, room.value > 0 ? 16 : 8);

                        return (
                            <div key={room.name} className="space-y-2">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-secondary font-medium">{room.name}</span>
                                    <span className="text-muted font-mono text-xs">{room.value}W</span>
                                </div>
                                <div className="surface-soft h-2.5 overflow-hidden rounded-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${width}%` }}
                                        transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-300 shadow-[0_0_16px_rgba(56,189,248,0.4)]"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="border-subtle surface-muted rounded-xl border px-4 py-5">
                    <p className="text-faint text-[10px] uppercase tracking-[0.22em]">Rooms</p>
                    <p className="text-primary mt-2 text-lg font-bold">{rooms.length}</p>
                </div>
                <div className="border-subtle surface-muted rounded-xl border px-4 py-5">
                    <p className="text-faint flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.22em]">
                        <FaFan className="text-cyan-300/70" /> Fans
                    </p>
                    <p className="text-primary mt-2 text-lg font-bold">{fanCount}</p>
                </div>
                <div className="border-subtle surface-muted rounded-xl border px-4 py-5">
                    <p className="text-faint flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.22em]">
                        <FaLightbulb className="text-amber-300/70" /> Lights
                    </p>
                    <p className="text-primary mt-2 text-lg font-bold">{lightCount}</p>
                </div>
            </div>
        </section>
    );
};

export default PowerMeter;
