import { BaseError } from "../../errors/BaseError";

export class CreateUserCodeNotFoundError extends BaseError {
    public constructor() {
        super(
            "Create User Error",
            "Discord Oauth2 code was not found in request body",
            400,
            "handled"
        )
    }
}

export class CreateUserError extends BaseError {
    public constructor() {
        super(
            "Create User Error",
            "Failed to create user.",
            500,
            "handled"
        )
    }
}