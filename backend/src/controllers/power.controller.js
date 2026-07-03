const PowerService = require("../services/power.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getPowerUsage = asyncHandler(async (req, res) => {

    const data = await PowerService.getCurrentPowerUsage();

    res.json(
        new ApiResponse(
            true,
            "Current power usage",
            data
        )
    );

});

const getPowerHistory = asyncHandler(async (req, res) => {

    const history =
        await PowerService.getPowerHistory();

    res.json(

        new ApiResponse(

            true,

            "Power history",

            history

        )

    );

});

module.exports = {

    getPowerUsage,

    getPowerHistory

};