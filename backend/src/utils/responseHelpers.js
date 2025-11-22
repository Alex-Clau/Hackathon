export const successResponse = (res, message, data) => {
  return res.json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const handleAsyncError = (res, error, defaultMessage) => {
  console.error(defaultMessage, error);
  return errorResponse(res, 500, defaultMessage);
};

