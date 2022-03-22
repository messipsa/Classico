import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import pkg from "express-validation";
const { Joi, validateAsync } = pkg;
import { sendEmail } from "./Utils/sendEmail.js";
import { findUserByEmail } from "./routes/Users/service.js";

dotenv.config();

const port = process.env.PORT;
const url = process.env.URI;

const app = express();

const user = {
  _id: "hhcjg6656ce6c4",
  email: "kassimbacha1000@gmail.com",
  confirmationCode: "a1b89dc2",
};
//verify(user);

//sendEmail(options);

app.use(cors());
app.use(bodyParser.json());

//Routes

app.use("/api", routes);
//app.use(errorHandler);

app.all("*", (req, res) => {
  //app.use(errorHandler);
  throw new Error("Bad request");
});

app.use((err, req, res, next) => {
  if (err.message === "Bad request") {
    res.status(400).json({ error: { message: err.message, stack: err.stack } });
  }
});

//Server listening

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});

//Connection to mongoose

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    const user = { email: "salim@esi.dz" };
    // const result = await findUserByEmail(user.email);
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
