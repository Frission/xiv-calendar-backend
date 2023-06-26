import { Router } from "express";
import type { GetUserResponse } from "../../data/model/response/user/GetUserResponse";
import type { CreateUserDto } from "../../data/model/dto/user/CreateUserDto";

const router = Router()

router.get<"/", { id: string }, never, Array<GetUserResponse>>("/", (req, res) => {

})

router.get<"/:id", { id: string }, never, GetUserResponse>("/:id", (req, res) => {

})

router.post<"/", never, GetUserResponse, CreateUserDto>("/", (req, res) => {
    
})

export default router