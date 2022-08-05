class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.body = {
      status: 'failure',
      message: message || 'Unauthorized access',
    };
  }
}

module.exports = UnauthorizedException;
