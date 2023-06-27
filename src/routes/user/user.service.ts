import { DISCORD_API_URL } from "../../core/constants";
import { AuthService } from "../auth/auth.service";
import { DiscordUserDto } from "./model/dto/DiscordUserDto";
import { CreateUserResponse } from "./model/response/CreateUserResponse";
import { GetUserResponse } from "./model/response/GetUserResponse";
import { CreateUserError } from "./user.error";
import { UserRepository } from "./user.repository";

export namespace UserService {

    export const createUser = async (discordCode: string): Promise<CreateUserResponse> => {

        const authorization = await AuthService.getAccessToken(discordCode)

        let response: Response

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
        const user = await UserRepository.createUser(discordUser)

        return Promise.resolve({
            authorization: authorization,
            ...user
        })
    }

    export const getUser = async (id: string): Promise<GetUserResponse | null> => {
        return await UserRepository.getUser(id)
    }
}
