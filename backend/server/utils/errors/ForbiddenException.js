class ForbiddenException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.body = {
      status: 'failure',
      message: message || 'Forbidden access',
    };
  }
}

module.exports = ForbiddenException;
