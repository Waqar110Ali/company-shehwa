import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

import { FileType } from "../enums/file-type.enum";

import { Employee } from "@/employees/schemas/employee.schema";

@Schema({
  timestamps: true,
})
export class File {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    type: String,
    default: "",
  })
  originalName!: string;

  @Prop({
    type: String,
    default: "",
  })
  extension!: string;

  @Prop({
    type: String,
    required: true,
    enum: FileType,
    default: FileType.OTHER,
  })
  type!: FileType;

  @Prop({
    type: String,
    default: "",
  })
  mimeType!: string;

  @Prop({
    type: Number,
    default: 0,
  })
  size!: number;

  @Prop({
    type: String,
    default: "",
  })
  url!: string;

  @Prop({
    type: String,
    default: "",
  })
  thumbnail!: string;

  @Prop({
    type: Types.ObjectId,
    ref: File.name,
    default: null,
  })
  parentFolder?: Types.ObjectId | null;

  @Prop({
    type: Types.ObjectId,
    ref: Employee.name,
    required: true,
  })
  owner!: Types.ObjectId;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Employee.name,
      },
    ],
    default: [],
  })
  sharedWith!: Types.ObjectId[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Employee.name,
      },
    ],
    default: [],
  })
  favoriteBy!: Types.ObjectId[];

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted!: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: Employee.name,
    required: true,
  })
  createdBy!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Employee.name,
    required: true,
  })
  updatedBy!: Types.ObjectId;

  /**
   * @Schema({ timestamps: true }) adds these to the document at
   * runtime, but TypeScript only knows about class fields that are
   * actually declared — without this, files.mapper.ts can't read
   * file.createdAt / file.updatedAt.
   */
  createdAt!: Date;
  updatedAt!: Date;
}

export type FileDocument =
  HydratedDocument<File>;

export const FileSchema =
  SchemaFactory.createForClass(File);

FileSchema.index({
  owner: 1,
});

FileSchema.index({
  parentFolder: 1,
});

FileSchema.index({
  sharedWith: 1,
});

FileSchema.index({
  favoriteBy: 1,
});

FileSchema.index({
  type: 1,
});

FileSchema.index({
  name: "text",
});