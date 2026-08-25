import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
  FilterQuery,
  Model,
  Types,
} from "mongoose";

import {
  Conversation,
  ConversationDocument,
} from "../schema/conversation.schema";

import {
  Message,
  MessageDocument,
} from "../schema/message.schema";

import { ConversationFilterDto } from "../dto/conversation-filter.dto";
import { MessageFilterDto } from "../dto/message-filter.dto";

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Conversation.name) @Inject(Model<ConversationDocument>)
    private readonly conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) @Inject(Model<MessageDocument>)
    private readonly messageModel: Model<MessageDocument>,
  ) { }

  // =====================================================
  // Conversation
  // =====================================================

  async createConversation(
    participants: string[],
  ) {
    return this.conversationModel.create({
      participants: participants.map(
        (id) => new Types.ObjectId(id),
      ),
    });
  }

  async findConversationById(
    id: string,
  ) {
    return this.conversationModel
      .findById(id)
      .populate({
        path: "participants",
        populate: {
          path: "user",
          select: "_id email firstName lastName avatar role",
        },
      })
  }

  async findConversationBetweenUsers(
    firstEmployeeId: string,
    secondEmployeeId: string,
  ) {
    return this.conversationModel
      .findOne({
        participants: {
          $all: [
            new Types.ObjectId(firstEmployeeId),
            new Types.ObjectId(secondEmployeeId),
          ],
          $size: 2,
        },
      })
      .populate({
        path: "participants",
        populate: {
          path: "user",
          select: "_id email firstName lastName avatar role",
        },
      })
  }

  async findUserConversations(
    employeeId: string,
    filter: ConversationFilterDto,
  ) {
    const page =
      filter.page ?? 1;

    const limit =
      filter.limit ?? 20;

    const skip =
      (page - 1) * limit;

    const query: FilterQuery<Conversation> = {
      participants: new Types.ObjectId(employeeId),
    };

    if (filter.search?.trim()) {
      query.$or = [
        {
          lastMessage: {
            $regex: filter.search,
            $options: "i",
          },
        },
      ];
    }

    const [
      items,
      total,
    ] = await Promise.all([
      this.conversationModel
        .find(query)
        .populate({
          path: "participants",
          populate: {
            path: "user",
            select: "_id email firstName lastName avatar role",
          },
        })
        .sort({
          lastMessageAt: -1,
          updatedAt: -1,
        })
        .skip(skip)
        .limit(limit),

      this.conversationModel.countDocuments(
        query,
      ),
    ]);

    return {
      items,

      pagination: {
        page,

        limit,

        total,

        totalPages:
          Math.ceil(total / limit),
      },
    };
  }

  async updateConversationLastMessage(
    conversationId: string,
    content: string,
  ) {
    return this.conversationModel.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: content,

        lastMessageAt: new Date(),
      },
      {
        new: true,
      },
    );
  }
  // =====================================================
  // Messages
  // =====================================================

  async createMessage(
    data: Partial<Message>,
  ) {
    return this.messageModel.create(
      data,
    );
  }

  async findMessages(
    conversationId: string,
    filter: MessageFilterDto,
  ) {
    console.log("========== FIND MESSAGES ==========");
    console.log("conversationId:", conversationId);

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 50;
    const skip = (page - 1) * limit;

    const query = {
      conversation: new Types.ObjectId(
        conversationId,
      ),
    };

    console.log("Mongo Query:", query);

    const items = await this.messageModel
      .find(query)
      .populate({
        path: "sender",
        select: [
          "firstName",
          "lastName",
          "fullName",
          "avatar",
          "designation",
          "department",
          "status",
          "user",
        ].join(" "),
        populate: {
          path: "user",
          select: "_id",
        },
      })
      .populate("replyTo")
      .sort({
        createdAt: 1,
      })
      .skip(skip)
      .limit(limit);

    console.log("Found Messages:", items.length);
    console.log(items);

    const total =
      await this.messageModel.countDocuments(
        query,
      );

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async findMessageById(
    id: string,
  ) {
    return this.messageModel
      .findById(id)
      .populate({
        path: "sender",
        select: [
          "firstName",
          "lastName",
          "fullName",
          "avatar",
          "designation",
          "department",
          "status",
          "user",
        ].join(" "),
        populate: {
          path: "user",
          select: "_id",
        },
      })
      .populate("replyTo");
  }

  async updateMessage(
    id: string,
    content: string,
  ) {
    return this.messageModel
      .findByIdAndUpdate(
        id,
        {
          content,

          edited: true,

          editedAt:
            new Date(),
        },
        {
          new: true,
        },
      )
      .populate({
        path: "sender",
        select: [
          "firstName",
          "lastName",
          "fullName",
          "avatar",
          "designation",
          "department",
          "status",
          "user",
        ].join(" "),
        populate: {
          path: "user",
          select: "_id",
        },
      })
      .populate("replyTo");
  }

  async deleteMessage(
    id: string,
  ) {
    return this.messageModel
      .findByIdAndUpdate(
        id,
        {
          deleted: true,

          deletedAt:
            new Date(),

          content:
            "This message was deleted.",
        },
        {
          new: true,
        },
      )
      .populate({
        path: "sender",
        select: [
          "firstName",
          "lastName",
          "fullName",
          "avatar",
          "designation",
          "department",
          "status",
          "user",
        ].join(" "),
        populate: {
          path: "user",
          select: "_id",
        },
      })
      .populate("replyTo");
  }
  async markConversationAsRead(
    conversationId: string,
    employeeId: string,
  ) {
    return this.messageModel.updateMany(
      {
        conversation: new Types.ObjectId(
          conversationId,
        ),

        sender: {
          $ne: new Types.ObjectId(
            employeeId,
          ),
        },

        read: false,
      },
      {
        read: true,

        readAt: new Date(),
      },
    );
  }

  async getUnreadCount(
    employeeId: string,
  ) {
    return this.messageModel.countDocuments(
      {
        sender: {
          $ne: new Types.ObjectId(
            employeeId,
          ),
        },

        read: false,
      },
    );
  }
}