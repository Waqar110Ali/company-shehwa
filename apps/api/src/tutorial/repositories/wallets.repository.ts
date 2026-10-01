import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Wallet, WalletDocument } from "../schemas/wallet.schema";

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
  ) {}

  async findOrCreate(userId: string) {
    return this.walletModel
      .findOneAndUpdate(
        { user: userId },
        { $setOnInsert: { user: userId, balance: 0 } },
        { upsert: true, new: true },
      )
      .exec();
  }

  // Plain credit — always safe to apply.
  async incrementBalance(userId: string, delta: number) {
    return this.walletModel
      .findOneAndUpdate(
        { user: userId },
        { $inc: { balance: delta } },
        { upsert: true, new: true },
      )
      .exec();
  }

  // Atomic "debit only if enough balance" — the `balance: { $gte }`
  // filter and the `$inc` happen in one database operation, so two
  // simultaneous spends can never both pass a stale balance check
  // and push the wallet negative.
  async debitIfSufficient(userId: string, amount: number) {
    return this.walletModel
      .findOneAndUpdate(
        { user: userId, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { new: true },
      )
      .exec();
  }
}
