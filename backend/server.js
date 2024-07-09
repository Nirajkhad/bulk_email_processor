require('dotenv').config();
const express = require('express');
const sequelize = require('./connections/db');
const responseLogger = require('./middlewares/logger');

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(responseLogger);

app.get("/",function(req,res){
    res.json({"message":"Welcome to Bulk Email Processor Service"})
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
});
