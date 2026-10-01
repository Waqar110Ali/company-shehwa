import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  PaymentSettings,
  PaymentSettingsDocument,
} from "../schemas/payment-settings.schema";

@Injectable()
export class PaymentSettingsRepository {
  constructor(
    @InjectModel(PaymentSettings.name)
    private readonly paymentSettingsModel: Model<PaymentSettingsDocument>,
  ) {}

  // There is only ever one settings document. upsert guarantees we
  // never end up with two, no matter how many admins save at once.
  async getOrCreate() {
    return this.paymentSettingsModel
      .findOneAndUpdate(
        {},
        { $setOnInsert: {} },
        { upsert: true, new: true },
      )
      .exec();
  }

  async update(data: Partial<PaymentSettings>) {
    return this.paymentSettingsModel
      .findOneAndUpdate({}, { $set: data }, { upsert: true, new: true })
      .exec();
  }
}
