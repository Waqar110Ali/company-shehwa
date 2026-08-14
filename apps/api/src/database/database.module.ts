import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { DatabaseService } from "./database.service";

@Global()
@Module({
  imports: [
    ConfigModule,

    MongooseModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("database.uri"),

        retryAttempts: 5,

        retryDelay: 3000,

        autoIndex: true,

        connectionFactory: (connection) => {
          console.log("==================================");
          console.log("✅ MongoDB Connected");
          console.log("Database:", connection.name);
          console.log("==================================");

          return connection;
        },
      }),
    }),
  ],

  providers: [DatabaseService],

  exports: [MongooseModule],
})
export class DatabaseModule {}