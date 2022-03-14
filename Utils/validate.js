import ErrorResponse from "./errorResponse.js";

export const ValidationSource = {
  BODY: "body",
  HEADERS: "headers",
  QUERY: "query",
  PARAMS: "params",
};

export const validate = (schema, source) => (req, res, next) => {
  try {
    const { error } = schema.validate(req[source]);
    if (!error) return next();
    const { details } = error;
    const errorMessage = details
      .map((i) => i.message.replace(/['"]+/g, ""))
      .join(",");
    next(new ErrorResponse(errorMessage, 400));
  } catch (e) {
    next(e);
  }
};
