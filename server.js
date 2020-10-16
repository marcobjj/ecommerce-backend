const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// turn on connection to db and server
// force associations aka foreign keys, table will be dropped and recreated if new foreign keys are estabilished

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
})


