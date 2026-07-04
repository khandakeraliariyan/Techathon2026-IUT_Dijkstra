const Alert = require("../models/Alert");
const Device = require("../models/Device");

class AlertService {

    async getActiveAlerts() {
        return await Alert.find({
            resolved: false,
        })
            .populate("room")
            .sort({ createdAt: -1 });
    }

    async createAlert(data) {
        return await Alert.create(data);
    }

    async resolveAlert(id) {
        return await Alert.findByIdAndUpdate(
            id,
            { resolved: true },
            { new: true }
        );
    }

    async checkAlerts() {
        await this.checkAfterHours();
        await this.checkRoomActivity();

        // Future Rules
        // await this.checkHighPower();
        // await this.checkPowerSpike();
    }

    async checkAfterHours() {

        const currentHour = new Date().getHours();

        if (currentHour >= 9 && currentHour < 17) {
            return;
        }

        const activeDevices = await Device.find({
            status: true,
        }).populate("room");

        if (!activeDevices.length) return;

        const existingAlerts = await Alert.find({
            type: "AFTER_HOURS",
            resolved: false,
        });

        const existingMessages = new Set(
            existingAlerts.map(alert => alert.message)
        );

        const newAlerts = [];

        for (const device of activeDevices) {

            const message =
                `${device.name} in ${device.room.name} is still ON.`;

            if (existingMessages.has(message)) {
                continue;
            }

            newAlerts.push({

                type: "AFTER_HOURS",

                title: "Device Active After Office Hours",

                message,

                room: device.room._id,

                severity: "HIGH"

            });

        }

        if (newAlerts.length) {

            await Alert.insertMany(newAlerts);

        }

    }

    async checkRoomActivity() {

        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

        const devices = await Device.find().populate("room");

        if (!devices.length) return;

        const roomMap = new Map();

        for (const device of devices) {

            const roomId = device.room?._id?.toString();

            if (!roomId) continue;

            if (!roomMap.has(roomId)) {

                roomMap.set(roomId, {
                    room: device.room,
                    devices: []
                });

            }

            roomMap.get(roomId).devices.push(device);

        }

        for (const { room, devices: roomDevices } of roomMap.values()) {

            if (!roomDevices.length) continue;

            const allDevicesOn = roomDevices.every((device) => device.status);
            const continuouslyOnForTwoHours = roomDevices.every((device) => new Date(device.lastChanged) <= twoHoursAgo);

            if (!allDevicesOn || !continuouslyOnForTwoHours) {
                continue;
            }

            const existingAlert = await Alert.findOne({
                type: "ROOM_ACTIVE",
                resolved: false,
                room: room._id,
            });

            if (existingAlert) {
                continue;
            }

            await Alert.create({
                type: "ROOM_ACTIVE",
                title: "Room Fully Active for 2 Hours",
                message: `${room.name} has kept all devices ON for more than 2 hours.`,
                room: room._id,
                severity: "HIGH",
            });

        }

    }
}

module.exports = new AlertService();