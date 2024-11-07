export abstract class CustomError extends Error {

    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    
    }
}

export class UserNotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    
    }
}