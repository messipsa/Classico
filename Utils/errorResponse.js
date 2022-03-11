export default class ErrorResponse extends Error {
  cunstructor(statusCode, message) {
    this.super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.cunstructor);
  }
}
