
export interface DiscordUserDto {
    /** id of type Snowflake */
    id: string,
    /**	the user's username, not unique across the platform */
    username: string,
    /**	the user's Discord-tag */
    discriminator?: string,
    /**	the user's display name, if it is set. For bots, this is the application name */
    global_name?: string,
    /** the user's avatar hash */
    avatar?: string,
    /**	whether the user belongs to an OAuth2 application */
    bot?: boolean,
    /** whether the user is an Official Discord System user (part of the urgent message system) */
    system?: boolean,
    /**	whether the user has two factor enabled on their account */
    mfa_enabled?: boolean
    /**	the user's banner hash */
    banner?: string,
    /**	the user's banner color encoded as an integer representation of hexadecimal color code */
    accent_color?: number,
    /**	the user's chosen language option */
    locale?: string,
    /**	whether the email on this account has been verified */
    verified?: boolean,
    /**the user's email, we currently do not request this, so it will always be null */
    email?: never,
}