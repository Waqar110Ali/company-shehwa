import { Module } from "@nestjs/common";

import { CalcomController } from "./calcom.controller";
import { CalcomService } from "./calcom.service";

@Module({
  controllers: [CalcomController],
  providers: [CalcomService],
  exports: [CalcomService],
})
export class CalcomModule {}
