import { DISCORD_API_URL } from "../../core/constants";
import { DiscordAccessTokenDto } from "./model/dto/DiscordAccessTokenDto";
import { DiscordUserDto } from "./model/dto/DiscordUserDto";
import { DiscordAccessTokenRequest } from "./model/request/DiscordAccessTokenRequest";
import { CreateUserResponse } from "./model/response/CreateUserResponse";
import { CreateUserError } from "./user.error";
import { UserRepository } from "./user.repository";

export namespace UserService {

    export const createUser = async (discordCode: string): Promise<CreateUserResponse> => {

        let response: Response

        try {
            response = await fetch(DISCORD_API_URL + "/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: JSON.stringify({
                    client_id: process.env.DISCORD_CLIENT_ID,
                    client_secret: process.env.DISCORD_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code: discordCode,
                    redirect_uri: process.env.DISCORD_REDIRECT_URI
                } satisfies DiscordAccessTokenRequest)
            })
        } catch (err) {
            throw new CreateUserError("Failed to get access token from Discord.", err)
        }

        let authorization: DiscordAccessTokenDto

        try {
            authorization = await response.json()
        } catch (err) {
            throw new CreateUserError("Failed to parse Discord access token response.", err)
        }

        try {
            response = await fetch(DISCORD_API_URL + "/users/@me", {
                method: "GET",
                headers: {
                    "Authorization": `${authorization.token_type} ${authorization.access_token}`
                }
            })
        } catch (err) {
            throw new CreateUserError("Failed to get Discord user.", err)
        }

        let discordUser: DiscordUserDto

        try {
            discordUser = await response.json()
        } catch (err) {
            throw new CreateUserError("Failed to parse Discord user info response.", err)
        }

        // Create our own user in mongoGB
        await UserRepository.createUser(discordUser)

        return Promise.resolve({
            authorization: authorization
        })
    }

}
