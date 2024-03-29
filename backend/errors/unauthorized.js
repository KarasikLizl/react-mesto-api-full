export default class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message;
  }
}
