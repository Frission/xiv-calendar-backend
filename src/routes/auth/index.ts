import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

router.post("/getAccessToken", AuthController.getAccessToken)

export default router