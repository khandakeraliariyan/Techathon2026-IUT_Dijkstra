const Device = require("../models/Device");
const Alert = require("../models/Alert");
const RoomService = require("./room.service");

class DashboardService {

    async getDashboardData() {

        const devices = await Device.find().populate("room");

        const alerts = await Alert.find({
            resolved: false
        }).sort({ createdAt: -1 });

        const rooms = await RoomService.getAllRooms();

        const totalPower = rooms.reduce(
            (sum, room) => sum + room.totalPower,
            0
        );

        const roomPower = {};

        rooms.forEach((room) => {
            roomPower[room.name] = room.totalPower;
        });

        return {

            devices,

            alerts,

            totalPower,

            roomPower,

            lastUpdated: new Date()

        };

    }

}

module.exports = new DashboardService();