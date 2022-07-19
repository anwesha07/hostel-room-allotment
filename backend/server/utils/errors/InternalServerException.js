class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.body = {
      status: 'failure',
      statusCode: this.statusCode,
      message: message || 'Internal Server Error',
    };
  }
}

module.exports = NotFoundException;
