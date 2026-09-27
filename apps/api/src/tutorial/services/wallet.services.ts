import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";

import { WalletsRepository } from "../repositories/wallet.repository";
import { CoinTransactionsRepository } from "../repositories/coin-transaction.repository";
import { CoinTransactionType } from "../schemas/coin-transaction.schema";

@Injectable()
export class WalletService {
  constructor(
    private readonly walletsRepository: WalletsRepository,
    private readonly coinTransactionsRepository: CoinTransactionsRepository,
  ) {}

  async getWallet(userId: string) {
    const wallet = await this.walletsRepository.findOrCreate(userId);

    const transactions =
      await this.coinTransactionsRepository.findForUser(userId);

    return {
      success: true,
      data: {
        balance: wallet.balance,
        transactions,
      },
    };
  }

  // Adds coins — used for enrollment bonuses and approved top-ups.
  async credit(
    userId: string,
    amount: number,
    reason: string,
    meta: Record<string, any> = {},
  ) {
    if (amount <= 0) return;

    await this.walletsRepository.incrementBalance(userId, amount);

    await this.coinTransactionsRepository.create({
      user: userId as any,
      type: CoinTransactionType.CREDIT,
      amount,
      reason,
      meta,
    });
  }

  // Spends coins — used when a student unlocks a video. Throws if
  // the wallet doesn't have enough balance; the debit and the
  // balance check happen as one atomic database operation so two
  // simultaneous unlocks can't both succeed on the same coins.
  async debit(
    userId: string,
    amount: number,
    reason: string,
    meta: Record<string, any> = {},
  ) {
    if (amount <= 0) return;

    const wallet = await this.walletsRepository.debitIfSufficient(
      userId,
      amount,
    );

    if (!wallet) {
      throw new BadRequestException(
        "Not enough coins. Top up your wallet to continue.",
      );
    }

    await this.coinTransactionsRepository.create({
      user: userId as any,
      type: CoinTransactionType.DEBIT,
      amount,
      reason,
      meta,
    });
  }
}