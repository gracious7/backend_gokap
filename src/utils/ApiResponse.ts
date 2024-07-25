class ApiResponse<T> {
   statusCode: number;
   data: T;
   message: string;
   success: boolean;
 
   constructor(statusCode: number, data: T, message: string = "success") {
     this.statusCode = statusCode;
     this.data = data;
     this.message = message;
     this.success = this.statusCode < 400;
   }
 }
 
 export { ApiResponse };
 