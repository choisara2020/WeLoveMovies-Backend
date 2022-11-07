if (process.env.USER) require("dotenv").config();
const cors = require("cors");
const express = require("express");

//require all the routers and error handlers and not found
const moviesRouter = require("./movies/movies.router");
const theaterRouter = require("./theaters/theaters.router")
const errorHandler = require("./errors/errorHandler")
const reviewRouter = require("./reviews/reviews.router")
const notFound = require("./errors/notFound")

//use cors and express
const app = express();
app.use(cors())
app.use(express.json());

//use routers
app.use("/movies", moviesRouter);
app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter)





app.use(notFound);

app.use(errorHandler);

module.exports = app;