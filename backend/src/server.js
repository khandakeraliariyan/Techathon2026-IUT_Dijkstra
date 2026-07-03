const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const connectDB = require("./config/db");

const { initializeSocket } = require("./sockets/socket");

const startSimulator = require("./simulator/deviceSimulator");

const startScheduler = require("./jobs/scheduler");

const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect MongoDB
        await connectDB();

        // Create Express HTTP Server
        const server = http.createServer(app);

        // Initialize Socket.IO
        const io = initializeSocket(server);

        // Start Simulator
        startSimulator(io);

        // Start Background Jobs
        startScheduler();

        // Start Server
        server.listen(PORT, () => {
            logger.info("Server Started", {
                Environment: process.env.NODE_ENV,
                Port: PORT,
                URL: `http://localhost:${PORT}`,
            });
        });
    } catch (error) {
        logger.error("Server Startup Failed", error);

        process.exit(1);
    }
};

startServer();