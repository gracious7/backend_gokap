// express.d.ts

declare global {
   namespace Express {
     interface Request {
       user?: any;
     }
   }
 }
 
 export default Express;
 