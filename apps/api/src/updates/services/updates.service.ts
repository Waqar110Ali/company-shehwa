// apps/api/src/updates/services/updates.service.ts
import {
  Injectable, Inject } from "@nestjs/common";

import {
  UpdatesRepository,
} from "../repositories/updates.repository";

@Injectable()
export class UpdatesService {

  constructor(
    @Inject(UpdatesRepository) private readonly updatesRepository:
      UpdatesRepository,
  ) {}

  async getUpdates() {

    const updates =
      await this.updatesRepository.get();

    return {
      success: true,
      data:
        updates?.content ?? {
          ceoMessage: null,
          galleries: [],
        },
    };
  }

  async updateCeoMessage(
    ceoMessage: Record<string, any> | null,
  ) {

    const updates =
      await this.updatesRepository.updateSection(
        "ceoMessage",
        ceoMessage,
      );

    return {
      success: true,
      message: "Message saved successfully.",
      data: updates?.content,
    };
  }

  async updateGalleries(
    galleries: Record<string, any>[],
  ) {

    const updates =
      await this.updatesRepository.updateSection(
        "galleries",
        galleries,
      );

    return {
      success: true,
      message: "Galleries saved successfully.",
      data: updates?.content,
    };
  }
}