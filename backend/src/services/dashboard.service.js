const Device = require("../models/Device");
const Alert = require("../models/Alert");

const RoomService = require("./room.service");
const PowerService = require("./power.service");

class DashboardService {
    async getDashboardData() {
        // Fetch all required data in parallel
        const [devices, alerts, rooms, power] = await Promise.all([
            Device.find().populate("room"),
            Alert.find({ resolved: false }).sort({ createdAt: -1 }),
            RoomService.getAllRooms(),
            PowerService.getCurrentPowerUsage(),
        ]);

        return {
            devices,
            rooms,
            alerts,

            totalPower: power.totalPower,
            roomPower: power.roomPower,

            lastUpdated: new Date(),
        };
    }
}

module.exports = new DashboardService();