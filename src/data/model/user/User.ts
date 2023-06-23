import { Schema, model } from "mongoose"
import { DISCORD_CDN_URL } from "../../../core/constants"

export interface IUser {
    /** Discord Snowflake ID as string: https://discord.com/developers/docs/reference#snowflakes */
    _id: string,
    /** the user's username, not unique across the platform */
    discord_username: string,
    /** the user's display name, if it is set. For bots, this is the application name */
    discord_global_name?: string,
    avatar?: string,
    banner?: string,
    accent_color?: string,
    locale?: string,
    /** For showing times in the UI */
    timezone: string

    getAvatarUrl: () => string | undefined
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    discord_username: { type: String, required: true },
    discord_global_name: String,
    avatar: String,
    banner: String,
    accent_color: Number,
    locale: String,
    timezone: { type: String, required: true, default: "Etc/GMT+0" }
},
    {
        methods: {
            getAvatarUrl() {
                if (this.avatar == null)
                    return undefined

                return `${DISCORD_CDN_URL}avatars/${this._id}/${this.avatar}`
            },

            getAccentColor() {
                if (this.accent_color == null)
                    return undefined

                return `#${Number(this.accent_color).toString(16)}`
            },

            getName() {
                return this.discord_global_name ?? this.discord_username
            }
        }
    })

const User = model<IUser>("User", userSchema)

export default User