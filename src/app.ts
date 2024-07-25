import express from "express";
import "reflect-metadata"

/**
 * Initializes and exports an Express application instance.
 * 
 * This module sets up the Express application by creating an instance of `express()` and applying
 * necessary configurations. The `reflect-metadata` package is imported to support TypeScript decorators
 * used in other parts of the application.
 * 
 * @module
 * 
 * @returns {express.Application} An instance of the Express application.
 * 
 * @example
 * import app from './app';
 * 
 * // Example usage:
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 */
const app = express();
export default app;
