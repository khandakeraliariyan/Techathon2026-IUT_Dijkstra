const { Server } = require("socket.io");
const SOCKET_EVENTS = require("../constants/socketEvents");

let io;

const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {

        console.log(`🟢 Client Connected: ${socket.id}`);

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {

            console.log(`🔴 Client Disconnected: ${socket.id}`);

        });

    });

    return io;
};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO,
};