import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configs from "./config";
import { envValidationSchema } from "./config/env.validation";

import { DatabaseModule } from "./database";

import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { EmployeesModule } from "./employees/employees.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ProjectsModule } from "./projects/projects.module";
import { TaskModule } from "./tasks/tasks.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { AttendanceModule } from "./attendance/attendance.module";
import { CalendarModule } from "./calender/calender.module";
import { ChatModule } from "./chat/chat.module";
import { MailModule } from "./mail/mail.module";
import { FilesModule } from "./files/files.module";
import { ReportsModule } from "./reports/reports.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { SettingsModule } from "./settings/settings.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { UpdatesModule } from "./updates/updates.module";
import { FooterModule } from "./footer/footer.module";
// import { AssistantPublicModule } from "./assistant-public/assistant-public.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      cache: true,

      load: configs,

      validationSchema: envValidationSchema,
    }),

    DatabaseModule,

    UsersModule,

    AuthModule,

    EmployeesModule,

    DashboardModule,

    ProjectsModule,

    TaskModule,

    AttendanceModule,

    CalendarModule,

    ChatModule,
    
    MailModule,

    FilesModule,

    ReportsModule,

    PortfolioModule,

    SettingsModule,

    NotificationsModule,

    UpdatesModule,

     FooterModule,

    // AssistantPublicModule,
  ],
})
export class AppModule
  implements NestModule
{
  configure(
    consumer: MiddlewareConsumer,
  ) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*");
  }
}