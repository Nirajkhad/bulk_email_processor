const express = require('express');
const sequelize = require('./connections/db');
const app = express();
const port = process.env.PORT || 8000;


app.get("/",function(req,res){
    res.json({"message":"Welcome to Bulk Email Processor Service"})
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
});
