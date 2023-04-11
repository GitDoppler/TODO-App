const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

//---Create express app---
const app = express();

//---Connect to mongoDB---
const dbURI =
  "mongodb+srv://doppler:jrPCVDeXz_26!5M@cluster0.vp5cvh2.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//---Register view engine---
app.set("view engine", "ejs");

//---Middleware and static files---
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//---Default Routing---
app.get("/", (req, res) => {
  res.redirect("/home");
});

//---Routing---
app.use(todoRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
