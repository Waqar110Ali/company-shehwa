import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  NewsletterSubscriberDoc,
  NewsletterSubscriberDocument,
} from "../schemas/newsletter-subscriber.schema";

@Injectable()
export class NewsletterRepository {
  constructor(
    @InjectModel(NewsletterSubscriberDoc.name)
    private readonly model: Model<NewsletterSubscriberDocument>,
  ) {}

  findByEmail(
    email: string,
  ): Promise<NewsletterSubscriberDocument | null> {
    return this.model
      .findOne({ email: email.toLowerCase().trim() })
      .exec();
  }

  create(
    email: string,
  ): Promise<NewsletterSubscriberDocument> {
    return this.model.create({
      email: email.toLowerCase().trim(),
      active: true,
    });
  }
}
