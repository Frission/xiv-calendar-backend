import { DiscordAccessTokenDto } from "../../../auth/model/dto/DiscordAccessTokenDto";
import { GetUserResponse } from "./GetUserResponse";

export interface CreateUserResponse extends GetUserResponse {
    authorization: DiscordAccessTokenDto
}
