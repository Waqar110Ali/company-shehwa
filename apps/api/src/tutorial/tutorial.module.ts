import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { MailModule } from "@/mail/mail.module";
import { CloudinaryModule } from "@/common/cloudinary/cloudinary.module";

import { Course, CourseSchema } from "./schemas/course.schema";
import {
  Enrollment,
  EnrollmentSchema,
} from "./schemas/enrollment.schema";
import { Wallet, WalletSchema } from "./schemas/wallet.schema";
import {
  CoinTransaction,
  CoinTransactionSchema,
} from "./schemas/coin-transaction.schema";
import {
  PaymentRequest,
  PaymentRequestSchema,
} from "./schemas/payment-request.schema";
import {
  VideoAccess,
  VideoAccessSchema,
} from "./schemas/video-access.schema";

import { CoursesRepository } from "./repositories/courses.repository";
import { EnrollmentsRepository } from "./repositories/enrollment.repository";
import { WalletsRepository } from "./repositories/wallet.repository";
import { CoinTransactionsRepository } from "./repositories/coin-transaction.repository";
import { PaymentRequestsRepository } from "./repositories/payment-request.repository";
import { VideoAccessRepository } from "./repositories/video-access.repository";

import { CoursesService } from "./services/courses.services";
import { WalletService } from "./services/wallet.services";
import { TutorialsAuthService } from "./services/tutorial.auth.service";
import { EnrollmentService } from "./services/enrollment.service";
import { AdminReviewService } from "./services/adminreview.service";

import { TutorialsController } from "./controllers/tutorial.controller";
import { TutorialsAdminController } from "./controllers/tutorialadmin.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: CoinTransaction.name, schema: CoinTransactionSchema },
      { name: PaymentRequest.name, schema: PaymentRequestSchema },
      { name: VideoAccess.name, schema: VideoAccessSchema },
    ]),

    AuthModule,
    UsersModule,
    MailModule,
    CloudinaryModule,
  ],

  controllers: [
    TutorialsController,
    TutorialsAdminController,
  ],

  providers: [
    CoursesRepository,
    EnrollmentsRepository,
    WalletsRepository,
    CoinTransactionsRepository,
    PaymentRequestsRepository,
    VideoAccessRepository,

    CoursesService,
    WalletService,
    TutorialsAuthService,
    EnrollmentService,
    AdminReviewService,
  ],
})
export class TutorialsModule {}