import { PartialType } from "@nestjs/swagger";

import { AddVideoDto } from "./add-video.dto";

export class UpdateVideoDto extends PartialType(AddVideoDto) {}