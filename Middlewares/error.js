import ErrorResponse from "../Utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.log(err.statusCode);
  let error = { ...err };
  console.log(err.msg);
  error.message = err.message;
  //error.statusCode = err.statusCode;
  console.log("err.name = " + err.name);
  if (err.name === "CastError") {
    const msg = "Ressource not found";
    error = new ErrorResponse(404, msg);
  }

  if (err.name === "ValidationError") {
    const msg = Object.values(err.errors).map((e) => e.message);
    error = new ErrorResponse(400, msg);
  }

  console.log(err);
  console.log(
    "-----------------------------------------------------------------------"
  );
  console.log(error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};
