const errorResponse = (
  res,
  { statusCode = 500, message = "Internal Server Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "Success", payloat = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payloat,
  });
};
module.exports = { errorResponse, successResponse };
