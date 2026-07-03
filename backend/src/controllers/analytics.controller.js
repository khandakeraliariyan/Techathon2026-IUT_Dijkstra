const AnalyticsService = require("../services/analytics.service");

const ApiResponse = require("../utils/apiResponse");

const asyncHandler = require("../utils/asyncHandler");

const getAnalytics = asyncHandler(async (req, res) => {

    const analytics =
        await AnalyticsService.getAnalytics();

    res.json(

        new ApiResponse(

            true,

            "Analytics",

            analytics

        )

    );

});

module.exports = {

    getAnalytics

};