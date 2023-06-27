import User, { IUser } from "./model/domain/User";
import { DiscordUserDto } from "./model/dto/DiscordUserDto";
import { DEFAULT_TIMEZONE } from "../../core/constants";

export namespace UserRepository {

    export const createUser = async (discordUser: DiscordUserDto): Promise<IUser> => {
        const user = await User.create({
            _id: discordUser.id,
            discord_username: discordUser.username,
            discord_global_name: discordUser.global_name,
            avatar: discordUser.avatar,
            banner: discordUser.banner,
            accent_color: discordUser.accent_color,
            locale: discordUser.locale,
            timezone: DEFAULT_TIMEZONE
        } satisfies IUser);

        await user.save()

        return user.toObject()
    }

    export const getUser = async (id: string): Promise<IUser | null> => {
        return await User.findById(id)
    }
}
