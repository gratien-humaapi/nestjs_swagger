import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

class Detail {
  @ApiProperty()
  property: string;
  @ApiProperty()
  constraints: string[];
}

export default class ValidationRequestException extends BadRequestException {
  @ApiProperty({ type: [Detail] })
  details: Detail[];

  @ApiProperty()
  message: string;

  @ApiProperty()
  errorCode?: string;

  constructor(message: string, details: Detail[], errorCode?: string) {
    // Appeler le constructeur parent avec un message personnalisé
    super({
      statusCode: 400,
      message: message || "Bad Request",
      errorCode: errorCode || "CUSTOM_BAD_REQUEST",
      details
    });
    this.details = details;
  }
}
