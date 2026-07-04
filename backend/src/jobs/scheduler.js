const cron = require("node-cron");

const AlertService = require("../services/alert.service");
const PowerService = require("../services/power.service");
const SOCKET_EVENTS = require("../constants/socketEvents");

const logger = require("../utils/logger");

const startScheduler = (io) => {

    logger.info("Scheduler Started");

    cron.schedule("* * * * *", async () => {

        try {

            logger.info("Running Scheduled Jobs");

            await AlertService.checkAlerts();

                const powerData = await PowerService.savePowerSnapshot();

                if (io) {
                    io.emit(SOCKET_EVENTS.ALERT_UPDATED);
                    io.emit(SOCKET_EVENTS.POWER_UPDATED, powerData);
                    io.emit(SOCKET_EVENTS.DASHBOARD_UPDATED, {
                        powerData,
                        timestamp: new Date(),
                    });
                }

        } catch (error) {

            logger.error("Scheduler Error", error);

        }

    });

};

module.exports = startScheduler;