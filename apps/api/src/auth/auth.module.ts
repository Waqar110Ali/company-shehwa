import {
  Module,
  forwardRef,
} from "@nestjs/common";

import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";

import { JwtModule } from "@nestjs/jwt";

import { PassportModule } from "@nestjs/passport";

import type { StringValue } from "ms";

import { UsersModule } from "@/users/users.module";
import { MailModule } from "@/mail/mail.module";
import { EmployeesModule } from "@/employees/employees.module";

import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";

import { JwtStrategy } from "./strategies/jwt.strategy";

import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";

@Module({
  imports: [
    ConfigModule,

    forwardRef(() => UsersModule),

    forwardRef(() => MailModule),

    forwardRef(() => EmployeesModule),

    PassportModule.register({
      defaultStrategy: "jwt",
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (
        config: ConfigService,
      ) => ({
        secret: config.getOrThrow<string>(
          "JWT_SECRET",
        ),

        signOptions: {
          expiresIn:
            (
              config.get(
                "JWT_EXPIRES",
              ) ?? "15m"
            ) as StringValue,
        },
      }),
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,

    JwtStrategy,

    JwtAuthGuard,

    RolesGuard,
  ],

  exports: [
    AuthService,

    PassportModule,

    JwtModule,

    JwtAuthGuard,

    RolesGuard,
  ],
})
export class AuthModule {}