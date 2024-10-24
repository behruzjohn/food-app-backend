import { server } from "./graphql";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const PORT = +process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(<string>process.env.DATABASE_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  })
  .catch(console.log);
