const Device = require("../models/Device");

const DeviceService = require("./device.service");
const PowerService = require("./power.service");
const AlertService = require("./alert.service");

const SOCKET_EVENTS = require("../constants/socketEvents");
const logger = require("../utils/logger");

class SimulatorService {
    async simulate(io) {
        try {
            // Current time
            const currentHour = new Date().getHours();

            // Office hours: 9 AM - 5 PM
            const officeOpen = currentHour >= 9 && currentHour < 17;

            // Fetch all devices
            const devices = await Device.find();

            if (!devices.length) return;

            // Pick a random device
            const randomDevice =
                devices[Math.floor(Math.random() * devices.length)];

            let newStatus = false;

            // Smart office behaviour
            if (officeOpen) {
                if (randomDevice.type === "Light") {
                    newStatus = Math.random() < 0.85;
                } else {
                    newStatus = Math.random() < 0.70;
                }
            } else {
                // After office hours
                newStatus = Math.random() < 0.05;
            }

            // Update device
            const updatedDevice = await DeviceService.updateStatus(
                randomDevice._id,
                newStatus
            );

            // Calculate latest power usage
            const powerData =
                await PowerService.getCurrentPowerUsage();

            // Run alert rules
            await AlertService.checkAfterHours();

            // Logging
            logger.info("Simulator Update", {
                Device: updatedDevice.name,
                Room: updatedDevice.room.name,
                Type: updatedDevice.type,
                Status: updatedDevice.status ? "ON" : "OFF",
                Time: new Date().toLocaleTimeString(),
            });

            // Emit Socket Events
            io.emit(
                SOCKET_EVENTS.DEVICE_UPDATED,
                updatedDevice
            );

            io.emit(
                SOCKET_EVENTS.POWER_UPDATED,
                powerData
            );

            io.emit(
                SOCKET_EVENTS.ALERT_UPDATED
            );

            io.emit(
                SOCKET_EVENTS.DASHBOARD_UPDATED,
                {
                    updatedDevice,
                    powerData,
                    timestamp: new Date(),
                }
            );

        } catch (error) {

            logger.error(
                "Simulator Error",
                error.message
            );

        }
    }
}

module.exports = new SimulatorService();