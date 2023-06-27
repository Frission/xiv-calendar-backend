import { DISCORD_API_URL } from "../../core/constants"
import { DiscordAccessTokenDto } from "./model/dto/DiscordAccessTokenDto"
import { DiscordAccessTokenRequest } from "../user/model/request/DiscordAccessTokenRequest"
import { AuthError } from "./auth.error"

export namespace AuthService {

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
            throw new AuthError("Failed to get access token from Discord.", err)
        }

        let authorization: DiscordAccessTokenDto

        try {
            authorization = await response.json()
        } catch (err) {
            throw new AuthError("Failed to parse Discord access token response.", err)
        }

        return Promise.resolve(authorization)
    }
}
