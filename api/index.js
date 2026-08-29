"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// api/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => handler
});
module.exports = __toCommonJS(index_exports);
var import_core2 = require("@nestjs/core");
var import_common93 = require("@nestjs/common");
var import_path2 = require("path");
var import_swagger4 = require("@nestjs/swagger");

// src/app.module.ts
var import_common92 = require("@nestjs/common");
var import_config9 = require("@nestjs/config");

// src/config/index.ts
var config_default = [
  () => ({
    app: {
      port: parseInt(process.env.PORT ?? "5000", 10),
      clientUrl: process.env.CLIENT_URL
    },
    database: {
      uri: process.env.MONGODB_URI
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_EXPIRES ?? "15m",
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES ?? "30d"
    },
    ai: {
      geminiKey: process.env.GEMINI_API_KEY
    }
  })
];

// src/config/env.validation.ts
var Joi = __toESM(require("joi"));
var envValidationSchema = Joi.object({
  PORT: Joi.number().default(5e3),
  NODE_ENV: Joi.string().default(
    "development"
  ),
  CLIENT_URL: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES: Joi.string().default("15m"),
  JWT_REFRESH_EXPIRES: Joi.string().default("30d"),
  GEMINI_API_KEY: Joi.string().allow("").optional(),
  // Optional SMTP — newsletter notify emails need these
  MAIL_HOST: Joi.string().optional(),
  MAIL_PORT: Joi.number().optional(),
  MAIL_USER: Joi.string().optional(),
  MAIL_PASSWORD: Joi.string().optional(),
  MAIL_FROM: Joi.string().optional(),
  NEWSLETTER_NOTIFY_EMAIL: Joi.string().email().optional(),
  // Cal.com — public booking via API (avoids broken iframe embed)
  // Prefer CALCOM_LINK=username/event-slug (lowercase)
  CALCOM_LINK: Joi.string().optional(),
  CALCOM_USERNAME: Joi.string().optional(),
  CALCOM_EVENT_SLUG: Joi.string().optional(),
  CALCOM_TIMEZONE: Joi.string().optional(),
  CALCOM_API_KEY: Joi.string().optional()
});

// src/database/database.module.ts
var import_common2 = require("@nestjs/common");
var import_config = require("@nestjs/config");
var import_mongoose = require("@nestjs/mongoose");

// src/database/database.service.ts
var import_common = require("@nestjs/common");
var DatabaseService = class {
  logger = new import_common.Logger(DatabaseService.name);
  connected() {
    this.logger.log("\u2705 MongoDB Connected Successfully");
  }
  disconnected() {
    this.logger.warn("\u274C MongoDB Disconnected");
  }
  error(error) {
    this.logger.error("MongoDB Connection Error", error);
  }
};
DatabaseService = __decorateClass([
  (0, import_common.Injectable)()
], DatabaseService);

// src/database/database.module.ts
var DatabaseModule = class {
};
DatabaseModule = __decorateClass([
  (0, import_common2.Global)(),
  (0, import_common2.Module)({
    imports: [
      import_config.ConfigModule,
      import_mongoose.MongooseModule.forRootAsync({
        inject: [import_config.ConfigService],
        useFactory: (config) => ({
          uri: config.get("database.uri"),
          retryAttempts: 5,
          retryDelay: 3e3,
          autoIndex: true,
          connectionFactory: (connection) => {
            console.log("==================================");
            console.log("\u2705 MongoDB Connected");
            console.log("Database:", connection.name);
            console.log("==================================");
            return connection;
          }
        })
      })
    ],
    providers: [DatabaseService],
    exports: [import_mongoose.MongooseModule]
  })
], DatabaseModule);

// src/users/users.module.ts
var import_common18 = require("@nestjs/common");
var import_mongoose11 = require("@nestjs/mongoose");

// src/users/controllers/users.controller.ts
var import_common5 = require("@nestjs/common");

// src/users/services/users.service.ts
var import_common4 = require("@nestjs/common");

// src/users/repositories/users.repository.ts
var import_common3 = require("@nestjs/common");
var import_mongoose3 = require("@nestjs/mongoose");
var import_mongoose4 = require("mongoose");

// src/users/schemas/user.schema.ts
var import_mongoose2 = require("@nestjs/mongoose");

// src/users/enums/role.enum.ts
var Role = /* @__PURE__ */ ((Role2) => {
  Role2["ADMIN"] = "ADMIN";
  Role2["HR"] = "HR";
  Role2["PROJECT_MANAGER"] = "PROJECT_MANAGER";
  Role2["EMPLOYEE"] = "EMPLOYEE";
  Role2["CLIENT"] = "CLIENT";
  Role2["INTERN"] = "INTERN";
  Role2["MANAGER"] = "MANAGER";
  Role2["AI"] = "AI";
  Role2["CEO"] = "CEO";
  return Role2;
})(Role || {});

// src/users/schemas/user.schema.ts
var User = class {
  firstName;
  lastName;
  email;
  password;
  phone;
  avatar;
  role;
  isActive;
  isVerified;
  mustChangePassword;
  refreshToken;
  emailVerificationToken;
  passwordResetToken;
  passwordResetExpires;
  emailVerifiedAt;
  lastLogin;
  loginAttempts;
  lockUntil;
  lastPasswordChangedAt;
  // =====================================================
  // Timestamps
  // =====================================================
  createdAt;
  updatedAt;
};
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    trim: true
  })
], User.prototype, "firstName", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    trim: true
  })
], User.prototype, "lastName", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    select: false
  })
], User.prototype, "password", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    default: ""
  })
], User.prototype, "phone", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    default: ""
  })
], User.prototype, "avatar", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    enum: Role,
    default: "EMPLOYEE" /* EMPLOYEE */
  })
], User.prototype, "role", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Boolean,
    default: true
  })
], User.prototype, "isActive", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Boolean,
    default: false
  })
], User.prototype, "isVerified", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Boolean,
    default: true
  })
], User.prototype, "mustChangePassword", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    default: null,
    select: false
  })
], User.prototype, "refreshToken", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    default: null,
    select: false
  })
], User.prototype, "emailVerificationToken", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: String,
    default: null,
    select: false
  })
], User.prototype, "passwordResetToken", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  })
], User.prototype, "passwordResetExpires", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  })
], User.prototype, "emailVerifiedAt", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  })
], User.prototype, "lastLogin", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Number,
    default: 0
  })
], User.prototype, "loginAttempts", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  })
], User.prototype, "lockUntil", 2);
__decorateClass([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  })
], User.prototype, "lastPasswordChangedAt", 2);
User = __decorateClass([
  (0, import_mongoose2.Schema)({
    timestamps: true
  })
], User);
var UserSchema = import_mongoose2.SchemaFactory.createForClass(User);

// src/users/repositories/users.repository.ts
var UsersRepository = class {
  constructor(userModel) {
    this.userModel = userModel;
  }
  userModel;
  // =====================================================
  // Create
  // =====================================================
  async createUser(data) {
    return this.userModel.create(data);
  }
  // =====================================================
  // Find
  // =====================================================
  async findAll() {
    return this.userModel.find().exec();
  }
  async findById(id) {
    return this.userModel.findById(id).exec();
  }
  async findByEmail(email) {
    return this.userModel.findOne({
      email
    }).exec();
  }
  async findByEmailWithPassword(email) {
    return this.userModel.findOne({
      email
    }).select(
      "+password +refreshToken +emailVerificationToken +passwordResetToken"
    ).exec();
  }
  async findByVerificationToken(token) {
    return this.userModel.findOne({
      emailVerificationToken: token
    }).select(
      "+emailVerificationToken"
    ).exec();
  }
  async findByPasswordResetToken(token) {
    return this.userModel.findOne({
      passwordResetToken: token
    }).select(
      "+passwordResetToken"
    ).exec();
  }
  async existsByEmail(email) {
    const exists = await this.userModel.exists({
      email
    });
    return !!exists;
  }
  // =====================================================
  // Update
  // =====================================================
  async update(id, data) {
    return this.userModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true
      }
    ).exec();
  }
  async delete(id) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  // =====================================================
  // Password
  // =====================================================
  async updatePassword(userId, password) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        password,
        mustChangePassword: false,
        passwordResetToken: null,
        passwordResetExpires: null,
        lastPasswordChangedAt: /* @__PURE__ */ new Date()
      },
      {
        new: true
      }
    ).exec();
  }
  async savePasswordResetToken(userId, token, expires) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        passwordResetToken: token,
        passwordResetExpires: expires
      },
      {
        new: true
      }
    ).exec();
  }
  // =====================================================
  // Email Verification
  // =====================================================
  async saveVerificationToken(userId, token) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        emailVerificationToken: token
      },
      {
        new: true
      }
    ).exec();
  }
  async updateVerificationToken(userId, token, expires) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        emailVerificationToken: token,
        passwordResetExpires: expires
      },
      {
        new: true
      }
    ).exec();
  }
  async verifyEmail(userId) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        isVerified: true,
        emailVerificationToken: null,
        emailVerifiedAt: /* @__PURE__ */ new Date()
      },
      {
        new: true
      }
    ).exec();
  }
  // =====================================================
  // Refresh Token
  // =====================================================
  async updateRefreshToken(userId, refreshToken) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        refreshToken
      },
      {
        new: true
      }
    ).exec();
  }
  async clearRefreshToken(userId) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        refreshToken: null
      },
      {
        new: true
      }
    ).exec();
  }
  // =====================================================
  // Login Tracking
  // =====================================================
  async updateLastLogin(userId) {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        lastLogin: /* @__PURE__ */ new Date()
      }
    );
  }
  async incrementLoginAttempts(userId) {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $inc: {
          loginAttempts: 1
        }
      }
    );
  }
  async resetLoginAttempts(userId) {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        loginAttempts: 0,
        lockUntil: null
      }
    );
  }
  async lockAccount(userId, until) {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        lockUntil: until
      }
    );
  }
};
UsersRepository = __decorateClass([
  (0, import_common3.Injectable)(),
  __decorateParam(0, (0, import_mongoose3.InjectModel)(User.name)),
  __decorateParam(0, (0, import_common3.Inject)(import_mongoose4.Model))
], UsersRepository);

// src/users/services/users.service.ts
var UsersService = class {
  constructor(repository) {
    this.repository = repository;
  }
  repository;
  // =====================================================
  // Create
  // =====================================================
  async createUser(dto) {
    return this.repository.createUser(dto);
  }
  // =====================================================
  // Read
  // =====================================================
  async findAll() {
    return this.repository.findAll();
  }
  async findById(id) {
    return this.repository.findById(id);
  }
  async findOne(id) {
    return this.repository.findById(id);
  }
  async findByEmail(email) {
    return this.repository.findByEmail(email);
  }
  async findByEmailWithPassword(email) {
    return this.repository.findByEmailWithPassword(
      email
    );
  }
  async findByVerificationToken(token) {
    return this.repository.findByVerificationToken(
      token
    );
  }
  async findByPasswordResetToken(token) {
    return this.repository.findByPasswordResetToken(
      token
    );
  }
  async existsByEmail(email) {
    return this.repository.existsByEmail(
      email
    );
  }
  // =====================================================
  // Update
  // =====================================================
  async update(id, dto) {
    return this.repository.update(
      id,
      dto
    );
  }
  async delete(id) {
    return this.repository.delete(id);
  }
  // =====================================================
  // Password
  // =====================================================
  async updatePassword(userId, password) {
    return this.repository.updatePassword(
      userId,
      password
    );
  }
  async savePasswordResetToken(userId, token, expires) {
    return this.repository.savePasswordResetToken(
      userId,
      token,
      expires
    );
  }
  // =====================================================
  // Email Verification
  // =====================================================
  async saveVerificationToken(userId, token) {
    return this.repository.saveVerificationToken(
      userId,
      token
    );
  }
  async updateVerificationToken(userId, token, expires) {
    return this.repository.updateVerificationToken(
      userId,
      token,
      expires
    );
  }
  async verifyEmail(userId) {
    return this.repository.verifyEmail(
      userId
    );
  }
  // =====================================================
  // Refresh Token
  // =====================================================
  async updateRefreshToken(userId, token) {
    return this.repository.updateRefreshToken(
      userId,
      token
    );
  }
  async clearRefreshToken(userId) {
    return this.repository.clearRefreshToken(
      userId
    );
  }
  // =====================================================
  // Login Tracking
  // =====================================================
  async updateLastLogin(userId) {
    await this.repository.updateLastLogin(
      userId
    );
  }
  async incrementLoginAttempts(userId) {
    await this.repository.incrementLoginAttempts(
      userId
    );
  }
  async resetLoginAttempts(userId) {
    await this.repository.resetLoginAttempts(
      userId
    );
  }
  async lockAccount(userId, until) {
    await this.repository.lockAccount(
      userId,
      until
    );
  }
  // =====================================================
  // Helpers
  // =====================================================
  async requireUser(id) {
    const user = await this.findById(id);
    if (!user) {
      throw new import_common4.NotFoundException(
        "User not found."
      );
    }
    return user;
  }
  async requireUserByEmail(email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new import_common4.NotFoundException(
        "User not found."
      );
    }
    return user;
  }
};
UsersService = __decorateClass([
  (0, import_common4.Injectable)(),
  __decorateParam(0, (0, import_common4.Inject)(UsersRepository))
], UsersService);

// src/users/controllers/users.controller.ts
var UsersController = class {
  constructor(usersService) {
    this.usersService = usersService;
  }
  usersService;
  findAll() {
    return this.usersService.findAll();
  }
  findOne(id) {
    return this.usersService.findById(id);
  }
};
__decorateClass([
  (0, import_common5.Get)()
], UsersController.prototype, "findAll", 1);
__decorateClass([
  (0, import_common5.Get)(":id"),
  __decorateParam(0, (0, import_common5.Param)("id"))
], UsersController.prototype, "findOne", 1);
UsersController = __decorateClass([
  (0, import_common5.Controller)("users"),
  __decorateParam(0, (0, import_common5.Inject)(UsersService))
], UsersController);

// src/employees/employees.module.ts
var import_common17 = require("@nestjs/common");
var import_mongoose10 = require("@nestjs/mongoose");

// src/employees/schemas/employee.schema.ts
var import_mongoose5 = require("@nestjs/mongoose");
var import_mongoose6 = require("mongoose");

// src/employees/enums/employment-type.enum.ts
var EmploymentType = /* @__PURE__ */ ((EmploymentType2) => {
  EmploymentType2["FULL_TIME"] = "FULL_TIME";
  EmploymentType2["PART_TIME"] = "PART_TIME";
  EmploymentType2["CONTRACT"] = "CONTRACT";
  EmploymentType2["INTERN"] = "INTERN";
  EmploymentType2["FREELANCER"] = "FREELANCER";
  return EmploymentType2;
})(EmploymentType || {});

// src/employees/enums/employee-status.enum.ts
var EmployeeStatus = /* @__PURE__ */ ((EmployeeStatus2) => {
  EmployeeStatus2["PENDING"] = "PENDING";
  EmployeeStatus2["ACTIVE"] = "ACTIVE";
  EmployeeStatus2["ON_LEAVE"] = "ON_LEAVE";
  EmployeeStatus2["RESIGNED"] = "RESIGNED";
  EmployeeStatus2["TERMINATED"] = "TERMINATED";
  return EmployeeStatus2;
})(EmployeeStatus || {});

// src/employees/enums/gender.enum.ts
var Gender = /* @__PURE__ */ ((Gender2) => {
  Gender2["MALE"] = "MALE";
  Gender2["FEMALE"] = "FEMALE";
  Gender2["OTHER"] = "OTHER";
  return Gender2;
})(Gender || {});

// src/employees/schemas/employee.schema.ts
var Employee = class {
  employeeId;
  user;
  firstName;
  lastName;
  fullName;
  email;
  phone;
  gender;
  dateOfBirth;
  cnic;
  department;
  designation;
  employmentType;
  joiningDate;
  salary;
  status;
  address;
  city;
  country;
  emergencyContactName;
  emergencyContactPhone;
  avatar;
  performance;
  attendance;
};
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    unique: true,
    trim: true
  })
], Employee.prototype, "employeeId", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: import_mongoose6.Types.ObjectId,
    ref: User.name,
    required: false,
    unique: true,
    sparse: true,
    index: true
  })
], Employee.prototype, "user", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    trim: true
  })
], Employee.prototype, "firstName", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    trim: true
  })
], Employee.prototype, "lastName", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    trim: true
  })
], Employee.prototype, "fullName", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  })
], Employee.prototype, "email", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String
  })
], Employee.prototype, "phone", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    enum: Gender
  })
], Employee.prototype, "gender", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: Date
  })
], Employee.prototype, "dateOfBirth", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String
  })
], Employee.prototype, "cnic", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true
  })
], Employee.prototype, "department", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true
  })
], Employee.prototype, "designation", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    enum: EmploymentType,
    default: "FULL_TIME" /* FULL_TIME */
  })
], Employee.prototype, "employmentType", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: Date
  })
], Employee.prototype, "joiningDate", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: Number,
    default: 0
  })
], Employee.prototype, "salary", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    enum: EmployeeStatus,
    default: "ACTIVE" /* ACTIVE */
  })
], Employee.prototype, "status", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String
  })
], Employee.prototype, "address", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String
  })
], Employee.prototype, "city", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String
  })
], Employee.prototype, "country", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String
  })
], Employee.prototype, "emergencyContactName", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String
  })
], Employee.prototype, "emergencyContactPhone", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: String,
    default: ""
  })
], Employee.prototype, "avatar", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: Number,
    default: 0
  })
], Employee.prototype, "performance", 2);
__decorateClass([
  (0, import_mongoose5.Prop)({
    type: Number,
    default: 0
  })
], Employee.prototype, "attendance", 2);
Employee = __decorateClass([
  (0, import_mongoose5.Schema)({
    timestamps: true
  })
], Employee);
var EmployeeSchema = import_mongoose5.SchemaFactory.createForClass(Employee);
EmployeeSchema.virtual("name").get(function() {
  return `${this.firstName} ${this.lastName}`;
});
EmployeeSchema.set("toJSON", {
  virtuals: true
});
EmployeeSchema.set("toObject", {
  virtuals: true
});

// src/employees/controllers/employees.controller.ts
var import_common14 = require("@nestjs/common");
var import_platform_express = require("@nestjs/platform-express");

// src/auth/guards/jwt-auth.guard.ts
var import_common6 = require("@nestjs/common");
var import_passport = require("@nestjs/passport");
var JwtAuthGuard = class extends (0, import_passport.AuthGuard)(
  "jwt"
) {
};
JwtAuthGuard = __decorateClass([
  (0, import_common6.Injectable)()
], JwtAuthGuard);

// src/auth/guards/roles.guard.ts
var import_common8 = require("@nestjs/common");
var import_core = require("@nestjs/core");

// src/auth/decorators/roles.decorator.ts
var import_common7 = require("@nestjs/common");
var ROLES_KEY = "roles";
var Roles = (...roles) => (0, import_common7.SetMetadata)(
  ROLES_KEY,
  roles
);

// src/auth/guards/roles.guard.ts
var RolesGuard = class {
  constructor(reflector) {
    this.reflector = reflector;
  }
  reflector;
  canActivate(context) {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    return requiredRoles.includes(
      user.role
    );
  }
};
RolesGuard = __decorateClass([
  (0, import_common8.Injectable)(),
  __decorateParam(0, (0, import_common8.Inject)(import_core.Reflector))
], RolesGuard);

// src/auth/constants/role-groups.ts
var VIEW_ROLES = [
  "ADMIN" /* ADMIN */,
  "HR" /* HR */,
  "MANAGER" /* MANAGER */,
  "EMPLOYEE" /* EMPLOYEE */,
  "INTERN" /* INTERN */,
  "CLIENT" /* CLIENT */,
  "CEO" /* CEO */,
  "AI" /* AI */
];
var MANAGE_ROLES = [
  "ADMIN" /* ADMIN */,
  "HR" /* HR */
];
var ADMIN_ONLY = [
  "ADMIN" /* ADMIN */
];

// src/employees/services/employees.service.ts
var import_common13 = require("@nestjs/common");
var import_mongoose9 = require("mongoose");
var bcrypt = __toESM(require("bcrypt"));

// src/employees/repositories/employees.repository.ts
var import_common9 = require("@nestjs/common");
var import_mongoose7 = require("@nestjs/mongoose");
var import_mongoose8 = require("mongoose");
var EmployeesRepository = class {
  constructor(employeeModel) {
    this.employeeModel = employeeModel;
  }
  employeeModel;
  // ======================================================
  // Create
  // ======================================================
  async create(employee) {
    return this.employeeModel.create(employee);
  }
  // ======================================================
  // Find All
  // ======================================================
  async findAll(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = {};
    if (query.search?.trim()) {
      filter.$or = [
        {
          firstName: {
            $regex: query.search,
            $options: "i"
          }
        },
        {
          lastName: {
            $regex: query.search,
            $options: "i"
          }
        },
        {
          fullName: {
            $regex: query.search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: query.search,
            $options: "i"
          }
        }
      ];
    }
    if (query.department) {
      filter.department = query.department;
    }
    if (query.designation) {
      filter.designation = query.designation;
    }
    if (query.status) {
      filter.status = query.status;
    }
    if (query.employmentType) {
      filter.employmentType = query.employmentType;
    }
    const total = await this.employeeModel.countDocuments(
      filter
    );
    const items = await this.employeeModel.find(filter).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    }).sort({
      [query.sortBy ?? "createdAt"]: query.order === "asc" ? 1 : -1
    }).skip(skip).limit(limit).lean();
    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit
        )
      }
    };
  }
  // ======================================================
  // Find By Id
  // ======================================================
  async findById(id) {
    if (!import_mongoose8.Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.employeeModel.findById(id).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    }).lean();
  }
  // ======================================================
  // Find By User Id
  // ======================================================
  async findByUserId(userId) {
    if (!import_mongoose8.Types.ObjectId.isValid(
      userId
    )) {
      return null;
    }
    return this.employeeModel.findOne({
      user: new import_mongoose8.Types.ObjectId(
        userId
      )
    }).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    });
  }
  // ======================================================
  // Find By Employee Id
  // ======================================================
  async findByEmployeeId(employeeId) {
    return this.employeeModel.findOne({
      employeeId
    }).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    });
  }
  // ======================================================
  // Find By Email
  // ======================================================
  async findByEmail(email) {
    return this.employeeModel.findOne({
      email
    });
  }
  // ======================================================
  // Exists By User
  // ======================================================
  async existsByUser(userId) {
    if (!import_mongoose8.Types.ObjectId.isValid(
      userId
    )) {
      return false;
    }
    const exists = await this.employeeModel.exists(
      {
        user: new import_mongoose8.Types.ObjectId(
          userId
        )
      }
    );
    return !!exists;
  }
  // ======================================================
  // Update
  // ======================================================
  async update(id, data) {
    if (!import_mongoose8.Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.employeeModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    ).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    }).lean();
  }
  // ======================================================
  // Delete
  // ======================================================
  async delete(id) {
    if (!import_mongoose8.Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.employeeModel.findByIdAndDelete(
      id
    );
  }
};
EmployeesRepository = __decorateClass([
  (0, import_common9.Injectable)(),
  __decorateParam(0, (0, import_mongoose7.InjectModel)(Employee.name)),
  __decorateParam(0, (0, import_common9.Inject)(import_mongoose8.Model))
], EmployeesRepository);

// src/mail/mail.service.ts
var import_common10 = require("@nestjs/common");
var import_config2 = require("@nestjs/config");
var import_mailer = require("@nestjs-modules/mailer");
var import_uuid = require("uuid");

// src/mail/mail.constants.ts
var APP_NAME = "AI Company Management Platform";

// src/mail/mail.service.ts
var MailService = class {
  constructor(mailerService, configService, usersService) {
    this.mailerService = mailerService;
    this.configService = configService;
    this.usersService = usersService;
  }
  mailerService;
  configService;
  usersService;
  // =====================================================
  // Generic Mail Sender
  // =====================================================
  async send(options) {
    try {
      console.log("[MAIL] Sending email", {
        to: options.to,
        subject: options.subject,
        template: options.template
      });
      await this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        template: options.template,
        context: options.context
      });
      console.log("[MAIL] Email sent successfully");
    } catch (error) {
      console.error(
        "[MAIL] Failed to send email:",
        error
      );
      throw error;
    }
  }
  // =====================================================
  // Welcome Email
  // =====================================================
  // =====================================================
  // Welcome Email
  // =====================================================
  async sendWelcomeEmail(user, temporaryPassword) {
    const verificationToken = (0, import_uuid.v4)();
    await this.usersService.saveVerificationToken(
      user.id,
      verificationToken
    );
    const verificationUrl = `${this.configService.get(
      "FRONTEND_URL"
    )}/verify-email/${verificationToken}`;
    await this.send({
      to: user.email,
      subject: "Welcome to AI Company",
      template: "welcome",
      context: {
        // User Information
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        // Login Information
        password: temporaryPassword,
        // Verification
        verificationUrl,
        // Company Information
        companyName: "AI Company Management Platform",
        supportEmail: this.configService.get(
          "MAIL_FROM"
        )
      }
    });
  }
  // =====================================================
  // Password Reset
  // =====================================================
  async sendResetPasswordEmail(user, resetToken) {
    const resetUrl = `${this.configService.get(
      "FRONTEND_URL"
    )}/reset-password/${resetToken}`;
    await this.send({
      to: user.email,
      subject: "Reset Your Password",
      template: "reset-password",
      context: {
        firstName: user.firstName,
        fullName: `${user.firstName} ${user.lastName}`,
        resetUrl
      }
    });
  }
  // =====================================================
  // Newsletter Subscription Notification (to company)
  // =====================================================
  resolveNotifyEmail() {
    return this.configService.get(
      "NEWSLETTER_NOTIFY_EMAIL"
    ) || this.configService.get("MAIL_USER") || "";
  }
  isMailConfigured() {
    return Boolean(
      this.configService.get("MAIL_HOST") && this.configService.get("MAIL_USER") && this.configService.get("MAIL_PASSWORD")
    );
  }
  async sendNewsletterSubscriptionNotification(subscriberEmail) {
    if (!this.isMailConfigured()) {
      console.warn(
        "[NEWSLETTER] SMTP not fully configured (MAIL_HOST/USER/PASSWORD) \u2014 skipping emails for",
        subscriberEmail
      );
      return;
    }
    const notifyTo = this.resolveNotifyEmail();
    console.log(
      "[NEWSLETTER] New subscription:",
      subscriberEmail
    );
    await this.send({
      to: subscriberEmail,
      subject: `You're subscribed to ${APP_NAME}`,
      template: "newsletter-confirmation",
      context: {
        subscriberEmail,
        companyName: APP_NAME
      }
    });
    if (notifyTo) {
      console.log(
        "[NEWSLETTER] Notification recipient:",
        notifyTo
      );
      await this.send({
        to: notifyTo,
        subject: "New Newsletter Subscriber",
        template: "newsletter-subscription",
        context: {
          subscriberEmail,
          companyName: APP_NAME
        }
      });
    }
  }
  // =====================================================
  // Email Verification
  // =====================================================
  async sendVerificationEmail(user) {
    const verificationToken = (0, import_uuid.v4)();
    await this.usersService.saveVerificationToken(
      user.id,
      verificationToken
    );
    const verifyUrl = `${this.configService.get(
      "FRONTEND_URL"
    )}/verify-email/${verificationToken}`;
    await this.send({
      to: user.email,
      subject: "Verify Your Email",
      template: "verify-email",
      context: {
        firstName: user.firstName,
        fullName: `${user.firstName} ${user.lastName}`,
        verifyUrl
      }
    });
  }
};
MailService = __decorateClass([
  (0, import_common10.Injectable)(),
  __decorateParam(0, (0, import_common10.Inject)(import_mailer.MailerService)),
  __decorateParam(1, (0, import_common10.Inject)(import_config2.ConfigService)),
  __decorateParam(2, (0, import_common10.Inject)(
    (0, import_common10.forwardRef)(() => UsersService)
  ))
], MailService);

// src/employees/config/Avatar-upload.config.ts
var import_common11 = require("@nestjs/common");
var import_multer = require("multer");
var AVATAR_CLOUDINARY_FOLDER = "avatars";
var ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
var MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
var avatarUploadOptions = {
  storage: (0, import_multer.memoryStorage)(),
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES
  },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      callback(
        new import_common11.BadRequestException(
          "Only JPG, PNG, or WEBP images are allowed for the profile picture."
        ),
        false
      );
      return;
    }
    callback(null, true);
  }
};
function isCloudinaryAvatarUrl(avatar) {
  return !!avatar && avatar.includes("res.cloudinary.com") && avatar.includes(`/${AVATAR_CLOUDINARY_FOLDER}/`);
}

// src/common/cloudinary/cloudinary.service.ts
var import_common12 = require("@nestjs/common");
var CloudinaryService = class {
  constructor(cloudinary2) {
    this.cloudinary = cloudinary2;
  }
  cloudinary;
  async uploadFile(file, folder) {
    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto"
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          console.log("=========== CLOUDINARY ===========");
          console.log(result);
          console.log("resource_type =", result.resource_type);
          console.log("format =", result.format);
          console.log("secure_url =", result.secure_url);
          console.log("==================================");
          resolve(result);
        }
      );
      stream.end(file.buffer);
    });
  }
  async deleteFile(publicId) {
    await this.cloudinary.uploader.destroy(publicId);
  }
};
CloudinaryService = __decorateClass([
  (0, import_common12.Injectable)(),
  __decorateParam(0, (0, import_common12.Inject)("CLOUDINARY"))
], CloudinaryService);

// src/employees/services/employees.service.ts
var EmployeesService = class {
  constructor(repository, usersService, mailService, cloudinaryService) {
    this.repository = repository;
    this.usersService = usersService;
    this.mailService = mailService;
    this.cloudinaryService = cloudinaryService;
  }
  repository;
  usersService;
  mailService;
  cloudinaryService;
  // =====================================================
  // Create Employee
  // =====================================================
  async create(dto, avatarFile) {
    if (!avatarFile) {
      throw new import_common13.BadRequestException(
        "A profile picture is required to add an employee."
      );
    }
    const avatarUploadResult = await this.cloudinaryService.uploadFile(avatarFile, "avatars");
    const avatarUrl = avatarUploadResult.secure_url;
    const employeeExists = await this.repository.findByEmail(
      dto.email
    );
    if (employeeExists) {
      await this.removeAvatarFile(avatarUrl);
      throw new import_common13.BadRequestException(
        "Employee email already exists."
      );
    }
    const userExists = await this.usersService.findByEmail(
      dto.email
    );
    if (userExists) {
      await this.removeAvatarFile(avatarUrl);
      throw new import_common13.BadRequestException(
        "User already exists."
      );
    }
    const temporaryPassword = this.generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(
      temporaryPassword,
      10
    );
    const user = await this.usersService.createUser({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      phone: dto.phone,
      avatar: avatarUrl,
      role: dto.role,
      isActive: true,
      isVerified: false,
      mustChangePassword: true
    });
    const employeeId = await this.generateEmployeeId();
    const employee = await this.repository.create({
      user: user._id,
      employeeId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      email: dto.email,
      phone: dto.phone,
      designation: dto.designation,
      department: dto.department,
      employmentType: dto.employmentType ?? "FULL_TIME" /* FULL_TIME */,
      status: dto.status ?? "ACTIVE" /* ACTIVE */,
      gender: dto.gender,
      salary: dto.salary ?? 0,
      cnic: dto.cnic,
      address: dto.address,
      city: dto.city,
      country: dto.country,
      emergencyContactName: dto.emergencyContactName,
      emergencyContactPhone: dto.emergencyContactPhone,
      avatar: avatarUrl,
      performance: dto.performance ?? 0,
      attendance: dto.attendance ?? 0,
      dateOfBirth: dto.dateOfBirth ? new Date(
        dto.dateOfBirth
      ) : void 0,
      joiningDate: dto.joiningDate ? new Date(
        dto.joiningDate
      ) : void 0
    });
    try {
      await this.mailService.sendWelcomeEmail(
        user,
        temporaryPassword
      );
    } catch (error) {
      console.error(
        "Failed to send welcome email:",
        error
      );
    }
    return {
      success: true,
      message: "Employee created successfully.",
      data: employee
    };
  }
  // =====================================================
  // Find All Employees
  // =====================================================
  async findAll(query) {
    return this.repository.findAll(
      query
    );
  }
  // =====================================================
  // Find Employee By Id
  // =====================================================
  async findById(id) {
    const employee = await this.repository.findById(
      id
    );
    if (!employee) {
      throw new import_common13.NotFoundException(
        "Employee not found."
      );
    }
    return {
      success: true,
      data: employee
    };
  }
  // =====================================================
  // Update Employee
  // =====================================================
  async update(id, dto, avatarFile) {
    const employee = await this.repository.findById(
      id
    );
    if (!employee) {
      throw new import_common13.NotFoundException(
        "Employee not found."
      );
    }
    const updateData = {
      ...dto
    };
    delete updateData.user;
    delete updateData.password;
    delete updateData.employeeId;
    let newAvatarUrl;
    if (avatarFile) {
      const uploaded = await this.cloudinaryService.uploadFile(avatarFile, "avatars");
      newAvatarUrl = uploaded.secure_url;
      updateData.avatar = newAvatarUrl;
      await this.removeAvatarFile(employee.avatar);
    } else {
      delete updateData.avatar;
    }
    if (dto.firstName || dto.lastName) {
      updateData.fullName = `${dto.firstName ?? employee.firstName} ${dto.lastName ?? employee.lastName}`;
    }
    if (dto.dateOfBirth) {
      updateData.dateOfBirth = new Date(dto.dateOfBirth);
    }
    if (dto.joiningDate) {
      updateData.joiningDate = new Date(dto.joiningDate);
    }
    const updatedEmployee = await this.repository.update(
      id,
      updateData
    );
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      const user = await this.usersService.findById(
        userId
      );
      if (user) {
        await this.usersService.update(
          userId,
          {
            firstName: dto.firstName ?? user.firstName,
            lastName: dto.lastName ?? user.lastName,
            email: dto.email ?? user.email,
            phone: dto.phone ?? user.phone,
            avatar: newAvatarUrl ?? user.avatar,
            role: dto.role ?? user.role
          }
        );
      }
    }
    return {
      success: true,
      message: "Employee updated successfully.",
      data: updatedEmployee
    };
  }
  // =====================================================
  // Delete Employee
  // =====================================================
  async delete(id) {
    const employee = await this.repository.findById(
      id
    );
    if (!employee) {
      throw new import_common13.NotFoundException(
        "Employee not found."
      );
    }
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      await this.usersService.delete(
        userId
      );
    }
    await this.removeAvatarFile(employee.avatar);
    await this.repository.delete(
      id
    );
    return {
      success: true,
      message: "Employee deleted successfully."
    };
  }
  // =====================================================
  // Approve Employee
  // =====================================================
  async approve(id) {
    const employee = await this.repository.findById(
      id
    );
    if (!employee) {
      throw new import_common13.NotFoundException(
        "Employee not found."
      );
    }
    await this.repository.update(
      id,
      {
        status: "ACTIVE" /* ACTIVE */
      }
    );
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      await this.usersService.update(
        userId,
        {
          isActive: true,
          isVerified: true
        }
      );
    }
    return {
      success: true,
      message: "Employee approved successfully."
    };
  }
  // =====================================================
  // Reject Employee
  // =====================================================
  async reject(id) {
    const employee = await this.repository.findById(
      id
    );
    if (!employee) {
      throw new import_common13.NotFoundException(
        "Employee not found."
      );
    }
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      await this.usersService.delete(
        userId
      );
    }
    await this.removeAvatarFile(employee.avatar);
    await this.repository.delete(
      id
    );
    return {
      success: true,
      message: "Employee rejected successfully."
    };
  }
  // =====================================================
  // Generate Employee ID
  // =====================================================
  async generateEmployeeId() {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const random = Math.floor(
      1e3 + Math.random() * 9e3
    );
    return `EMP-${year}-${random}`;
  }
  // =====================================================
  // Generate Temporary Password
  // =====================================================
  generateTemporaryPassword() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars[Math.floor(
        Math.random() * chars.length
      )];
    }
    return password;
  }
  // =====================================================
  // Avatar file cleanup
  //
  // Only ever deletes assets that live in our own Cloudinary
  // "avatars" folder (isCloudinaryAvatarUrl guards against trying
  // to delete some unrelated external URL or an empty string).
  // =====================================================
  async removeAvatarFile(avatarPath) {
    if (!isCloudinaryAvatarUrl(avatarPath)) {
      return;
    }
    const match = avatarPath.match(/avatars\/[^./]+/);
    if (!match) {
      return;
    }
    try {
      await this.cloudinaryService.deleteFile(match[0]);
    } catch {
    }
  }
};
EmployeesService = __decorateClass([
  (0, import_common13.Injectable)(),
  __decorateParam(0, (0, import_common13.Inject)(EmployeesRepository)),
  __decorateParam(1, (0, import_common13.Inject)(UsersService)),
  __decorateParam(2, (0, import_common13.Inject)(MailService)),
  __decorateParam(3, (0, import_common13.Inject)(CloudinaryService))
], EmployeesService);

// src/employees/controllers/employees.controller.ts
var EmployeesController = class {
  constructor(service) {
    this.service = service;
  }
  service;
  create(dto, avatar) {
    return this.service.create(dto, avatar);
  }
  findAll(query) {
    return this.service.findAll(query);
  }
  findOne(id) {
    return this.service.findById(id);
  }
  update(id, dto, avatar) {
    return this.service.update(
      id,
      dto,
      avatar
    );
  }
  approve(id) {
    return this.service.approve(id);
  }
  reject(id) {
    return this.service.reject(id);
  }
  remove(id) {
    return this.service.delete(id);
  }
};
__decorateClass([
  (0, import_common14.Post)(),
  Roles(...MANAGE_ROLES),
  (0, import_common14.UseInterceptors)((0, import_platform_express.FileInterceptor)("avatar", avatarUploadOptions)),
  __decorateParam(0, (0, import_common14.Body)()),
  __decorateParam(1, (0, import_common14.UploadedFile)())
], EmployeesController.prototype, "create", 1);
__decorateClass([
  (0, import_common14.Get)(),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common14.Query)())
], EmployeesController.prototype, "findAll", 1);
__decorateClass([
  (0, import_common14.Get)(":id"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common14.Param)("id"))
], EmployeesController.prototype, "findOne", 1);
__decorateClass([
  (0, import_common14.Patch)(":id"),
  Roles(...MANAGE_ROLES),
  (0, import_common14.UseInterceptors)((0, import_platform_express.FileInterceptor)("avatar", avatarUploadOptions)),
  __decorateParam(0, (0, import_common14.Param)("id")),
  __decorateParam(1, (0, import_common14.Body)()),
  __decorateParam(2, (0, import_common14.UploadedFile)())
], EmployeesController.prototype, "update", 1);
__decorateClass([
  (0, import_common14.Patch)(":id/approve"),
  Roles(...ADMIN_ONLY),
  __decorateParam(0, (0, import_common14.Param)("id"))
], EmployeesController.prototype, "approve", 1);
__decorateClass([
  (0, import_common14.Delete)(":id/reject"),
  Roles(...ADMIN_ONLY),
  __decorateParam(0, (0, import_common14.Param)("id"))
], EmployeesController.prototype, "reject", 1);
__decorateClass([
  (0, import_common14.Delete)(":id"),
  Roles(...ADMIN_ONLY),
  __decorateParam(0, (0, import_common14.Param)("id"))
], EmployeesController.prototype, "remove", 1);
EmployeesController = __decorateClass([
  (0, import_common14.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  (0, import_common14.Controller)("employees"),
  __decorateParam(0, (0, import_common14.Inject)(EmployeesService))
], EmployeesController);

// src/mail/mail.module.ts
var import_common15 = require("@nestjs/common");
var import_config3 = require("@nestjs/config");
var import_mailer2 = require("@nestjs-modules/mailer");
var import_handlebars = require("@nestjs-modules/mailer/adapters/handlebars.adapter");
var import_path = require("path");
var MailModule = class {
};
MailModule = __decorateClass([
  (0, import_common15.Module)({
    imports: [
      import_config3.ConfigModule,
      (0, import_common15.forwardRef)(() => UsersModule),
      import_mailer2.MailerModule.forRootAsync({
        imports: [import_config3.ConfigModule],
        inject: [import_config3.ConfigService],
        useFactory: (config) => ({
          transport: {
            host: config.get("MAIL_HOST"),
            port: Number(
              config.get("MAIL_PORT")
            ),
            secure: false,
            auth: {
              user: config.get("MAIL_USER"),
              pass: config.get(
                "MAIL_PASSWORD"
              )
            }
          },
          defaults: {
            from: config.get("MAIL_FROM") || config.get("MAIL_USER") || "noreply@localhost"
          },
          template: {
            // esbuild only bundles code, not non-JS assets like .hbs
            // files, so on Vercel the templates are copied by
            // scripts/build-api.mjs into api/src/mail/templates
            // alongside the bundled function. Locally, process.cwd()
            // is apps/api, so the original relative path still applies.
            dir: (0, import_path.join)(
              process.cwd(),
              process.env.VERCEL ? "api/src/mail/templates" : "src/mail/templates"
            ),
            adapter: new import_handlebars.HandlebarsAdapter(),
            options: {
              strict: true
            }
          }
        })
      })
    ],
    providers: [MailService],
    exports: [MailService]
  })
], MailModule);

// src/common/cloudinary/cloudinary.module.ts
var import_common16 = require("@nestjs/common");

// src/common/cloudinary/cloudinary.provider.ts
var import_cloudinary2 = require("cloudinary");
var import_config4 = require("@nestjs/config");
var CloudinaryProvider = {
  provide: "CLOUDINARY",
  useFactory: (configService) => {
    import_cloudinary2.v2.config({
      cloud_name: configService.get(
        "CLOUDINARY_CLOUD_NAME"
      ),
      api_key: configService.get(
        "CLOUDINARY_API_KEY"
      ),
      api_secret: configService.get(
        "CLOUDINARY_API_SECRET"
      )
    });
    return import_cloudinary2.v2;
  },
  inject: [import_config4.ConfigService]
};

// src/common/cloudinary/cloudinary.module.ts
var CloudinaryModule = class {
};
CloudinaryModule = __decorateClass([
  (0, import_common16.Module)({
    providers: [
      CloudinaryProvider,
      CloudinaryService
    ],
    exports: [
      CloudinaryService
    ]
  })
], CloudinaryModule);

// src/employees/employees.module.ts
var EmployeesModule = class {
};
EmployeesModule = __decorateClass([
  (0, import_common17.Module)({
    imports: [
      import_mongoose10.MongooseModule.forFeature([
        {
          name: Employee.name,
          schema: EmployeeSchema
        }
      ]),
      (0, import_common17.forwardRef)(() => UsersModule),
      (0, import_common17.forwardRef)(() => MailModule),
      CloudinaryModule
    ],
    controllers: [
      EmployeesController
    ],
    providers: [
      EmployeesRepository,
      EmployeesService
    ],
    exports: [
      EmployeesRepository,
      EmployeesService
    ]
  })
], EmployeesModule);

// src/users/users.module.ts
var UsersModule = class {
};
UsersModule = __decorateClass([
  (0, import_common18.Module)({
    imports: [
      import_mongoose11.MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema
        }
      ]),
      (0, import_common18.forwardRef)(() => EmployeesModule),
      (0, import_common18.forwardRef)(() => MailModule)
    ],
    controllers: [
      UsersController
    ],
    providers: [
      UsersRepository,
      UsersService
    ],
    exports: [
      UsersRepository,
      UsersService
    ]
  })
], UsersModule);

// src/auth/auth.module.ts
var import_common23 = require("@nestjs/common");
var import_config7 = require("@nestjs/config");
var import_jwt2 = require("@nestjs/jwt");
var import_passport3 = require("@nestjs/passport");

// src/auth/controllers/auth.controller.ts
var import_common21 = require("@nestjs/common");

// src/auth/services/auth.service.ts
var import_common19 = require("@nestjs/common");
var import_jwt = require("@nestjs/jwt");
var import_config5 = require("@nestjs/config");
var bcrypt2 = __toESM(require("bcrypt"));
var import_crypto = require("crypto");
var AuthService = class {
  constructor(usersService, jwtService, configService, mailService, employeesRepository) {
    this.usersService = usersService;
    this.jwtService = jwtService;
    this.configService = configService;
    this.mailService = mailService;
    this.employeesRepository = employeesRepository;
  }
  usersService;
  jwtService;
  configService;
  mailService;
  employeesRepository;
  // =====================================================
  // Register
  // =====================================================
  async createUser(dto) {
    const exists = await this.usersService.existsByEmail(
      dto.email
    );
    if (exists) {
      throw new import_common19.BadRequestException(
        "Email already exists."
      );
    }
    const hashedPassword = await bcrypt2.hash(dto.password, 10);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
      isVerified: false,
      mustChangePassword: false
    });
    const token = (0, import_crypto.randomUUID)();
    const expires = new Date(
      Date.now() + 1e3 * 60 * 60 * 24
    );
    await this.usersService.updateVerificationToken(
      String(user._id),
      token,
      expires
    );
    await this.mailService.sendVerificationEmail(
      user
    );
    return {
      success: true,
      message: "Account created successfully. Verification email sent."
    };
  }
  // =====================================================
  // Login
  // =====================================================
  async login(dto) {
    const user = await this.usersService.findByEmailWithPassword(
      dto.email
    );
    if (!user) {
      throw new import_common19.UnauthorizedException(
        "Invalid email or password."
      );
    }
    if (user.lockUntil && user.lockUntil > /* @__PURE__ */ new Date()) {
      throw new import_common19.ForbiddenException(
        "Account temporarily locked."
      );
    }
    const matched = await bcrypt2.compare(
      dto.password,
      user.password
    );
    if (!matched) {
      await this.usersService.incrementLoginAttempts(
        String(user._id)
      );
      throw new import_common19.UnauthorizedException(
        "Invalid email or password."
      );
    }
    await this.usersService.resetLoginAttempts(
      String(user._id)
    );
    await this.usersService.updateLastLogin(
      String(user._id)
    );
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    const hashedRefresh = await bcrypt2.hash(
      refreshToken,
      10
    );
    await this.usersService.updateRefreshToken(
      String(user._id),
      hashedRefresh
    );
    const employee = await this.employeesRepository.findByUserId(
      String(user._id)
    );
    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        mustChangePassword: user.mustChangePassword,
        user: {
          id: user.id,
          employeeId: employee?.employeeId ?? "",
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          isVerified: user.isVerified,
          mustChangePassword: user.mustChangePassword
        }
      }
    };
  }
  // =====================================================
  // Forgot Password
  // =====================================================
  async forgotPassword(email) {
    const user = await this.usersService.findByEmail(
      email
    );
    if (!user) {
      return {
        success: true
      };
    }
    const token = (0, import_crypto.randomUUID)();
    const expires = new Date(
      Date.now() + 1e3 * 60 * 60
    );
    await this.usersService.savePasswordResetToken(
      String(user._id),
      token,
      expires
    );
    await this.mailService.sendResetPasswordEmail(
      user,
      token
    );
    return {
      success: true
    };
  }
  // =====================================================
  // Reset Password
  // =====================================================
  async resetPassword(token, password) {
    const user = await this.usersService.findByPasswordResetToken(
      token
    );
    if (!user) {
      throw new import_common19.BadRequestException(
        "Invalid token."
      );
    }
    if (user.passwordResetExpires && user.passwordResetExpires < /* @__PURE__ */ new Date()) {
      throw new import_common19.BadRequestException(
        "Token expired."
      );
    }
    const hashed = await bcrypt2.hash(
      password,
      10
    );
    await this.usersService.updatePassword(
      String(user._id),
      hashed
    );
    return {
      success: true,
      message: "Password updated."
    };
  }
  // =====================================================
  // Verify Email
  // =====================================================
  async verifyEmail(token) {
    const user = await this.usersService.findByVerificationToken(
      token
    );
    if (!user) {
      throw new import_common19.BadRequestException(
        "Invalid verification link."
      );
    }
    await this.usersService.verifyEmail(
      String(user._id)
    );
    return {
      success: true,
      message: "Email verified."
    };
  }
  // =====================================================
  // Refresh
  // =====================================================
  async refresh(refreshToken) {
    const payload = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: this.configService.get(
          "JWT_REFRESH_SECRET"
        )
      }
    );
    const user = await this.usersService.findById(
      payload.sub
    );
    if (!user) {
      throw new import_common19.UnauthorizedException();
    }
    const access = await this.generateAccessToken(user);
    const refresh = await this.generateRefreshToken(user);
    const hash3 = await bcrypt2.hash(
      refresh,
      10
    );
    await this.usersService.updateRefreshToken(
      user.id,
      hash3
    );
    return {
      accessToken: access,
      refreshToken: refresh
    };
  }
  // =====================================================
  // Logout
  // =====================================================
  async logout(userId) {
    await this.usersService.clearRefreshToken(
      userId
    );
    return {
      success: true
    };
  }
  // =====================================================
  // Current User
  // =====================================================
  async me(userId) {
    const user = await this.usersService.findById(
      userId
    );
    if (!user) {
      throw new import_common19.UnauthorizedException();
    }
    const employee = await this.employeesRepository.findByUserId(
      String(user._id)
    );
    return {
      success: true,
      data: {
        id: user.id,
        employeeId: employee?.employeeId ?? "",
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
        mustChangePassword: user.mustChangePassword
      }
    };
  }
  // =====================================================
  // JWT
  // =====================================================
  generateAccessToken(user) {
    return this.jwtService.signAsync({
      sub: String(user._id),
      email: user.email,
      role: user.role
    });
  }
  generateRefreshToken(user) {
    return this.jwtService.signAsync(
      {
        sub: String(user._id),
        email: user.email,
        role: user.role
      },
      {
        secret: this.configService.get(
          "JWT_REFRESH_SECRET"
        ),
        expiresIn: "30d"
      }
    );
  }
};
AuthService = __decorateClass([
  (0, import_common19.Injectable)(),
  __decorateParam(0, (0, import_common19.Inject)(UsersService)),
  __decorateParam(1, (0, import_common19.Inject)(import_jwt.JwtService)),
  __decorateParam(2, (0, import_common19.Inject)(import_config5.ConfigService)),
  __decorateParam(3, (0, import_common19.Inject)(MailService)),
  __decorateParam(4, (0, import_common19.Inject)(EmployeesRepository))
], AuthService);

// src/auth/decorators/current-user.decorator.ts
var import_common20 = require("@nestjs/common");
var CurrentUser = (0, import_common20.createParamDecorator)(
  (_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

// src/auth/controllers/auth.controller.ts
var AuthController = class {
  constructor(authService) {
    this.authService = authService;
  }
  authService;
  createUser(dto) {
    return this.authService.createUser(dto);
  }
  login(dto) {
    return this.authService.login(
      dto
    );
  }
  refresh(dto) {
    return this.authService.refresh(
      dto.refreshToken
    );
  }
  me(user) {
    return this.authService.me(
      user.sub
    );
  }
  logout(user) {
    return this.authService.logout(
      user.sub
    );
  }
};
__decorateClass([
  (0, import_common21.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common21.Post)("create-user"),
  __decorateParam(0, (0, import_common21.Body)())
], AuthController.prototype, "createUser", 1);
__decorateClass([
  (0, import_common21.Post)("login"),
  __decorateParam(0, (0, import_common21.Body)())
], AuthController.prototype, "login", 1);
__decorateClass([
  (0, import_common21.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles(
    "ADMIN" /* ADMIN */,
    "MANAGER" /* MANAGER */,
    "HR" /* HR */,
    "EMPLOYEE" /* EMPLOYEE */,
    "INTERN" /* INTERN */,
    "CLIENT" /* CLIENT */,
    "CEO" /* CEO */,
    "AI" /* AI */
  ),
  (0, import_common21.Post)("refresh"),
  __decorateParam(0, (0, import_common21.Body)())
], AuthController.prototype, "refresh", 1);
__decorateClass([
  (0, import_common21.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles(
    "ADMIN" /* ADMIN */,
    "MANAGER" /* MANAGER */,
    "HR" /* HR */,
    "EMPLOYEE" /* EMPLOYEE */,
    "INTERN" /* INTERN */,
    "CLIENT" /* CLIENT */,
    "CEO" /* CEO */,
    "AI" /* AI */
  ),
  (0, import_common21.Get)("me"),
  __decorateParam(0, CurrentUser())
], AuthController.prototype, "me", 1);
__decorateClass([
  (0, import_common21.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles(
    "ADMIN" /* ADMIN */,
    "MANAGER" /* MANAGER */,
    "HR" /* HR */,
    "EMPLOYEE" /* EMPLOYEE */,
    "INTERN" /* INTERN */,
    "CLIENT" /* CLIENT */,
    "CEO" /* CEO */,
    "AI" /* AI */
  ),
  (0, import_common21.Post)("logout"),
  __decorateParam(0, CurrentUser())
], AuthController.prototype, "logout", 1);
AuthController = __decorateClass([
  (0, import_common21.Controller)("auth"),
  __decorateParam(0, (0, import_common21.Inject)(AuthService))
], AuthController);

// src/auth/strategies/jwt.strategy.ts
var import_common22 = require("@nestjs/common");
var import_config6 = require("@nestjs/config");
var import_passport2 = require("@nestjs/passport");
var import_passport_jwt = require("passport-jwt");
var JwtStrategy = class extends (0, import_passport2.PassportStrategy)(
  import_passport_jwt.Strategy
) {
  constructor(configService) {
    super({
      jwtFromRequest: import_passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow(
        "JWT_SECRET"
      )
    });
  }
  async validate(payload) {
    return payload;
  }
};
JwtStrategy = __decorateClass([
  (0, import_common22.Injectable)(),
  __decorateParam(0, (0, import_common22.Inject)(import_config6.ConfigService))
], JwtStrategy);

// src/auth/auth.module.ts
var AuthModule = class {
};
AuthModule = __decorateClass([
  (0, import_common23.Module)({
    imports: [
      import_config7.ConfigModule,
      (0, import_common23.forwardRef)(() => UsersModule),
      (0, import_common23.forwardRef)(() => MailModule),
      (0, import_common23.forwardRef)(() => EmployeesModule),
      import_passport3.PassportModule.register({
        defaultStrategy: "jwt"
      }),
      import_jwt2.JwtModule.registerAsync({
        imports: [import_config7.ConfigModule],
        inject: [import_config7.ConfigService],
        useFactory: (config) => ({
          secret: config.getOrThrow(
            "JWT_SECRET"
          ),
          signOptions: {
            expiresIn: config.get(
              "JWT_EXPIRES"
            ) ?? "15m"
          }
        })
      })
    ],
    controllers: [
      AuthController
    ],
    providers: [
      AuthService,
      JwtStrategy,
      JwtAuthGuard,
      RolesGuard
    ],
    exports: [
      AuthService,
      import_passport3.PassportModule,
      import_jwt2.JwtModule,
      JwtAuthGuard,
      RolesGuard
    ]
  })
], AuthModule);

// src/dashboard/dashboard.module.ts
var import_common27 = require("@nestjs/common");
var import_mongoose18 = require("@nestjs/mongoose");

// src/projects/schemas/project.schema.ts
var import_mongoose12 = require("@nestjs/mongoose");
var import_mongoose13 = require("mongoose");

// src/projects/enums/project-priority.enum.ts
var ProjectPriority = /* @__PURE__ */ ((ProjectPriority2) => {
  ProjectPriority2["LOW"] = "Low";
  ProjectPriority2["MEDIUM"] = "Medium";
  ProjectPriority2["HIGH"] = "High";
  ProjectPriority2["CRITICAL"] = "Critical";
  return ProjectPriority2;
})(ProjectPriority || {});

// src/projects/enums/project-status.enum.ts
var ProjectStatus = /* @__PURE__ */ ((ProjectStatus2) => {
  ProjectStatus2["PLANNING"] = "Planning";
  ProjectStatus2["ACTIVE"] = "Active";
  ProjectStatus2["ON_HOLD"] = "On Hold";
  ProjectStatus2["COMPLETED"] = "Completed";
  return ProjectStatus2;
})(ProjectStatus || {});

// src/projects/schemas/project.schema.ts
var Project = class {
  name;
  description;
  status;
  priority;
  progress;
  totalTasks;
  completedTasks;
  startDate;
  dueDate;
  members;
};
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: String,
    required: true,
    trim: true
  })
], Project.prototype, "name", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: String,
    default: "",
    trim: true
  })
], Project.prototype, "description", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: String,
    enum: ProjectStatus,
    default: "Planning" /* PLANNING */
  })
], Project.prototype, "status", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: String,
    enum: ProjectPriority,
    default: "Medium" /* MEDIUM */
  })
], Project.prototype, "priority", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: Number,
    default: 0,
    min: 0,
    max: 100
  })
], Project.prototype, "progress", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: Number,
    default: 0
  })
], Project.prototype, "totalTasks", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: Number,
    default: 0
  })
], Project.prototype, "completedTasks", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: Date,
    required: true
  })
], Project.prototype, "startDate", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: Date,
    required: true
  })
], Project.prototype, "dueDate", 2);
__decorateClass([
  (0, import_mongoose12.Prop)({
    type: [
      {
        type: import_mongoose13.Types.ObjectId,
        ref: "Employee"
      }
    ],
    default: []
  })
], Project.prototype, "members", 2);
Project = __decorateClass([
  (0, import_mongoose12.Schema)({
    timestamps: true
  })
], Project);
var ProjectSchema = import_mongoose12.SchemaFactory.createForClass(Project);

// src/tasks/schemas/task.schema.ts
var import_mongoose14 = require("@nestjs/mongoose");
var import_mongoose15 = require("mongoose");

// src/tasks/enums/task-priority.enum.ts
var TaskPriority = /* @__PURE__ */ ((TaskPriority2) => {
  TaskPriority2["LOW"] = "Low";
  TaskPriority2["MEDIUM"] = "Medium";
  TaskPriority2["HIGH"] = "High";
  TaskPriority2["CRITICAL"] = "Critical";
  return TaskPriority2;
})(TaskPriority || {});

// src/tasks/enums/task-status.enum.ts
var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
  TaskStatus2["TODO"] = "Todo";
  TaskStatus2["IN_PROGRESS"] = "In Progress";
  TaskStatus2["REVIEW"] = "Review";
  TaskStatus2["COMPLETED"] = "Completed";
  return TaskStatus2;
})(TaskStatus || {});

// src/tasks/schemas/task.schema.ts
var Task = class {
  title;
  description;
  project;
  assignedTo;
  status;
  priority;
  progress;
  dueDate;
};
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: String,
    required: true,
    trim: true
  })
], Task.prototype, "title", 2);
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: String,
    default: "",
    trim: true
  })
], Task.prototype, "description", 2);
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: import_mongoose15.Types.ObjectId,
    ref: "Project",
    required: true
  })
], Task.prototype, "project", 2);
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: import_mongoose15.Types.ObjectId,
    ref: "Employee",
    required: true
  })
], Task.prototype, "assignedTo", 2);
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: String,
    enum: TaskStatus,
    default: "Todo" /* TODO */
  })
], Task.prototype, "status", 2);
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: String,
    enum: TaskPriority,
    default: "Medium" /* MEDIUM */
  })
], Task.prototype, "priority", 2);
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: Number,
    min: 0,
    max: 100,
    default: 0
  })
], Task.prototype, "progress", 2);
__decorateClass([
  (0, import_mongoose14.Prop)({
    type: Date,
    required: true
  })
], Task.prototype, "dueDate", 2);
Task = __decorateClass([
  (0, import_mongoose14.Schema)({
    timestamps: true
  })
], Task);
var TaskSchema = import_mongoose14.SchemaFactory.createForClass(Task);

// src/dashboard/controllers/dashboard.controller.ts
var import_common26 = require("@nestjs/common");
var import_swagger = require("@nestjs/swagger");

// src/dashboard/services/dashboard.service.ts
var import_common25 = require("@nestjs/common");

// src/dashboard/repositories/dashboard.repository.ts
var import_common24 = require("@nestjs/common");
var import_mongoose16 = require("@nestjs/mongoose");
var import_mongoose17 = require("mongoose");
var DashboardRepository = class {
  constructor(employeeModel, projectModel, taskModel) {
    this.employeeModel = employeeModel;
    this.projectModel = projectModel;
    this.taskModel = taskModel;
  }
  employeeModel;
  projectModel;
  taskModel;
  async getStatistics() {
    const [
      employees,
      projects,
      tasks
    ] = await Promise.all([
      this.employeeModel.countDocuments(),
      this.projectModel.countDocuments(),
      this.taskModel.countDocuments()
    ]);
    return {
      employees,
      projects,
      tasks,
      revenue: 0
    };
  }
  async getAnalytics() {
    const analytics = await this.employeeModel.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$joiningDate"
            }
          },
          employees: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          "_id.month": 1
        }
      }
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return analytics.map(
      (item) => ({
        month: months[item._id.month - 1],
        employees: item.employees,
        revenue: 0
      })
    );
  }
  async getRecentActivities() {
    const employees = await this.employeeModel.find().sort({
      joiningDate: -1
    }).limit(5).select(
      "firstName lastName joiningDate"
    ).lean();
    return employees.map(
      (employee) => ({
        id: employee._id.toString(),
        title: `${employee.firstName} ${employee.lastName} joined the company`,
        time: employee.joiningDate ? new Date(
          employee.joiningDate
        ).toLocaleDateString() : ""
      })
    );
  }
  // async getPendingApprovals() {
  //   const employees =
  //     await this.employeeModel
  //       .find({
  //         status:
  //           EmployeeStatus.ACTIVE,
  //       })
  //       .limit(5)
  //       .select(
  //         "firstName lastName designation",
  //       )
  //       .lean();
  //   return employees.map(
  //     (employee: any) => ({
  //       id:
  //         employee._id.toString(),
  //       name:
  //         `${employee.firstName} ${employee.lastName}`,
  //       role:
  //         employee.designation,
  //       status:
  //         employee.status,
  //     }),
  //   );
  // }
  async getLatestProjects() {
    const projects = await this.projectModel.find().sort({
      createdAt: -1
    }).limit(5).lean();
    return projects.map(
      (project) => ({
        id: project._id.toString(),
        name: project.name,
        progress: project.progress,
        due: project.dueDate ? new Date(
          project.dueDate
        ).toLocaleDateString() : "",
        members: project.members?.length ?? 0,
        status: project.status
      })
    );
  }
  async getPerformance() {
    const employees = await this.employeeModel.find().sort({
      performance: -1
    }).limit(5).select(
      "firstName lastName designation performance"
    ).lean();
    return employees.map(
      (employee) => ({
        id: employee._id.toString(),
        name: `${employee.firstName} ${employee.lastName}`,
        role: employee.designation,
        performance: employee.performance ?? 0
      })
    );
  }
};
DashboardRepository = __decorateClass([
  (0, import_common24.Injectable)(),
  __decorateParam(0, (0, import_mongoose16.InjectModel)(Employee.name)),
  __decorateParam(0, (0, import_common24.Inject)(import_mongoose17.Model)),
  __decorateParam(1, (0, import_mongoose16.InjectModel)(Project.name)),
  __decorateParam(1, (0, import_common24.Inject)(import_mongoose17.Model)),
  __decorateParam(2, (0, import_mongoose16.InjectModel)(Task.name)),
  __decorateParam(2, (0, import_common24.Inject)(import_mongoose17.Model))
], DashboardRepository);

// src/dashboard/services/dashboard.service.ts
var DashboardService = class {
  constructor(repository) {
    this.repository = repository;
  }
  repository;
  async getDashboard() {
    const [
      statistics,
      analytics,
      activities,
      latestProjects,
      performance
    ] = await Promise.all([
      this.repository.getStatistics(),
      this.repository.getAnalytics(),
      this.repository.getRecentActivities(),
      this.repository.getLatestProjects(),
      this.repository.getPerformance()
    ]);
    return {
      statistics,
      analytics,
      activities,
      latestProjects,
      performance
    };
  }
};
DashboardService = __decorateClass([
  (0, import_common25.Injectable)(),
  __decorateParam(0, (0, import_common25.Inject)(DashboardRepository))
], DashboardService);

// src/dashboard/controllers/dashboard.controller.ts
var DashboardController = class {
  constructor(dashboardService) {
    this.dashboardService = dashboardService;
  }
  dashboardService;
  getDashboard() {
    return this.dashboardService.getDashboard();
  }
};
__decorateClass([
  (0, import_common26.Get)(),
  Roles(...VIEW_ROLES)
], DashboardController.prototype, "getDashboard", 1);
DashboardController = __decorateClass([
  (0, import_swagger.ApiTags)("Dashboard"),
  (0, import_swagger.ApiBearerAuth)(),
  (0, import_common26.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  (0, import_common26.Controller)("dashboard"),
  __decorateParam(0, (0, import_common26.Inject)(DashboardService))
], DashboardController);

// src/dashboard/dashboard.module.ts
var DashboardModule = class {
};
DashboardModule = __decorateClass([
  (0, import_common27.Module)({
    imports: [
      import_mongoose18.MongooseModule.forFeature([
        {
          name: Employee.name,
          schema: EmployeeSchema
        },
        {
          name: Project.name,
          schema: ProjectSchema
        },
        {
          name: Task.name,
          schema: TaskSchema
        }
      ])
    ],
    controllers: [
      DashboardController
    ],
    providers: [
      DashboardRepository,
      DashboardService
    ],
    exports: [
      DashboardRepository,
      DashboardService
    ]
  })
], DashboardModule);

// src/projects/projects.module.ts
var import_common31 = require("@nestjs/common");
var import_mongoose21 = require("@nestjs/mongoose");

// src/projects/controllers/projects.controller.ts
var import_common30 = require("@nestjs/common");
var import_swagger2 = require("@nestjs/swagger");

// src/projects/services/projects.service.ts
var import_common29 = require("@nestjs/common");

// src/projects/mappers/project.mapper.ts
var ProjectMapper = class {
  static toList(project) {
    return {
      id: project._id.toString(),
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      progress: project.progress,
      totalTasks: project.totalTasks,
      completedTasks: project.completedTasks,
      startDate: project.startDate ? new Date(project.startDate).toISOString().split("T")[0] : "",
      dueDate: project.dueDate ? new Date(project.dueDate).toISOString().split("T")[0] : "",
      members: project.members?.map(
        (member) => ({
          id: member._id.toString(),
          name: `${member.firstName} ${member.lastName}`,
          avatar: member.avatar ?? "",
          role: member.designation
        })
      ) ?? []
    };
  }
  static toDetails(project) {
    return this.toList(project);
  }
  static toCollection(projects) {
    return projects.map(
      (project) => this.toList(project)
    );
  }
  static statistics(stats) {
    return {
      total: stats.total,
      active: stats.active,
      completed: stats.completed,
      planning: stats.planning
    };
  }
};

// src/projects/repositories/projects.repository.ts
var import_common28 = require("@nestjs/common");
var import_mongoose19 = require("@nestjs/mongoose");
var import_mongoose20 = require("mongoose");
var ProjectsRepository = class {
  constructor(projectModel) {
    this.projectModel = projectModel;
  }
  projectModel;
  memberPopulate = {
    path: "members",
    select: "firstName lastName fullName designation avatar email"
  };
  async create(dto) {
    const created = await this.projectModel.create({
      ...dto,
      startDate: new Date(
        dto.startDate
      ),
      dueDate: new Date(
        dto.dueDate
      )
    });
    const project = await this.projectModel.findById(created._id).populate(
      this.memberPopulate
    ).lean();
    return project;
  }
  async findAll(query) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      priority,
      sortBy = "createdAt",
      order = "desc"
    } = query;
    const filter = {};
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }
    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    const total = await this.projectModel.countDocuments(
      filter
    );
    const projects = await this.projectModel.find(filter).populate(
      this.memberPopulate
    ).sort({
      [sortBy]: order === "asc" ? 1 : -1
    }).skip(
      (page - 1) * limit
    ).limit(limit).lean();
    return {
      items: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit
        )
      }
    };
  }
  async findById(id) {
    const project = await this.projectModel.findById(id).populate(
      this.memberPopulate
    ).lean();
    if (!project) {
      throw new import_common28.NotFoundException(
        "Project not found."
      );
    }
    return project;
  }
  async update(id, dto) {
    const updated = await this.projectModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        ...dto.startDate && {
          startDate: new Date(
            dto.startDate
          )
        },
        ...dto.dueDate && {
          dueDate: new Date(
            dto.dueDate
          )
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
    if (!updated) {
      throw new import_common28.NotFoundException(
        "Project not found."
      );
    }
    const project = await this.projectModel.findById(updated._id).populate(
      this.memberPopulate
    ).lean();
    return project;
  }
  async remove(id) {
    const deleted = await this.projectModel.findByIdAndDelete(
      id
    );
    if (!deleted) {
      throw new import_common28.NotFoundException(
        "Project not found."
      );
    }
  }
  async getStatistics() {
    const [
      total,
      active,
      completed,
      planning
    ] = await Promise.all([
      this.projectModel.countDocuments(),
      this.projectModel.countDocuments({
        status: "Active"
      }),
      this.projectModel.countDocuments({
        status: "Completed"
      }),
      this.projectModel.countDocuments({
        status: "Planning"
      })
    ]);
    return {
      total,
      active,
      completed,
      planning
    };
  }
};
ProjectsRepository = __decorateClass([
  (0, import_common28.Injectable)(),
  __decorateParam(0, (0, import_mongoose19.InjectModel)(Project.name)),
  __decorateParam(0, (0, import_common28.Inject)(import_mongoose20.Model))
], ProjectsRepository);

// src/projects/services/projects.service.ts
var ProjectsService = class {
  constructor(repository) {
    this.repository = repository;
  }
  repository;
  async create(dto) {
    const project = await this.repository.create(dto);
    return ProjectMapper.toDetails(
      project
    );
  }
  async findAll(query) {
    const result = await this.repository.findAll(
      query
    );
    return {
      items: ProjectMapper.toCollection(
        result.items
      ),
      pagination: result.pagination
    };
  }
  async findById(id) {
    const project = await this.repository.findById(
      id
    );
    return ProjectMapper.toDetails(
      project
    );
  }
  async update(id, dto) {
    const project = await this.repository.update(
      id,
      dto
    );
    return ProjectMapper.toDetails(
      project
    );
  }
  async remove(id) {
    await this.repository.remove(
      id
    );
    return {
      message: "Project deleted successfully."
    };
  }
  async getStatistics() {
    const statistics = await this.repository.getStatistics();
    return ProjectMapper.statistics(
      statistics
    );
  }
};
ProjectsService = __decorateClass([
  (0, import_common29.Injectable)(),
  __decorateParam(0, (0, import_common29.Inject)(ProjectsRepository))
], ProjectsService);

// src/projects/controllers/projects.controller.ts
var ProjectsController = class {
  constructor(projectsService) {
    this.projectsService = projectsService;
  }
  projectsService;
  create(dto) {
    return this.projectsService.create(dto);
  }
  findAll(query) {
    return this.projectsService.findAll(
      query
    );
  }
  getStatistics() {
    return this.projectsService.getStatistics();
  }
  findById(id) {
    return this.projectsService.findById(
      id
    );
  }
  update(id, dto) {
    return this.projectsService.update(
      id,
      dto
    );
  }
  remove(id) {
    return this.projectsService.remove(
      id
    );
  }
};
__decorateClass([
  (0, import_common30.Post)(),
  Roles(...MANAGE_ROLES),
  __decorateParam(0, (0, import_common30.Body)())
], ProjectsController.prototype, "create", 1);
__decorateClass([
  (0, import_common30.Get)(),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common30.Query)())
], ProjectsController.prototype, "findAll", 1);
__decorateClass([
  (0, import_common30.Get)("stats"),
  Roles(...VIEW_ROLES)
], ProjectsController.prototype, "getStatistics", 1);
__decorateClass([
  (0, import_common30.Get)(":id"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common30.Param)("id"))
], ProjectsController.prototype, "findById", 1);
__decorateClass([
  (0, import_common30.Patch)(":id"),
  Roles(...MANAGE_ROLES),
  __decorateParam(0, (0, import_common30.Param)("id")),
  __decorateParam(1, (0, import_common30.Body)())
], ProjectsController.prototype, "update", 1);
__decorateClass([
  (0, import_common30.Delete)(":id"),
  Roles(...ADMIN_ONLY),
  __decorateParam(0, (0, import_common30.Param)("id"))
], ProjectsController.prototype, "remove", 1);
ProjectsController = __decorateClass([
  (0, import_swagger2.ApiTags)("Projects"),
  (0, import_swagger2.ApiBearerAuth)(),
  (0, import_common30.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  (0, import_common30.Controller)("projects"),
  __decorateParam(0, (0, import_common30.Inject)(ProjectsService))
], ProjectsController);

// src/projects/projects.module.ts
var ProjectsModule = class {
};
ProjectsModule = __decorateClass([
  (0, import_common31.Module)({
    imports: [
      import_mongoose21.MongooseModule.forFeature([
        {
          name: Project.name,
          schema: ProjectSchema
        },
        {
          name: Employee.name,
          schema: EmployeeSchema
        }
      ])
    ],
    controllers: [
      ProjectsController
    ],
    providers: [
      ProjectsRepository,
      ProjectsService
    ],
    exports: [
      ProjectsRepository,
      ProjectsService
    ]
  })
], ProjectsModule);

// src/tasks/tasks.module.ts
var import_common36 = require("@nestjs/common");
var import_mongoose24 = require("@nestjs/mongoose");

// src/tasks/controllers/tasks.controller.ts
var import_common34 = require("@nestjs/common");

// src/tasks/services/tasks.service.ts
var import_common33 = require("@nestjs/common");

// src/tasks/repositories/tasks.repository.ts
var import_common32 = require("@nestjs/common");
var import_mongoose22 = require("@nestjs/mongoose");
var import_mongoose23 = require("mongoose");
var TaskRepository = class {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }
  taskModel;
  async create(dto) {
    return this.taskModel.create({
      ...dto,
      dueDate: new Date(
        dto.dueDate
      )
    });
  }
  async findAll(filter = {}) {
    return this.taskModel.find(filter).populate({
      path: "project",
      select: "name"
    }).populate({
      path: "assignedTo",
      select: "firstName lastName fullName avatar designation"
    }).sort({
      createdAt: -1
    }).lean();
  }
  async findById(id) {
    const task = await this.taskModel.findById(id).populate({
      path: "project",
      select: "name"
    }).populate({
      path: "assignedTo",
      select: "firstName lastName fullName avatar designation"
    }).lean();
    if (!task) {
      throw new import_common32.NotFoundException(
        "Task not found."
      );
    }
    return task;
  }
  async update(id, dto) {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        ...dto.dueDate && {
          dueDate: new Date(
            dto.dueDate
          )
        }
      },
      {
        new: true
      }
    ).populate({
      path: "project",
      select: "name"
    }).populate({
      path: "assignedTo",
      select: "firstName lastName fullName avatar designation"
    });
    if (!task) {
      throw new import_common32.NotFoundException(
        "Task not found."
      );
    }
    return task;
  }
  async remove(id) {
    const task = await this.taskModel.findByIdAndDelete(
      id
    );
    if (!task) {
      throw new import_common32.NotFoundException(
        "Task not found."
      );
    }
    return task;
  }
  async count(filter = {}) {
    return this.taskModel.countDocuments(
      filter
    );
  }
  async getStatistics() {
    const [
      total,
      todo,
      progress,
      review,
      completed
    ] = await Promise.all([
      this.count(),
      this.count({
        status: "Todo"
      }),
      this.count({
        status: "In Progress"
      }),
      this.count({
        status: "Review"
      }),
      this.count({
        status: "Completed"
      })
    ]);
    return {
      total,
      todo,
      progress,
      review,
      completed
    };
  }
};
TaskRepository = __decorateClass([
  (0, import_common32.Injectable)(),
  __decorateParam(0, (0, import_mongoose22.InjectModel)(Task.name)),
  __decorateParam(0, (0, import_common32.Inject)(import_mongoose23.Model))
], TaskRepository);

// src/tasks/services/tasks.service.ts
var TaskService = class {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  tasksRepository;
  async create(dto) {
    return this.tasksRepository.create(
      dto
    );
  }
  async findAll(filter) {
    const query = {};
    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.priority) {
      query.priority = filter.priority;
    }
    if (filter.project) {
      query.project = filter.project;
    }
    if (filter.employee) {
      query.assignedTo = filter.employee;
    }
    if (filter.search) {
      query.$or = [
        {
          title: {
            $regex: filter.search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: filter.search,
            $options: "i"
          }
        }
      ];
    }
    return this.tasksRepository.findAll(query);
  }
  async findOne(id) {
    const task = await this.tasksRepository.findById(
      id
    );
    if (!task) {
      throw new import_common33.NotFoundException(
        "Task not found."
      );
    }
    return task;
  }
  async update(id, dto) {
    const task = await this.tasksRepository.update(
      id,
      dto
    );
    if (!task) {
      throw new import_common33.NotFoundException(
        "Task not found."
      );
    }
    return task;
  }
  async remove(id) {
    await this.tasksRepository.remove(
      id
    );
    return {
      message: "Task deleted successfully."
    };
  }
  async statistics() {
    return this.tasksRepository.getStatistics();
  }
};
TaskService = __decorateClass([
  (0, import_common33.Injectable)(),
  __decorateParam(0, (0, import_common33.Inject)(TaskRepository))
], TaskService);

// src/tasks/controllers/tasks.controller.ts
var TaskController = class {
  constructor(taskService) {
    this.taskService = taskService;
  }
  taskService;
  create(dto) {
    return this.taskService.create(dto);
  }
  findAll(filter) {
    return this.taskService.findAll(
      filter
    );
  }
  statistics() {
    return this.taskService.statistics();
  }
  findOne(id) {
    return this.taskService.findOne(
      id
    );
  }
  update(id, dto) {
    return this.taskService.update(
      id,
      dto
    );
  }
  remove(id) {
    return this.taskService.remove(
      id
    );
  }
};
__decorateClass([
  (0, import_common34.Post)(),
  Roles(...MANAGE_ROLES),
  __decorateParam(0, (0, import_common34.Body)())
], TaskController.prototype, "create", 1);
__decorateClass([
  (0, import_common34.Get)(),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common34.Query)())
], TaskController.prototype, "findAll", 1);
__decorateClass([
  (0, import_common34.Get)("statistics"),
  Roles(...VIEW_ROLES)
], TaskController.prototype, "statistics", 1);
__decorateClass([
  (0, import_common34.Get)(":id"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common34.Param)("id"))
], TaskController.prototype, "findOne", 1);
__decorateClass([
  (0, import_common34.Patch)(":id"),
  Roles(...MANAGE_ROLES),
  __decorateParam(0, (0, import_common34.Param)("id")),
  __decorateParam(1, (0, import_common34.Body)())
], TaskController.prototype, "update", 1);
__decorateClass([
  (0, import_common34.Delete)(":id"),
  Roles(...ADMIN_ONLY),
  __decorateParam(0, (0, import_common34.Param)("id"))
], TaskController.prototype, "remove", 1);
TaskController = __decorateClass([
  (0, import_common34.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  (0, import_common34.Controller)("tasks"),
  __decorateParam(0, (0, import_common34.Inject)(TaskService))
], TaskController);

// src/tasks/mappers/tasks.mapper.ts
var import_common35 = require("@nestjs/common");
var TasksMapper = class {
  toResponse(task) {
    return {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      projectId: task.project?._id?.toString() ?? task.project?.toString() ?? "",
      projectName: task.project?.name ?? "",
      assignedTo: task.assignedTo?._id?.toString() ?? task.assignedTo?.toString() ?? "",
      assignee: task.assignedTo?.fullName ?? task.assignedTo?.name ?? `${task.assignedTo?.firstName ?? ""} ${task.assignedTo?.lastName ?? ""}`.trim(),
      assignedAvatar: task.assignedTo?.avatar ?? "",
      status: task.status,
      priority: task.priority,
      progress: task.progress ?? 0,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };
  }
  toCollection(tasks) {
    return tasks.map(
      (task) => this.toResponse(task)
    );
  }
};
TasksMapper = __decorateClass([
  (0, import_common35.Injectable)()
], TasksMapper);

// src/tasks/tasks.module.ts
var TaskModule = class {
};
TaskModule = __decorateClass([
  (0, import_common36.Module)({
    imports: [
      import_mongoose24.MongooseModule.forFeature([
        {
          name: Task.name,
          schema: TaskSchema
        }
      ])
    ],
    controllers: [TaskController],
    providers: [
      TaskService,
      TaskRepository,
      TasksMapper
    ],
    exports: [
      TaskService,
      TaskRepository
    ]
  })
], TaskModule);

// src/common/middleware/logger.middleware.ts
var import_common37 = require("@nestjs/common");
var LoggerMiddleware = class {
  use(req, res, next) {
    const start = Date.now();
    console.log(
      `\u27A1\uFE0F ${req.method} ${req.originalUrl}`
    );
    res.on("finish", () => {
      console.log(
        `\u2705 ${req.method} ${req.originalUrl} ${res.statusCode} (${Date.now() - start}ms)`
      );
    });
    next();
  }
};
LoggerMiddleware = __decorateClass([
  (0, import_common37.Injectable)()
], LoggerMiddleware);

// src/attendance/attendance.module.ts
var import_common42 = require("@nestjs/common");
var import_mongoose29 = require("@nestjs/mongoose");

// src/attendance/schemas/attendance.schema.ts
var import_mongoose25 = require("@nestjs/mongoose");
var import_mongoose26 = require("mongoose");

// src/attendance/enums/attendance-status.enum.ts
var AttendanceStatus = /* @__PURE__ */ ((AttendanceStatus2) => {
  AttendanceStatus2["PRESENT"] = "Present";
  AttendanceStatus2["LATE"] = "Late";
  AttendanceStatus2["ABSENT"] = "Absent";
  AttendanceStatus2["LEAVE"] = "Leave";
  return AttendanceStatus2;
})(AttendanceStatus || {});

// src/attendance/schemas/attendance.schema.ts
var Attendance = class {
  employee;
  date;
  checkIn;
  checkOut;
  workingHours;
  status;
};
__decorateClass([
  (0, import_mongoose25.Prop)({
    type: import_mongoose26.Types.ObjectId,
    ref: "Employee",
    required: true
  })
], Attendance.prototype, "employee", 2);
__decorateClass([
  (0, import_mongoose25.Prop)({
    type: Date,
    required: true
  })
], Attendance.prototype, "date", 2);
__decorateClass([
  (0, import_mongoose25.Prop)({
    type: String
  })
], Attendance.prototype, "checkIn", 2);
__decorateClass([
  (0, import_mongoose25.Prop)({
    type: String
  })
], Attendance.prototype, "checkOut", 2);
__decorateClass([
  (0, import_mongoose25.Prop)({
    type: Number,
    default: 0
  })
], Attendance.prototype, "workingHours", 2);
__decorateClass([
  (0, import_mongoose25.Prop)({
    type: String,
    enum: AttendanceStatus,
    default: "Present" /* PRESENT */
  })
], Attendance.prototype, "status", 2);
Attendance = __decorateClass([
  (0, import_mongoose25.Schema)({
    timestamps: true
  })
], Attendance);
var AttendanceSchema = import_mongoose25.SchemaFactory.createForClass(
  Attendance
);

// src/attendance/controllers/attendance.controller.ts
var import_common40 = require("@nestjs/common");

// src/attendance/services/attendance.service.ts
var import_common39 = require("@nestjs/common");

// src/attendance/repositories/attendance.repository.ts
var import_common38 = require("@nestjs/common");
var import_mongoose27 = require("@nestjs/mongoose");
var import_mongoose28 = require("mongoose");
var AttendanceRepository = class {
  constructor(attendanceModel) {
    this.attendanceModel = attendanceModel;
  }
  attendanceModel;
  calculateWorkingHours(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
      return 0;
    }
    const start = /* @__PURE__ */ new Date(
      `2026-01-01T${checkIn}`
    );
    const end = /* @__PURE__ */ new Date(
      `2026-01-01T${checkOut}`
    );
    return Number(
      ((end.getTime() - start.getTime()) / 36e5).toFixed(1)
    );
  }
  async create(dto) {
    const attendance = await this.attendanceModel.create(
      {
        employee: dto.employee,
        date: new Date(
          dto.date
        ),
        checkIn: dto.checkIn,
        checkOut: dto.checkOut,
        workingHours: this.calculateWorkingHours(
          dto.checkIn,
          dto.checkOut
        ),
        status: dto.status
      }
    );
    return this.findById(
      attendance.id
    );
  }
  async findAll(filter = {}) {
    return this.attendanceModel.find(filter).populate({
      path: "employee",
      select: "firstName lastName fullName avatar department designation"
    }).sort({
      date: -1
    }).lean();
  }
  async findById(id) {
    const attendance = await this.attendanceModel.findById(id).populate({
      path: "employee",
      select: "firstName lastName fullName avatar department designation"
    }).lean();
    if (!attendance) {
      throw new import_common38.NotFoundException(
        "Attendance record not found."
      );
    }
    return attendance;
  }
  async update(id, dto) {
    const existing = await this.attendanceModel.findById(
      id
    );
    if (!existing) {
      throw new import_common38.NotFoundException(
        "Attendance record not found."
      );
    }
    const checkIn = dto.checkIn ?? existing.checkIn;
    const checkOut = dto.checkOut ?? existing.checkOut;
    await this.attendanceModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        ...dto.date && {
          date: new Date(
            dto.date
          )
        },
        workingHours: this.calculateWorkingHours(
          checkIn,
          checkOut
        )
      },
      {
        new: true
      }
    );
    return this.findById(id);
  }
  async remove(id) {
    const attendance = await this.attendanceModel.findByIdAndDelete(
      id
    );
    if (!attendance) {
      throw new import_common38.NotFoundException(
        "Attendance record not found."
      );
    }
    return attendance;
  }
  async count(filter = {}) {
    return this.attendanceModel.countDocuments(
      filter
    );
  }
  async getStatistics() {
    const [
      present,
      late,
      absent,
      leave
    ] = await Promise.all([
      this.count({
        status: "Present"
      }),
      this.count({
        status: "Late"
      }),
      this.count({
        status: "Absent"
      }),
      this.count({
        status: "Leave"
      })
    ]);
    return {
      total: present + late + absent + leave,
      present,
      late,
      absent,
      leave
    };
  }
};
AttendanceRepository = __decorateClass([
  (0, import_common38.Injectable)(),
  __decorateParam(0, (0, import_mongoose27.InjectModel)(
    Attendance.name
  )),
  __decorateParam(0, (0, import_common38.Inject)(import_mongoose28.Model))
], AttendanceRepository);

// src/attendance/services/attendance.service.ts
var AttendanceService = class {
  constructor(attendanceRepository) {
    this.attendanceRepository = attendanceRepository;
  }
  attendanceRepository;
  async create(dto) {
    return this.attendanceRepository.create(
      dto
    );
  }
  async findAll(filter) {
    const query = {};
    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.employee) {
      query.employee = filter.employee;
    }
    if (filter.date) {
      query.date = new Date(
        filter.date
      );
    }
    const records = await this.attendanceRepository.findAll(
      query
    );
    const items = records.filter(
      (record) => {
        const fullName = record.employee?.fullName ?? `${record.employee?.firstName ?? ""} ${record.employee?.lastName ?? ""}`.trim();
        const matchesSearch = !filter.search || fullName.toLowerCase().includes(
          filter.search.toLowerCase()
        );
        const matchesDepartment = !filter.department || record.employee?.department === filter.department;
        return matchesSearch && matchesDepartment;
      }
    );
    return items;
  }
  async findOne(id) {
    const attendance = await this.attendanceRepository.findById(
      id
    );
    if (!attendance) {
      throw new import_common39.NotFoundException(
        "Attendance record not found."
      );
    }
    return attendance;
  }
  async update(id, dto) {
    const attendance = await this.attendanceRepository.update(
      id,
      dto
    );
    if (!attendance) {
      throw new import_common39.NotFoundException(
        "Attendance record not found."
      );
    }
    return attendance;
  }
  async remove(id) {
    await this.attendanceRepository.remove(
      id
    );
    return {
      message: "Attendance deleted successfully."
    };
  }
  async statistics() {
    return this.attendanceRepository.getStatistics();
  }
};
AttendanceService = __decorateClass([
  (0, import_common39.Injectable)(),
  __decorateParam(0, (0, import_common39.Inject)(AttendanceRepository))
], AttendanceService);

