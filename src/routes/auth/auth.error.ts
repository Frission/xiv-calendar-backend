import { BaseError } from "../../errors/BaseError";

export class AuthError extends BaseError {
    public constructor(message = "Failed to authenticate.", originalErr: unknown) {
        super(
            "Auth Error",
            message,
            500,
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