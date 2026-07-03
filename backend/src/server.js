const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const { initializeSocket } = require("./sockets/socket");

const startSimulator = require("./simulator/deviceSimulator");

const PORT = process.env.PORT || 5000;

const startServer = async () => {

    try {

        await connectDB();

        const server = http.createServer(app);

        const io = initializeSocket(server);

        startSimulator(io);

        server.listen(PORT, () => {

            console.log(`🚀 Server running on ${PORT}`);

        });

    } catch (err) {

        console.log(err);

    }

};

startServer();