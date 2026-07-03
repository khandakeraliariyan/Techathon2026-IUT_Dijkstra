const Alert = require("../models/Alert");
const Device = require("../models/Device");

class AlertService {

    async getActiveAlerts() {

        return await Alert.find({
            resolved: false
        }).populate("room");

    }

    async createAlert(data) {

        return await Alert.create(data);

    }

    async resolveAlert(id) {

        return await Alert.findByIdAndUpdate(
            id,
            {
                resolved: true
            },
            {
                new: true
            }
        );

    }

    async checkAfterHours() {

        const hour = new Date().getHours();

        if (hour >= 9 && hour < 17) {

            return;

        }

        const activeDevices = await Device.find({
            status: true
        }).populate("room");

        for (const device of activeDevices) {

            const exists = await Alert.findOne({

                resolved: false,

                type: "AFTER_HOURS",

                message: {
                    $regex: device.name
                }

            });

            if (exists) continue;

            await Alert.create({

                type: "AFTER_HOURS",

                title: "Device Active After Office Hours",

                message: `${device.name} in ${device.room.name} is still ON.`,

                room: device.room._id,

                severity: "HIGH"

            });

        }

    }

}

module.exports = new AlertService();