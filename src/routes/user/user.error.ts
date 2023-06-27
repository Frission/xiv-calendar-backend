import { BaseError } from "../../errors/BaseError";

export class CreateUserError extends BaseError {
    public constructor(message = "Failed to create user.", originalErr: unknown) {
        super(
            "Create User Error",
            message,
            500,
            originalErr
        )
    }
}

export class CreateUserBadRequestError extends BaseError {
    public constructor(message = "Failed to create user.", originalErr?: unknown) {
        super(
            "Create User Error",
            message,
            400,
            originalErr
        )
    }
}

export class UserNotFoundError extends BaseError {
    public constructor(message = "Failed to find any user with the given ID.") {
        super(
            "Get User Error",
            message,
            404
        )
    }
}

export class GetUserBadRequestError extends BaseError {
    public constructor(message = "Failed to get user.", originalErr?: unknown) {
        super(
            "Get User Error",
            message,
            400,
            originalErr
        )
    }
}
