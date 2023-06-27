import { IUser } from "./model/domain/User";
import { DiscordUserDto } from "./model/dto/DiscordUserDto";
import { GetUserResponse } from "./model/response/GetUserResponse";
import { UserRepository } from "./user.repository";

export namespace UserService {

    export const createUser = async (discordUser: DiscordUserDto): Promise<IUser> => {
        // Create our own user in mongoGB for use later
        const user = await UserRepository.createUser(discordUser)

        return Promise.resolve(user)
    }

    export const getUser = async (id: string): Promise<GetUserResponse | null> => {
        return await UserRepository.getUser(id)
    }
}
