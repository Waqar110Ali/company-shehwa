import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument, Types } from "mongoose";

export enum CoinTransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export type CoinTransactionDocument =
  HydratedDocument<CoinTransaction>;

// Append-only ledger. Every wallet credit/debit writes one of
// these, so a student's coin history (and an admin's audit trail)
// can always be reconstructed even though `Wallet.balance` is a
// running total.
@Schema({ timestamps: true })
export class CoinTransaction {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user!: Types.ObjectId;

  @Prop({
    type: String,
    enum: CoinTransactionType,
    required: true,
  })
  type!: CoinTransactionType;

  @Prop({ type: Number, required: true, min: 1 })
  amount!: number;

  @Prop({ type: String, default: "" })
  reason!: string;

  // Free-form context: { course, videoId, paymentRequest } — kept
  // loose since the reason a wallet moves varies by transaction.
  @Prop({ type: Object, default: {} })
  meta!: Record<string, any>;
}

export const CoinTransactionSchema =
  SchemaFactory.createForClass(CoinTransaction);
