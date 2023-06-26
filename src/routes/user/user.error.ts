import { BaseError } from "../../errors/BaseError";

export class CreateUserError extends BaseError {
    public constructor(message: string = "Failed to create user.", originalErr: unknown) {
        super(
            "Create User Error",
            message,
            500,
            originalErr
        )
    }
}

export class CreateUserBadRequestError extends BaseError {
    public constructor(message: string = "Failed to create user.", originalErr?: unknown) {
        super(
            "Create User Error",
            message,
            400,
            originalErr
        )
    }
}