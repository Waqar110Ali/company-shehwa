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
import {
  PaymentSettings,
  PaymentSettingsSchema,
} from "./schemas/payment-settings.schema";

import { CoursesRepository } from "./repositories/courses.repository";
import { EnrollmentsRepository } from "./repositories/enrollments.repository";
import { WalletsRepository } from "./repositories/wallets.repository";
import { CoinTransactionsRepository } from "./repositories/coin-transactions.repository";
import { PaymentRequestsRepository } from "./repositories/payment-requests.repository";
import { VideoAccessRepository } from "./repositories/video-access.repository";
import { PaymentSettingsRepository } from "./repositories/payment-settings.repository";

import { CoursesService } from "./services/courses.service";
import { WalletService } from "./services/wallet.service";
import { TutorialsAuthService } from "./services/tutorials-auth.service";
import { EnrollmentService } from "./services/enrollment.service";
import { AdminReviewService } from "./services/admin-review.service";
import { PaymentSettingsService } from "./services/payment-settings.service";

import { TutorialsController } from "./controllers/tutorials.controller";
import { TutorialsAdminController } from "./controllers/tutorials-admin.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: CoinTransaction.name, schema: CoinTransactionSchema },
      { name: PaymentRequest.name, schema: PaymentRequestSchema },
      { name: VideoAccess.name, schema: VideoAccessSchema },
      { name: PaymentSettings.name, schema: PaymentSettingsSchema },
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
    PaymentSettingsRepository,

    CoursesService,
    WalletService,
    TutorialsAuthService,
    EnrollmentService,
    AdminReviewService,
    PaymentSettingsService,
  ],
})
export class TutorialsModule {}