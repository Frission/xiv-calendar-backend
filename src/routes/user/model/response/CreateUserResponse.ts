import { DiscordAccessTokenDto } from "../dto/DiscordAccessTokenDto";
import { GetUserResponse } from "./GetUserResponse";

export interface CreateUserResponse extends GetUserResponse {
    authorization: DiscordAccessTokenDto
}