const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const corsConfig = require("./cors.config");

module.exports = (app) => {
  app.set("trust proxy", 1);

  corsConfig(app)

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
