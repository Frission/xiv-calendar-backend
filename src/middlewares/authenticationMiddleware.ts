import type { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthService } from "../routes/auth/auth.service";
import { AuthError } from "../routes/auth/auth.error";

export const authenticationMiddleware: RequestHandler = async (request: Request, _: Response, next: NextFunction) => {

    const accessToken = request.headers.authorization

    if (accessToken == null)
        throw new AuthError("Access token was not found in headers", 400)

    const discordUser = await AuthService.getDiscordUser(accessToken)

    if (discordUser == null || discordUser.id == null)
        throw new AuthError("Failed to fetch Discord authentication", 500)

    // if the access token has expired, this will throw a 403 error
    Object.defineProperty(request, "discordUser", discordUser)

    next()
}
