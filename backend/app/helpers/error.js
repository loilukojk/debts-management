class ErrorHandler extends Error {
    constructor(error, errorCode, statusCode, title, message) {
      super();
      console.error(error ? error.stack : '');
      if(error instanceof ErrorHandler) {
        this.stack = error.stack;
        this.code = error.code;
        this.title = error.title;
        this.statusCode = error.statusCode;
        this.message = error.message;
      } else if (error.name === 'ValidationError') {
        this.stack = error.stack;
        this.code = errorCode;
        this.title = title;
        this.statusCode = statusCode;
        this.message = error.message;
      } else {
        this.stack = error ? error.stack : '';
        this.code = errorCode;
        this.title = title;
        this.statusCode = statusCode;
        this.message = message;
      }
    }
}

const handleError = (err, res) => {
    const { statusCode, code, title, message } = err;
    res.status(statusCode).json({
      code,
      title,
      message
    });
};

module.exports = {
    ErrorHandler,
    handleError
}