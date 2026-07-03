const mongoose = require("mongoose");

const powerLogSchema = new mongoose.Schema(
    {
        totalPower: {
            type: Number,
            required: true
        },

        roomPower: {
            drawingRoom: Number,
            workRoom1: Number,
            workRoom2: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("PowerLog", powerLogSchema);