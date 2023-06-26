import type { Request, Response } from "express";
import { GetUserResponse } from "./model/response/GetUserResponse";
import { CreateUserDto } from "./model/dto/CreateUserDto";
import { UserService } from "./user.service";

export namespace UserController {

    export const createUser = async (request: Request<never, never, CreateUserDto>, response: Response<GetUserResponse>) => {
        const userDto: CreateUserDto = request.body

        const createUserResult = await UserService.createUser(userDto)

        response.send(createUserResult)
    }

    export const getUser = (request: Request<{ id: string }>, response: Response<GetUserResponse>) => {
        
    }

    export const getAllUsers = (request: Request, response: Response<Array<GetUserResponse>>) => {

    }

}
