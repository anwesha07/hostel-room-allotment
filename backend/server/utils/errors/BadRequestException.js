class BadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.body = {
      status: 'failure',
      statusCode: this.statusCode,
      message: message || 'Bad Request',
    };
  }
}

module.exports = BadRequestException;
