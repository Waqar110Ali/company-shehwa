import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  connected() {
    this.logger.log("✅ MongoDB Connected Successfully");
  }

  disconnected() {
    this.logger.warn("❌ MongoDB Disconnected");
  }

  error(error: unknown) {
    this.logger.error("MongoDB Connection Error", error);
  }
}