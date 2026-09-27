import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument, Types } from "mongoose";

export type WalletDocument = HydratedDocument<Wallet>;

// One wallet per student. Balance changes only ever happen through
// WalletService.credit/debit, which also writes a CoinTransaction —
// never mutate `balance` directly from a controller or repository.
@Schema({ timestamps: true })
export class Wallet {
  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  })
  user!: Types.ObjectId;

  @Prop({ type: Number, required: true, default: 0, min: 0 })
  balance!: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);