import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticationMiddleware } from "../../middlewares/authenticationMiddleware";

const router = Router()

router.use(authenticationMiddleware)

router.get("/:id", UserController.getUser)

export default router
