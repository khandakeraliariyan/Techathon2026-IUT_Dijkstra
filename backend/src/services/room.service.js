const Room = require("../models/Room");
const Device = require("../models/Device");

class RoomService {
    async getAllRooms() {
        const rooms = await Room.find();

        const roomData = await Promise.all(
            rooms.map(async (room) => {
                const devices = await Device.find({
                    room: room._id,
                });

                const totalPower = devices.reduce(
                    (sum, device) => sum + device.currentPower,
                    0
                );

                return {
                    ...room.toObject(),
                    devices,
                    totalPower,
                };
            })
        );

        return roomData;
    }
}

module.exports = new RoomService();