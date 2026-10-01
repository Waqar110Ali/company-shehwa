import { Injectable } from "@nestjs/common";

import { PaymentSettingsRepository } from "../repositories/payment-settings.repository";
import { PaymentSettings } from "../schemas/payment-settings.schema";

@Injectable()
export class PaymentSettingsService {
  constructor(
    private readonly paymentSettingsRepository: PaymentSettingsRepository,
  ) {}

  async get() {
    const settings = await this.paymentSettingsRepository.getOrCreate();

    return {
      success: true,
      data: settings,
    };
  }

  async update(data: Partial<PaymentSettings>) {
    const settings = await this.paymentSettingsRepository.update(data);

    return {
      success: true,
      message: "Payment settings updated.",
      data: settings,
    };
  }
}
