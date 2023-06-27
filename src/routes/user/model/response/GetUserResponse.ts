
export interface GetUserResponse {
    _id: string,
    discord_username: string,
    discord_global_name: string | undefined,
    avatar: string | undefined,
    banner: string | undefined,
    accent_color: number | undefined,
    locale: string | undefined,
    timezone: string
}