// src/attendance/controllers/attendance.controller.ts
var AttendanceController = class {
  constructor(attendanceService) {
    this.attendanceService = attendanceService;
  }
  attendanceService;
  create(dto) {
    return this.attendanceService.create(
      dto
    );
  }
  findAll(filter) {
    return this.attendanceService.findAll(
      filter
    );
  }
  statistics() {
    return this.attendanceService.statistics();
  }
  findOne(id) {
    return this.attendanceService.findOne(
      id
    );
  }
  update(id, dto) {
    return this.attendanceService.update(
      id,
      dto
    );
  }
  remove(id) {
    return this.attendanceService.remove(
      id
    );
  }
};
__decorateClass([
  (0, import_common40.Post)(),
  __decorateParam(0, (0, import_common40.Body)())
], AttendanceController.prototype, "create", 1);
__decorateClass([
  (0, import_common40.Get)(),
  __decorateParam(0, (0, import_common40.Query)())
], AttendanceController.prototype, "findAll", 1);
__decorateClass([
  (0, import_common40.Get)("statistics")
], AttendanceController.prototype, "statistics", 1);
__decorateClass([
  (0, import_common40.Get)(":id"),
  __decorateParam(0, (0, import_common40.Param)("id"))
], AttendanceController.prototype, "findOne", 1);
__decorateClass([
  (0, import_common40.Patch)(":id"),
  __decorateParam(0, (0, import_common40.Param)("id")),
  __decorateParam(1, (0, import_common40.Body)())
], AttendanceController.prototype, "update", 1);
__decorateClass([
  (0, import_common40.Delete)(":id"),
  __decorateParam(0, (0, import_common40.Param)("id"))
], AttendanceController.prototype, "remove", 1);
AttendanceController = __decorateClass([
  (0, import_common40.UseGuards)(JwtAuthGuard),
  (0, import_common40.Controller)("attendance"),
  __decorateParam(0, (0, import_common40.Inject)(AttendanceService))
], AttendanceController);

// src/attendance/mapper/attendance.mapper.ts
var import_common41 = require("@nestjs/common");
var AttendanceMapper = class {
  toResponse(attendance) {
    return {
      id: attendance._id.toString(),
      employeeId: attendance.employee?._id?.toString() ?? attendance.employee?.toString(),
      employeeName: attendance.employee?.fullName ?? `${attendance.employee?.firstName ?? ""} ${attendance.employee?.lastName ?? ""}`.trim(),
      avatar: attendance.employee?.avatar ?? "",
      department: attendance.employee?.department ?? "",
      date: attendance.date,
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      workingHours: attendance.workingHours,
      status: attendance.status,
      createdAt: attendance.createdAt,
      updatedAt: attendance.updatedAt
    };
  }
  toCollection(attendance) {
    return attendance.map(
      (item) => this.toResponse(item)
    );
  }
};
AttendanceMapper = __decorateClass([
  (0, import_common41.Injectable)()
], AttendanceMapper);

// src/attendance/attendance.module.ts
var AttendanceModule = class {
};
AttendanceModule = __decorateClass([
  (0, import_common42.Module)({
    imports: [
      import_mongoose29.MongooseModule.forFeature([
        {
          name: Attendance.name,
          schema: AttendanceSchema
        },
        {
          name: Employee.name,
          schema: EmployeeSchema
        }
      ])
    ],
    controllers: [
      AttendanceController
    ],
    providers: [
      AttendanceService,
      AttendanceRepository,
      AttendanceMapper
    ],
    exports: [
      AttendanceService,
      AttendanceRepository
    ]
  })
], AttendanceModule);

// src/calender/calender.module.ts
var import_common47 = require("@nestjs/common");
var import_mongoose35 = require("@nestjs/mongoose");

// src/calender/schemas/calendar-event.schema.ts
var import_mongoose30 = require("@nestjs/mongoose");
var import_mongoose31 = require("mongoose");

// src/calender/enums/calendar-event-type.enum.ts
var CalendarEventType = /* @__PURE__ */ ((CalendarEventType2) => {
  CalendarEventType2["MEETING"] = "Meeting";
  CalendarEventType2["PROJECT"] = "Project";
  CalendarEventType2["HOLIDAY"] = "Holiday";
  CalendarEventType2["BIRTHDAY"] = "Birthday";
  CalendarEventType2["LEAVE"] = "Leave";
  CalendarEventType2["INTERVIEW"] = "Interview";
  CalendarEventType2["DEADLINE"] = "Deadline";
  return CalendarEventType2;
})(CalendarEventType || {});

// src/calender/schemas/calendar-event.schema.ts
var CalendarEvent = class {
  title;
  description;
  type;
  date;
  startTime;
  endTime;
  location;
  attendees;
  color;
};
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    trim: true
  })
], CalendarEvent.prototype, "title", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: String,
    trim: true,
    default: ""
  })
], CalendarEvent.prototype, "description", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    enum: CalendarEventType
  })
], CalendarEvent.prototype, "type", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: Date,
    required: true
  })
], CalendarEvent.prototype, "date", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    trim: true
  })
], CalendarEvent.prototype, "startTime", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    trim: true
  })
], CalendarEvent.prototype, "endTime", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: String,
    trim: true,
    default: ""
  })
], CalendarEvent.prototype, "location", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: [
      {
        type: import_mongoose31.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  })
], CalendarEvent.prototype, "attendees", 2);
__decorateClass([
  (0, import_mongoose30.Prop)({
    type: String,
    default: "#06b6d4",
    trim: true
  })
], CalendarEvent.prototype, "color", 2);
CalendarEvent = __decorateClass([
  (0, import_mongoose30.Schema)({
    timestamps: true
  })
], CalendarEvent);
var CalendarEventSchema = import_mongoose30.SchemaFactory.createForClass(
  CalendarEvent
);

// src/calender/controller/calendar.controller.ts
var import_common46 = require("@nestjs/common");

// src/calender/service/calendar.service.ts
var import_common45 = require("@nestjs/common");
var import_mongoose34 = require("mongoose");

// src/calender/repository/calendar.repository.ts
var import_common43 = require("@nestjs/common");
var import_mongoose32 = require("@nestjs/mongoose");
var import_mongoose33 = require("mongoose");
var CalendarRepository = class {
  constructor(calendarModel) {
    this.calendarModel = calendarModel;
  }
  calendarModel;
  async create(data) {
    return this.calendarModel.create(
      data
    );
  }
  async findAll(filter) {
    const {
      search,
      type,
      page = "1",
      limit = "10",
      sortBy = "date",
      order = "asc"
    } = filter;
    const query = {};
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        },
        {
          location: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }
    if (type) {
      query.type = type;
    }
    const currentPage = Number(page);
    const pageSize = Number(limit);
    const total = await this.calendarModel.countDocuments(
      query
    );
    const items = await this.calendarModel.find(query).populate(
      "attendees",
      "firstName lastName email avatar"
    ).sort({
      [sortBy]: order === "asc" ? 1 : -1
    }).skip(
      (currentPage - 1) * pageSize
    ).limit(pageSize).lean();
    return {
      items,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(
          total / pageSize
        )
      }
    };
  }
  async findById(id) {
    return this.calendarModel.findById(id).populate(
      "attendees",
      "firstName lastName email avatar"
    );
  }
  async update(id, data) {
    return this.calendarModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true
      }
    ).populate(
      "attendees",
      "firstName lastName email avatar"
    );
  }
  async remove(id) {
    return this.calendarModel.findByIdAndDelete(
      id
    );
  }
  async statistics() {
    const today = /* @__PURE__ */ new Date();
    today.setHours(
      0,
      0,
      0,
      0
    );
    const tomorrow = new Date(
      today
    );
    tomorrow.setDate(
      tomorrow.getDate() + 1
    );
    const [
      total,
      todayEvents,
      meetings,
      birthdays,
      deadlines
    ] = await Promise.all([
      this.calendarModel.countDocuments(),
      this.calendarModel.countDocuments(
        {
          date: {
            $gte: today,
            $lt: tomorrow
          }
        }
      ),
      this.calendarModel.countDocuments(
        {
          type: "Meeting"
        }
      ),
      this.calendarModel.countDocuments(
        {
          type: "Birthday"
        }
      ),
      this.calendarModel.countDocuments(
        {
          type: "Deadline"
        }
      )
    ]);
    return {
      total,
      todayEvents,
      meetings,
      birthdays,
      deadlines
    };
  }
  async upcoming(limit = 5) {
    return this.calendarModel.find({
      date: {
        $gte: /* @__PURE__ */ new Date()
      }
    }).populate(
      "attendees",
      "firstName lastName email avatar"
    ).sort({
      date: 1,
      startTime: 1
    }).limit(limit).lean();
  }
};
CalendarRepository = __decorateClass([
  (0, import_common43.Injectable)(),
  __decorateParam(0, (0, import_mongoose32.InjectModel)(
    CalendarEvent.name
  )),
  __decorateParam(0, (0, import_common43.Inject)(import_mongoose33.Model))
], CalendarRepository);

// src/calender/mapper/calendar.mapper.ts
var import_common44 = require("@nestjs/common");
var CalendarMapper = class {
  toResponse(event) {
    if (!event) {
      return null;
    }
    return {
      id: event._id?.toString() ?? event.id,
      title: event.title,
      description: event.description,
      type: event.type,
      date: this.formatDate(
        event.date
      ),
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      attendees: this.mapAttendees(
        event.attendees
      ),
      color: event.color
    };
  }
  toList(events) {
    return events.map(
      (event) => this.toResponse(
        event
      )
    );
  }
  mapAttendees(attendees = []) {
    return attendees.map(
      (employee) => {
        if (typeof employee === "string") {
          return employee;
        }
        return employee.fullName ?? `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
      }
    );
  }
  formatDate(value) {
    if (!value) {
      return "";
    }
    return new Date(value).toISOString().split("T")[0];
  }
};
CalendarMapper = __decorateClass([
  (0, import_common44.Injectable)()
], CalendarMapper);

// src/calender/service/calendar.service.ts
var CalendarService = class {
  constructor(calendarRepository, calendarMapper) {
    this.calendarRepository = calendarRepository;
    this.calendarMapper = calendarMapper;
  }
  calendarRepository;
  calendarMapper;
  async create(dto) {
    const event = await this.calendarRepository.create({
      title: dto.title,
      description: dto.description,
      type: dto.type,
      date: new Date(dto.date),
      startTime: dto.startTime,
      endTime: dto.endTime,
      location: dto.location,
      attendees: dto.attendees?.map(
        (id) => new import_mongoose34.Types.ObjectId(id)
      ) ?? [],
      color: dto.color
    });
    return this.calendarMapper.toResponse(
      event
    );
  }
  async findAll(filter) {
    const result = await this.calendarRepository.findAll(
      filter
    );
    return {
      items: this.calendarMapper.toList(
        result.items
      ),
      pagination: result.pagination
    };
  }
  async findOne(id) {
    const event = await this.calendarRepository.findById(
      id
    );
    if (!event) {
      throw new import_common45.NotFoundException(
        "Calendar event not found."
      );
    }
    return this.calendarMapper.toResponse(
      event
    );
  }
  async update(id, dto) {
    const updateData = {};
    if (dto.title !== void 0) {
      updateData.title = dto.title;
    }
    if (dto.description !== void 0) {
      updateData.description = dto.description;
    }
    if (dto.type !== void 0) {
      updateData.type = dto.type;
    }
    if (dto.date !== void 0) {
      updateData.date = new Date(
        dto.date
      );
    }
    if (dto.startTime !== void 0) {
      updateData.startTime = dto.startTime;
    }
    if (dto.endTime !== void 0) {
      updateData.endTime = dto.endTime;
    }
    if (dto.location !== void 0) {
      updateData.location = dto.location;
    }
    if (dto.attendees !== void 0) {
      updateData.attendees = dto.attendees.map(
        (id2) => new import_mongoose34.Types.ObjectId(id2)
      );
    }
    if (dto.color !== void 0) {
      updateData.color = dto.color;
    }
    const event = await this.calendarRepository.update(
      id,
      updateData
    );
    if (!event) {
      throw new import_common45.NotFoundException(
        "Calendar event not found."
      );
    }
    return this.calendarMapper.toResponse(
      event
    );
  }
  async remove(id) {
    const event = await this.calendarRepository.remove(
      id
    );
    if (!event) {
      throw new import_common45.NotFoundException(
        "Calendar event not found."
      );
    }
    return {
      message: "Calendar event deleted successfully."
    };
  }
  async statistics() {
    return this.calendarRepository.statistics();
  }
  async upcoming() {
    const events = await this.calendarRepository.upcoming();
    return this.calendarMapper.toList(
      events
    );
  }
};
CalendarService = __decorateClass([
  (0, import_common45.Injectable)(),
  __decorateParam(0, (0, import_common45.Inject)(CalendarRepository)),
  __decorateParam(1, (0, import_common45.Inject)(CalendarMapper))
], CalendarService);

// src/calender/controller/calendar.controller.ts
var CalendarController = class {
  constructor(calendarService) {
    this.calendarService = calendarService;
  }
  calendarService;
  create(dto) {
    return this.calendarService.create(
      dto
    );
  }
  findAll(filter) {
    return this.calendarService.findAll(
      filter
    );
  }
  statistics() {
    return this.calendarService.statistics();
  }
  upcoming() {
    return this.calendarService.upcoming();
  }
  findOne(id) {
    return this.calendarService.findOne(
      id
    );
  }
  update(id, dto) {
    return this.calendarService.update(
      id,
      dto
    );
  }
  remove(id) {
    return this.calendarService.remove(
      id
    );
  }
};
__decorateClass([
  (0, import_common46.Post)(),
  __decorateParam(0, (0, import_common46.Body)())
], CalendarController.prototype, "create", 1);
__decorateClass([
  (0, import_common46.Get)(),
  __decorateParam(0, (0, import_common46.Query)())
], CalendarController.prototype, "findAll", 1);
__decorateClass([
  (0, import_common46.Get)("statistics")
], CalendarController.prototype, "statistics", 1);
__decorateClass([
  (0, import_common46.Get)("upcoming")
], CalendarController.prototype, "upcoming", 1);
__decorateClass([
  (0, import_common46.Get)(":id"),
  __decorateParam(0, (0, import_common46.Param)("id"))
], CalendarController.prototype, "findOne", 1);
__decorateClass([
  (0, import_common46.Patch)(":id"),
  __decorateParam(0, (0, import_common46.Param)("id")),
  __decorateParam(1, (0, import_common46.Body)())
], CalendarController.prototype, "update", 1);
__decorateClass([
  (0, import_common46.Delete)(":id"),
  __decorateParam(0, (0, import_common46.Param)("id"))
], CalendarController.prototype, "remove", 1);
CalendarController = __decorateClass([
  (0, import_common46.UseGuards)(JwtAuthGuard),
  (0, import_common46.Controller)("calendar"),
  __decorateParam(0, (0, import_common46.Inject)(CalendarService))
], CalendarController);

// src/calender/calender.module.ts
var CalendarModule = class {
};
CalendarModule = __decorateClass([
  (0, import_common47.Module)({
    imports: [
      import_mongoose35.MongooseModule.forFeature([
        {
          name: CalendarEvent.name,
          schema: CalendarEventSchema
        }
      ])
    ],
    controllers: [
      CalendarController
    ],
    providers: [
      CalendarRepository,
      CalendarMapper,
      CalendarService
    ],
    exports: [
      CalendarService,
      CalendarRepository
    ]
  })
], CalendarModule);

// src/chat/chat.module.ts
var import_common53 = require("@nestjs/common");
var import_mongoose44 = require("@nestjs/mongoose");
var import_platform_express3 = require("@nestjs/platform-express");

// src/chat/controller/chat.controller.ts
var import_common52 = require("@nestjs/common");
var import_platform_express2 = require("@nestjs/platform-express");
var import_swagger3 = require("@nestjs/swagger");

// src/chat/service/chat.service.ts
var import_common51 = require("@nestjs/common");

// src/chat/repository/chat.repository.ts
var import_common48 = require("@nestjs/common");
var import_mongoose40 = require("@nestjs/mongoose");
var import_mongoose41 = require("mongoose");

// src/chat/schema/conversation.schema.ts
var import_mongoose36 = require("@nestjs/mongoose");
var import_mongoose37 = require("mongoose");

// src/chat/enums/conversation-type.enum.ts
var ConversationType = /* @__PURE__ */ ((ConversationType2) => {
  ConversationType2["DIRECT"] = "DIRECT";
  ConversationType2["GROUP"] = "GROUP";
  return ConversationType2;
})(ConversationType || {});

// src/chat/schema/conversation.schema.ts
var Conversation = class {
  participants;
  type;
  lastMessage;
  lastMessageAt;
  createdAt;
  updatedAt;
};
__decorateClass([
  (0, import_mongoose36.Prop)({
    type: [
      {
        type: import_mongoose37.Types.ObjectId,
        ref: Employee.name
      }
    ],
    required: true,
    validate: {
      validator: (participants) => participants.length >= 2,
      message: "Conversation must contain at least two participants."
    }
  })
], Conversation.prototype, "participants", 2);
__decorateClass([
  (0, import_mongoose36.Prop)({
    type: String,
    enum: ConversationType,
    default: "DIRECT" /* DIRECT */
  })
], Conversation.prototype, "type", 2);
__decorateClass([
  (0, import_mongoose36.Prop)({
    type: String,
    trim: true,
    default: ""
  })
], Conversation.prototype, "lastMessage", 2);
__decorateClass([
  (0, import_mongoose36.Prop)({
    type: Date,
    default: null
  })
], Conversation.prototype, "lastMessageAt", 2);
Conversation = __decorateClass([
  (0, import_mongoose36.Schema)({
    timestamps: true,
    versionKey: false
  })
], Conversation);
var ConversationSchema = import_mongoose36.SchemaFactory.createForClass(
  Conversation
);
ConversationSchema.index({
  participants: 1
});
ConversationSchema.index({
  updatedAt: -1
});
ConversationSchema.index({
  participants: 1,
  type: 1
});

// src/chat/schema/message.schema.ts
var import_mongoose38 = require("@nestjs/mongoose");
var import_mongoose39 = require("mongoose");

// src/chat/enums/message-status.enum.ts
var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2["TEXT"] = "TEXT";
  MessageType2["IMAGE"] = "IMAGE";
  MessageType2["FILE"] = "FILE";
  MessageType2["VOICE"] = "VOICE";
  MessageType2["AUDIO_CALL"] = "AUDIO_CALL";
  MessageType2["VIDEO_CALL"] = "VIDEO_CALL";
  MessageType2["SYSTEM"] = "SYSTEM";
  return MessageType2;
})(MessageType || {});
var CallLogStatus = /* @__PURE__ */ ((CallLogStatus2) => {
  CallLogStatus2["COMPLETED"] = "COMPLETED";
  CallLogStatus2["MISSED"] = "MISSED";
  CallLogStatus2["DECLINED"] = "DECLINED";
  return CallLogStatus2;
})(CallLogStatus || {});

// src/chat/schema/message.schema.ts
var Message = class {
  conversation;
  sender;
  type;
  content;
  attachment;
  fileName;
  fileSize;
  replyTo;
  edited;
  editedAt;
  deleted;
  deletedAt;
  read;
  readAt;
  seenBy;
  reactions;
  callStatus;
  callDuration;
  createdAt;
  updatedAt;
};
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: import_mongoose39.Types.ObjectId,
    ref: Conversation.name,
    required: true,
    index: true
  })
], Message.prototype, "conversation", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: import_mongoose39.Types.ObjectId,
    ref: Employee.name,
    required: true,
    index: true
  })
], Message.prototype, "sender", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: String,
    enum: MessageType,
    default: "TEXT" /* TEXT */,
    required: true
  })
], Message.prototype, "type", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: String,
    trim: true,
    maxlength: 5e3,
    default: ""
  })
], Message.prototype, "content", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: String,
    trim: true,
    default: ""
  })
], Message.prototype, "attachment", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: String,
    trim: true,
    default: ""
  })
], Message.prototype, "fileName", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Number,
    default: 0
  })
], Message.prototype, "fileSize", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: import_mongoose39.Types.ObjectId,
    ref: Message.name,
    default: null
  })
], Message.prototype, "replyTo", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Boolean,
    default: false
  })
], Message.prototype, "edited", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Date,
    default: null
  })
], Message.prototype, "editedAt", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Boolean,
    default: false
  })
], Message.prototype, "deleted", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Date,
    default: null
  })
], Message.prototype, "deletedAt", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Boolean,
    default: false
  })
], Message.prototype, "read", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Date,
    default: null
  })
], Message.prototype, "readAt", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: [
      {
        type: import_mongoose39.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  })
], Message.prototype, "seenBy", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: [
      {
        emoji: {
          type: String
        },
        employee: {
          type: import_mongoose39.Types.ObjectId,
          ref: Employee.name
        }
      }
    ],
    default: []
  })
], Message.prototype, "reactions", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: String,
    enum: CallLogStatus,
    default: null
  })
], Message.prototype, "callStatus", 2);
__decorateClass([
  (0, import_mongoose38.Prop)({
    type: Number,
    default: 0
  })
], Message.prototype, "callDuration", 2);
Message = __decorateClass([
  (0, import_mongoose38.Schema)({
    timestamps: true,
    versionKey: false
  })
], Message);
var MessageSchema = import_mongoose38.SchemaFactory.createForClass(Message);
MessageSchema.index({
  conversation: 1,
  createdAt: 1
});
MessageSchema.index({
  sender: 1
});
MessageSchema.index({
  read: 1
});
MessageSchema.index({
  deleted: 1
});
MessageSchema.index({
  conversation: 1,
  read: 1
});

// src/chat/repository/chat.repository.ts
var ChatRepository = class {
  constructor(conversationModel, messageModel) {
    this.conversationModel = conversationModel;
    this.messageModel = messageModel;
  }
  conversationModel;
  messageModel;
  // =====================================================
  // Conversation
  // =====================================================
  async createConversation(participants) {
    return this.conversationModel.create({
      participants: participants.map(
        (id) => new import_mongoose41.Types.ObjectId(id)
      )
    });
  }
  async findConversationById(id) {
    return this.conversationModel.findById(id).populate({
      path: "participants",
      populate: {
        path: "user",
        select: "_id email firstName lastName avatar role"
      }
    });
  }
  async findConversationBetweenUsers(firstEmployeeId, secondEmployeeId) {
    return this.conversationModel.findOne({
      participants: {
        $all: [
          new import_mongoose41.Types.ObjectId(firstEmployeeId),
          new import_mongoose41.Types.ObjectId(secondEmployeeId)
        ],
        $size: 2
      }
    }).populate({
      path: "participants",
      populate: {
        path: "user",
        select: "_id email firstName lastName avatar role"
      }
    });
  }
  async findUserConversations(employeeId, filter) {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 20;
    const skip = (page - 1) * limit;
    const query = {
      participants: new import_mongoose41.Types.ObjectId(employeeId)
    };
    if (filter.search?.trim()) {
      query.$or = [
        {
          lastMessage: {
            $regex: filter.search,
            $options: "i"
          }
        }
      ];
    }
    const [
      items,
      total
    ] = await Promise.all([
      this.conversationModel.find(query).populate({
        path: "participants",
        populate: {
          path: "user",
          select: "_id email firstName lastName avatar role"
        }
      }).sort({
        lastMessageAt: -1,
        updatedAt: -1
      }).skip(skip).limit(limit),
      this.conversationModel.countDocuments(
        query
      )
    ]);
    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  async updateConversationLastMessage(conversationId, content) {
    return this.conversationModel.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: content,
        lastMessageAt: /* @__PURE__ */ new Date()
      },
      {
        new: true
      }
    );
  }
  // =====================================================
  // Messages
  // =====================================================
  async createMessage(data) {
    return this.messageModel.create(
      data
    );
  }
  async findMessages(conversationId, filter) {
    console.log("========== FIND MESSAGES ==========");
    console.log("conversationId:", conversationId);
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 50;
    const skip = (page - 1) * limit;
    const query = {
      conversation: new import_mongoose41.Types.ObjectId(
        conversationId
      )
    };
    console.log("Mongo Query:", query);
    const items = await this.messageModel.find(query).populate({
      path: "sender",
      select: [
        "firstName",
        "lastName",
        "fullName",
        "avatar",
        "designation",
        "department",
        "status",
        "user"
      ].join(" "),
      populate: {
        path: "user",
        select: "_id"
      }
    }).populate("replyTo").sort({
      createdAt: 1
    }).skip(skip).limit(limit);
    console.log("Found Messages:", items.length);
    console.log(items);
    const total = await this.messageModel.countDocuments(
      query
    );
    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  async findMessageById(id) {
    return this.messageModel.findById(id).populate({
      path: "sender",
      select: [
        "firstName",
        "lastName",
        "fullName",
        "avatar",
        "designation",
        "department",
        "status",
        "user"
      ].join(" "),
      populate: {
        path: "user",
        select: "_id"
      }
    }).populate("replyTo");
  }
  async updateMessage(id, content) {
    return this.messageModel.findByIdAndUpdate(
      id,
      {
        content,
        edited: true,
        editedAt: /* @__PURE__ */ new Date()
      },
      {
        new: true
      }
    ).populate({
      path: "sender",
      select: [
        "firstName",
        "lastName",
        "fullName",
        "avatar",
        "designation",
        "department",
        "status",
        "user"
      ].join(" "),
      populate: {
        path: "user",
        select: "_id"
      }
    }).populate("replyTo");
  }
  async deleteMessage(id) {
    return this.messageModel.findByIdAndUpdate(
      id,
      {
        deleted: true,
        deletedAt: /* @__PURE__ */ new Date(),
        content: "This message was deleted."
      },
      {
        new: true
      }
    ).populate({
      path: "sender",
      select: [
        "firstName",
        "lastName",
        "fullName",
        "avatar",
        "designation",
        "department",
        "status",
        "user"
      ].join(" "),
      populate: {
        path: "user",
        select: "_id"
      }
    }).populate("replyTo");
  }
  async markConversationAsRead(conversationId, employeeId) {
    return this.messageModel.updateMany(
      {
        conversation: new import_mongoose41.Types.ObjectId(
          conversationId
        ),
        sender: {
          $ne: new import_mongoose41.Types.ObjectId(
            employeeId
          )
        },
        read: false
      },
      {
        read: true,
        readAt: /* @__PURE__ */ new Date()
      }
    );
  }
  async getUnreadCount(employeeId) {
    return this.messageModel.countDocuments(
      {
        sender: {
          $ne: new import_mongoose41.Types.ObjectId(
            employeeId
          )
        },
        read: false
      }
    );
  }
};
ChatRepository = __decorateClass([
  (0, import_common48.Injectable)(),
  __decorateParam(0, (0, import_mongoose40.InjectModel)(Conversation.name)),
  __decorateParam(0, (0, import_common48.Inject)(import_mongoose41.Model)),
  __decorateParam(1, (0, import_mongoose40.InjectModel)(Message.name)),
  __decorateParam(1, (0, import_common48.Inject)(import_mongoose41.Model))
], ChatRepository);

// src/chat/mapper/chat.mapper.ts
var import_common49 = require("@nestjs/common");
var ChatMapper = class {
  // =====================================================
  // Conversation
  // =====================================================
  toConversation(conversation, currentEmployeeId) {
    const participants = conversation.participants;
    const otherParticipant = participants.find(
      (employee) => employee._id.toString() !== currentEmployeeId
    );
    return {
      id: conversation._id.toString(),
      participant: {
        id: otherParticipant?._id?.toString(),
        employeeId: otherParticipant?.employeeId ?? "",
        userId: otherParticipant?.user?._id?.toString(),
        firstName: otherParticipant?.firstName ?? "",
        lastName: otherParticipant?.lastName ?? "",
        fullName: otherParticipant?.fullName ?? `${otherParticipant?.firstName ?? ""} ${otherParticipant?.lastName ?? ""}`.trim(),
        avatar: otherParticipant?.avatar ?? "",
        designation: otherParticipant?.designation ?? "",
        department: otherParticipant?.department ?? "",
        status: otherParticipant?.status ?? null,
        online: otherParticipant?.online ?? false
      },
      type: conversation.type,
      lastMessage: conversation.lastMessage ?? "",
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt
    };
  }
  toConversationList(response, currentEmployeeId) {
    return {
      items: response.items.map(
        (conversation) => this.toConversation(
          conversation,
          currentEmployeeId
        )
      ),
      pagination: response.pagination
    };
  }
  // =====================================================
  // Message
  // =====================================================
  toMessage(message, currentEmployeeId) {
    const sender = message.sender;
    return {
      id: message._id.toString(),
      userId: sender?.user?._id?.toString(),
      conversation: message.conversation.toString(),
      sender: {
        id: sender?._id?.toString(),
        firstName: sender?.firstName ?? "",
        lastName: sender?.lastName ?? "",
        fullName: sender?.fullName ?? `${sender?.firstName ?? ""} ${sender?.lastName ?? ""}`.trim(),
        avatar: sender?.avatar ?? ""
      },
      type: message.type,
      content: message.content,
      attachment: message.attachment,
      fileName: message.fileName,
      fileSize: message.fileSize,
      /**
       * Call log fields — only meaningful when type is
       * AUDIO_CALL or VIDEO_CALL.
       */
      callStatus: message.callStatus ?? void 0,
      callDuration: message.callDuration ?? 0,
      edited: message.edited,
      editedAt: message.editedAt,
      deleted: message.deleted,
      deletedAt: message.deletedAt,
      read: message.read,
      readAt: message.readAt,
      replyTo: message.replyTo ? message.replyTo._id?.toString?.() ?? message.replyTo.toString() : null,
      isMine: currentEmployeeId ? sender?._id?.toString() === currentEmployeeId : false,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    };
  }
  toMessageList(response, currentEmployeeId) {
    return {
      items: response.items.map(
        (message) => this.toMessage(
          message,
          currentEmployeeId
        )
      ),
      pagination: response.pagination
    };
  }
};
ChatMapper = __decorateClass([
  (0, import_common49.Injectable)()
], ChatMapper);

// src/chat/gateway/chat.gateway.ts
var import_websockets = require("@nestjs/websockets");
var import_mongoose42 = require("mongoose");
var import_common50 = require("@nestjs/common");
var ChatGateway = class {
  constructor(repository, mapper) {
    this.repository = repository;
    this.mapper = mapper;
  }
  repository;
  mapper;
  server;
  /**
   * Employee presence
   *
   * employeeId
   *      |
   *      |-- socketId
   *      |-- socketId
   *
   * Supports:
   *
   * - multiple browser tabs
   * - multiple devices
   * - reconnects
   */
  users = /* @__PURE__ */ new Map();
  /**
   * Active calls
   *
   * conversationId
   *          |
   *          Call session
   */
  activeCalls = /* @__PURE__ */ new Map();
  /**
   * How long an outgoing call is allowed to ring before it is
   * automatically resolved as a missed call.
   */
  RING_TIMEOUT_MS = 45e3;
  // =====================================================
  // Connection
  // =====================================================
  handleConnection(client) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F50C} SOCKET CONNECTED"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket ID:"
    );
    console.log(
      client.id
    );
    console.log(
      "--------------------------------"
    );
    console.log(
      "Handshake Query:"
    );
    console.log(
      client.handshake.query
    );
    console.log(
      "--------------------------------"
    );
    console.log(
      "Handshake Auth:"
    );
    console.log(
      client.handshake.auth
    );
    console.log(
      "--------------------------------"
    );
    console.log(
      "Client Rooms:"
    );
    console.log(
      [
        ...client.rooms
      ]
    );
    console.log(
      "--------------------------------"
    );
    console.log(
      "Connected Clients:"
    );
    console.log(
      this.server.engine.clientsCount
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  handleDisconnect(client) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F50C} SOCKET DISCONNECTED"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket ID:"
    );
    console.log(
      client.id
    );
    console.log(
      "--------------------------------"
    );
    let disconnectedEmployee = null;
    console.log(
      "Users BEFORE cleanup"
    );
    console.table(
      [
        ...this.users.entries()
      ].map(
        ([
          employeeId,
          sockets
        ]) => ({
          employeeId,
          sockets: [
            ...sockets
          ]
        })
      )
    );
    for (const [
      employeeId,
      socketIds
    ] of this.users) {
      if (socketIds.has(
        client.id
      )) {
        disconnectedEmployee = employeeId;
        socketIds.delete(
          client.id
        );
        console.log(
          "Removed socket:"
        );
        console.log(
          client.id
        );
        console.log(
          "Employee:"
        );
        console.log(
          employeeId
        );
        if (socketIds.size === 0) {
          this.users.delete(
            employeeId
          );
          this.emitUserOffline(
            employeeId
          );
        }
        break;
      }
    }
    console.log(
      "--------------------------------"
    );
    console.log(
      "Users AFTER cleanup"
    );
    console.table(
      [
        ...this.users.entries()
      ].map(
        ([
          employeeId,
          sockets
        ]) => ({
          employeeId,
          sockets: [
            ...sockets
          ]
        })
      )
    );
    if (disconnectedEmployee) {
      console.log(
        "Checking Active Calls"
      );
      for (const [
        conversationId,
        call
      ] of this.activeCalls) {
        if (call.callerId === disconnectedEmployee || call.receiverId === disconnectedEmployee) {
          console.log(
            "Ending call:"
          );
          console.log(
            conversationId
          );
          if (call.ringTimeout) {
            clearTimeout(
              call.ringTimeout
            );
          }
          this.server.to(
            call.callerId
          ).emit(
            "call:ended",
            {
              conversationId
            }
          );
          this.server.to(
            call.receiverId
          ).emit(
            "call:ended",
            {
              conversationId
            }
          );
          this.activeCalls.delete(
            conversationId
          );
          const outcome = call.status === "accepted" ? "COMPLETED" /* COMPLETED */ : "MISSED" /* MISSED */;
          void this.logCallOutcome(
            call,
            outcome
          );
        }
      }
    }
    console.log(
      "Remaining Users:"
    );
    console.log(
      [
        ...this.users.keys()
      ]
    );
    console.log(
      "Active Calls:"
    );
    console.table(
      [
        ...this.activeCalls.entries()
      ]
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  emitUserOffline(employeeId) {
    console.log(
      "\u{1F534} USER OFFLINE:",
      employeeId
    );
    this.server.emit(
      "user:offline",
      {
        employeeId
      }
    );
  }
  join(client, employeeId) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F464} USER JOIN"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket:"
    );
    console.log(
      client.id
    );
    console.log(
      "Employee:"
    );
    console.log(
      employeeId
    );
    console.log(
      "Users BEFORE"
    );
    console.table(
      [
        ...this.users.entries()
      ].map(
        ([
          id,
          sockets2
        ]) => ({
          employeeId: id,
          sockets: [
            ...sockets2
          ]
        })
      )
    );
    if (!this.users.has(
      employeeId
    )) {
      this.users.set(
        employeeId,
        /* @__PURE__ */ new Set()
      );
    }
    const sockets = this.users.get(
      employeeId
    );
    const wasOffline = sockets.size === 0;
    sockets.add(
      client.id
    );
    client.join(
      employeeId
    );
    console.log(
      "Users AFTER"
    );
    console.table(
      [
        ...this.users.entries()
      ].map(
        ([
          id,
          sockets2
        ]) => ({
          employeeId: id,
          sockets: [
            ...sockets2
          ]
        })
      )
    );
    console.log(
      "Client Rooms:"
    );
    console.log(
      [
        ...client.rooms
      ]
    );
    if (wasOffline) {
      this.emitUserOnline(
        employeeId
      );
    }
    console.log(
      "======================================================"
    );
    console.log("\n");
    return {
      success: true
    };
  }
  emitUserOnline(employeeId) {
    console.log(
      "\u{1F7E2} USER ONLINE:",
      employeeId
    );
    this.server.emit(
      "user:online",
      {
        employeeId
      }
    );
  }
  joinConversation(client, conversationId) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F4AC} CONVERSATION JOIN"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket:"
    );
    console.log(
      client.id
    );
    console.log(
      "Conversation:"
    );
    console.log(
      conversationId
    );
    console.log(
      "Rooms BEFORE"
    );
    console.log(
      [
        ...client.rooms
      ]
    );
    client.join(
      conversationId
    );
    console.log(
      "Rooms AFTER"
    );
    console.log(
      [
        ...client.rooms
      ]
    );
    const room = this.server.sockets.adapter.rooms.get(
      conversationId
    );
    console.log(
      "Participants:"
    );
    console.log(
      room ? [
        ...room
      ] : []
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
    return {
      success: true
    };
  }
  leaveConversation(client, conversationId) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F6AA} CONVERSATION LEAVE"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket:"
    );
    console.log(
      client.id
    );
    console.log(
      "Conversation:"
    );
    console.log(
      conversationId
    );
    console.log(
      "Rooms BEFORE"
    );
    console.log(
      [
        ...client.rooms
      ]
    );
    client.leave(
      conversationId
    );
    console.log(
      "Rooms AFTER"
    );
    console.log(
      [
        ...client.rooms
      ]
    );
    const room = this.server.sockets.adapter.rooms.get(
      conversationId
    );
    console.log(
      "Remaining Participants:"
    );
    console.log(
      room ? [
        ...room
      ] : []
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
    return {
      success: true
    };
  }
  startCall(payload) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F4DE} CALL START"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Conversation:"
    );
    console.log(
      payload.conversationId
    );
    console.log(
      "Caller:"
    );
    console.log(
      payload.callerId
    );
    console.log(
      "Receiver:"
    );
    console.log(
      payload.receiverId
    );
    console.log(
      "Type:"
    );
    console.log(
      payload.type
    );
    if (this.activeCalls.has(
      payload.conversationId
    )) {
      console.log(
        "Call already exists."
      );
      return;
    }
    const call = {
      ...payload,
      status: "ringing",
      startedAt: /* @__PURE__ */ new Date()
    };
    call.ringTimeout = setTimeout(
      () => {
        this.handleMissedCall(
          payload.conversationId
        );
      },
      this.RING_TIMEOUT_MS
    );
    this.activeCalls.set(
      payload.conversationId,
      call
    );
    console.log(
      "Active Calls:"
    );
    console.table(
      [
        ...this.activeCalls.entries()
      ]
    );
    this.server.to(
      payload.receiverId
    ).emit(
      "call:incoming",
      payload
    );
    console.log(
      "Incoming call emitted."
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  acceptCall(payload) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u2705 CALL ACCEPT"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Conversation:"
    );
    console.log(
      payload.conversationId
    );
    const call = this.activeCalls.get(
      payload.conversationId
    );
    if (!call) {
      console.log(
        "No active call found."
      );
      return;
    }
    if (call.ringTimeout) {
      clearTimeout(
        call.ringTimeout
      );
      call.ringTimeout = void 0;
    }
    call.status = "accepted";
    call.acceptedAt = /* @__PURE__ */ new Date();
    this.activeCalls.set(
      payload.conversationId,
      call
    );
    console.log(
      "Active Calls:"
    );
    console.table(
      [
        ...this.activeCalls.entries()
      ]
    );
    this.server.to(
      payload.callerId
    ).emit(
      "call:accepted",
      payload
    );
    this.server.to(
      payload.receiverId
    ).emit(
      "call:accepted",
      payload
    );
    console.log(
      "Call accepted event emitted."
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  rejectCall(payload) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u274C CALL REJECT"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Conversation:"
    );
    console.log(
      payload.conversationId
    );
    const call = this.activeCalls.get(
      payload.conversationId
    );
    if (!call) {
      console.log(
        "No active call found."
      );
      return;
    }
    if (call.ringTimeout) {
      clearTimeout(
        call.ringTimeout
      );
    }
    this.activeCalls.delete(
      payload.conversationId
    );
    console.log(
      "Active Calls:"
    );
    console.table(
      [
        ...this.activeCalls.entries()
      ]
    );
    this.server.to(
      payload.callerId
    ).emit(
      "call:rejected",
      payload
    );
    this.server.to(
      payload.receiverId
    ).emit(
      "call:rejected",
      payload
    );
    console.log(
      "Call rejected event emitted."
    );
    void this.logCallOutcome(
      call,
      "DECLINED" /* DECLINED */
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  endCall(payload) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F4F4} CALL END"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Conversation:"
    );
    console.log(
      payload.conversationId
    );
    const call = this.activeCalls.get(
      payload.conversationId
    );
    if (!call) {
      console.log(
        "No active call found."
      );
      return;
    }
    if (call.ringTimeout) {
      clearTimeout(
        call.ringTimeout
      );
    }
    this.activeCalls.delete(
      payload.conversationId
    );
    console.log(
      "Active Calls:"
    );
    console.table(
      [
        ...this.activeCalls.entries()
      ]
    );
    this.server.to(
      payload.callerId
    ).emit(
      "call:ended",
      payload
    );
    this.server.to(
      payload.receiverId
    ).emit(
      "call:ended",
      payload
    );
    console.log(
      "Call ended event emitted."
    );
    const outcome = call.status === "accepted" ? "COMPLETED" /* COMPLETED */ : "MISSED" /* MISSED */;
    void this.logCallOutcome(
      call,
      outcome
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  offer(client, payload) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F4E1} WEBRTC OFFER"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket:"
    );
    console.log(
      client.id
    );
    console.log(
      "Conversation:"
    );
    console.log(
      payload.conversationId
    );
    console.log(
      "Sender:"
    );
    console.log(
      payload.senderId
    );
    console.log(
      "Receiver:"
    );
    console.log(
      payload.receiverId
    );
    console.log(
      "Signal:"
    );
    console.dir(
      payload.offer,
      {
        depth: null
      }
    );
    const receiverSockets = this.users.get(
      payload.receiverId
    );
    if (!receiverSockets || receiverSockets.size === 0) {
      console.log(
        "Receiver is offline."
      );
      return;
    }
    for (const socketId of receiverSockets) {
      this.server.to(
        socketId
      ).emit(
        "webrtc:offer",
        payload
      );
    }
    console.log(
      "Offer delivered."
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  answer(client, payload) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F4E1} WEBRTC ANSWER"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket:"
    );
    console.log(
      client.id
    );
    console.log(
      "Conversation:"
    );
    console.log(
      payload.conversationId
    );
    console.log(
      "Sender:"
    );
    console.log(
      payload.senderId
    );
    console.log(
      "Receiver:"
    );
    console.log(
      payload.receiverId
    );
    console.log(
      "Signal:"
    );
    console.dir(
      payload.offer,
      {
        depth: null
      }
    );
    const receiverSockets = this.users.get(
      payload.receiverId
    );
    if (!receiverSockets || receiverSockets.size === 0) {
      console.log(
        "Receiver is offline."
      );
      return;
    }
    for (const socketId of receiverSockets) {
      this.server.to(
        socketId
      ).emit(
        "webrtc:answer",
        payload
      );
    }
    console.log(
      "Answer delivered."
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  candidate(client, payload) {
    console.log("\n");
    console.log(
      "======================================================"
    );
    console.log(
      "\u{1F9CA} WEBRTC ICE CANDIDATE"
    );
    console.log(
      "======================================================"
    );
    console.log(
      "Socket:"
    );
    console.log(
      client.id
    );
    console.log(
      "Conversation:"
    );
    console.log(
      payload.conversationId
    );
    console.log(
      "Sender:"
    );
    console.log(
      payload.senderId
    );
    console.log(
      "Receiver:"
    );
    console.log(
      payload.receiverId
    );
    console.log(
      "Candidate:"
    );
    console.dir(
      payload.candidate,
      {
        depth: null
      }
    );
    const receiverSockets = this.users.get(
      payload.receiverId
    );
    if (!receiverSockets || receiverSockets.size === 0) {
      console.log(
        "Receiver is offline."
      );
      return;
    }
    for (const socketId of receiverSockets) {
      this.server.to(
        socketId
      ).emit(
        "webrtc:candidate",
        payload
      );
    }
    console.log(
      "ICE candidate delivered."
    );
    console.log(
      "======================================================"
    );
    console.log("\n");
  }
  // =====================================================
  // Call Logging
  // =====================================================
  /**
   * Persists a call as a message in the conversation once its
   * outcome is known (completed, missed, or declined), and
   * broadcasts it live via emitMessage so both participants'
   * chat threads update immediately.
   */
  async logCallOutcome(call, callStatus) {
    try {
      const duration = callStatus === "COMPLETED" /* COMPLETED */ && call.acceptedAt ? Math.max(
        0,
        Math.round(
          (Date.now() - call.acceptedAt.getTime()) / 1e3
        )
      ) : 0;
      const type = call.type === "video" ? "VIDEO_CALL" /* VIDEO_CALL */ : "AUDIO_CALL" /* AUDIO_CALL */;
      const created = await this.repository.createMessage({
        conversation: new import_mongoose42.Types.ObjectId(
          call.conversationId
        ),
        sender: new import_mongoose42.Types.ObjectId(
          call.callerId
        ),
        type,
        content: "",
        callStatus,
        callDuration: duration
      });
      const populated = await this.repository.findMessageById(
        created.id
      );
      if (!populated) {
        console.log(
          "Call message not found after creation."
        );
        return;
      }
      const lastMessage = callStatus === "MISSED" /* MISSED */ ? call.type === "video" ? "\u{1F3A5} Missed video call" : "\u{1F4DE} Missed audio call" : callStatus === "DECLINED" /* DECLINED */ ? "\u{1F4DE} Call declined" : call.type === "video" ? "\u{1F3A5} Video call" : "\u{1F4DE} Audio call";
      await this.repository.updateConversationLastMessage(
        call.conversationId,
        lastMessage
      );
      const response = this.mapper.toMessage(
        populated,
        call.callerId
      );
      this.emitMessage(
        call.conversationId,
        response
      );
      console.log(
        "\u{1F4DD} Call logged:",
        callStatus,
        "duration:",
        duration
      );
    } catch (error) {
      console.error(
        "Failed to log call message:",
        error
      );
    }
  }
  /**
   * Auto-resolves a call as MISSED if it is still ringing
   * after RING_TIMEOUT_MS with no accept/reject.
   */
  handleMissedCall(conversationId) {
    const call = this.activeCalls.get(
      conversationId
    );
    if (!call || call.status !== "ringing") {
      return;
    }
    console.log(
      "\u23F0 Call timed out (missed):",
      conversationId
    );
    this.activeCalls.delete(
      conversationId
    );
    this.server.to(
      call.callerId
    ).emit(
      "call:ended",
      {
        conversationId
      }
    );
    this.server.to(
      call.receiverId
    ).emit(
      "call:ended",
      {
        conversationId
      }
    );
    void this.logCallOutcome(
      call,
      "MISSED" /* MISSED */
    );
  }
  emitMessage(conversationId, message) {
    this.server.to(conversationId).emit(
      "message:new",
      message
    );
  }
  emitUpdatedMessage(conversationId, message) {
    this.server.to(conversationId).emit(
      "message:updated",
      message
    );
  }
  emitDeletedMessage(conversationId, payload) {
    this.server.to(conversationId).emit(
      "message:deleted",
      payload
    );
  }
  emitConversationRead(conversationId, payload) {
    this.server.to(conversationId).emit(
      "conversation:read",
      payload
    );
  }
};
__decorateClass([
  (0, import_websockets.WebSocketServer)()
], ChatGateway.prototype, "server", 2);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "user:join"
  ),
  __decorateParam(0, (0, import_websockets.ConnectedSocket)()),
  __decorateParam(1, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "join", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "conversation:join"
  ),
  __decorateParam(0, (0, import_websockets.ConnectedSocket)()),
  __decorateParam(1, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "joinConversation", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "conversation:leave"
  ),
  __decorateParam(0, (0, import_websockets.ConnectedSocket)()),
  __decorateParam(1, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "leaveConversation", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "call:start"
  ),
  __decorateParam(0, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "startCall", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "call:accept"
  ),
  __decorateParam(0, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "acceptCall", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "call:reject"
  ),
  __decorateParam(0, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "rejectCall", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "call:end"
  ),
  __decorateParam(0, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "endCall", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "webrtc:offer"
  ),
  __decorateParam(0, (0, import_websockets.ConnectedSocket)()),
  __decorateParam(1, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "offer", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "webrtc:answer"
  ),
  __decorateParam(0, (0, import_websockets.ConnectedSocket)()),
  __decorateParam(1, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "answer", 1);
__decorateClass([
  (0, import_websockets.SubscribeMessage)(
    "webrtc:candidate"
  ),
  __decorateParam(0, (0, import_websockets.ConnectedSocket)()),
  __decorateParam(1, (0, import_websockets.MessageBody)())
], ChatGateway.prototype, "candidate", 1);
ChatGateway = __decorateClass([
  (0, import_websockets.WebSocketGateway)({
    cors: {
      origin: "*"
    }
  }),
  __decorateParam(0, (0, import_common50.Inject)(ChatRepository)),
  __decorateParam(1, (0, import_common50.Inject)(ChatMapper))
], ChatGateway);

// src/chat/service/chat.service.ts
var import_mongoose43 = require("mongoose");
var ChatService = class {
  constructor(repository, employeesRepository, mapper, gateway, cloudinary2) {
    this.repository = repository;
    this.employeesRepository = employeesRepository;
    this.mapper = mapper;
    this.gateway = gateway;
    this.cloudinary = cloudinary2;
  }
  repository;
  employeesRepository;
  mapper;
  gateway;
  cloudinary;
  // =====================================================
  // Conversations
  // =====================================================
  async conversations(userId, filter) {
    const employeeId = await this.getEmployeeId(userId);
    const result = await this.repository.findUserConversations(
      employeeId,
      filter
    );
    return this.mapper.toConversationList(
      result,
      employeeId
    );
  }
  async createConversation(userId, dto) {
    const employeeId = await this.getEmployeeId(userId);
    if (employeeId === dto.participantId) {
      throw new import_common51.ForbiddenException(
        "You cannot create a conversation with yourself."
      );
    }
    const participant = await this.employeesRepository.findById(
      dto.participantId
    );
    if (!participant) {
      throw new import_common51.NotFoundException(
        "Employee not found."
      );
    }
    let conversation = await this.repository.findConversationBetweenUsers(
      employeeId,
      dto.participantId
    );
    if (!conversation) {
      const created = await this.repository.createConversation([
        employeeId,
        dto.participantId
      ]);
      conversation = await this.repository.findConversationById(
        created.id
      );
    }
    return this.mapper.toConversation(
      conversation,
      employeeId
    );
  }
  // =====================================================
  // Messages
  // =====================================================
  async messages(userId, conversationId, filter) {
    console.log("conversationId from controller:");
    console.log(conversationId);
    const employeeId = await this.getEmployeeId(userId);
    const conversation = await this.repository.findConversationById(
      conversationId
    );
    if (!conversation) {
      throw new import_common51.NotFoundException(
        "Conversation not found."
      );
    }
    const participants = conversation.participants;
    const isParticipant = participants.some(
      (participant) => participant._id.toString() === employeeId
    );
    if (!isParticipant) {
      throw new import_common51.ForbiddenException(
        "You are not a participant of this conversation."
      );
    }
    const result = await this.repository.findMessages(
      conversationId,
      filter
    );
    return this.mapper.toMessageList(
      result,
      employeeId
    );
  }
  async sendMessage(userId, dto) {
    const employeeId = await this.getEmployeeId(userId);
    const conversation = await this.repository.findConversationById(
      dto.conversationId
    );
    if (!conversation) {
      throw new import_common51.NotFoundException(
        "Conversation not found."
      );
    }
    const participants = conversation.participants;
    const isParticipant = participants.some(
      (participant) => participant._id.toString() === employeeId
    );
    if (!isParticipant) {
      throw new import_common51.ForbiddenException(
        "You are not a participant of this conversation."
      );
    }
    console.log("======================");
    console.log("DTO RECEIVED");
    console.log(dto);
    console.log("fileName =", dto.fileName);
    console.log("fileSize =", dto.fileSize);
    console.log("attachment =", dto.attachment);
    console.log("======================");
    console.log("SAVED MESSAGE");
    const message = await this.repository.createMessage({
      conversation: new import_mongoose43.Types.ObjectId(
        dto.conversationId
      ),
      sender: new import_mongoose43.Types.ObjectId(
        employeeId
      ),
      type: dto.type,
      content: dto.content ?? "",
      attachment: dto.attachment ?? "",
      fileName: dto.fileName ?? "",
      fileSize: dto.fileSize ?? 0,
      replyTo: dto.replyTo ? new import_mongoose43.Types.ObjectId(
        dto.replyTo
      ) : void 0
    });
    let lastMessage = dto.content;
    switch (dto.type) {
      case "IMAGE" /* IMAGE */:
        lastMessage = dto.content?.trim() ? `\u{1F4F7} ${dto.content}` : "\u{1F4F7} Photo";
        break;
      case "FILE" /* FILE */:
        lastMessage = dto.fileName ? `\u{1F4C4} ${dto.fileName}` : "\u{1F4C4} File";
        break;
      case "VOICE" /* VOICE */:
        lastMessage = "\u{1F3A4} Voice message";
        break;
      case "TEXT" /* TEXT */:
      default:
        lastMessage = dto.content;
        break;
    }
    await this.repository.updateConversationLastMessage(
      dto.conversationId,
      lastMessage
    );
    const populated = await this.repository.findMessageById(
      message.id
    );
    if (!populated) {
      throw new import_common51.NotFoundException(
        "Message not found after creation."
      );
    }
    const response = this.mapper.toMessage(
      populated,
      employeeId
    );
    this.gateway.emitMessage(
      dto.conversationId,
      response
    );
    return response;
  }
  async updateMessage(userId, messageId, dto) {
    const employeeId = await this.getEmployeeId(userId);
    const message = await this.repository.findMessageById(
      messageId
    );
    if (!message) {
      throw new import_common51.NotFoundException(
        "Message not found."
      );
    }
    const sender = message.sender;
    if (sender._id.toString() !== employeeId) {
      throw new import_common51.ForbiddenException(
        "You can edit only your own messages."
      );
    }
    const updated = await this.repository.updateMessage(
      messageId,
      dto.content
    );
    if (!updated) {
      throw new import_common51.NotFoundException(
        "Unable to update message."
      );
    }
    const response = this.mapper.toMessage(
      updated,
      employeeId
    );
    this.gateway.emitUpdatedMessage(
      response.conversation,
      response
    );
    return response;
  }
  async deleteMessage(userId, messageId) {
    const employeeId = await this.getEmployeeId(userId);
    const message = await this.repository.findMessageById(
      messageId
    );
    if (!message) {
      throw new import_common51.NotFoundException(
        "Message not found."
      );
    }
    const sender = message.sender;
    if (sender._id.toString() !== employeeId) {
      throw new import_common51.ForbiddenException(
        "You can delete only your own messages."
      );
    }
    const deleted = await this.repository.deleteMessage(
      messageId
    );
    if (!deleted) {
      throw new import_common51.NotFoundException(
        "Unable to delete message."
      );
    }
    const response = this.mapper.toMessage(
      deleted,
      employeeId
    );
    this.gateway.emitDeletedMessage(
      response.conversation,
      response.id
    );
    return response;
  }
  async markAsRead(conversationId, userId) {
    const employeeId = await this.getEmployeeId(userId);
    const conversation = await this.repository.findConversationById(
      conversationId
    );
    if (!conversation) {
      throw new import_common51.NotFoundException(
        "Conversation not found."
      );
    }
    const participants = conversation.participants;
    const isParticipant = participants.some(
      (participant) => participant._id.toString() === employeeId
    );
    if (!isParticipant) {
      throw new import_common51.ForbiddenException(
        "You are not a participant of this conversation."
      );
    }
    await this.repository.markConversationAsRead(
      conversationId,
      employeeId
    );
    this.gateway.emitConversationRead(
      conversationId,
      employeeId
    );
    return {
      success: true
    };
  }
  async unreadCount(userId) {
    const employeeId = await this.getEmployeeId(userId);
    const unread = await this.repository.getUnreadCount(
      employeeId
    );
    return {
      unread
    };
  }
  // =====================================================
  // Upload
  // =====================================================
  async uploadFile(file) {
    if (!file) {
      throw new import_common51.NotFoundException(
        "No file uploaded."
      );
    }
    const result = await this.cloudinary.uploadFile(
      file,
      "company-management/chat"
    );
    console.log(result);
    const isImage = file.mimetype.startsWith(
      "image/"
    );
    return {
      url: result.secure_url,
      publicId: result.public_id,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      type: isImage ? "IMAGE" : "FILE"
    };
  }
  // =====================================================
  // Helpers
  // =====================================================
  async getEmployeeId(userId) {
    const employee = await this.employeesRepository.findByUserId(
      userId
    );
    if (!employee) {
      throw new import_common51.NotFoundException(
        "Employee profile not found."
      );
    }
    return employee._id.toString();
  }
};
ChatService = __decorateClass([
  (0, import_common51.Injectable)(),
  __decorateParam(0, (0, import_common51.Inject)(ChatRepository)),
  __decorateParam(1, (0, import_common51.Inject)(EmployeesRepository)),
  __decorateParam(2, (0, import_common51.Inject)(ChatMapper)),
  __decorateParam(3, (0, import_common51.Inject)(ChatGateway)),
  __decorateParam(4, (0, import_common51.Inject)(CloudinaryService))
], ChatService);

// src/chat/controller/chat.controller.ts
var ChatController = class {
  constructor(service) {
    this.service = service;
  }
  service;
  conversations(req, filter) {
    return this.service.conversations(
      req.user.sub,
      filter
    );
  }
  createConversation(req, dto) {
    return this.service.createConversation(
      req.user.sub,
      dto
    );
  }
  messages(req, conversationId, filter) {
    return this.service.messages(
      req.user.sub,
      conversationId,
      filter
    );
  }
  async sendMessage(req, body) {
    console.log("============== SEND MESSAGE ==============");
    console.log(body);
    console.log("conversationId:", body.conversationId);
    console.log("type:", body.type);
    console.log("content:", body.content);
    console.log("attachment:", body.attachment);
    console.log("fileName:", body.fileName);
    console.log("fileSize:", body.fileSize);
    console.log("==========================================");
    return this.service.sendMessage(
      req.user.sub,
      body
    );
  }
  updateMessage(req, id, dto) {
    return this.service.updateMessage(
      req.user.sub,
      id,
      dto
    );
  }
  deleteMessage(req, id) {
    return this.service.deleteMessage(
      req.user.sub,
      id
    );
  }
  upload(file) {
    return this.service.uploadFile(
      file
    );
  }
  markAsRead(req, id) {
    return this.service.markAsRead(
      id,
      req.user.sub
    );
  }
  unreadCount(req) {
    return this.service.unreadCount(
      req.user.sub
    );
  }
};
__decorateClass([
  (0, import_common52.Get)("conversations"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)()),
  __decorateParam(1, (0, import_common52.Query)())
], ChatController.prototype, "conversations", 1);
__decorateClass([
  (0, import_common52.Post)("conversations"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)()),
  __decorateParam(1, (0, import_common52.Body)())
], ChatController.prototype, "createConversation", 1);
__decorateClass([
  (0, import_common52.Get)(
    "conversations/:conversationId/messages"
  ),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)()),
  __decorateParam(1, (0, import_common52.Param)("conversationId")),
  __decorateParam(2, (0, import_common52.Query)())
], ChatController.prototype, "messages", 1);
__decorateClass([
  (0, import_common52.Post)("messages"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)()),
  __decorateParam(1, (0, import_common52.Body)())
], ChatController.prototype, "sendMessage", 1);
__decorateClass([
  (0, import_common52.Patch)("messages/:id"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)()),
  __decorateParam(1, (0, import_common52.Param)("id")),
  __decorateParam(2, (0, import_common52.Body)())
], ChatController.prototype, "updateMessage", 1);
__decorateClass([
  (0, import_common52.Delete)("messages/:id"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)()),
  __decorateParam(1, (0, import_common52.Param)("id"))
], ChatController.prototype, "deleteMessage", 1);
__decorateClass([
  (0, import_common52.Post)("upload"),
  Roles(...VIEW_ROLES),
  (0, import_common52.UseInterceptors)(
    (0, import_platform_express2.FileInterceptor)("file")
  ),
  __decorateParam(0, (0, import_common52.UploadedFile)())
], ChatController.prototype, "upload", 1);
__decorateClass([
  (0, import_common52.Patch)("conversations/:id/read"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)()),
  __decorateParam(1, (0, import_common52.Param)("id"))
], ChatController.prototype, "markAsRead", 1);
__decorateClass([
  (0, import_common52.Get)("unread-count"),
  Roles(...VIEW_ROLES),
  __decorateParam(0, (0, import_common52.Req)())
], ChatController.prototype, "unreadCount", 1);
ChatController = __decorateClass([
  (0, import_swagger3.ApiTags)("Chat"),
  (0, import_swagger3.ApiBearerAuth)(),
  (0, import_common52.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  (0, import_common52.Controller)("chat"),
  __decorateParam(0, (0, import_common52.Inject)(ChatService))
], ChatController);

// src/chat/chat.module.ts
var ChatModule = class {
};
ChatModule = __decorateClass([
  (0, import_common53.Module)({
    imports: [
      EmployeesModule,
      CloudinaryModule,
      import_platform_express3.MulterModule.register({
        limits: {
          fileSize: 25 * 1024 * 1024
          // 25 MB
        }
      }),
      import_mongoose44.MongooseModule.forFeature([
        {
          name: Conversation.name,
          schema: ConversationSchema
        },
        {
          name: Message.name,
          schema: MessageSchema
        }
      ])
    ],
    controllers: [
      ChatController
    ],
    providers: [
      ChatService,
      ChatRepository,
      ChatMapper,
      ChatGateway
    ],
    exports: [
      ChatService,
      ChatRepository,
      ChatGateway
    ]
  })
], ChatModule);

// src/files/files.module.ts
var import_common58 = require("@nestjs/common");
var import_mongoose50 = require("@nestjs/mongoose");

// src/files/controllers/files.controller.ts
var import_common57 = require("@nestjs/common");
var import_platform_express4 = require("@nestjs/platform-express");

// src/files/services/files.service.ts
var import_common56 = require("@nestjs/common");
var import_mongoose49 = require("mongoose");

// src/files/repository/files.repository.ts
var import_common54 = require("@nestjs/common");
var import_mongoose47 = require("@nestjs/mongoose");
var import_mongoose48 = require("mongoose");

// src/files/schemas/file.schema.ts
var import_mongoose45 = require("@nestjs/mongoose");
var import_mongoose46 = require("mongoose");

// src/files/enums/file-type.enum.ts
var FileType = /* @__PURE__ */ ((FileType2) => {
  FileType2["FOLDER"] = "folder";
  FileType2["IMAGE"] = "image";
  FileType2["DOCUMENT"] = "document";
  FileType2["PDF"] = "pdf";
  FileType2["SPREADSHEET"] = "spreadsheet";
  FileType2["VIDEO"] = "video";
  FileType2["ARCHIVE"] = "archive";
  FileType2["OTHER"] = "other";
  return FileType2;
})(FileType || {});

// src/files/schemas/file.schema.ts
var File = class {
  name;
  originalName;
  extension;
  type;
  mimeType;
  size;
  url;
  thumbnail;
  parentFolder;
  owner;
  sharedWith;
  favoriteBy;
  isDeleted;
  createdBy;
  updatedBy;
  /**
   * @Schema({ timestamps: true }) adds these to the document at
   * runtime, but TypeScript only knows about class fields that are
   * actually declared — without this, files.mapper.ts can't read
   * file.createdAt / file.updatedAt.
   */
  createdAt;
  updatedAt;
};
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: String,
    required: true,
    trim: true
  })
], File.prototype, "name", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  })
], File.prototype, "originalName", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  })
], File.prototype, "extension", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: String,
    required: true,
    enum: FileType,
    default: "other" /* OTHER */
  })
], File.prototype, "type", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  })
], File.prototype, "mimeType", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: Number,
    default: 0
  })
], File.prototype, "size", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  })
], File.prototype, "url", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  })
], File.prototype, "thumbnail", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: File.name,
    default: null
  })
], File.prototype, "parentFolder", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: Employee.name,
    required: true
  })
], File.prototype, "owner", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: [
      {
        type: import_mongoose46.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  })
], File.prototype, "sharedWith", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: [
      {
        type: import_mongoose46.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  })
], File.prototype, "favoriteBy", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: Boolean,
    default: false
  })
], File.prototype, "isDeleted", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: Employee.name,
    required: true
  })
], File.prototype, "createdBy", 2);
__decorateClass([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: Employee.name,
    required: true
  })
], File.prototype, "updatedBy", 2);
File = __decorateClass([
  (0, import_mongoose45.Schema)({
    timestamps: true
  })
], File);
var FileSchema = import_mongoose45.SchemaFactory.createForClass(File);
FileSchema.index({
  owner: 1
});
FileSchema.index({
  parentFolder: 1
});
FileSchema.index({
  sharedWith: 1
});
FileSchema.index({
  favoriteBy: 1
});
FileSchema.index({
  type: 1
});
FileSchema.index({
  name: "text"
});

// src/files/repository/files.repository.ts
var FilesRepository = class {
  constructor(fileModel) {
    this.fileModel = fileModel;
  }
  fileModel;
  // =====================================================
  // Create
  // =====================================================
  create(data) {
    return this.fileModel.create(
      data
    );
  }
  // =====================================================
  // Find By Id
  // =====================================================
  findById(id) {
    return this.fileModel.findById(id).populate(
      "owner"
    ).populate(
      "sharedWith"
    ).populate(
      "createdBy"
    ).populate(
      "updatedBy"
    ).populate(
      "parentFolder"
    );
  }
  // =====================================================
  // Find Folder
  // =====================================================
  findFolder(id) {
    return this.fileModel.findOne({
      _id: id,
      type: "folder",
      isDeleted: false
    });
  }
  // =====================================================
  // List Files
  //
  // Everyone sees the full list (every employee's files,
  // including admin-uploaded ones) — access to individual
  // files (url/thumbnail, and every write action) is
  // enforced separately in the mapper/service, not here.
  // `employeeId` is only needed for the "favorite" filter,
  // which is inherently per-viewer.
  // =====================================================
  async findAll(employeeId, query) {
    const filter = {
      isDeleted: false
    };
    if (query.parentFolder) {
      filter.parentFolder = new import_mongoose48.Types.ObjectId(
        query.parentFolder
      );
    }
    if (query.type) {
      filter.type = query.type;
    }
    if (query.search) {
      filter.$text = {
        $search: query.search
      };
    }
    if (query.favorite === "true") {
      filter.favoriteBy = {
        $in: [
          new import_mongoose48.Types.ObjectId(
            employeeId
          )
        ]
      };
    }
    const total = await this.fileModel.countDocuments(
      filter
    );
    const items = await this.fileModel.find(filter).populate(
      "owner"
    ).populate(
      "parentFolder"
    ).sort({
      updatedAt: -1
    }).skip(
      (query.page - 1) * query.limit
    ).limit(
      query.limit
    );
    return {
      items,
      total,
      page: query.page,
      limit: query.limit
    };
  }
  // =====================================================
  // Rename
  // =====================================================
  rename(id, name, updatedBy) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        name,
        updatedBy: new import_mongoose48.Types.ObjectId(
          updatedBy
        )
      },
      {
        new: true
      }
    );
  }
  // =====================================================
  // Move
  // =====================================================
  move(id, parentFolder, updatedBy) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        parentFolder: parentFolder ? new import_mongoose48.Types.ObjectId(
          parentFolder
        ) : null,
        updatedBy: new import_mongoose48.Types.ObjectId(
          updatedBy
        )
      },
      {
        new: true
      }
    );
  }
  // =====================================================
  // Share
  // =====================================================
  share(id, employeeIds, updatedBy) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        sharedWith: employeeIds.map(
          (id2) => new import_mongoose48.Types.ObjectId(
            id2
          )
        ),
        updatedBy: new import_mongoose48.Types.ObjectId(
          updatedBy
        )
      },
      {
        new: true
      }
    );
  }
  // =====================================================
  // Favorite
  // =====================================================
  async addFavorite(fileId, employeeId) {
    return this.fileModel.findByIdAndUpdate(
      fileId,
      {
        $addToSet: {
          favoriteBy: new import_mongoose48.Types.ObjectId(
            employeeId
          )
        }
      },
      {
        new: true
      }
    );
  }
  async removeFavorite(fileId, employeeId) {
    return this.fileModel.findByIdAndUpdate(
      fileId,
      {
        $pull: {
          favoriteBy: new import_mongoose48.Types.ObjectId(
            employeeId
          )
        }
      },
      {
        new: true
      }
    );
  }
  // =====================================================
  // Soft Delete
  // =====================================================
  delete(id, updatedBy) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        updatedBy: new import_mongoose48.Types.ObjectId(
          updatedBy
        )
      },
      {
        new: true
      }
    );
  }
  // =====================================================
  // Storage
  //
  // Global total across every file — matches the list now
  // being global too, rather than split by role.
  // =====================================================
  async storageUsed() {
    const result = await this.fileModel.aggregate([
      {
        $match: {
          isDeleted: false,
          type: {
            $ne: "folder"
          }
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$size"
          }
        }
      }
    ]);
    return result[0]?.total ?? 0;
  }
};
FilesRepository = __decorateClass([
  (0, import_common54.Injectable)(),
  __decorateParam(0, (0, import_mongoose47.InjectModel)(File.name)),
  __decorateParam(0, (0, import_common54.Inject)(import_mongoose48.Model))
], FilesRepository);

// src/files/mapper/files.mapper.ts
var import_common55 = require("@nestjs/common");
var FilesMapper = class {
  // =====================================================
  // Single File
  // =====================================================
  toFile(file, employeeId, canManage) {
    const owner = file.owner;
    const ownerId = owner?._id?.toString() ?? owner?.toString();
    const isOwner = ownerId === employeeId;
    const isSharedWithMe = file.sharedWith.some(
      (entry) => {
        const id = entry?._id?.toString() ?? entry?.toString();
        return id === employeeId;
      }
    );
    const canAccess = canManage || isOwner || isSharedWithMe;
    return {
      id: file.id,
      name: file.name,
      type: file.type,
      size: this.formatSize(
        file.size
      ),
      uploadedBy: owner?.fullName ?? "",
      uploadedAt: this.formatDate(
        file.createdAt
      ),
      favorite: file.favoriteBy.some(
        (id) => {
          const favId = id?._id?.toString() ?? id?.toString();
          return favId === employeeId;
        }
      ),
      shared: file.sharedWith.length > 0,
      url: canAccess ? file.url : "",
      thumbnail: canAccess ? file.thumbnail : "",
      ownerId,
      isMine: isOwner,
      canAccess,
      parentFolder: file.parentFolder ? file.parentFolder._id.toString() : null,
      mimeType: file.mimeType,
      extension: file.extension,
      originalName: file.originalName,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt
    };
  }
  // =====================================================
  // List
  // =====================================================
  toFileList(result, employeeId, canManage) {
    return {
      items: result.items.map(
        (file) => this.toFile(
          file,
          employeeId,
          canManage
        )
      ),
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(
          result.total / result.limit
        )
      }
    };
  }
  // =====================================================
  // Helpers
  // =====================================================
  formatSize(bytes) {
    if (!bytes) {
      return "0 Bytes";
    }
    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB"
    ];
    let index = 0;
    let size = bytes;
    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }
    return `${size.toFixed(
      size < 10 ? 1 : 0
    )} ${units[index]}`;
  }
  formatDate(date) {
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(
      diff / 6e4
    );
    if (minutes < 1) {
      return "Just now";
    }
    if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    const hours = Math.floor(
      minutes / 60
    );
    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    const days = Math.floor(
      hours / 24
    );
    if (days === 1) {
      return "Yesterday";
    }
    if (days < 7) {
      return `${days} days ago`;
    }
    return date.toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );
  }
};
FilesMapper = __decorateClass([
  (0, import_common55.Injectable)()
], FilesMapper);

// src/files/services/files.service.ts
var FilesService = class {
  constructor(repository, employeesRepository, mapper, cloudinary2) {
    this.repository = repository;
    this.employeesRepository = employeesRepository;
    this.mapper = mapper;
    this.cloudinary = cloudinary2;
  }
  repository;
  employeesRepository;
  mapper;
  cloudinary;
  // =====================================================
  // List Files
  // =====================================================
  async files(userId, query) {
    const employee = await this.getEmployee(
      userId
    );
    const canManage = this.canManage(
      this.getRole(
        employee
      )
    );
    const result = await this.repository.findAll(
      employee._id.toString(),
      query
    );
    return this.mapper.toFileList(
      result,
      employee._id.toString(),
      canManage
    );
  }
  // =====================================================
  // Create Folder — admin/HR only
  // =====================================================
  async createFolder(userId, dto) {
    const employee = await this.getEmployee(
      userId
    );
    this.ensureCanManage(
      this.getRole(
        employee
      )
    );
    if (dto.parentFolder) {
      const folder2 = await this.repository.findFolder(
        dto.parentFolder
      );
      if (!folder2) {
        throw new import_common56.NotFoundException(
          "Parent folder not found."
        );
      }
    }
    const created = await this.repository.create({
      name: dto.name,
      originalName: dto.name,
      extension: "",
      mimeType: "",
      url: "",
      thumbnail: "",
      size: 0,
      type: "folder" /* FOLDER */,
      owner: new import_mongoose49.Types.ObjectId(
        employee._id
      ),
      createdBy: new import_mongoose49.Types.ObjectId(
        employee._id
      ),
      updatedBy: new import_mongoose49.Types.ObjectId(
        employee._id
      ),
      parentFolder: dto.parentFolder ? new import_mongoose49.Types.ObjectId(
        dto.parentFolder
      ) : void 0,
      sharedWith: [],
      favoriteBy: [],
      isDeleted: false
    });
    const folder = await this.repository.findById(
      created.id
    );
    return this.mapper.toFile(
      folder,
      employee._id.toString(),
      true
    );
  }
  // =====================================================
  // Upload File — any employee can upload; they own what
  // they upload.
  // =====================================================
  async upload(userId, file, dto) {
    const employee = await this.getEmployee(
      userId
    );
    if (!file) {
      throw new import_common56.NotFoundException(
        "No file uploaded."
      );
    }
    if (dto.parentFolder) {
      const folder = await this.repository.findFolder(
        dto.parentFolder
      );
      if (!folder) {
        throw new import_common56.NotFoundException(
          "Parent folder not found."
        );
      }
    }
    const upload = await this.cloudinary.uploadFile(
      file,
      "company-management/files"
    );
    const created = await this.repository.create({
      name: dto.name,
      originalName: file.originalname,
      extension: file.originalname.split(".").pop() ?? "",
      mimeType: file.mimetype,
      size: file.size,
      url: upload.secure_url,
      thumbnail: file.mimetype.startsWith(
        "image/"
      ) ? upload.secure_url : "",
      type: dto.type,
      owner: new import_mongoose49.Types.ObjectId(
        employee._id
      ),
      createdBy: new import_mongoose49.Types.ObjectId(
        employee._id
      ),
      updatedBy: new import_mongoose49.Types.ObjectId(
        employee._id
      ),
      parentFolder: dto.parentFolder ? new import_mongoose49.Types.ObjectId(
        dto.parentFolder
      ) : void 0,
      sharedWith: [],
      favoriteBy: [],
      isDeleted: false
    });
    const uploaded = await this.repository.findById(
      created.id
    );
    return this.mapper.toFile(
      uploaded,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee
        )
      )
    );
  }
  // =====================================================
  // Rename — owner or admin/HR
  // =====================================================
  async rename(userId, fileId, name) {
    const employee = await this.getEmployee(
      userId
    );
    const file = await this.repository.findById(
      fileId
    );
    if (!file) {
      throw new import_common56.NotFoundException(
        "File not found."
      );
    }
    this.ensureCanModify(
      file,
      employee
    );
    const updated = await this.repository.rename(
      fileId,
      name,
      employee._id.toString()
    );
    if (!updated) {
      throw new import_common56.NotFoundException(
        "Unable to rename file."
      );
    }
    return this.mapper.toFile(
      updated,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee
        )
      )
    );
  }
  // =====================================================
  // Move — owner or admin/HR
  // =====================================================
  async move(userId, fileId, parentFolder) {
    const employee = await this.getEmployee(
      userId
    );
    const file = await this.repository.findById(
      fileId
    );
    if (!file) {
      throw new import_common56.NotFoundException(
        "File not found."
      );
    }
    this.ensureCanModify(
      file,
      employee
    );
    if (parentFolder) {
      const folder = await this.repository.findFolder(
        parentFolder
      );
      if (!folder) {
        throw new import_common56.NotFoundException(
          "Destination folder not found."
        );
      }
    }
    const moved = await this.repository.move(
      fileId,
      parentFolder,
      employee._id.toString()
    );
    if (!moved) {
      throw new import_common56.NotFoundException(
        "Unable to move file."
      );
    }
    return this.mapper.toFile(
      moved,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee
        )
      )
    );
  }
  // =====================================================
  // Share — owner or admin/HR
  // =====================================================
  async share(userId, fileId, employeeIds) {
    const employee = await this.getEmployee(
      userId
    );
    const file = await this.repository.findById(
      fileId
    );
    if (!file) {
      throw new import_common56.NotFoundException(
        "File not found."
      );
    }
    this.ensureCanModify(
      file,
      employee
    );
    const shared = await this.repository.share(
      fileId,
      employeeIds,
      employee._id.toString()
    );
    if (!shared) {
      throw new import_common56.NotFoundException(
        "Unable to share file."
      );
    }
    return this.mapper.toFile(
      shared,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee
        )
      )
    );
  }
  // =====================================================
  // Favorite — owner, shared-with, or admin/HR
  // =====================================================
  async toggleFavorite(userId, fileId) {
    const employee = await this.getEmployee(
      userId
    );
    const file = await this.repository.findById(
      fileId
    );
    if (!file) {
      throw new import_common56.NotFoundException(
        "File not found."
      );
    }
    const canManage = this.canManage(
      this.getRole(
        employee
      )
    );
    const canAccess = canManage || this.toIdString(
      file.owner
    ) === employee._id.toString() || file.sharedWith.some(
      (entry) => this.toIdString(
        entry
      ) === employee._id.toString()
    );
    if (!canAccess) {
      throw new import_common56.ForbiddenException(
        "You don't have permission to access this file."
      );
    }
    const alreadyFavorite = file.favoriteBy.some(
      (id) => this.toIdString(
        id
      ) === employee._id.toString()
    );
    const updated = alreadyFavorite ? await this.repository.removeFavorite(
      fileId,
      employee._id.toString()
    ) : await this.repository.addFavorite(
      fileId,
      employee._id.toString()
    );
    if (!updated) {
      throw new import_common56.NotFoundException(
        "Unable to update favorite status."
      );
    }
    return this.mapper.toFile(
      updated,
      employee._id.toString(),
      canManage
    );
  }
  // =====================================================
  // Delete — owner or admin/HR
  // =====================================================
  async delete(userId, fileId) {
    const employee = await this.getEmployee(
      userId
    );
    const file = await this.repository.findById(
      fileId
    );
    if (!file) {
      throw new import_common56.NotFoundException(
        "File not found."
      );
    }
    this.ensureCanModify(
      file,
      employee
    );
    await this.repository.delete(
      fileId,
      employee._id.toString()
    );
    return {
      success: true
    };
  }
  // =====================================================
  // Download — owner, shared-with, or admin/HR
  // =====================================================
  async download(userId, fileId) {
    const employee = await this.getEmployee(
      userId
    );
    const file = await this.repository.findById(
      fileId
    );
    if (!file) {
      throw new import_common56.NotFoundException(
        "File not found."
      );
    }
    const canManage = this.canManage(
      this.getRole(
        employee
      )
    );
    const canAccess = canManage || this.toIdString(
      file.owner
    ) === employee._id.toString() || file.sharedWith.some(
      (entry) => this.toIdString(
        entry
      ) === employee._id.toString()
    );
    if (!canAccess) {
      throw new import_common56.ForbiddenException(
        "You don't have permission to access this file."
      );
    }
    return {
      url: file.url,
      fileName: file.originalName,
      mimeType: file.mimeType
    };
  }
  // =====================================================
  // Storage Statistics — global across all files, same
  // for everyone.
  // =====================================================
  async storage(userId) {
    await this.getEmployee(
      userId
    );
    const used = await this.repository.storageUsed();
    return {
      used,
      limit: 100 * 1024 * 1024 * 1024
    };
  }
  // =====================================================
  // Helpers
  // =====================================================
  async getEmployee(userId) {
    const employee = await this.employeesRepository.findByUserId(
      userId
    );
    if (!employee) {
      throw new import_common56.NotFoundException(
        "Employee profile not found."
      );
    }
    return employee;
  }
  /**
   * Employee.user is declared as `Types.ObjectId` in the shared
   * employee.schema.ts, but EmployeesRepository.findByUserId()
   * populates it with a select that includes `role`. This cast is
   * scoped to the Files module only.
   */
  getRole(employee) {
    const user = employee.user;
    return user?.role;
  }
  canManage(role) {
    return role === "ADMIN" /* ADMIN */ || role === "HR" /* HR */;
  }
  ensureCanManage(role) {
    if (!this.canManage(
      role
    )) {
      throw new import_common56.ForbiddenException(
        "You don't have permission to perform this action."
      );
    }
  }
  /**
   * Rename/move/share/delete: allowed for the file's owner, or
   * admin/HR on any file. Uses toIdString() because `file.owner`
   * may be a populated Employee document (from
   * FilesRepository.findById()'s .populate("owner")), not a raw
   * ObjectId — comparing a populated document with
   * `.toString() === someIdString` silently never matches.
   */
  ensureCanModify(file, employee) {
    const role = this.getRole(
      employee
    );
    const isOwner = this.toIdString(
      file.owner
    ) === employee._id.toString();
    if (!this.canManage(
      role
    ) && !isOwner) {
      throw new import_common56.ForbiddenException(
        "You can only modify files you uploaded."
      );
    }
  }
  /**
   * Safely extracts an id string whether the value is a raw
   * ObjectId, a populated document (has ._id), or already a
   * string. Populated Mongoose documents do NOT stringify to
   * their id via .toString() — this normalizes both cases.
   */
  toIdString(value) {
    if (!value) {
      return "";
    }
    if (value._id) {
      return value._id.toString();
    }
    return value.toString();
  }
};
FilesService = __decorateClass([
  (0, import_common56.Injectable)(),
  __decorateParam(0, (0, import_common56.Inject)(FilesRepository)),
  __decorateParam(1, (0, import_common56.Inject)(EmployeesRepository)),
  __decorateParam(2, (0, import_common56.Inject)(FilesMapper)),
  __decorateParam(3, (0, import_common56.Inject)(CloudinaryService))
], FilesService);

// src/files/controllers/files.controller.ts
var FilesController = class {
  constructor(filesService) {
    this.filesService = filesService;
  }
  filesService;
  files(req, query) {
    return this.filesService.files(
      req.user.sub,
      query
    );
  }
  storage(req) {
    return this.filesService.storage(
      req.user.sub
    );
  }
  download(req, id) {
    return this.filesService.download(
      req.user.sub,
      id
    );
  }
  createFolder(req, dto) {
    return this.filesService.createFolder(
      req.user.sub,
      dto
    );
  }
  upload(req, file, dto) {
    return this.filesService.upload(
      req.user.sub,
      file,
      dto
    );
  }
  rename(req, id, dto) {
    return this.filesService.rename(
      req.user.sub,
      id,
      dto.name
    );
  }
  move(req, id, dto) {
    return this.filesService.move(
      req.user.sub,
      id,
      dto.parentFolder ?? null
    );
  }
  share(req, id, dto) {
    return this.filesService.share(
      req.user.sub,
      id,
      dto.employeeIds
    );
  }
  favorite(req, id) {
    return this.filesService.toggleFavorite(
      req.user.sub,
      id
    );
  }
  delete(req, id) {
    return this.filesService.delete(
      req.user.sub,
      id
    );
  }
};
__decorateClass([
  (0, import_common57.Get)(),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Query)())
], FilesController.prototype, "files", 1);
__decorateClass([
  (0, import_common57.Get)("storage"),
  __decorateParam(0, (0, import_common57.Req)())
], FilesController.prototype, "storage", 1);
__decorateClass([
  (0, import_common57.Get)(":id/download"),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Param)("id"))
], FilesController.prototype, "download", 1);
__decorateClass([
  (0, import_common57.Post)("folders"),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Body)())
], FilesController.prototype, "createFolder", 1);
__decorateClass([
  (0, import_common57.Post)("upload"),
  (0, import_common57.UseInterceptors)(
    (0, import_platform_express4.FileInterceptor)("file")
  ),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.UploadedFile)()),
  __decorateParam(2, (0, import_common57.Body)())
], FilesController.prototype, "upload", 1);
__decorateClass([
  (0, import_common57.Patch)(":id/rename"),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Param)("id")),
  __decorateParam(2, (0, import_common57.Body)())
], FilesController.prototype, "rename", 1);
__decorateClass([
  (0, import_common57.Patch)(":id/move"),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Param)("id")),
  __decorateParam(2, (0, import_common57.Body)())
], FilesController.prototype, "move", 1);
__decorateClass([
  (0, import_common57.Patch)(":id/share"),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Param)("id")),
  __decorateParam(2, (0, import_common57.Body)())
], FilesController.prototype, "share", 1);
__decorateClass([
  (0, import_common57.Patch)(":id/favorite"),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Param)("id"))
], FilesController.prototype, "favorite", 1);
__decorateClass([
  (0, import_common57.Delete)(":id"),
  __decorateParam(0, (0, import_common57.Req)()),
  __decorateParam(1, (0, import_common57.Param)("id"))
], FilesController.prototype, "delete", 1);
FilesController = __decorateClass([
  (0, import_common57.Controller)("files"),
  (0, import_common57.UseGuards)(JwtAuthGuard),
  __decorateParam(0, (0, import_common57.Inject)(FilesService))
], FilesController);

// src/files/files.module.ts
var FilesModule = class {
};
FilesModule = __decorateClass([
  (0, import_common58.Module)({
    imports: [
      import_mongoose50.MongooseModule.forFeature([
        {
          name: File.name,
          schema: FileSchema
        }
      ]),
      EmployeesModule,
      UsersModule,
      CloudinaryModule
    ],
    controllers: [
      FilesController
    ],
    providers: [
      FilesService,
      FilesRepository,
      FilesMapper
    ],
    exports: [
      FilesService,
      FilesRepository
    ]
  })
], FilesModule);

// src/reports/reports.module.ts
var import_common64 = require("@nestjs/common");
var import_mongoose53 = require("@nestjs/mongoose");

// src/reports/controllers/reports.controller.ts
var import_common63 = require("@nestjs/common");

// src/reports/services/reports.service.ts
var import_common60 = require("@nestjs/common");

// src/reports/repositories/reports.repository.ts
var import_common59 = require("@nestjs/common");
var import_mongoose51 = require("@nestjs/mongoose");
var import_mongoose52 = require("mongoose");
var ReportsRepository = class {
  constructor(employeeModel, projectModel, taskModel, attendanceModel) {
    this.employeeModel = employeeModel;
    this.projectModel = projectModel;
    this.taskModel = taskModel;
    this.attendanceModel = attendanceModel;
  }
  employeeModel;
  projectModel;
  taskModel;
  attendanceModel;
  // ---------------------------------------------------------
  // MAIN REPORT
  // ---------------------------------------------------------
  async getReports() {
    const [
      statistics,
      payroll,
      attendance,
      performance,
      departments,
      projects,
      taskStatistics,
      monthlyEmployees
    ] = await Promise.all([
      this.getStatistics(),
      this.getPayroll(),
      this.getAttendance(),
      this.getPerformance(),
      this.getDepartments(),
      this.getProjects(),
      this.getTaskStatistics(),
      this.getMonthlyEmployees()
    ]);
    const insights = this.generateInsights({
      statistics,
      attendance,
      performance,
      projects,
      taskStatistics
    });
    return {
      statistics,
      payroll,
      attendance,
      performance,
      departments,
      projects,
      taskStatistics,
      monthlyEmployees,
      insights
    };
  }
  // ---------------------------------------------------------
  // STATISTICS
  // ---------------------------------------------------------
  async getStatistics() {
    const [
      employees,
      projects,
      activeProjects,
      completedProjects,
      payrollResult
    ] = await Promise.all([
      this.employeeModel.countDocuments(),
      this.projectModel.countDocuments(),
      this.projectModel.countDocuments({
        status: "Active"
      }),
      this.projectModel.countDocuments({
        status: "Completed"
      }),
      this.employeeModel.aggregate([
        {
          $group: {
            _id: null,
            totalSalary: {
              $sum: {
                $ifNull: ["$salary", 0]
              }
            },
            averageSalary: {
              $avg: {
                $ifNull: ["$salary", 0]
              }
            }
          }
        }
      ])
    ]);
    const payrollData = payrollResult[0] ?? {
      totalSalary: 0,
      averageSalary: 0
    };
    return {
      employees,
      projects,
      activeProjects,
      completedProjects,
      monthlyPayroll: Math.round(
        payrollData.totalSalary ?? 0
      ),
      averageSalary: Math.round(
        payrollData.averageSalary ?? 0
      )
    };
  }
  // ---------------------------------------------------------
  // PAYROLL
  // ---------------------------------------------------------
  async getPayroll() {
    const [
      overall,
      byDepartment
    ] = await Promise.all([
      this.employeeModel.aggregate([
        {
          $group: {
            _id: null,
            totalMonthly: {
              $sum: {
                $ifNull: ["$salary", 0]
              }
            },
            averageSalary: {
              $avg: {
                $ifNull: ["$salary", 0]
              }
            }
          }
        }
      ]),
      this.employeeModel.aggregate([
        {
          $group: {
            _id: "$department",
            payroll: {
              $sum: {
                $ifNull: ["$salary", 0]
              }
            },
            employees: {
              $sum: 1
            }
          }
        },
        {
          $project: {
            _id: 0,
            department: "$_id",
            payroll: 1,
            employees: 1
          }
        },
        {
          $sort: {
            payroll: -1
          }
        }
      ])
    ]);
    const data = overall[0] ?? {
      totalMonthly: 0,
      averageSalary: 0
    };
    return {
      totalMonthly: Math.round(
        data.totalMonthly ?? 0
      ),
      averageSalary: Math.round(
        data.averageSalary ?? 0
      ),
      byDepartment
    };
  }
  // ---------------------------------------------------------
  // ATTENDANCE
  // ---------------------------------------------------------
  async getAttendance() {
    const [
      overallResult,
      byDepartment
    ] = await Promise.all([
      this.attendanceModel.aggregate([
        {
          $group: {
            _id: null,
            totalRecords: {
              $sum: 1
            },
            presentRecords: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present"
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]),
      this.attendanceModel.aggregate([
        {
          $lookup: {
            from: this.employeeModel.collection.name,
            localField: "employee",
            foreignField: "_id",
            as: "employeeData"
          }
        },
        {
          $unwind: {
            path: "$employeeData",
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $group: {
            _id: "$employeeData.department",
            totalRecords: {
              $sum: 1
            },
            presentRecords: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present"
                    ]
                  },
                  1,
                  0
                ]
              }
            },
            employees: {
              $addToSet: "$employeeData._id"
            }
          }
        },
        {
          $project: {
            _id: 0,
            department: "$_id",
            attendance: {
              $cond: [
                {
                  $gt: [
                    "$totalRecords",
                    0
                  ]
                },
                {
                  $multiply: [
                    {
                      $divide: [
                        "$presentRecords",
                        "$totalRecords"
                      ]
                    },
                    100
                  ]
                },
                0
              ]
            },
            employees: {
              $size: "$employees"
            }
          }
        },
        {
          $sort: {
            attendance: -1
          }
        }
      ])
    ]);
    const data = overallResult[0] ?? {
      totalRecords: 0,
      presentRecords: 0
    };
    const overall = data.totalRecords > 0 ? data.presentRecords / data.totalRecords * 100 : 0;
    return {
      overall: Math.round(
        overall * 10
      ) / 10,
      employees: await this.employeeModel.countDocuments(),
      byDepartment: byDepartment.map(
        (item) => ({
          department: item.department,
          attendance: Math.round(
            item.attendance * 10
          ) / 10,
          employees: item.employees
        })
      )
    };
  }
  // ---------------------------------------------------------
  // PERFORMANCE
  // ---------------------------------------------------------
  async getPerformance() {
    const employees = await this.employeeModel.find().select(
      "_id firstName lastName fullName designation department"
    ).lean();
    const taskScores = await this.taskModel.aggregate([
      {
        $project: {
          assignedTo: 1,
          score: {
            $cond: [
              {
                $eq: [
                  "$status",
                  "Completed"
                ]
              },
              100,
              {
                $min: [
                  100,
                  {
                    $max: [
                      0,
                      {
                        $ifNull: [
                          "$progress",
                          0
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$assignedTo",
          averageScore: {
            $avg: "$score"
          },
          totalTasks: {
            $sum: 1
          },
          completedTasks: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$score",
                    100
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);
    const scoreMap = /* @__PURE__ */ new Map();
    for (const item of taskScores) {
      if (!item._id) {
        continue;
      }
      scoreMap.set(
        item._id.toString(),
        {
          averageScore: item.averageScore ?? 0,
          totalTasks: item.totalTasks ?? 0,
          completedTasks: item.completedTasks ?? 0
        }
      );
    }
    return employees.map((employee) => {
      const stats = scoreMap.get(
        employee._id.toString()
      );
      const score = stats?.averageScore ?? 0;
      return {
        id: employee._id.toString(),
        employee: employee.fullName ?? `${employee.firstName} ${employee.lastName}`,
        role: employee.designation,
        department: employee.department,
        score: Math.round(
          score * 10
        ) / 10,
        totalTasks: stats?.totalTasks ?? 0,
        completedTasks: stats?.completedTasks ?? 0
      };
    }).sort(
      (a, b) => b.score - a.score
    );
  }
  // ---------------------------------------------------------
  // DEPARTMENTS
  // ---------------------------------------------------------
  async getDepartments() {
    const [
      employeeData,
      attendanceData,
      performanceData
    ] = await Promise.all([
      this.employeeModel.aggregate([
        {
          $group: {
            _id: "$department",
            employees: {
              $sum: 1
            },
            payroll: {
              $sum: {
                $ifNull: ["$salary", 0]
              }
            }
          }
        }
      ]),
      this.attendanceModel.aggregate([
        {
          $lookup: {
            from: this.employeeModel.collection.name,
            localField: "employee",
            foreignField: "_id",
            as: "employeeData"
          }
        },
        {
          $unwind: "$employeeData"
        },
        {
          $group: {
            _id: "$employeeData.department",
            total: {
              $sum: 1
            },
            present: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present"
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]),
      this.getPerformance()
    ]);
    const attendanceMap = /* @__PURE__ */ new Map();
    for (const item of attendanceData) {
      const percentage = item.total > 0 ? item.present / item.total * 100 : 0;
      attendanceMap.set(
        item._id,
        Math.round(
          percentage * 10
        ) / 10
      );
    }
    const performanceMap = /* @__PURE__ */ new Map();
    for (const item of performanceData) {
      const current = performanceMap.get(
        item.department
      ) ?? {
        total: 0,
        count: 0
      };
      current.total += item.score;
      current.count += 1;
      performanceMap.set(
        item.department,
        current
      );
    }
    return employeeData.map(
      (department) => {
        const performance = performanceMap.get(
          department._id
        );
        return {
          name: department._id,
          employees: department.employees,
          payroll: Math.round(
            department.payroll ?? 0
          ),
          averagePerformance: performance && performance.count > 0 ? Math.round(
            performance.total / performance.count * 10
          ) / 10 : 0,
          averageAttendance: attendanceMap.get(
            department._id
          ) ?? 0
        };
      }
    );
  }
  // ---------------------------------------------------------
  // PROJECTS
  // ---------------------------------------------------------
  async getProjects() {
    const projects = await this.projectModel.find().sort({
      createdAt: -1
    }).lean();
    return projects.map(
      (project) => {
        const progress = project.status === "Completed" ? 100 : Math.max(
          0,
          Math.min(
            100,
            project.progress ?? 0
          )
        );
        return {
          id: project._id.toString(),
          name: project.name,
          status: project.status,
          priority: project.priority,
          progress,
          totalTasks: project.totalTasks ?? 0,
          completedTasks: project.completedTasks ?? 0,
          startDate: project.startDate,
          dueDate: project.dueDate,
          members: Array.isArray(
            project.members
          ) ? project.members.length : 0
        };
      }
    );
  }
  // ---------------------------------------------------------
  // TASK STATISTICS
  // ---------------------------------------------------------
  async getTaskStatistics() {
    const result = await this.taskModel.aggregate([
      {
        $group: {
          _id: null,
          totalTasks: {
            $sum: 1
          },
          completedTasks: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "Completed"
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);
    const data = result[0] ?? {
      totalTasks: 0,
      completedTasks: 0
    };
    const remainingTasks = Math.max(
      0,
      data.totalTasks - data.completedTasks
    );
    const completionRate = data.totalTasks > 0 ? data.completedTasks / data.totalTasks * 100 : 0;
    return {
      totalTasks: data.totalTasks,
      completedTasks: data.completedTasks,
      remainingTasks,
      completionRate: Math.round(
        completionRate * 10
      ) / 10
    };
  }
  // ---------------------------------------------------------
  // MONTHLY EMPLOYEES
  // ---------------------------------------------------------
  async getMonthlyEmployees() {
    const now = /* @__PURE__ */ new Date();
    const start = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1
    );
    const result = await this.employeeModel.aggregate([
      {
        $match: {
          joiningDate: {
            $gte: start
          }
        }
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$joiningDate"
            },
            month: {
              $month: "$joiningDate"
            }
          },
          employees: {
            $sum: 1
          }
        }
      }
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const output = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const found = result.find(
        (item) => item._id.year === year && item._id.month === month
      );
      output.push({
        month: months[month - 1],
        year,
        employees: found?.employees ?? 0
      });
    }
    return output;
  }
  // ---------------------------------------------------------
  // INSIGHTS
  // ---------------------------------------------------------
  generateInsights(data) {
    const insights = [];
    const topPerformer = data.performance?.[0];
    if (topPerformer) {
      insights.push({
        type: topPerformer.score >= 70 ? "positive" : "neutral",
        title: "Top performer",
        message: `${topPerformer.employee} currently has the highest task-based performance score at ${topPerformer.score}%.`
      });
    }
    if (data.attendance.overall >= 90) {
      insights.push({
        type: "positive",
        title: "Strong attendance",
        message: `Overall attendance is ${data.attendance.overall}%.`
      });
    } else {
      insights.push({
        type: "neutral",
        title: "Attendance needs attention",
        message: `Overall attendance is ${data.attendance.overall}%.`
      });
    }
    if (data.taskStatistics.completionRate >= 70) {
      insights.push({
        type: "positive",
        title: "Strong task completion",
        message: `${data.taskStatistics.completionRate}% of tasks are completed.`
      });
    } else {
      insights.push({
        type: "neutral",
        title: "Task completion",
        message: `Current task completion rate is ${data.taskStatistics.completionRate}%.`
      });
    }
    return insights;
  }
};
ReportsRepository = __decorateClass([
  (0, import_common59.Injectable)(),
  __decorateParam(0, (0, import_mongoose51.InjectModel)(Employee.name)),
  __decorateParam(0, (0, import_common59.Inject)(import_mongoose52.Model)),
  __decorateParam(1, (0, import_mongoose51.InjectModel)(Project.name)),
  __decorateParam(1, (0, import_common59.Inject)(import_mongoose52.Model)),
  __decorateParam(2, (0, import_mongoose51.InjectModel)(Task.name)),
  __decorateParam(2, (0, import_common59.Inject)(import_mongoose52.Model)),
  __decorateParam(3, (0, import_mongoose51.InjectModel)(Attendance.name)),
  __decorateParam(3, (0, import_common59.Inject)(import_mongoose52.Model))
], ReportsRepository);

// src/reports/services/reports.service.ts
var ReportsService = class {
  constructor(reportsRepository) {
    this.reportsRepository = reportsRepository;
  }
  reportsRepository;
  async getReports() {
    return this.reportsRepository.getReports();
  }
};
ReportsService = __decorateClass([
  (0, import_common60.Injectable)(),
  __decorateParam(0, (0, import_common60.Inject)(ReportsRepository))
], ReportsService);

// src/reports/services/reports-export.service.ts
var import_common61 = require("@nestjs/common");
var import_exceljs = __toESM(require("exceljs"));
var import_pdfkit = __toESM(require("pdfkit"));
var ReportsExportService = class {
  constructor(reportsRepository) {
    this.reportsRepository = reportsRepository;
  }
  reportsRepository;
  async csv() {
    const report = await this.reportsRepository.getReports();
    const rows = [
      [
        "Report",
        "Value"
      ],
      [
        "Employees",
        report.statistics.employees
      ],
      [
        "Projects",
        report.statistics.projects
      ],
      [
        "Active Projects",
        report.statistics.activeProjects
      ],
      [
        "Completed Projects",
        report.statistics.completedProjects
      ],
      [
        "Monthly Payroll",
        report.statistics.monthlyPayroll
      ],
      [
        "Average Salary",
        report.statistics.averageSalary
      ],
      [
        "Total Tasks",
        report.taskStatistics.totalTasks
      ],
      [
        "Completed Tasks",
        report.taskStatistics.completedTasks
      ],
      [
        "Remaining Tasks",
        report.taskStatistics.remainingTasks
      ],
      [
        "Task Completion Rate",
        report.taskStatistics.completionRate
      ]
    ];
    const csv = rows.map(
      (row) => row.map(
        (value) => `"${String(value).replace(
          /"/g,
          '""'
        )}"`
      ).join(",")
    ).join("\n");
    return Buffer.from(
      csv,
      "utf-8"
    );
  }
  async excel() {
    const report = await this.reportsRepository.getReports();
    const workbook = new import_exceljs.default.Workbook();
    const summary = workbook.addWorksheet(
      "Summary"
    );
    summary.columns = [
      {
        header: "Metric",
        key: "metric",
        width: 30
      },
      {
        header: "Value",
        key: "value",
        width: 25
      }
    ];
    summary.addRows([
      {
        metric: "Employees",
        value: report.statistics.employees
      },
      {
        metric: "Projects",
        value: report.statistics.projects
      },
      {
        metric: "Active Projects",
        value: report.statistics.activeProjects
      },
      {
        metric: "Completed Projects",
        value: report.statistics.completedProjects
      },
      {
        metric: "Monthly Payroll",
        value: report.statistics.monthlyPayroll
      },
      {
        metric: "Average Salary",
        value: report.statistics.averageSalary
      },
      {
        metric: "Total Tasks",
        value: report.taskStatistics.totalTasks
      },
      {
        metric: "Completed Tasks",
        value: report.taskStatistics.completedTasks
      },
      {
        metric: "Task Completion Rate",
        value: report.taskStatistics.completionRate
      }
    ]);
    const employees = workbook.addWorksheet(
      "Performance"
    );
    employees.columns = [
      {
        header: "Employee",
        key: "employee",
        width: 30
      },
      {
        header: "Role",
        key: "role",
        width: 25
      },
      {
        header: "Department",
        key: "department",
        width: 25
      },
      {
        header: "Performance",
        key: "score",
        width: 20
      }
    ];
    employees.addRows(
      report.performance
    );
    const projects = workbook.addWorksheet(
      "Projects"
    );
    projects.columns = [
      {
        header: "Project",
        key: "name",
        width: 30
      },
      {
        header: "Status",
        key: "status",
        width: 20
      },
      {
        header: "Priority",
        key: "priority",
        width: 20
      },
      {
        header: "Progress",
        key: "progress",
        width: 20
      },
      {
        header: "Total Tasks",
        key: "totalTasks",
        width: 20
      },
      {
        header: "Completed Tasks",
        key: "completedTasks",
        width: 20
      }
    ];
    projects.addRows(
      report.projects
    );
    const payroll = workbook.addWorksheet(
      "Payroll"
    );
    payroll.columns = [
      {
        header: "Department",
        key: "department",
        width: 30
      },
      {
        header: "Employees",
        key: "employees",
        width: 20
      },
      {
        header: "Payroll",
        key: "payroll",
        width: 20
      }
    ];
    payroll.addRows(
      report.payroll.byDepartment
    );
    return Buffer.from(
      await workbook.xlsx.writeBuffer()
    );
  }
  async pdf() {
    const report = await this.reportsRepository.getReports();
    return new Promise(
      (resolve) => {
        const document = new import_pdfkit.default({
          margin: 40
        });
        const chunks = [];
        document.on(
          "data",
          (chunk) => chunks.push(chunk)
        );
        document.on(
          "end",
          () => resolve(
            Buffer.concat(
              chunks
            )
          )
        );
        document.fontSize(24).text(
          "Reports & Analytics"
        );
        document.moveDown();
        document.fontSize(14).text(
          `Employees: ${report.statistics.employees}`
        );
        document.text(
          `Projects: ${report.statistics.projects}`
        );
        document.text(
          `Active Projects: ${report.statistics.activeProjects}`
        );
        document.text(
          `Completed Projects: ${report.statistics.completedProjects}`
        );
        document.text(
          `Monthly Payroll: $${report.statistics.monthlyPayroll.toLocaleString()}`
        );
        document.text(
          `Average Salary: $${report.statistics.averageSalary.toLocaleString()}`
        );
        document.moveDown();
        document.fontSize(18).text(
          "Task Statistics"
        );
        document.fontSize(14).text(
          `Total Tasks: ${report.taskStatistics.totalTasks}`
        );
        document.text(
          `Completed Tasks: ${report.taskStatistics.completedTasks}`
        );
        document.text(
          `Remaining Tasks: ${report.taskStatistics.remainingTasks}`
        );
        document.text(
          `Completion Rate: ${Math.round(report.taskStatistics.completionRate)}%`
        );
        document.moveDown();
        document.fontSize(18).text(
          "Projects"
        );
        document.moveDown(0.5);
        for (const project of report.projects) {
          document.fontSize(11).text(
            `${project.name} \u2014 ${project.status} \u2014 ${project.progress}% \u2014 ${project.completedTasks}/${project.totalTasks} tasks`
          );
        }
        document.moveDown();
        document.fontSize(18).text(
          "Employee Performance"
        );
        document.moveDown(0.5);
        for (const employee of report.performance) {
          document.fontSize(11).text(
            `${employee.employee} \u2014 ${employee.department} \u2014 ${employee.score}%`
          );
        }
        document.end();
      }
    );
  }
};
ReportsExportService = __decorateClass([
  (0, import_common61.Injectable)(),
  __decorateParam(0, (0, import_common61.Inject)(ReportsRepository))
], ReportsExportService);

// src/reports/guards/reports-access.guard.ts
var import_common62 = require("@nestjs/common");
var import_passport4 = require("@nestjs/passport");
var ReportsAccessGuard = class extends (0, import_passport4.AuthGuard)("jwt") {
  async canActivate(context) {
    const authenticated = await super.canActivate(
      context
    );
    if (!authenticated) {
      throw new import_common62.UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = String(
      user?.role ?? user?.roles?.[0] ?? ""
    ).trim().toUpperCase();
    const allowed = [
      "ADMIN",
      "HR",
      "HUMAN_RESOURCES"
    ].includes(role);
    if (!allowed) {
      throw new import_common62.ForbiddenException(
        "Only Admin or HR can access reports."
      );
    }
    return true;
  }
};
ReportsAccessGuard = __decorateClass([
  (0, import_common62.Injectable)()
], ReportsAccessGuard);

// src/reports/controllers/reports.controller.ts
var ReportsController = class {
  constructor(reportsService, reportsExportService) {
    this.reportsService = reportsService;
    this.reportsExportService = reportsExportService;
  }
  reportsService;
  reportsExportService;
  async getReports() {
    return this.reportsService.getReports();
  }
  async exportReport(format, response) {
    const normalized = format.toLowerCase();
    if (normalized === "csv") {
      const buffer = await this.reportsExportService.csv();
      response.setHeader(
        "Content-Type",
        "text/csv"
      );
      response.setHeader(
        "Content-Disposition",
        'attachment; filename="reports.csv"'
      );
      return response.send(
        buffer
      );
    }
    if (normalized === "excel") {
      const buffer = await this.reportsExportService.excel();
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.setHeader(
        "Content-Disposition",
        'attachment; filename="reports.xlsx"'
      );
      return response.send(
        buffer
      );
    }
    if (normalized === "pdf") {
      const buffer = await this.reportsExportService.pdf();
      response.setHeader(
        "Content-Type",
        "application/pdf"
      );
      response.setHeader(
        "Content-Disposition",
        'attachment; filename="reports.pdf"'
      );
      return response.send(
        buffer
      );
    }
    return response.status(
      400
    ).json({
      message: "Unsupported export format."
    });
  }
};
__decorateClass([
  (0, import_common63.Get)()
], ReportsController.prototype, "getReports", 1);
__decorateClass([
  (0, import_common63.Get)("export/:format"),
  __decorateParam(0, (0, import_common63.Param)("format")),
  __decorateParam(1, (0, import_common63.Res)())
], ReportsController.prototype, "exportReport", 1);
ReportsController = __decorateClass([
  (0, import_common63.Controller)("reports"),
  (0, import_common63.UseGuards)(
    ReportsAccessGuard
  ),
  __decorateParam(0, (0, import_common63.Inject)(ReportsService)),
  __decorateParam(1, (0, import_common63.Inject)(ReportsExportService))
], ReportsController);

// src/reports/reports.module.ts
var ReportsModule = class {
};
ReportsModule = __decorateClass([
  (0, import_common64.Module)({
    imports: [
      import_mongoose53.MongooseModule.forFeature([
        {
          name: Employee.name,
          schema: EmployeeSchema
        },
        {
          name: Project.name,
          schema: ProjectSchema
        },
        {
          name: Task.name,
          schema: TaskSchema
        },
        {
          name: Attendance.name,
          schema: AttendanceSchema
        }
      ])
    ],
    controllers: [
      ReportsController
    ],
    providers: [
      ReportsRepository,
      ReportsService,
      ReportsExportService,
      ReportsAccessGuard
    ]
  })
], ReportsModule);

// src/portfolio/portfolio.module.ts
var import_common68 = require("@nestjs/common");
var import_mongoose57 = require("@nestjs/mongoose");

// src/portfolio/controllers/portfolio.controller.ts
var import_common67 = require("@nestjs/common");
var import_platform_express5 = require("@nestjs/platform-express");

// src/portfolio/services/portfolio.service.ts
var import_common66 = require("@nestjs/common");

// src/portfolio/repositories/portfolio.repository.ts
var import_common65 = require("@nestjs/common");
var import_mongoose55 = require("@nestjs/mongoose");
var import_mongoose56 = require("mongoose");

// src/portfolio/schemas/portfolio.schema.ts
var import_mongoose54 = require("@nestjs/mongoose");
var PortfolioContent = class {
  content;
};
__decorateClass([
  (0, import_mongoose54.Prop)({
    type: Object,
    required: true
  })
], PortfolioContent.prototype, "content", 2);
PortfolioContent = __decorateClass([
  (0, import_mongoose54.Schema)({
    timestamps: true
  })
], PortfolioContent);
var PortfolioContentSchema = import_mongoose54.SchemaFactory.createForClass(
  PortfolioContent
);

// src/portfolio/repositories/portfolio.repository.ts
var PortfolioRepository = class {
  constructor(portfolioModel) {
    this.portfolioModel = portfolioModel;
  }
  portfolioModel;
  async get() {
    return this.portfolioModel.findOne().lean();
  }
  async create(content) {
    return this.portfolioModel.create({
      content
    });
  }
  async update(content) {
    return this.portfolioModel.findOneAndUpdate(
      {},
      {
        content
      },
      {
        new: true,
        upsert: true
      }
    ).lean();
  }
  // portfolio.repository.ts
  async updateSection(key, data) {
    return this.portfolioModel.findOneAndUpdate(
      {},
      { $set: { [`content.${key}`]: data } },
      { new: true, upsert: true }
    ).lean();
  }
};
PortfolioRepository = __decorateClass([
  (0, import_common65.Injectable)(),
  __decorateParam(0, (0, import_mongoose55.InjectModel)(PortfolioContent.name)),
  __decorateParam(0, (0, import_common65.Inject)(import_mongoose56.Model))
], PortfolioRepository);

// src/portfolio/services/portfolio.service.ts
var DEFAULT_PORTFOLIO_CONTENT = {
  heroContent: {
    badge: "",
    title: "",
    description: "",
    primaryButton: "",
    secondaryButton: ""
  },
  heroStats: [],
  companyContent: {
    title: "",
    subtitle: "",
    mission: "",
    vision: ""
  },
  companyValues: [],
  contactInfo: [],
  faqs: [],
  developmentProcess: [],
  featuredProjects: [],
  services: [],
  statistics: [],
  teamMembers: [],
  technologyCategories: [],
  testimonials: [],
  technologies: [],
  whyChooseUs: [],
  achievements: [],
  clientReviews: []
};
var PortfolioService = class {
  constructor(portfolioRepository) {
    this.portfolioRepository = portfolioRepository;
  }
  portfolioRepository;
  async getPortfolio() {
    const portfolio = await this.portfolioRepository.get();
    return {
      success: true,
      data: portfolio?.content ?? DEFAULT_PORTFOLIO_CONTENT
    };
  }
  async updatePortfolio(content) {
    const portfolio = await this.portfolioRepository.update(
      content
    );
    return {
      success: true,
      message: "Portfolio updated successfully.",
      data: portfolio?.content
    };
  }
  // portfolio.service.ts
  async updateSection(key, data) {
    const portfolio = await this.portfolioRepository.updateSection(key, data);
    return { success: true, message: `${key} updated successfully.`, data: portfolio?.content };
  }
};
PortfolioService = __decorateClass([
  (0, import_common66.Injectable)(),
  __decorateParam(0, (0, import_common66.Inject)(PortfolioRepository))
], PortfolioService);

// src/portfolio/controllers/portfolio.controller.ts
var PortfolioController = class {
  constructor(portfolioService, cloudinary2) {
    this.portfolioService = portfolioService;
    this.cloudinary = cloudinary2;
  }
  portfolioService;
  cloudinary;
  getPortfolio() {
    return this.portfolioService.getPortfolio();
  }
  updatePortfolio(body) {
    return this.portfolioService.updatePortfolio(
      body
    );
  }
  updateSection(body, key) {
    return this.portfolioService.updateSection(
      key,
      body
    );
  }
  async uploadImage(file) {
    const upload = await this.cloudinary.uploadFile(
      file,
      "company-management/portfolio/images"
    );
    return {
      success: true,
      data: {
        url: upload.secure_url
      }
    };
  }
};
__decorateClass([
  (0, import_common67.Get)()
], PortfolioController.prototype, "getPortfolio", 1);
__decorateClass([
  (0, import_common67.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common67.Put)(),
  __decorateParam(0, (0, import_common67.Body)())
], PortfolioController.prototype, "updatePortfolio", 1);
__decorateClass([
  (0, import_common67.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common67.Put)(":key"),
  __decorateParam(0, (0, import_common67.Body)()),
  __decorateParam(1, (0, import_common67.Param)("key"))
], PortfolioController.prototype, "updateSection", 1);
__decorateClass([
  (0, import_common67.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common67.Post)("upload-image"),
  (0, import_common67.UseInterceptors)(
    (0, import_platform_express5.FileInterceptor)("file")
  ),
  __decorateParam(0, (0, import_common67.UploadedFile)())
], PortfolioController.prototype, "uploadImage", 1);
PortfolioController = __decorateClass([
  (0, import_common67.Controller)("portfolio"),
  __decorateParam(0, (0, import_common67.Inject)(PortfolioService)),
  __decorateParam(1, (0, import_common67.Inject)(CloudinaryService))
], PortfolioController);

// src/portfolio/portfolio.module.ts
var PortfolioModule = class {
};
PortfolioModule = __decorateClass([
  (0, import_common68.Module)({
    imports: [
      import_mongoose57.MongooseModule.forFeature([
        {
          name: PortfolioContent.name,
          schema: PortfolioContentSchema
        }
      ]),
      CloudinaryModule
    ],
    controllers: [
      PortfolioController
    ],
    providers: [
      PortfolioService,
      PortfolioRepository
    ],
    exports: [
      PortfolioService
    ]
  })
], PortfolioModule);

// src/settings/settings.module.ts
var import_common72 = require("@nestjs/common");
var import_mongoose61 = require("@nestjs/mongoose");

// src/settings/controllers/settings.controller.ts
var import_common71 = require("@nestjs/common");

// src/settings/services/settings.service.ts
var import_common70 = require("@nestjs/common");

// src/settings/repositories/settings.repository.ts
var import_common69 = require("@nestjs/common");
var import_mongoose59 = require("@nestjs/mongoose");
var import_mongoose60 = require("mongoose");

// src/settings/schemas/user-settings.schema.ts
var import_mongoose58 = require("@nestjs/mongoose");
var UserSettingsDoc = class {
  userId;
  content;
};
__decorateClass([
  (0, import_mongoose58.Prop)({
    type: String,
    required: true,
    unique: true,
    index: true
  })
], UserSettingsDoc.prototype, "userId", 2);
__decorateClass([
  (0, import_mongoose58.Prop)({
    type: Object,
    required: true
  })
], UserSettingsDoc.prototype, "content", 2);
UserSettingsDoc = __decorateClass([
  (0, import_mongoose58.Schema)({
    timestamps: true
  })
], UserSettingsDoc);
var UserSettingsSchema = import_mongoose58.SchemaFactory.createForClass(
  UserSettingsDoc
);

// src/settings/repositories/settings.repository.ts
var SettingsRepository = class {
  constructor(settingsModel) {
    this.settingsModel = settingsModel;
  }
  settingsModel;
  async getByUserId(userId) {
    return this.settingsModel.findOne({ userId }).lean();
  }
  async upsert(userId, content) {
    return this.settingsModel.findOneAndUpdate(
      { userId },
      { userId, content },
      {
        new: true,
        upsert: true
      }
    ).lean();
  }
};
SettingsRepository = __decorateClass([
  (0, import_common69.Injectable)(),
  __decorateParam(0, (0, import_mongoose59.InjectModel)(UserSettingsDoc.name)),
  __decorateParam(0, (0, import_common69.Inject)(import_mongoose60.Model))
], SettingsRepository);

// src/settings/services/settings.service.ts
var SettingsService = class {
  constructor(settingsRepository) {
    this.settingsRepository = settingsRepository;
  }
  settingsRepository;
  async getSettings(userId) {
    const settings = await this.settingsRepository.getByUserId(
      userId
    );
    return {
      success: true,
      data: settings?.content ?? null
    };
  }
  async updateSettings(userId, content) {
    const settings = await this.settingsRepository.upsert(
      userId,
      content
    );
    return {
      success: true,
      message: "Settings updated successfully.",
      data: settings?.content
    };
  }
};
SettingsService = __decorateClass([
  (0, import_common70.Injectable)(),
  __decorateParam(0, (0, import_common70.Inject)(SettingsRepository))
], SettingsService);

// src/settings/controllers/settings.controller.ts
var ADMIN_ONLY_FIELDS = [
  "company",
  "website",
  "address"
];
var SettingsController = class {
  constructor(settingsService) {
    this.settingsService = settingsService;
  }
  settingsService;
  getSettings(req) {
    return this.settingsService.getSettings(
      req.user.sub
    );
  }
  updateSettings(req, body) {
    const isAdmin = req.user.role === "ADMIN" /* ADMIN */;
    if (!isAdmin) {
      const attemptedAdminField = ADMIN_ONLY_FIELDS.find(
        (field) => field in body
      );
      if (attemptedAdminField) {
        throw new import_common71.ForbiddenException(
          "Only an admin can update company settings."
        );
      }
    }
    return this.settingsService.updateSettings(
      req.user.sub,
      body
    );
  }
};
__decorateClass([
  (0, import_common71.Get)(),
  __decorateParam(0, (0, import_common71.Req)())
], SettingsController.prototype, "getSettings", 1);
__decorateClass([
  (0, import_common71.Put)(),
  __decorateParam(0, (0, import_common71.Req)()),
  __decorateParam(1, (0, import_common71.Body)())
], SettingsController.prototype, "updateSettings", 1);
SettingsController = __decorateClass([
  (0, import_common71.UseGuards)(JwtAuthGuard),
  (0, import_common71.Controller)("settings"),
  __decorateParam(0, (0, import_common71.Inject)(SettingsService))
], SettingsController);

// src/settings/settings.module.ts
var SettingsModule = class {
};
SettingsModule = __decorateClass([
  (0, import_common72.Module)({
    imports: [
      import_mongoose61.MongooseModule.forFeature([
        {
          name: UserSettingsDoc.name,
          schema: UserSettingsSchema
        }
      ])
    ],
    controllers: [
      SettingsController
    ],
    providers: [
      SettingsService,
      SettingsRepository
    ],
    exports: [
      SettingsService
    ]
  })
], SettingsModule);

// src/notifications/notifications.module.ts
var import_common76 = require("@nestjs/common");
var import_mongoose65 = require("@nestjs/mongoose");

// src/notifications/controllers/notifications.controller.ts
var import_common75 = require("@nestjs/common");

// src/notifications/services/notifications.service.ts
var import_common74 = require("@nestjs/common");

// src/notifications/repositories/notifications.repository.ts
var import_common73 = require("@nestjs/common");
var import_mongoose63 = require("@nestjs/mongoose");
var import_mongoose64 = require("mongoose");

// src/notifications/schemas/notification.schema.ts
var import_mongoose62 = require("@nestjs/mongoose");
var NotificationDoc = class {
  userId;
  title;
  description;
  type;
  read;
};
__decorateClass([
  (0, import_mongoose62.Prop)({
    type: String,
    required: true,
    index: true
  })
], NotificationDoc.prototype, "userId", 2);
__decorateClass([
  (0, import_mongoose62.Prop)({
    type: String,
    required: true
  })
], NotificationDoc.prototype, "title", 2);
__decorateClass([
  (0, import_mongoose62.Prop)({
    type: String,
    required: true
  })
], NotificationDoc.prototype, "description", 2);
__decorateClass([
  (0, import_mongoose62.Prop)({
    type: String,
    required: true,
    enum: [
      "employee",
      "project",
      "attendance",
      "task",
      "calendar",
      "system"
    ]
  })
], NotificationDoc.prototype, "type", 2);
__decorateClass([
  (0, import_mongoose62.Prop)({
    type: Boolean,
    default: false
  })
], NotificationDoc.prototype, "read", 2);
NotificationDoc = __decorateClass([
  (0, import_mongoose62.Schema)({
    timestamps: true
  })
], NotificationDoc);
var NotificationSchema = import_mongoose62.SchemaFactory.createForClass(
  NotificationDoc
);

// src/notifications/repositories/notifications.repository.ts
var NotificationsRepository = class {
  constructor(notificationModel) {
    this.notificationModel = notificationModel;
  }
  notificationModel;
  async findByUser(userId) {
    return this.notificationModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }
  async create(data) {
    return this.notificationModel.create(data);
  }
  async markAsRead(id, userId) {
    return this.notificationModel.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true }
    ).lean();
  }
  async markAllAsRead(userId) {
    return this.notificationModel.updateMany(
      { userId, read: false },
      { read: true }
    );
  }
  async clearAll(userId) {
    return this.notificationModel.deleteMany({
      userId
    });
  }
};
NotificationsRepository = __decorateClass([
  (0, import_common73.Injectable)(),
  __decorateParam(0, (0, import_mongoose63.InjectModel)(NotificationDoc.name)),
  __decorateParam(0, (0, import_common73.Inject)(import_mongoose64.Model))
], NotificationsRepository);

