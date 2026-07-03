const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/errorMiddleware");

const deviceRoutes = require("./routes/device.routes");
const roomRoutes = require("./routes/room.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const powerRoutes = require("./routes/power.routes");
const alertRoutes = require("./routes/alert.routes");

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Smart Office Monitoring API Running",
        version: "v1",
    });
});

app.use("/api/v1/devices", deviceRoutes);

app.use("/api/v1/rooms", roomRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api/v1/power", powerRoutes);

app.use("/api/v1/alerts", alertRoutes);

app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use(errorMiddleware);

module.exports = app;