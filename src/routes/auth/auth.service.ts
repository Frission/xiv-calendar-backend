import { DISCORD_API_URL } from "../../core/constants"
import { DiscordAccessTokenDto } from "./model/dto/DiscordAccessTokenDto"
import { DiscordAccessTokenRequest } from "../user/model/request/DiscordAccessTokenRequest"
import { AuthError } from "./auth.error"
import { UserService } from "../user/user.service"
import { DiscordUserDto } from "../user/model/dto/DiscordUserDto"

export namespace AuthService {

    export const login = async (discordCode: string): Promise<DiscordAccessTokenDto> => {
        const authorization = await AuthService.getAccessToken(discordCode)

        const discordUser = await getDiscordUser(authorization.access_token)

        // check if user exists
        const user = await UserService.getUser(discordUser.id)

        // if there is no created user yet, save them to the db
        if (user == null)
            await UserService.createUser(discordUser)

        return authorization
    }

    export const getDiscordUser = async (accessToken: string): Promise<DiscordUserDto> => {
        let response: Response

        try {
            response = await fetch(DISCORD_API_URL + "/users/@me", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        } catch (err) {
            throw new AuthError("Failed to get Discord user.", 500, err)
        }

        if (!response.ok) {
            if (response.status == 403)
                throw new AuthError("Your access token has expired.", 403)
            else
                throw new AuthError("Discord response was not ok", response.status)
        }

        let discordUser: DiscordUserDto

        try {
            discordUser = await response.json()
        } catch (err) {
            throw new AuthError("Failed to parse Discord user info response.", 500, err)
        }

        return discordUser
    }

    export const getAccessToken = async (discordCode: string): Promise<DiscordAccessTokenDto> => {
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
            throw new AuthError("Failed to get access token from Discord.", 500, err)
        }

        if (!response.ok) {
            throw new AuthError("Discord response was not ok.", response.status)
        }

        let authorization: DiscordAccessTokenDto

        try {
            authorization = await response.json()
        } catch (err) {
            throw new AuthError("Failed to parse Discord access token response.", 500, err)
        }

        return Promise.resolve(authorization)
    }
}
