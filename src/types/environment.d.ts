
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_CONNECTION_STRING: string,
            PORT: string,
            DISCORD_CLIENT_ID: string,
            DISCORD_CLIENT_SECRET: string,
            DISCORD_REDIRECT_URI: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }