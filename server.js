///linking dependecies///
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const express = require('express');

const sequelize = require("./config/connection");

const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
      console.log(
        `Running on port ${PORT}. check your localhost 3001:${PORT} and create an account!`
      )
    );
  });