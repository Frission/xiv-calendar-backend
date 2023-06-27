import { BaseError } from "../../errors/BaseError";

export class UserNotFoundError extends BaseError {
    public constructor(message = "Failed to find any user with the given ID.") {
        super(
            "Get User Error",
            message,
            404
        )
    }
}
