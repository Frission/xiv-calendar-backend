import type { Request, Response } from "express";
import { GetAccessTokenDto } from "./model/dto/GetAccessTokenDto";
import { AuthBadRequestError } from "./auth.error";
import { AuthService } from "./auth.service";
import { GetAccessTokenResponse } from "./model/response/GetAccessTokenResponse";

export namespace AuthController {

    export const getAccessToken = async (request: Request<never, never, GetAccessTokenDto>, response: Response<GetAccessTokenResponse>) => {
        const tokenDto: GetAccessTokenDto = request.body

        if (tokenDto.code == null)
            throw new AuthBadRequestError("Discord Oauth2 code was not found in request body")

        const token = await AuthService.getAccessToken(tokenDto.code)

        response.send({
            access_token: token.access_token,
            refresh_token: token.refresh_token
        })
    }

}
