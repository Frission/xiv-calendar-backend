import type { Request, Response } from "express";
import { GetUserResponse } from "./model/response/GetUserResponse";
import { CreateUserDto } from "./model/dto/CreateUserDto";
import { UserService } from "./user.service";
import { CreateUserBadRequestError, GetUserBadRequestError, UserNotFoundError } from "./user.error";

export namespace UserController {

    export const createUser = async (request: Request<never, never, CreateUserDto>, response: Response<GetUserResponse>) => {
        const userDto: CreateUserDto = request.body

        if (userDto.code == null)
            throw new CreateUserBadRequestError("Discord Oauth2 code was not found in request body")

        const createUserResult = await UserService.createUser(userDto.code)

        response.send(createUserResult)
    }

    export const getUser = async (request: Request<{ id: string }>, response: Response<GetUserResponse>) => {
        const userId = request.params.id

        if (userId == null)
            throw new GetUserBadRequestError("ID was not found in the query.")

        const user = await UserService.getUser(userId)

        if (user == null)
            throw new UserNotFoundError()

        response.send(user)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    export const getAllUsers = (request: Request, response: Response<Array<GetUserResponse>>) => {
        throw new Error("Not Implemented")
    }

}
