"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
// src/utils/ApiResponse.ts
class ApiResponse {
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = this.statusCode < 400;
    }
}
exports.ApiResponse = ApiResponse;
