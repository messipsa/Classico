import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const url = process.env.URI;

const app = express();

app.use(cors());
app.use(bodyParser.json());

console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log(`Mongoose default connection to ${url}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose default connection error : ${err}`);
});

mongoose.connection.on("disconnect", () => {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed");
    process.exit(0);
  });
});
