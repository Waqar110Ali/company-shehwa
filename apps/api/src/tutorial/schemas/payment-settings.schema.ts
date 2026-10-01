import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";

export type PaymentSettingsDocument =
  HydratedDocument<PaymentSettings>;

// Singleton document (there is always exactly one) holding the QR
// code / bank details students see on the payment and top-up
// pages before they upload their proof. Edited from the Tutorial
// Management admin screen, same as any other editable section.
@Schema({ timestamps: true })
export class PaymentSettings {
  @Prop({ type: String, default: "" })
  qrCodeUrl!: string;

  @Prop({ type: String, default: "" })
  accountTitle!: string;

  @Prop({ type: String, default: "" })
  accountNumber!: string;

  @Prop({ type: String, default: "" })
  bankName!: string;

  // Free-form extra guidance shown under the QR code, e.g.
  // "Send the exact course price via JazzCash/Easypaisa, then
  // upload your screenshot below."
  @Prop({ type: String, default: "" })
  instructions!: string;
}

export const PaymentSettingsSchema =
  SchemaFactory.createForClass(PaymentSettings);