// src/notifications/services/notifications.service.ts
var NotificationsService = class {
  constructor(notificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }
  notificationsRepository;
  async getMyNotifications(userId) {
    const notifications = await this.notificationsRepository.findByUser(
      userId
    );
    return {
      success: true,
      data: notifications
    };
  }
  // Other modules (employees, projects, attendance, calendar)
  // can call this later to create real notifications when
  // something relevant happens. Not wired to any trigger yet —
  // that's a separate task per module.
  async create(userId, title, description, type) {
    return this.notificationsRepository.create({
      userId,
      title,
      description,
      type
    });
  }
  async markAsRead(id, userId) {
    const updated = await this.notificationsRepository.markAsRead(
      id,
      userId
    );
    return {
      success: true,
      data: updated
    };
  }
  async markAllAsRead(userId) {
    await this.notificationsRepository.markAllAsRead(
      userId
    );
    return {
      success: true,
      message: "All notifications marked as read."
    };
  }
  async clearAll(userId) {
    await this.notificationsRepository.clearAll(
      userId
    );
    return {
      success: true,
      message: "All notifications cleared."
    };
  }
};
NotificationsService = __decorateClass([
  (0, import_common74.Injectable)(),
  __decorateParam(0, (0, import_common74.Inject)(NotificationsRepository))
], NotificationsService);

