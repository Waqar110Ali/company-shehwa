import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  CoinTransaction,
  CoinTransactionDocument,
} from "../schemas/coin-transaction.schema";

@Injectable()
export class CoinTransactionsRepository {
  constructor(
    @InjectModel(CoinTransaction.name)
    private readonly coinTransactionModel: Model<CoinTransactionDocument>,
  ) {}

  async create(data: Partial<CoinTransaction>) {
    return this.coinTransactionModel.create(data);
  }

  async findForUser(userId: string, limit = 50) {
    return this.coinTransactionModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}