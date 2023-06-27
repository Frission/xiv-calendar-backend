import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.get("/", UserController.createUser)

router.get("/:id", UserController.getUser)

router.post("/", UserController.getAllUsers)

export default router
