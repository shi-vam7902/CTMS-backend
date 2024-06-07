const errorMiddleware = (err, req, res, next) => {
    // console.error(err); // Log the error for debugging
  
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }
  
    if (err.code === 11000 && err.keyPattern.title === 1) {
      return res
        .status(400)
        .json({ success: false, message: "Title must be unique." });
    }
  
    const status = err.statusCode || 500;
    const message = err.message || "Server Error";
  
    return res.status(status).json({
      success: false,
      message,
      errors: err.errors || [],
    });
  };
  
  module.exports = { errorMiddleware };
  