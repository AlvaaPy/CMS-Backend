import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import Route from "./routes/Route.js";
dotenv.config();

const app = express();
try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

app.use(cors());
app.use(express.json());
app.use(Route);
app.use('/uploads', express.static('uploads')); 

app.listen(5000, () => console.log("Server up and Running..."));
