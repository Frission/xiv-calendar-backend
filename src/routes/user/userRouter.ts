import { Router } from "express";
import { CreateUserDto } from "../../model/dto/user/CreateUserDto";
import { GetUserResponse } from "../../model/response/user/GetUserResponse";

const router = Router()

router.get<"/", { id: string }, never, Array<GetUserResponse>>("/", (req, res) => {

})

router.get<"/:id", { id: string }, never, GetUserResponse>("/:id", (req, res) => {

})

router.post<"/", never, GetUserResponse, CreateUserDto>("/", (req, res) => {
    
})

export default router