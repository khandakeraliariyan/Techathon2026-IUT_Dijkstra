const Device = require("../models/Device");
const deviceService = require("../services/device.service");
const AlertService = require("../services/alert.service");

const startSimulator = async (io) => {

    console.log("🚀 Device Simulator Started");

    setInterval(async () => {

        try {

            const devices = await deviceService.getAllDevices();

            if (!devices.length) return;

            const randomDevice =
                devices[Math.floor(Math.random() * devices.length)];

            const newStatus = !randomDevice.status;

            const updatedDevice =
                await deviceService.updateDevice(randomDevice._id, {

                    status: newStatus,

                    currentPower: newStatus
                        ? randomDevice.powerRating
                        : 0,

                    lastChanged: new Date()

                });

            await AlertService.checkAfterHours();

            console.log(
                `${updatedDevice.name} -> ${updatedDevice.status ? "ON" : "OFF"}`
            );

            if (io) {

                io.emit("deviceUpdated", updatedDevice);

            }

        } catch (err) {

            console.log(err);

        }

    }, 5000);

};

module.exports = startSimulator;