/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request } from "express";
import type { DiscordUserDto } from "../routes/user/model/dto/DiscordUserDto";

declare global {
    interface AuthenticatedRequest<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > extends Request<
        P,
        ResBody,
        ReqBody,
        ReqQuery,
        Locals
    > {
        discordUser?: DiscordUserDto
    }
}
