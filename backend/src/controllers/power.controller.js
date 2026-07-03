const PowerService = require("../services/power.service");

const ApiResponse = require("../utils/apiResponse");

const asyncHandler = require("../utils/asyncHandler");

const getPowerUsage = asyncHandler(async (req, res) => {

    const data = await PowerService.getCurrentPowerUsage();

    res.status(200).json(

        new ApiResponse(

            true,

            "Power usage fetched successfully",

            data

        )

    );

});

module.exports = {

    getPowerUsage

};