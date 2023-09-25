const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ListRouter = require("./Routes/listRoutes");

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Define your routes here
app.use("/todo", ListRouter);

module.exports = app;
