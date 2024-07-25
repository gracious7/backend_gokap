"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
/**
 * Wrapper class for API responses.
 *
 * This class provides a standard structure for API responses, including
 * the HTTP status code, data, message, and a success flag.
 *
 * @class
 * @template T - Type of the data included in the response.
 */
class ApiResponse {
    /**
     * Creates an instance of ApiResponse.
     *
     * @param {number} statusCode - The HTTP status code.
     * @param {T} data - The data included in the response.
     * @param {string} [message="success"] - The message associated with the response.
     */
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = this.statusCode < 400;
    }
}
exports.ApiResponse = ApiResponse;
