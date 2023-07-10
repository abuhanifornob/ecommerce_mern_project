const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");

const app = express();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
  message:
    "Too many accounts created from this IP, please try again after 1 minuts",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors());
app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // third party Middleware
// Apply the rate limiting middleware to all requests
app.use(limiter);
// Apply the rate limiting middleware to API calls only
// app.use('/api', apiLimiter)

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

app.get("/test", async (req, res) => {
  res.status(200).send({
    message: "Server  test is Running",
  });
});

app.get("/products", async (req, res) => {
  res.status(200).send({
    message: "Product are returend",
  });
});

// Cline Site Error Handaling

app.use((req, res, next) => {
  next(createError(404, "Route is not Found"));
});
// Server Error Handaling
app.use((err, req, res, next) => {
  // return res.status(err.status || 500).json({
  //   success: false,
  //   message: err.message,
  // });

  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
