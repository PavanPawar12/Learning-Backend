class ApiError extends Error {
     constructor(
        statusCode,
        message = "Something went wrong", // default value
        errors = [],
        stack = ""
    ) {
        super(message); // Call parent class (Error) constructor
        this.statusCode = statusCode;
        this.data = null;
        this.message = message
        this.success = false
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
 
export {ApiError}