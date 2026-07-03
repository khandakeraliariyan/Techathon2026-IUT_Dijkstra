const AlertService = require("../services/alert.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAlerts = asyncHandler(async (req, res) => {

    const alerts = await AlertService.getActiveAlerts();

    res.status(200).json(

        new ApiResponse(
            true,
            "Alerts fetched successfully",
            alerts
        )

    );

});

module.exports = {
    getAlerts
};