export default class ErrorHandler extends Error {
statusCode: Number;
  constructor(message: any, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;
    // this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
