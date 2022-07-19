class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.body = {
      status: 'failure',
      statusCode: this.statusCode,
      message: message || 'Entity not found',
    };
  }
}

module.exports = NotFoundException;
