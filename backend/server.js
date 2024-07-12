
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const sequelize = require("./connections/db");
const authRoute = require("./routes/authRoute");
const emailRoute = require("./routes/emailRoute");
const uploadRoute = require("./routes/uploadRoute");
const templateRoute = require("./routes/templateRoute");
const { connectRabbitMQ, channel } = require("./connections/rabitmq");
const { consumeEmailQueue } = require("./services/emailConsumer");
const { notFound } = require('./middlewares/notFoundMiddleware');
const { verifyToken } = require("./middlewares/authMiddlewares");
const { exceptionHandler } = require("./middlewares/exceptionMiddleware");
const { initializeSocket } = require('./connections/socket');
const responseLogger = require("./middlewares/logger");

const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 8000;

const io = initializeSocket(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(responseLogger)

app.get("/", function (req, res) {
  res.json({ message: "Welcome to Bulk Email Processor Service" });
});


app.use("/auth", authRoute);
app.use(verifyToken);
app.use("/upload", uploadRoute);
app.use("/templates/email", templateRoute);
app.use("/email", emailRoute);

app.use(exceptionHandler);
app.use(notFound);

const startServer = async () => {
  try {
    await connectRabbitMQ();
    consumeEmailQueue();

    await sequelize.sync();
    server.listen(port, () => {
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

module.exports = { io };
