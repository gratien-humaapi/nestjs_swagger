import { ApiProperty } from "@nestjs/swagger";

export default class OkResponse {
    @ApiProperty({type: String})
    message = "Operation done";
}