import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TutorialController } from "./controllers/tutorial.controller";
import { TutorialRepository } from "./repositories/tutorial.repository";
import { TutorialService } from "./services/tutorial.service";
import {
  TutorialCourse,
  TutorialCourseSchema,
} from "./schemas/tutorial-course.schema";
import {
  TutorialPaymentRequest,
  TutorialPaymentRequestSchema,
} from "./schemas/tutorial-payment-request.schema";
import {
  TutorialUser,
  TutorialUserSchema,
} from "./schemas/tutorial-user.schema";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      {
        name: TutorialUser.name,
        schema: TutorialUserSchema,
      },
      {
        name: TutorialCourse.name,
        schema: TutorialCourseSchema,
      },
      {
        name: TutorialPaymentRequest.name,
        schema: TutorialPaymentRequestSchema,
      },
    ]),
  ],
  controllers: [TutorialController],
  providers: [TutorialRepository, TutorialService],
  exports: [TutorialService, TutorialRepository],
})
export class TutorialModule {}
