
/**
 * Wrapper class for API responses.
 * 
 * This class provides a standard structure for API responses, including
 * the HTTP status code, data, message, and a success flag.
 * 
 * @class
 * @template T - Type of the data included in the response.
 */
class ApiResponse<T> {
  /**
   * HTTP status code of the response.
   * @type {number}
   */
   statusCode: number;


  /**
   * Data included in the response.
   * @type {T}
   */
   data: T;

    /**
   * Message associated with the response.
   * @type {string}
   */
   message: string;

   /**
   * Indicates if the response represents a successful operation.
   * @type {boolean}
   */
   success: boolean;
 

  /**
   * Creates an instance of ApiResponse.
   * 
   * @param {number} statusCode - The HTTP status code.
   * @param {T} data - The data included in the response.
   * @param {string} [message="success"] - The message associated with the response.
   */
   constructor(statusCode: number, data: T, message: string = "success") {
     this.statusCode = statusCode;
     this.data = data;
     this.message = message;
     this.success = this.statusCode < 400;
   }
 }
 
 export { ApiResponse };
 