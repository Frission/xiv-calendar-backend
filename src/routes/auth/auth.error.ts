import { BaseError } from "../../errors/BaseError";

export class AuthError extends BaseError {
    public constructor(message = "Failed to authenticate.", status = 500, originalErr?: unknown) {
        super(
            "Auth Error",
            message,
            status,
            originalErr
        )
    }
}

export class AuthBadRequestError extends BaseError {
    public constructor(message = "Failed to authenticate.", originalErr?: unknown) {
        super(
            "Create User Error",
            message,
            400,
            originalErr
        )
    }
}
