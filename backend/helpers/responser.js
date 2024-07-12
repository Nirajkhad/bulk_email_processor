const successResponse = (message, code) => ({
  success: true,
  code: code ?? 200,
  response: message,
});

const errorResponse = (message, code) => ({
  success: false,
  code: code ?? 500,
  response: message,
});

module.exports = {
  successResponse,
  errorResponse,
};
