import {
  Module,
  forwardRef,
} from "@nestjs/common";

import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";

import { MailerModule } from "@nestjs-modules/mailer";

import { HandlebarsAdapter } from "@nestjs-modules/mailer/adapters/handlebars.adapter";

import { join } from "path";

import { MailService } from "./mail.service";

import { UsersModule } from "@/users/users.module";

@Module({
  imports: [
    ConfigModule,

    forwardRef(() => UsersModule),

    MailerModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (
        config: ConfigService,
      ) => ({
        transport: {
          host: config.get("MAIL_HOST"),

          port: Number(
            config.get("MAIL_PORT"),
          ),

          secure: false,

          auth: {
            user: config.get("MAIL_USER"),

            pass: config.get(
              "MAIL_PASSWORD",
            ),
          },
        },

        defaults: {
          from: config.get("MAIL_FROM"),
        },

        template: {
          // esbuild only bundles code, not non-JS assets like .hbs
          // files, so on Vercel the templates are copied by
          // scripts/build-api.mjs into api/src/mail/templates
          // alongside the bundled function. Locally, process.cwd()
          // is apps/api, so the original relative path still applies.
          dir: join(
            process.cwd(),
            process.env.VERCEL
              ? "api/src/mail/templates"
              : "src/mail/templates",
          ),

          adapter:
            new HandlebarsAdapter(),

          options: {
            strict: true,
          },
        },
      }),
    }),
  ],

  providers: [MailService],

  exports: [MailService],
})
export class MailModule {}