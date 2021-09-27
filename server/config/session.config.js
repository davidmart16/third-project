const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        // sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60
      },
      store: MongoStore.create({
        mongoUrl:process.env.DB_REMOTE
      })
    })
  );
};