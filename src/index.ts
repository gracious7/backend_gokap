import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";

const PORT = process.env.PORT || 3000;

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));