// src/notifications/controllers/notifications.controller.ts
var NotificationsController = class {
  constructor(notificationsService) {
    this.notificationsService = notificationsService;
  }
  notificationsService;
  getMine(req) {
    return this.notificationsService.getMyNotifications(
      req.user.sub
    );
  }
  markAsRead(id, req) {
    return this.notificationsService.markAsRead(
      id,
      req.user.sub
    );
  }
  markAllAsRead(req) {
    return this.notificationsService.markAllAsRead(
      req.user.sub
    );
  }
  clearAll(req) {
    return this.notificationsService.clearAll(
      req.user.sub
    );
  }
};
__decorateClass([
  (0, import_common75.Get)(),
  __decorateParam(0, (0, import_common75.Req)())
], NotificationsController.prototype, "getMine", 1);
__decorateClass([
  (0, import_common75.Patch)(":id/read"),
  __decorateParam(0, (0, import_common75.Param)("id")),
  __decorateParam(1, (0, import_common75.Req)())
], NotificationsController.prototype, "markAsRead", 1);
__decorateClass([
  (0, import_common75.Patch)("read-all"),
  __decorateParam(0, (0, import_common75.Req)())
], NotificationsController.prototype, "markAllAsRead", 1);
__decorateClass([
  (0, import_common75.Delete)(),
  __decorateParam(0, (0, import_common75.Req)())
], NotificationsController.prototype, "clearAll", 1);
NotificationsController = __decorateClass([
  (0, import_common75.UseGuards)(JwtAuthGuard),
  (0, import_common75.Controller)("notifications"),
  __decorateParam(0, (0, import_common75.Inject)(NotificationsService))
], NotificationsController);

// src/notifications/notifications.module.ts
var NotificationsModule = class {
};
NotificationsModule = __decorateClass([
  (0, import_common76.Module)({
    imports: [
      import_mongoose65.MongooseModule.forFeature([
        {
          name: NotificationDoc.name,
          schema: NotificationSchema
        }
      ])
    ],
    controllers: [
      NotificationsController
    ],
    providers: [
      NotificationsService,
      NotificationsRepository
    ],
    exports: [
      NotificationsService
    ]
  })
], NotificationsModule);

// src/updates/updates.module.ts
var import_common80 = require("@nestjs/common");
var import_mongoose69 = require("@nestjs/mongoose");

// src/updates/controllers/updates.controller.ts
var import_common79 = require("@nestjs/common");
var import_platform_express6 = require("@nestjs/platform-express");

// src/updates/services/updates.service.ts
var import_common78 = require("@nestjs/common");

// src/updates/repositories/updates.repository.ts
var import_common77 = require("@nestjs/common");
var import_mongoose67 = require("@nestjs/mongoose");
var import_mongoose68 = require("mongoose");

// src/updates/schemas/updates-content.schema.ts
var import_mongoose66 = require("@nestjs/mongoose");
var UpdatesContent = class {
  content;
};
__decorateClass([
  (0, import_mongoose66.Prop)({
    type: Object,
    required: true
  })
], UpdatesContent.prototype, "content", 2);
UpdatesContent = __decorateClass([
  (0, import_mongoose66.Schema)({
    timestamps: true
  })
], UpdatesContent);
var UpdatesContentSchema = import_mongoose66.SchemaFactory.createForClass(
  UpdatesContent
);

// src/updates/repositories/updates.repository.ts
var UpdatesRepository = class {
  constructor(updatesModel) {
    this.updatesModel = updatesModel;
  }
  updatesModel;
  async get() {
    return this.updatesModel.findOne().lean();
  }
  // Merge-safe: only touches the one key given, leaves the rest
  // of the content document untouched — this is what prevents
  // saving the CEO message from wiping galleries, or vice versa.
  async updateSection(key, value) {
    return this.updatesModel.findOneAndUpdate(
      {},
      { $set: { [`content.${key}`]: value } },
      {
        new: true,
        upsert: true
      }
    ).lean();
  }
};
UpdatesRepository = __decorateClass([
  (0, import_common77.Injectable)(),
  __decorateParam(0, (0, import_mongoose67.InjectModel)(UpdatesContent.name)),
  __decorateParam(0, (0, import_common77.Inject)(import_mongoose68.Model))
], UpdatesRepository);

// src/updates/services/updates.service.ts
var UpdatesService = class {
  constructor(updatesRepository) {
    this.updatesRepository = updatesRepository;
  }
  updatesRepository;
  async getUpdates() {
    const updates = await this.updatesRepository.get();
    return {
      success: true,
      data: updates?.content ?? {
        ceoMessage: null,
        galleries: []
      }
    };
  }
  async updateCeoMessage(ceoMessage) {
    const updates = await this.updatesRepository.updateSection(
      "ceoMessage",
      ceoMessage
    );
    return {
      success: true,
      message: "Message saved successfully.",
      data: updates?.content
    };
  }
  async updateGalleries(galleries) {
    const updates = await this.updatesRepository.updateSection(
      "galleries",
      galleries
    );
    return {
      success: true,
      message: "Galleries saved successfully.",
      data: updates?.content
    };
  }
};
UpdatesService = __decorateClass([
  (0, import_common78.Injectable)(),
  __decorateParam(0, (0, import_common78.Inject)(UpdatesRepository))
], UpdatesService);

// src/updates/controllers/updates.controller.ts
var UpdatesController = class {
  constructor(updatesService, cloudinary2) {
    this.updatesService = updatesService;
    this.cloudinary = cloudinary2;
  }
  updatesService;
  cloudinary;
  getUpdates() {
    return this.updatesService.getUpdates();
  }
  updateCeoMessage(body) {
    return this.updatesService.updateCeoMessage(
      body
    );
  }
  updateGalleries(body) {
    return this.updatesService.updateGalleries(
      body.galleries
    );
  }
  async uploadVideo(file) {
    const upload = await this.cloudinary.uploadFile(
      file,
      "company-management/updates/videos"
    );
    return {
      success: true,
      data: {
        url: upload.secure_url
      }
    };
  }
  async uploadImage(file) {
    const upload = await this.cloudinary.uploadFile(
      file,
      "company-management/updates/gallery"
    );
    return {
      success: true,
      data: {
        url: upload.secure_url
      }
    };
  }
};
__decorateClass([
  (0, import_common79.Get)()
], UpdatesController.prototype, "getUpdates", 1);
__decorateClass([
  (0, import_common79.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common79.Put)("ceo-message"),
  __decorateParam(0, (0, import_common79.Body)())
], UpdatesController.prototype, "updateCeoMessage", 1);
__decorateClass([
  (0, import_common79.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common79.Put)("galleries"),
  __decorateParam(0, (0, import_common79.Body)())
], UpdatesController.prototype, "updateGalleries", 1);
__decorateClass([
  (0, import_common79.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common79.Post)("upload-video"),
  (0, import_common79.UseInterceptors)(
    (0, import_platform_express6.FileInterceptor)("file")
  ),
  __decorateParam(0, (0, import_common79.UploadedFile)())
], UpdatesController.prototype, "uploadVideo", 1);
__decorateClass([
  (0, import_common79.UseGuards)(
    JwtAuthGuard,
    RolesGuard
  ),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common79.Post)("upload-image"),
  (0, import_common79.UseInterceptors)(
    (0, import_platform_express6.FileInterceptor)("file")
  ),
  __decorateParam(0, (0, import_common79.UploadedFile)())
], UpdatesController.prototype, "uploadImage", 1);
UpdatesController = __decorateClass([
  (0, import_common79.Controller)("updates"),
  __decorateParam(0, (0, import_common79.Inject)(UpdatesService)),
  __decorateParam(1, (0, import_common79.Inject)(CloudinaryService))
], UpdatesController);

// src/updates/updates.module.ts
var UpdatesModule = class {
};
UpdatesModule = __decorateClass([
  (0, import_common80.Module)({
    imports: [
      import_mongoose69.MongooseModule.forFeature([
        {
          name: UpdatesContent.name,
          schema: UpdatesContentSchema
        }
      ]),
      CloudinaryModule
    ],
    controllers: [
      UpdatesController
    ],
    providers: [
      UpdatesService,
      UpdatesRepository
    ],
    exports: [
      UpdatesService
    ]
  })
], UpdatesModule);

// src/footer/footer.module.ts
var import_common84 = require("@nestjs/common");
var import_mongoose73 = require("@nestjs/mongoose");

// src/footer/controllers/footer.controller.ts
var import_common83 = require("@nestjs/common");

// src/footer/services/footer.service.ts
var import_common82 = require("@nestjs/common");

// src/footer/repositories/footer.repository.ts
var import_common81 = require("@nestjs/common");
var import_mongoose71 = require("@nestjs/mongoose");
var import_mongoose72 = require("mongoose");

// src/footer/schemas/footer-content.schema.ts
var import_mongoose70 = require("@nestjs/mongoose");
var FooterContentDoc = class {
  content;
};
__decorateClass([
  (0, import_mongoose70.Prop)({ type: Object, required: true })
], FooterContentDoc.prototype, "content", 2);
FooterContentDoc = __decorateClass([
  (0, import_mongoose70.Schema)({ timestamps: true })
], FooterContentDoc);
var FooterContentSchema = import_mongoose70.SchemaFactory.createForClass(FooterContentDoc);

// src/footer/repositories/footer.repository.ts
var FooterRepository = class {
  constructor(footerModel) {
    this.footerModel = footerModel;
  }
  footerModel;
  async get() {
    return this.footerModel.findOne().lean();
  }
  async replace(content) {
    return this.footerModel.findOneAndUpdate(
      {},
      { $set: { content } },
      { new: true, upsert: true }
    ).lean();
  }
};
FooterRepository = __decorateClass([
  (0, import_common81.Injectable)(),
  __decorateParam(0, (0, import_mongoose71.InjectModel)(FooterContentDoc.name)),
  __decorateParam(0, (0, import_common81.Inject)(import_mongoose72.Model))
], FooterRepository);

// src/footer/services/footer.service.ts
var DEFAULT_CONTENT = {
  description: "Building scalable web, mobile, AI and cloud solutions for startups, businesses and enterprises.",
  copyrightText: "AI Company Management Platform. All rights reserved.",
  socialLinks: [],
  sections: { company: [], services: [], legal: [] }
};
var FooterService = class {
  constructor(footerRepository) {
    this.footerRepository = footerRepository;
  }
  footerRepository;
  async getFooter() {
    const doc = await this.footerRepository.get();
    return { success: true, data: doc?.content ?? DEFAULT_CONTENT };
  }
  async saveFooter(content) {
    const doc = await this.footerRepository.replace(content);
    return {
      success: true,
      message: "Footer saved successfully.",
      data: doc?.content
    };
  }
};
FooterService = __decorateClass([
  (0, import_common82.Injectable)(),
  __decorateParam(0, (0, import_common82.Inject)(FooterRepository))
], FooterService);

// src/footer/controllers/footer.controller.ts
var FooterController = class {
  constructor(footerService) {
    this.footerService = footerService;
  }
  footerService;
  getFooter() {
    return this.footerService.getFooter();
  }
  saveFooter(body) {
    return this.footerService.saveFooter(body);
  }
};
__decorateClass([
  (0, import_common83.Get)()
], FooterController.prototype, "getFooter", 1);
__decorateClass([
  (0, import_common83.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles("ADMIN" /* ADMIN */),
  (0, import_common83.Put)(),
  __decorateParam(0, (0, import_common83.Body)())
], FooterController.prototype, "saveFooter", 1);
FooterController = __decorateClass([
  (0, import_common83.Controller)("footer"),
  __decorateParam(0, (0, import_common83.Inject)(FooterService))
], FooterController);

// src/footer/footer.module.ts
var FooterModule = class {
};
FooterModule = __decorateClass([
  (0, import_common84.Module)({
    imports: [
      import_mongoose73.MongooseModule.forFeature([
        { name: FooterContentDoc.name, schema: FooterContentSchema }
      ])
    ],
    controllers: [FooterController],
    providers: [FooterService, FooterRepository],
    exports: [FooterService]
  })
], FooterModule);

// src/newsletter/newsletter.module.ts
var import_common88 = require("@nestjs/common");
var import_mongoose76 = require("@nestjs/mongoose");

// src/newsletter/newsletter.controller.ts
var import_common87 = require("@nestjs/common");

// src/newsletter/newsletter.service.ts
var import_common86 = require("@nestjs/common");

// src/newsletter/repositories/newsletter.repository.ts
var import_common85 = require("@nestjs/common");
var import_mongoose75 = require("@nestjs/mongoose");

// src/newsletter/schemas/newsletter-subscriber.schema.ts
var import_mongoose74 = require("@nestjs/mongoose");
var NewsletterSubscriberDoc = class {
  email;
  active;
};
__decorateClass([
  (0, import_mongoose74.Prop)({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  })
], NewsletterSubscriberDoc.prototype, "email", 2);
__decorateClass([
  (0, import_mongoose74.Prop)({
    type: Boolean,
    default: true
  })
], NewsletterSubscriberDoc.prototype, "active", 2);
NewsletterSubscriberDoc = __decorateClass([
  (0, import_mongoose74.Schema)({
    timestamps: true,
    collection: "newsletter_subscribers"
  })
], NewsletterSubscriberDoc);
var NewsletterSubscriberSchema = import_mongoose74.SchemaFactory.createForClass(
  NewsletterSubscriberDoc
);

// src/newsletter/repositories/newsletter.repository.ts
var NewsletterRepository = class {
  constructor(model) {
    this.model = model;
  }
  model;
  findByEmail(email) {
    return this.model.findOne({ email: email.toLowerCase().trim() }).exec();
  }
  create(email) {
    return this.model.create({
      email: email.toLowerCase().trim(),
      active: true
    });
  }
};
NewsletterRepository = __decorateClass([
  (0, import_common85.Injectable)(),
  __decorateParam(0, (0, import_mongoose75.InjectModel)(NewsletterSubscriberDoc.name))
], NewsletterRepository);

// src/newsletter/newsletter.service.ts
var NewsletterService = class {
  mailService;
  newsletterRepository;
  constructor(mailService, newsletterRepository) {
    this.mailService = mailService;
    this.newsletterRepository = newsletterRepository;
  }
  async subscribe(email) {
    const normalized = email.toLowerCase().trim();
    const existing = await this.newsletterRepository.findByEmail(
      normalized
    );
    if (existing) {
      return {
        success: true,
        message: "You're already subscribed. Thanks for staying with us.",
        alreadySubscribed: true
      };
    }
    await this.newsletterRepository.create(
      normalized
    );
    try {
      await this.mailService.sendNewsletterSubscriptionNotification(
        normalized
      );
    } catch (error) {
      console.error(
        "[NEWSLETTER] Notification email failed (subscriber saved):",
        error?.message ?? error
      );
    }
    return {
      success: true,
      message: "Thanks for subscribing! We'll keep you posted.",
      alreadySubscribed: false
    };
  }
};
NewsletterService = __decorateClass([
  (0, import_common86.Injectable)(),
  __decorateParam(0, (0, import_common86.Inject)(MailService)),
  __decorateParam(1, (0, import_common86.Inject)(NewsletterRepository))
], NewsletterService);

// src/newsletter/newsletter.controller.ts
var NewsletterController = class {
  service;
  constructor(service) {
    this.service = service;
  }
  subscribe(dto) {
    console.log(
      "[NEWSLETTER DEBUG v3] this.service is:",
      this.service,
      "| typeof:",
      typeof this.service
    );
    return this.service.subscribe(dto.email);
  }
};
__decorateClass([
  (0, import_common87.Post)("subscribe"),
  __decorateParam(0, (0, import_common87.Body)())
], NewsletterController.prototype, "subscribe", 1);
NewsletterController = __decorateClass([
  (0, import_common87.Controller)("newsletter"),
  __decorateParam(0, (0, import_common87.Inject)(NewsletterService))
], NewsletterController);

// src/newsletter/newsletter.module.ts
var NewsletterModule = class {
};
NewsletterModule = __decorateClass([
  (0, import_common88.Module)({
    imports: [
      MailModule,
      import_mongoose76.MongooseModule.forFeature([
        {
          name: NewsletterSubscriberDoc.name,
          schema: NewsletterSubscriberSchema
        }
      ])
    ],
    controllers: [NewsletterController],
    providers: [
      NewsletterService,
      NewsletterRepository
    ]
  })
], NewsletterModule);

// src/calcom/calcom.module.ts
var import_common91 = require("@nestjs/common");

// src/calcom/calcom.controller.ts
var import_common90 = require("@nestjs/common");

// src/calcom/calcom.service.ts
var import_common89 = require("@nestjs/common");
var import_config8 = require("@nestjs/config");
var CalcomService = class {
  apiBase = "https://api.cal.com/v2";
  config;
  constructor(config) {
    this.config = config;
  }
  isConfigured() {
    return Boolean(this.getUsername() && this.getEventSlug());
  }
  getPublicConfig() {
    return {
      configured: this.isConfigured(),
      username: this.getUsername() || null,
      eventSlug: this.getEventSlug() || null,
      durationMinutes: 30
    };
  }
  async getSlots(start, end) {
    this.assertConfigured();
    const username = this.getUsername();
    const eventSlug = this.getEventSlug();
    const timeZone = this.config.get("CALCOM_TIMEZONE") || "Asia/Karachi";
    const url = new URL(`${this.apiBase}/slots`);
    url.searchParams.set("username", username);
    url.searchParams.set("eventTypeSlug", eventSlug);
    url.searchParams.set("start", start);
    url.searchParams.set("end", end);
    url.searchParams.set("timeZone", timeZone);
    const json = await this.calFetch(
      url.toString(),
      { method: "GET" },
      "2024-09-04"
    );
    if (json.status !== "success") {
      throw new import_common89.BadRequestException(
        json.error?.message || "Unable to load available slots from Cal.com"
      );
    }
    const days = json.data ?? {};
    const slots = Object.entries(days).flatMap(
      ([date, items]) => (items ?? []).map((item) => ({
        date,
        start: item.start
      }))
    );
    return {
      timeZone,
      username,
      eventSlug,
      slots
    };
  }
  async createBooking(dto) {
    this.assertConfigured();
    const username = this.getUsername();
    const eventSlug = this.getEventSlug();
    const timeZone = dto.timeZone || this.config.get("CALCOM_TIMEZONE") || "Asia/Karachi";
    const body = {
      start: this.toUtcIso(dto.start),
      eventTypeSlug: eventSlug,
      username,
      attendee: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        timeZone,
        language: "en"
      },
      metadata: {}
    };
    if (dto.notes?.trim()) {
      body.bookingFieldsResponses = {
        notes: dto.notes.trim()
      };
    }
    const json = await this.calFetch(
      `${this.apiBase}/bookings`,
      {
        method: "POST",
        body: JSON.stringify(body)
      },
      "2024-08-13"
    );
    if (json.status !== "success") {
      throw new import_common89.BadRequestException(
        json.error?.message || "Cal.com could not create the booking. Please try another time."
      );
    }
    return {
      success: true,
      booking: json.data
    };
  }
  getUsername() {
    const fromParts = this.config.get("CALCOM_USERNAME");
    if (fromParts?.trim()) {
      return fromParts.trim().toLowerCase();
    }
    const link = this.parseLink();
    return link?.username ?? "";
  }
  getEventSlug() {
    const fromParts = this.config.get("CALCOM_EVENT_SLUG");
    if (fromParts?.trim()) {
      return fromParts.trim().toLowerCase();
    }
    const link = this.parseLink();
    return link?.eventSlug ?? "";
  }
  parseLink() {
    let raw = (this.config.get("CALCOM_LINK") || "").trim().replace(/^@/, "");
    if (!raw) return null;
    try {
      if (/^https?:\/\//i.test(raw)) {
        raw = new URL(raw).pathname.replace(/^\/+|\/+$/g, "");
      }
    } catch {
    }
    const parts = raw.replace(/\/embed$/i, "").replace(/^\/+|\/+$/g, "").toLowerCase().split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return {
      username: parts[0],
      eventSlug: parts[1]
    };
  }
  assertConfigured() {
    if (!this.isConfigured()) {
      throw new import_common89.ServiceUnavailableException(
        "Cal.com is not configured. Set CALCOM_LINK=username/event-slug in the API env."
      );
    }
  }
  /** Ensure start is UTC ISO without timezone offset suffix issues. */
  toUtcIso(start) {
    const date = new Date(start);
    if (Number.isNaN(date.getTime())) {
      throw new import_common89.BadRequestException("Invalid start time");
    }
    return date.toISOString().replace(/\.\d{3}Z$/, "Z");
  }
  async calFetch(url, init, apiVersion) {
    const headers = {
      Accept: "application/json",
      "cal-api-version": apiVersion,
      ...init.headers
    };
    if (init.body) {
      headers["Content-Type"] = "application/json";
    }
    const apiKey = this.config.get("CALCOM_API_KEY");
    if (apiKey?.trim()) {
      headers.Authorization = `Bearer ${apiKey.trim()}`;
    }
    let response;
    try {
      response = await fetch(url, {
        ...init,
        headers
      });
    } catch (error) {
      console.error("[CALCOM] Network error:", error);
      throw new import_common89.ServiceUnavailableException(
        "Unable to reach Cal.com. Please try again shortly."
      );
    }
    const text = await response.text();
    let json;
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      console.error(
        "[CALCOM] Non-JSON response",
        response.status,
        text.slice(0, 300)
      );
      throw new import_common89.ServiceUnavailableException(
        "Unexpected response from Cal.com"
      );
    }
    if (!response.ok) {
      const message = json?.error?.message || json?.message || `Cal.com request failed (${response.status})`;
      console.error("[CALCOM] Error", response.status, message);
      throw new import_common89.BadRequestException(message);
    }
    return json;
  }
};
CalcomService = __decorateClass([
  (0, import_common89.Injectable)(),
  __decorateParam(0, (0, import_common89.Inject)(import_config8.ConfigService))
], CalcomService);

// src/calcom/calcom.controller.ts
var CalcomController = class {
  constructor(calcomService) {
    this.calcomService = calcomService;
  }
  calcomService;
  getConfig() {
    return this.calcomService.getPublicConfig();
  }
  getSlots(query) {
    return this.calcomService.getSlots(query.start, query.end);
  }
  createBooking(dto) {
    return this.calcomService.createBooking(dto);
  }
};
__decorateClass([
  (0, import_common90.Get)("config")
], CalcomController.prototype, "getConfig", 1);
__decorateClass([
  (0, import_common90.Get)("slots"),
  __decorateParam(0, (0, import_common90.Query)())
], CalcomController.prototype, "getSlots", 1);
__decorateClass([
  (0, import_common90.Post)("bookings"),
  __decorateParam(0, (0, import_common90.Body)())
], CalcomController.prototype, "createBooking", 1);
CalcomController = __decorateClass([
  (0, import_common90.Controller)("calcom"),
  __decorateParam(0, (0, import_common90.Inject)(CalcomService))
], CalcomController);

// src/calcom/calcom.module.ts
var CalcomModule = class {
};
CalcomModule = __decorateClass([
  (0, import_common91.Module)({
    controllers: [CalcomController],
    providers: [CalcomService],
    exports: [CalcomService]
  })
], CalcomModule);

// src/app.module.ts
var AppModule = class {
  configure(consumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
};
AppModule = __decorateClass([
  (0, import_common92.Module)({
    imports: [
      import_config9.ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: config_default,
        validationSchema: envValidationSchema
      }),
      DatabaseModule,
      UsersModule,
      AuthModule,
      EmployeesModule,
      DashboardModule,
      ProjectsModule,
      TaskModule,
      AttendanceModule,
      CalendarModule,
      ChatModule,
      MailModule,
      FilesModule,
      ReportsModule,
      PortfolioModule,
      SettingsModule,
      NotificationsModule,
      UpdatesModule,
      FooterModule,
      NewsletterModule,
      CalcomModule
      // AssistantPublicModule,
    ]
  })
], AppModule);

// api/index.ts
var cachedApp;
async function bootstrap() {
  const app = await import_core2.NestFactory.create(
    AppModule
  );
  app.useStaticAssets(
    (0, import_path2.join)(process.cwd(), "uploads"),
    {
      prefix: "/uploads/"
    }
  );
  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true
  });
  app.useGlobalPipes(
    new import_common93.ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  const config = new import_swagger4.DocumentBuilder().setTitle("AI Company Management API").setDescription("Enterprise Management System API").setVersion("1.0").addBearerAuth().build();
  const document = import_swagger4.SwaggerModule.createDocument(
    app,
    config
  );
  import_swagger4.SwaggerModule.setup("docs", app, document);
  await app.init();
  return app;
}
async function handler(req, res) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  const instance = cachedApp.getHttpAdapter().getInstance();
  return instance(req, res);
}
