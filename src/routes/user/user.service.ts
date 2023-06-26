import { DISCORD_API_URL } from "../../core/constants";
import { CreateUserDto } from "./model/dto/CreateUserDto";
import { DiscordAccessTokenDto } from "./model/dto/DiscordAccessTokenDto";
import { DiscordAccessTokenRequest } from "./model/request/DiscordAccessTokenRequest";
import { CreateUserResponse } from "./model/response/CreateUserResponse";
import { CreateUserCodeNotFoundError } from "./user.error";

export namespace UserService {

    export const createUser = async (userDto: CreateUserDto): Promise<CreateUserResponse> => {

        const code = userDto.code

        if (code == null)
            throw new CreateUserCodeNotFoundError()

        const response = await fetch(DISCORD_API_URL + "/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.DISCORD_REDIRECT_URI
            } satisfies DiscordAccessTokenRequest)
        })

        const token: DiscordAccessTokenDto = await response.json()

        // TODO: create a user in the database via Repository

        return Promise.resolve({
            authorization: token
        })
    }

}
