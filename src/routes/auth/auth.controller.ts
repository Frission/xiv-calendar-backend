import type { Request, Response as ExpressResponse } from "express";
import { LoginDto } from "./model/dto/LoginDto";
import { AuthBadRequestError } from "./auth.error";
import { AuthService } from "./auth.service";
import { GetAccessTokenResponse } from "./model/response/GetAccessTokenResponse";

export namespace AuthController {

    export const login = async (request: Request<never, never, LoginDto>, response: ExpressResponse<GetAccessTokenResponse>) => {
        const loginDto: LoginDto = request.body

        if (loginDto.code == null)
            throw new AuthBadRequestError("Discord Oauth2 code was not found in request body")

        const authorization = await AuthService.login(loginDto.code)

        response.send({
            access_token: authorization.access_token,
            refresh_token: authorization.refresh_token
        })
    }

    export const getAccessToken = async (request: Request<never, never, LoginDto>, response: ExpressResponse<GetAccessTokenResponse>) => {
        const loginDto: LoginDto = request.body

        if (loginDto.code == null)
            throw new AuthBadRequestError("Discord Oauth2 code was not found in request body")

        const token = await AuthService.getAccessToken(loginDto.code)

        response.send({
            access_token: token.access_token,
            refresh_token: token.refresh_token
        })
    }

}
