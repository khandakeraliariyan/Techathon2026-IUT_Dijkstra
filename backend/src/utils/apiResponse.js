class ApiResponse {
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
}

module.exports = ApiResponse;