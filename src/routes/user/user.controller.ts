import type { Response } from "express";
import { GetUserResponse } from "./model/response/GetUserResponse";
import { UserService } from "./user.service";
import { UserNotFoundError } from "./user.error";

export namespace UserController {

    export const getUser = async (request: AuthenticatedRequest, response: Response<GetUserResponse>) => {
        const userId = request.discordUser!.id

        const user = await UserService.getUser(userId)

        if (user == null)
            throw new UserNotFoundError()

        response.send(user)
    }
}
