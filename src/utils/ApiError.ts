
/**
 * Custom error class for handling API-specific errors.
 * 
 * This class extends the built-in `Error` class to include additional properties
 * that provide more context about the error, such as the status code, error messages, and additional data.
 * 
 * @class
 * @extends Error
 */
class ApiError extends Error {
  /**
   * HTTP status code associated with the error.
   * @type {number}
   */
   statusCode: number;

   /**
   * HTTP status code associated with the error.
   * @type {number}
   */
   data: any;

   /**
   * Indicates if the operation was successful.
   * @type {boolean}
   */
   success: boolean;
    /**
   * Array of error messages.
   * @type {string[]}
   */
   errors: string[];
 
   /**
   * Creates an instance of ApiError.
   * 
   * @param {number} statusCode - The HTTP status code.
   * @param {string} [message="Something went wrong"] - The error message.
   * @param {string[]} [errors=[]] - Array of error messages.
   * @param {string} [stack=""] - The stack trace of the error.
   */
   constructor(
     statusCode: number,
     message: string = "Something went wrong",
     errors: string[] = [],
     stack: string = ""
   ) {
     super(message);
     this.statusCode = statusCode;
     this.data = null;
     this.message = message;
     this.success = false;
     this.errors = errors;
 
     if (stack) {
       this.stack = stack;
     } else {
       Error.captureStackTrace(this, this.constructor);
     }
   }
 }
 
 export { ApiError };
 