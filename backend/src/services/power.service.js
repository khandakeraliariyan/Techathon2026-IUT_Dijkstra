const Device = require("../models/Device");
const PowerLog = require("../models/PowerLog");

class PowerService {

    async getCurrentPowerUsage() {

        const devices = await Device.find().populate("room");

        let totalPower = 0;

        const roomPower = {};

        devices.forEach(device => {

            const power = device.status
                ? device.powerRating
                : 0;

            totalPower += power;

            const roomName = device.room.name;

            if (!roomPower[roomName]) {

                roomPower[roomName] = 0;

            }

            roomPower[roomName] += power;

        });

        return {

            totalPower,

            roomPower,

            devices

        };

    }

    async savePowerSnapshot() {

        const power = await this.getCurrentPowerUsage();

        await PowerLog.create({

            totalPower: power.totalPower,

            roomPower: power.roomPower

        });

        return power;

    }

    async getPowerHistory(limit = 20) {

        return await PowerLog
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

    }

}

module.exports = new PowerService();