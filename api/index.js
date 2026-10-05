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

// api/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => handler
});
module.exports = __toCommonJS(index_exports);
var import_core2 = require("@nestjs/core");
var import_common109 = require("@nestjs/common");
var import_path2 = require("path");
var import_swagger7 = require("@nestjs/swagger");

// src/app.module.ts
var import_common108 = require("@nestjs/common");
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
  NODE_ENV: Joi.string().default("development"),
  CLIENT_URL: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES: Joi.string().default("15m"),
  JWT_REFRESH_EXPIRES: Joi.string().default("30d"),
  GEMINI_API_KEY: Joi.string().allow("").optional(),
  MAIL_HOST: Joi.string().optional(),
  MAIL_PORT: Joi.number().optional(),
  MAIL_USER: Joi.string().optional(),
  MAIL_PASSWORD: Joi.string().optional(),
  MAIL_FROM: Joi.string().optional(),
  NEWSLETTER_NOTIFY_EMAIL: Joi.string().email().optional(),
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
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseService_1;
var DatabaseService = DatabaseService_1 = class DatabaseService2 {
  logger = new import_common.Logger(DatabaseService_1.name);
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
DatabaseService = DatabaseService_1 = __decorate([
  (0, import_common.Injectable)()
], DatabaseService);

// src/database/database.module.ts
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule = class DatabaseModule2 {
};
DatabaseModule = __decorate2([
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
var Role;
(function(Role3) {
  Role3["ADMIN"] = "ADMIN";
  Role3["HR"] = "HR";
  Role3["PROJECT_MANAGER"] = "PROJECT_MANAGER";
  Role3["EMPLOYEE"] = "EMPLOYEE";
  Role3["CLIENT"] = "CLIENT";
  Role3["INTERN"] = "INTERN";
  Role3["MANAGER"] = "MANAGER";
  Role3["AI"] = "AI";
  Role3["CEO"] = "CEO";
  Role3["STUDENT"] = "STUDENT";
})(Role || (Role = {}));

// src/users/schemas/user.schema.ts
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
var User = class User2 {
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
  createdAt;
  updatedAt;
};
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  }),
  __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    required: true,
    select: false
  }),
  __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    default: ""
  }),
  __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    default: ""
  }),
  __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    enum: Role,
    default: Role.EMPLOYEE
  }),
  __metadata("design:type", typeof (_a = typeof Role !== "undefined" && Role) === "function" ? _a : Object)
], User.prototype, "role", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Boolean,
    default: true
  }),
  __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Boolean,
    default: false
  }),
  __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Boolean,
    default: true
  }),
  __metadata("design:type", Boolean)
], User.prototype, "mustChangePassword", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    default: null,
    select: false
  }),
  __metadata("design:type", Object)
], User.prototype, "refreshToken", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    default: null,
    select: false
  }),
  __metadata("design:type", Object)
], User.prototype, "emailVerificationToken", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: String,
    default: null,
    select: false
  }),
  __metadata("design:type", Object)
], User.prototype, "passwordResetToken", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  }),
  __metadata("design:type", Object)
], User.prototype, "passwordResetExpires", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  }),
  __metadata("design:type", Object)
], User.prototype, "emailVerifiedAt", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  }),
  __metadata("design:type", Object)
], User.prototype, "lastLogin", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Number,
    default: 0
  }),
  __metadata("design:type", Number)
], User.prototype, "loginAttempts", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  }),
  __metadata("design:type", Object)
], User.prototype, "lockUntil", void 0);
__decorate3([
  (0, import_mongoose2.Prop)({
    type: Date,
    default: null
  }),
  __metadata("design:type", Object)
], User.prototype, "lastPasswordChangedAt", void 0);
User = __decorate3([
  (0, import_mongoose2.Schema)({
    timestamps: true
  })
], User);
var UserSchema = import_mongoose2.SchemaFactory.createForClass(User);

// src/users/repositories/users.repository.ts
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata2 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a2;
var UsersRepository = class UsersRepository2 {
  userModel;
  constructor(userModel) {
    this.userModel = userModel;
  }
  async createUser(data) {
    return this.userModel.create(data);
  }
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
    }).select("+password +refreshToken +emailVerificationToken +passwordResetToken").exec();
  }
  async findByVerificationToken(token) {
    return this.userModel.findOne({
      emailVerificationToken: token
    }).select("+emailVerificationToken").exec();
  }
  async findByPasswordResetToken(token) {
    return this.userModel.findOne({
      passwordResetToken: token
    }).select("+passwordResetToken").exec();
  }
  async existsByEmail(email) {
    const exists = await this.userModel.exists({
      email
    });
    return !!exists;
  }
  async update(id, data) {
    return this.userModel.findByIdAndUpdate(id, data, {
      new: true
    }).exec();
  }
  async delete(id) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async updatePassword(userId, password) {
    return this.userModel.findByIdAndUpdate(userId, {
      password,
      mustChangePassword: false,
      passwordResetToken: null,
      passwordResetExpires: null,
      lastPasswordChangedAt: /* @__PURE__ */ new Date()
    }, {
      new: true
    }).exec();
  }
  async savePasswordResetToken(userId, token, expires) {
    return this.userModel.findByIdAndUpdate(userId, {
      passwordResetToken: token,
      passwordResetExpires: expires
    }, {
      new: true
    }).exec();
  }
  async saveVerificationToken(userId, token) {
    return this.userModel.findByIdAndUpdate(userId, {
      emailVerificationToken: token
    }, {
      new: true
    }).exec();
  }
  async updateVerificationToken(userId, token, expires) {
    return this.userModel.findByIdAndUpdate(userId, {
      emailVerificationToken: token,
      passwordResetExpires: expires
    }, {
      new: true
    }).exec();
  }
  async verifyEmail(userId) {
    return this.userModel.findByIdAndUpdate(userId, {
      isVerified: true,
      emailVerificationToken: null,
      emailVerifiedAt: /* @__PURE__ */ new Date()
    }, {
      new: true
    }).exec();
  }
  async updateRefreshToken(userId, refreshToken) {
    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken
    }, {
      new: true
    }).exec();
  }
  async clearRefreshToken(userId) {
    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken: null
    }, {
      new: true
    }).exec();
  }
  async updateLastLogin(userId) {
    await this.userModel.findByIdAndUpdate(userId, {
      lastLogin: /* @__PURE__ */ new Date()
    });
  }
  async incrementLoginAttempts(userId) {
    await this.userModel.findByIdAndUpdate(userId, {
      $inc: {
        loginAttempts: 1
      }
    });
  }
  async resetLoginAttempts(userId) {
    await this.userModel.findByIdAndUpdate(userId, {
      loginAttempts: 0,
      lockUntil: null
    });
  }
  async lockAccount(userId, until) {
    await this.userModel.findByIdAndUpdate(userId, {
      lockUntil: until
    });
  }
};
UsersRepository = __decorate4([
  (0, import_common3.Injectable)(),
  __param(0, (0, import_mongoose3.InjectModel)(User.name)),
  __param(0, (0, import_common3.Inject)(import_mongoose4.Model)),
  __metadata2("design:paramtypes", [typeof (_a2 = typeof import_mongoose4.Model !== "undefined" && import_mongoose4.Model) === "function" ? _a2 : Object])
], UsersRepository);

// src/users/services/users.service.ts
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata3 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param2 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a3;
var UsersService = class UsersService2 {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  async createUser(dto) {
    return this.repository.createUser(dto);
  }
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
    return this.repository.findByEmailWithPassword(email);
  }
  async findByVerificationToken(token) {
    return this.repository.findByVerificationToken(token);
  }
  async findByPasswordResetToken(token) {
    return this.repository.findByPasswordResetToken(token);
  }
  async existsByEmail(email) {
    return this.repository.existsByEmail(email);
  }
  async update(id, dto) {
    return this.repository.update(id, dto);
  }
  async delete(id) {
    return this.repository.delete(id);
  }
  async updatePassword(userId, password) {
    return this.repository.updatePassword(userId, password);
  }
  async savePasswordResetToken(userId, token, expires) {
    return this.repository.savePasswordResetToken(userId, token, expires);
  }
  async saveVerificationToken(userId, token) {
    return this.repository.saveVerificationToken(userId, token);
  }
  async updateVerificationToken(userId, token, expires) {
    return this.repository.updateVerificationToken(userId, token, expires);
  }
  async verifyEmail(userId) {
    return this.repository.verifyEmail(userId);
  }
  async updateRefreshToken(userId, token) {
    return this.repository.updateRefreshToken(userId, token);
  }
  async clearRefreshToken(userId) {
    return this.repository.clearRefreshToken(userId);
  }
  async updateLastLogin(userId) {
    await this.repository.updateLastLogin(userId);
  }
  async incrementLoginAttempts(userId) {
    await this.repository.incrementLoginAttempts(userId);
  }
  async resetLoginAttempts(userId) {
    await this.repository.resetLoginAttempts(userId);
  }
  async lockAccount(userId, until) {
    await this.repository.lockAccount(userId, until);
  }
  async requireUser(id) {
    const user = await this.findById(id);
    if (!user) {
      throw new import_common4.NotFoundException("User not found.");
    }
    return user;
  }
  async requireUserByEmail(email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new import_common4.NotFoundException("User not found.");
    }
    return user;
  }
};
UsersService = __decorate5([
  (0, import_common4.Injectable)(),
  __param2(0, (0, import_common4.Inject)(UsersRepository)),
  __metadata3("design:paramtypes", [typeof (_a3 = typeof UsersRepository !== "undefined" && UsersRepository) === "function" ? _a3 : Object])
], UsersService);

// src/users/controllers/users.controller.ts
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata4 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param3 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a4;
var UsersController = class UsersController2 {
  usersService;
  constructor(usersService) {
    this.usersService = usersService;
  }
  findAll() {
    return this.usersService.findAll();
  }
  findOne(id) {
    return this.usersService.findById(id);
  }
};
__decorate6([
  (0, import_common5.Get)(),
  __metadata4("design:type", Function),
  __metadata4("design:paramtypes", []),
  __metadata4("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate6([
  (0, import_common5.Get)(":id"),
  __param3(0, (0, import_common5.Param)("id")),
  __metadata4("design:type", Function),
  __metadata4("design:paramtypes", [String]),
  __metadata4("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
UsersController = __decorate6([
  (0, import_common5.Controller)("users"),
  __param3(0, (0, import_common5.Inject)(UsersService)),
  __metadata4("design:paramtypes", [typeof (_a4 = typeof UsersService !== "undefined" && UsersService) === "function" ? _a4 : Object])
], UsersController);

// src/employees/employees.module.ts
var import_common17 = require("@nestjs/common");
var import_mongoose10 = require("@nestjs/mongoose");

// src/employees/schemas/employee.schema.ts
var import_mongoose5 = require("@nestjs/mongoose");
var import_mongoose6 = require("mongoose");

// src/employees/enums/employment-type.enum.ts
var EmploymentType;
(function(EmploymentType2) {
  EmploymentType2["FULL_TIME"] = "FULL_TIME";
  EmploymentType2["PART_TIME"] = "PART_TIME";
  EmploymentType2["CONTRACT"] = "CONTRACT";
  EmploymentType2["INTERN"] = "INTERN";
  EmploymentType2["FREELANCER"] = "FREELANCER";
})(EmploymentType || (EmploymentType = {}));

// src/employees/enums/employee-status.enum.ts
var EmployeeStatus;
(function(EmployeeStatus2) {
  EmployeeStatus2["PENDING"] = "PENDING";
  EmployeeStatus2["ACTIVE"] = "ACTIVE";
  EmployeeStatus2["ON_LEAVE"] = "ON_LEAVE";
  EmployeeStatus2["RESIGNED"] = "RESIGNED";
  EmployeeStatus2["TERMINATED"] = "TERMINATED";
})(EmployeeStatus || (EmployeeStatus = {}));

// src/employees/enums/gender.enum.ts
var Gender;
(function(Gender2) {
  Gender2["MALE"] = "MALE";
  Gender2["FEMALE"] = "FEMALE";
  Gender2["OTHER"] = "OTHER";
})(Gender || (Gender = {}));

// src/employees/schemas/employee.schema.ts
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata5 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a5;
var _b;
var _c;
var _d;
var _e;
var _f;
var Employee = class Employee2 {
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
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    unique: true,
    trim: true
  }),
  __metadata5("design:type", String)
], Employee.prototype, "employeeId", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: import_mongoose6.Types.ObjectId,
    ref: User.name,
    required: false,
    unique: true,
    sparse: true,
    index: true
  }),
  __metadata5("design:type", typeof (_a5 = typeof import_mongoose6.Types !== "undefined" && import_mongoose6.Types.ObjectId) === "function" ? _a5 : Object)
], Employee.prototype, "user", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata5("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata5("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata5("design:type", String)
], Employee.prototype, "fullName", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  }),
  __metadata5("design:type", String)
], Employee.prototype, "email", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String
  }),
  __metadata5("design:type", String)
], Employee.prototype, "phone", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    enum: Gender
  }),
  __metadata5("design:type", typeof (_b = typeof Gender !== "undefined" && Gender) === "function" ? _b : Object)
], Employee.prototype, "gender", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: Date
  }),
  __metadata5("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Employee.prototype, "dateOfBirth", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String
  }),
  __metadata5("design:type", String)
], Employee.prototype, "cnic", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true
  }),
  __metadata5("design:type", String)
], Employee.prototype, "department", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    required: true
  }),
  __metadata5("design:type", String)
], Employee.prototype, "designation", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME
  }),
  __metadata5("design:type", typeof (_d = typeof EmploymentType !== "undefined" && EmploymentType) === "function" ? _d : Object)
], Employee.prototype, "employmentType", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: Date
  }),
  __metadata5("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Employee.prototype, "joiningDate", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: Number,
    default: 0
  }),
  __metadata5("design:type", Number)
], Employee.prototype, "salary", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE
  }),
  __metadata5("design:type", typeof (_f = typeof EmployeeStatus !== "undefined" && EmployeeStatus) === "function" ? _f : Object)
], Employee.prototype, "status", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String
  }),
  __metadata5("design:type", String)
], Employee.prototype, "address", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String
  }),
  __metadata5("design:type", String)
], Employee.prototype, "city", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String
  }),
  __metadata5("design:type", String)
], Employee.prototype, "country", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String
  }),
  __metadata5("design:type", String)
], Employee.prototype, "emergencyContactName", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String
  }),
  __metadata5("design:type", String)
], Employee.prototype, "emergencyContactPhone", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: String,
    default: ""
  }),
  __metadata5("design:type", String)
], Employee.prototype, "avatar", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: Number,
    default: 0
  }),
  __metadata5("design:type", Number)
], Employee.prototype, "performance", void 0);
__decorate7([
  (0, import_mongoose5.Prop)({
    type: Number,
    default: 0
  }),
  __metadata5("design:type", Number)
], Employee.prototype, "attendance", void 0);
Employee = __decorate7([
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
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard = class JwtAuthGuard2 extends (0, import_passport.AuthGuard)("jwt") {
};
JwtAuthGuard = __decorate8([
  (0, import_common6.Injectable)()
], JwtAuthGuard);

// src/auth/guards/roles.guard.ts
var import_common8 = require("@nestjs/common");
var import_core = require("@nestjs/core");

// src/auth/decorators/roles.decorator.ts
var import_common7 = require("@nestjs/common");
var ROLES_KEY = "roles";
var Roles = (...roles) => (0, import_common7.SetMetadata)(ROLES_KEY, roles);

// src/auth/guards/roles.guard.ts
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata6 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param4 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a6;
var RolesGuard = class RolesGuard2 {
  reflector;
  constructor(reflector) {
    this.reflector = reflector;
  }
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
    return requiredRoles.includes(user.role);
  }
};
RolesGuard = __decorate9([
  (0, import_common8.Injectable)(),
  __param4(0, (0, import_common8.Inject)(import_core.Reflector)),
  __metadata6("design:paramtypes", [typeof (_a6 = typeof import_core.Reflector !== "undefined" && import_core.Reflector) === "function" ? _a6 : Object])
], RolesGuard);

// src/auth/constants/role-groups.ts
var VIEW_ROLES = [
  Role.ADMIN,
  Role.HR,
  Role.MANAGER,
  Role.EMPLOYEE,
  Role.INTERN,
  Role.CLIENT,
  Role.CEO,
  Role.AI
];
var MANAGE_ROLES = [
  Role.ADMIN,
  Role.HR
];
var ADMIN_ONLY = [
  Role.ADMIN
];

// src/employees/services/employees.service.ts
var import_common13 = require("@nestjs/common");
var import_mongoose9 = require("mongoose");
var bcrypt = __toESM(require("bcrypt"));

// src/employees/repositories/employees.repository.ts
var import_common9 = require("@nestjs/common");
var import_mongoose7 = require("@nestjs/mongoose");
var import_mongoose8 = require("mongoose");
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata7 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param5 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a7;
var EmployeesRepository = class EmployeesRepository2 {
  employeeModel;
  constructor(employeeModel) {
    this.employeeModel = employeeModel;
  }
  async create(employee) {
    return this.employeeModel.create(employee);
  }
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
    const total = await this.employeeModel.countDocuments(filter);
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
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  async findById(id) {
    if (!import_mongoose8.Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.employeeModel.findById(id).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    }).lean();
  }
  async findByUserId(userId) {
    if (!import_mongoose8.Types.ObjectId.isValid(userId)) {
      return null;
    }
    return this.employeeModel.findOne({
      user: new import_mongoose8.Types.ObjectId(userId)
    }).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    });
  }
  async findByEmployeeId(employeeId) {
    return this.employeeModel.findOne({
      employeeId
    }).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    });
  }
  async findByEmail(email) {
    return this.employeeModel.findOne({
      email
    });
  }
  async existsByUser(userId) {
    if (!import_mongoose8.Types.ObjectId.isValid(userId)) {
      return false;
    }
    const exists = await this.employeeModel.exists({
      user: new import_mongoose8.Types.ObjectId(userId)
    });
    return !!exists;
  }
  async update(id, data) {
    if (!import_mongoose8.Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.employeeModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate({
      path: "user",
      select: "firstName lastName email avatar role"
    }).lean();
  }
  async delete(id) {
    if (!import_mongoose8.Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.employeeModel.findByIdAndDelete(id);
  }
};
EmployeesRepository = __decorate10([
  (0, import_common9.Injectable)(),
  __param5(0, (0, import_mongoose7.InjectModel)(Employee.name)),
  __param5(0, (0, import_common9.Inject)(import_mongoose8.Model)),
  __metadata7("design:paramtypes", [typeof (_a7 = typeof import_mongoose8.Model !== "undefined" && import_mongoose8.Model) === "function" ? _a7 : Object])
], EmployeesRepository);

// src/mail/mail.service.ts
var import_common10 = require("@nestjs/common");
var import_config2 = require("@nestjs/config");
var import_mailer = require("@nestjs-modules/mailer");
var import_uuid = require("uuid");

// src/mail/mail.constants.ts
var APP_NAME = "AI Company Management Platform";

// src/mail/mail.service.ts
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata8 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param6 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a8;
var _b2;
var _c2;
var MailService = class MailService2 {
  mailerService;
  configService;
  usersService;
  get frontendUrl() {
    return (this.configService.get("FRONTEND_URL") || this.configService.getOrThrow("CLIENT_URL")).replace(/\/+$/, "");
  }
  constructor(mailerService, configService, usersService) {
    this.mailerService = mailerService;
    this.configService = configService;
    this.usersService = usersService;
  }
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
      console.error("[MAIL] Failed to send email:", error);
      throw error;
    }
  }
  async sendWelcomeEmail(user, temporaryPassword) {
    const verificationToken = (0, import_uuid.v4)();
    await this.usersService.saveVerificationToken(user.id, verificationToken);
    const verificationUrl = `${this.frontendUrl}/verify-email/${verificationToken}`;
    await this.send({
      to: user.email,
      subject: "Welcome to AI Company",
      template: "welcome",
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        password: temporaryPassword,
        verificationUrl,
        companyName: "AI Company Management Platform",
        supportEmail: this.configService.get("MAIL_FROM")
      }
    });
  }
  async sendResetPasswordEmail(user, resetToken) {
    const resetUrl = `${this.frontendUrl}/reset-password/${resetToken}`;
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
  resolveNotifyEmail() {
    return this.configService.get("NEWSLETTER_NOTIFY_EMAIL") || this.configService.get("MAIL_USER") || "";
  }
  isMailConfigured() {
    return Boolean(this.configService.get("MAIL_HOST") && this.configService.get("MAIL_USER") && this.configService.get("MAIL_PASSWORD"));
  }
  async sendNewsletterSubscriptionNotification(subscriberEmail) {
    if (!this.isMailConfigured()) {
      console.warn("[NEWSLETTER] SMTP not fully configured (MAIL_HOST/USER/PASSWORD) \u2014 skipping emails for", subscriberEmail);
      return;
    }
    const notifyTo = this.resolveNotifyEmail();
    console.log("[NEWSLETTER] New subscription:", subscriberEmail);
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
      console.log("[NEWSLETTER] Notification recipient:", notifyTo);
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
  async sendVerificationEmail(user) {
    const verificationToken = (0, import_uuid.v4)();
    await this.usersService.saveVerificationToken(user.id, verificationToken);
    const verifyUrl = `${this.frontendUrl}/verify-email/${verificationToken}`;
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
MailService = __decorate11([
  (0, import_common10.Injectable)(),
  __param6(0, (0, import_common10.Inject)(import_mailer.MailerService)),
  __param6(1, (0, import_common10.Inject)(import_config2.ConfigService)),
  __param6(2, (0, import_common10.Inject)((0, import_common10.forwardRef)(() => UsersService))),
  __metadata8("design:paramtypes", [typeof (_a8 = typeof import_mailer.MailerService !== "undefined" && import_mailer.MailerService) === "function" ? _a8 : Object, typeof (_b2 = typeof import_config2.ConfigService !== "undefined" && import_config2.ConfigService) === "function" ? _b2 : Object, typeof (_c2 = typeof UsersService !== "undefined" && UsersService) === "function" ? _c2 : Object])
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
      callback(new import_common11.BadRequestException("Only JPG, PNG, or WEBP images are allowed for the profile picture."), false);
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
var __decorate12 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata9 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param7 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CloudinaryService = class CloudinaryService2 {
  cloudinary;
  constructor(cloudinary2) {
    this.cloudinary = cloudinary2;
  }
  async uploadFile(file, folder) {
    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream({
        folder,
        resource_type: "auto"
      }, (error, result) => {
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
      });
      stream.end(file.buffer);
    });
  }
  async deleteFile(publicId) {
    await this.cloudinary.uploader.destroy(publicId);
  }
};
CloudinaryService = __decorate12([
  (0, import_common12.Injectable)(),
  __param7(0, (0, import_common12.Inject)("CLOUDINARY")),
  __metadata9("design:paramtypes", [Object])
], CloudinaryService);

// src/employees/services/employees.service.ts
var __decorate13 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata10 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param8 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a9;
var _b3;
var _c3;
var _d2;
var EmployeesService = class EmployeesService2 {
  repository;
  usersService;
  mailService;
  cloudinaryService;
  constructor(repository, usersService, mailService, cloudinaryService) {
    this.repository = repository;
    this.usersService = usersService;
    this.mailService = mailService;
    this.cloudinaryService = cloudinaryService;
  }
  async create(dto, avatarFile) {
    if (!avatarFile) {
      throw new import_common13.BadRequestException("A profile picture is required to add an employee.");
    }
    const avatarUploadResult = await this.cloudinaryService.uploadFile(avatarFile, "avatars");
    const avatarUrl = avatarUploadResult.secure_url;
    const employeeExists = await this.repository.findByEmail(dto.email);
    if (employeeExists) {
      await this.removeAvatarFile(avatarUrl);
      throw new import_common13.BadRequestException("Employee email already exists.");
    }
    const userExists = await this.usersService.findByEmail(dto.email);
    if (userExists) {
      await this.removeAvatarFile(avatarUrl);
      throw new import_common13.BadRequestException("User already exists.");
    }
    const temporaryPassword = this.generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
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
      employmentType: dto.employmentType ?? EmploymentType.FULL_TIME,
      status: dto.status ?? EmployeeStatus.ACTIVE,
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
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : void 0,
      joiningDate: dto.joiningDate ? new Date(dto.joiningDate) : void 0
    });
    try {
      await this.mailService.sendWelcomeEmail(user, temporaryPassword);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
    }
    return {
      success: true,
      message: "Employee created successfully.",
      data: employee
    };
  }
  async findAll(query) {
    return this.repository.findAll(query);
  }
  async findById(id) {
    const employee = await this.repository.findById(id);
    if (!employee) {
      throw new import_common13.NotFoundException("Employee not found.");
    }
    return {
      success: true,
      data: employee
    };
  }
  async update(id, dto, avatarFile) {
    const employee = await this.repository.findById(id);
    if (!employee) {
      throw new import_common13.NotFoundException("Employee not found.");
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
    const updatedEmployee = await this.repository.update(id, updateData);
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      const user = await this.usersService.findById(userId);
      if (user) {
        await this.usersService.update(userId, {
          firstName: dto.firstName ?? user.firstName,
          lastName: dto.lastName ?? user.lastName,
          email: dto.email ?? user.email,
          phone: dto.phone ?? user.phone,
          avatar: newAvatarUrl ?? user.avatar,
          role: dto.role ?? user.role
        });
      }
    }
    return {
      success: true,
      message: "Employee updated successfully.",
      data: updatedEmployee
    };
  }
  async delete(id) {
    const employee = await this.repository.findById(id);
    if (!employee) {
      throw new import_common13.NotFoundException("Employee not found.");
    }
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      await this.usersService.delete(userId);
    }
    await this.removeAvatarFile(employee.avatar);
    await this.repository.delete(id);
    return {
      success: true,
      message: "Employee deleted successfully."
    };
  }
  async approve(id) {
    const employee = await this.repository.findById(id);
    if (!employee) {
      throw new import_common13.NotFoundException("Employee not found.");
    }
    await this.repository.update(id, {
      status: EmployeeStatus.ACTIVE
    });
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      await this.usersService.update(userId, {
        isActive: true,
        isVerified: true
      });
    }
    return {
      success: true,
      message: "Employee approved successfully."
    };
  }
  async reject(id) {
    const employee = await this.repository.findById(id);
    if (!employee) {
      throw new import_common13.NotFoundException("Employee not found.");
    }
    let userId = "";
    if (employee.user instanceof import_mongoose9.Types.ObjectId) {
      userId = employee.user.toString();
    } else if (employee.user && "_id" in employee.user) {
      userId = employee.user._id.toString();
    }
    if (userId) {
      await this.usersService.delete(userId);
    }
    await this.removeAvatarFile(employee.avatar);
    await this.repository.delete(id);
    return {
      success: true,
      message: "Employee rejected successfully."
    };
  }
  async generateEmployeeId() {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const random = Math.floor(1e3 + Math.random() * 9e3);
    return `EMP-${year}-${random}`;
  }
  generateTemporaryPassword() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  }
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
EmployeesService = __decorate13([
  (0, import_common13.Injectable)(),
  __param8(0, (0, import_common13.Inject)(EmployeesRepository)),
  __param8(1, (0, import_common13.Inject)(UsersService)),
  __param8(2, (0, import_common13.Inject)(MailService)),
  __param8(3, (0, import_common13.Inject)(CloudinaryService)),
  __metadata10("design:paramtypes", [typeof (_a9 = typeof EmployeesRepository !== "undefined" && EmployeesRepository) === "function" ? _a9 : Object, typeof (_b3 = typeof UsersService !== "undefined" && UsersService) === "function" ? _b3 : Object, typeof (_c3 = typeof MailService !== "undefined" && MailService) === "function" ? _c3 : Object, typeof (_d2 = typeof CloudinaryService !== "undefined" && CloudinaryService) === "function" ? _d2 : Object])
], EmployeesService);

// src/employees/dto/create-employee.dto.ts
var import_class_validator = require("class-validator");
var import_class_transformer = require("class-transformer");
var __decorate14 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata11 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a10;
var _b4;
var _c4;
var _d3;
var CreateEmployeeDto = class {
  firstName;
  lastName;
  email;
  phone;
  designation;
  department;
  status;
  employmentType;
  gender;
  joiningDate;
  dateOfBirth;
  cnic;
  salary;
  address;
  city;
  country;
  emergencyContactName;
  emergencyContactPhone;
  user;
  performance;
  attendance;
  joinedAt;
  role;
  password;
};
__decorate14([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.MinLength)(2),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "firstName", void 0);
__decorate14([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.MinLength)(2),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "lastName", void 0);
__decorate14([
  (0, import_class_validator.IsEmail)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "email", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "phone", void 0);
__decorate14([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.MinLength)(2),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "designation", void 0);
__decorate14([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.MinLength)(2),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "department", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsEnum)(EmployeeStatus),
  __metadata11("design:type", typeof (_a10 = typeof EmployeeStatus !== "undefined" && EmployeeStatus) === "function" ? _a10 : Object)
], CreateEmployeeDto.prototype, "status", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsEnum)(EmploymentType),
  __metadata11("design:type", typeof (_b4 = typeof EmploymentType !== "undefined" && EmploymentType) === "function" ? _b4 : Object)
], CreateEmployeeDto.prototype, "employmentType", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsEnum)(Gender),
  __metadata11("design:type", typeof (_c4 = typeof Gender !== "undefined" && Gender) === "function" ? _c4 : Object)
], CreateEmployeeDto.prototype, "gender", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsDateString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "joiningDate", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsDateString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "dateOfBirth", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "cnic", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_transformer.Type)(() => Number),
  (0, import_class_validator.IsNumber)(),
  (0, import_class_validator.Min)(0),
  __metadata11("design:type", Number)
], CreateEmployeeDto.prototype, "salary", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "address", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "city", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "country", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "emergencyContactName", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "emergencyContactPhone", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsMongoId)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "user", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_transformer.Type)(() => Number),
  (0, import_class_validator.IsNumber)(),
  (0, import_class_validator.Min)(0),
  __metadata11("design:type", Number)
], CreateEmployeeDto.prototype, "performance", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_transformer.Type)(() => Number),
  (0, import_class_validator.IsNumber)(),
  (0, import_class_validator.Min)(0),
  __metadata11("design:type", Number)
], CreateEmployeeDto.prototype, "attendance", void 0);
__decorate14([
  (0, import_class_validator.IsOptional)(),
  (0, import_class_validator.IsDateString)(),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "joinedAt", void 0);
__decorate14([
  (0, import_class_validator.IsEnum)(Role),
  __metadata11("design:type", typeof (_d3 = typeof Role !== "undefined" && Role) === "function" ? _d3 : Object)
], CreateEmployeeDto.prototype, "role", void 0);
__decorate14([
  (0, import_class_validator.IsString)(),
  (0, import_class_validator.MinLength)(8),
  (0, import_class_validator.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Password must contain uppercase, lowercase and number"
  }),
  __metadata11("design:type", String)
], CreateEmployeeDto.prototype, "password", void 0);

// src/employees/dto/update-employee.dto.ts
var import_mapped_types = require("@nestjs/mapped-types");
var UpdateEmployeeDto = class extends (0, import_mapped_types.PartialType)(CreateEmployeeDto) {
  firstName;
  lastName;
  joiningDate;
  dateOfBirth;
  email;
  phone;
  role;
};

// src/employees/dto/employee-query.dto.ts
var import_class_validator2 = require("class-validator");
var import_class_transformer2 = require("class-transformer");
var __decorate15 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata12 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a11;
var _b5;
var EmployeeQueryDto = class {
  page = 1;
  limit = 10;
  search;
  department;
  designation;
  status;
  employmentType;
  sortBy = "createdAt";
  order = "desc";
};
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Type)(() => Number),
  (0, import_class_validator2.IsNumber)(),
  __metadata12("design:type", Number)
], EmployeeQueryDto.prototype, "page", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Type)(() => Number),
  (0, import_class_validator2.IsNumber)(),
  __metadata12("design:type", Number)
], EmployeeQueryDto.prototype, "limit", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Transform)(({ value }) => value === "" ? void 0 : value),
  (0, import_class_validator2.IsString)(),
  __metadata12("design:type", String)
], EmployeeQueryDto.prototype, "search", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Transform)(({ value }) => value === "" ? void 0 : value),
  (0, import_class_validator2.IsString)(),
  __metadata12("design:type", String)
], EmployeeQueryDto.prototype, "department", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Transform)(({ value }) => value === "" ? void 0 : value),
  (0, import_class_validator2.IsString)(),
  __metadata12("design:type", String)
], EmployeeQueryDto.prototype, "designation", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Transform)(({ value }) => value === "" ? void 0 : value),
  (0, import_class_validator2.IsEnum)(EmployeeStatus),
  __metadata12("design:type", typeof (_a11 = typeof EmployeeStatus !== "undefined" && EmployeeStatus) === "function" ? _a11 : Object)
], EmployeeQueryDto.prototype, "status", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Transform)(({ value }) => value === "" ? void 0 : value),
  (0, import_class_validator2.IsEnum)(EmploymentType),
  __metadata12("design:type", typeof (_b5 = typeof EmploymentType !== "undefined" && EmploymentType) === "function" ? _b5 : Object)
], EmployeeQueryDto.prototype, "employmentType", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Transform)(({ value }) => value === "" ? void 0 : value),
  (0, import_class_validator2.IsString)(),
  __metadata12("design:type", String)
], EmployeeQueryDto.prototype, "sortBy", void 0);
__decorate15([
  (0, import_class_validator2.IsOptional)(),
  (0, import_class_transformer2.Transform)(({ value }) => value === "" ? void 0 : value),
  (0, import_class_validator2.IsIn)(["asc", "desc"]),
  __metadata12("design:type", String)
], EmployeeQueryDto.prototype, "order", void 0);

// src/employees/controllers/employees.controller.ts
var __decorate16 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata13 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param9 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a12;
var _b6;
var _c5;
var _d4;
var _e2;
var _f2;
var _g;
var _h;
var EmployeesController = class EmployeesController2 {
  service;
  constructor(service) {
    this.service = service;
  }
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
    return this.service.update(id, dto, avatar);
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
__decorate16([
  (0, import_common14.Post)(),
  Roles(...MANAGE_ROLES),
  (0, import_common14.UseInterceptors)((0, import_platform_express.FileInterceptor)("avatar", avatarUploadOptions)),
  __param9(0, (0, import_common14.Body)()),
  __param9(1, (0, import_common14.UploadedFile)()),
  __metadata13("design:type", Function),
  __metadata13("design:paramtypes", [typeof (_b6 = typeof CreateEmployeeDto !== "undefined" && CreateEmployeeDto) === "function" ? _b6 : Object, typeof (_d4 = typeof Express !== "undefined" && (_c5 = Express.Multer) !== void 0 && _c5.File) === "function" ? _d4 : Object]),
  __metadata13("design:returntype", void 0)
], EmployeesController.prototype, "create", null);
__decorate16([
  (0, import_common14.Get)(),
  Roles(...VIEW_ROLES),
  __param9(0, (0, import_common14.Query)()),
  __metadata13("design:type", Function),
  __metadata13("design:paramtypes", [typeof (_e2 = typeof EmployeeQueryDto !== "undefined" && EmployeeQueryDto) === "function" ? _e2 : Object]),
  __metadata13("design:returntype", void 0)
], EmployeesController.prototype, "findAll", null);
__decorate16([
  (0, import_common14.Get)(":id"),
  Roles(...VIEW_ROLES),
  __param9(0, (0, import_common14.Param)("id")),
  __metadata13("design:type", Function),
  __metadata13("design:paramtypes", [String]),
  __metadata13("design:returntype", void 0)
], EmployeesController.prototype, "findOne", null);
__decorate16([
  (0, import_common14.Patch)(":id"),
  Roles(...MANAGE_ROLES),
  (0, import_common14.UseInterceptors)((0, import_platform_express.FileInterceptor)("avatar", avatarUploadOptions)),
  __param9(0, (0, import_common14.Param)("id")),
  __param9(1, (0, import_common14.Body)()),
  __param9(2, (0, import_common14.UploadedFile)()),
  __metadata13("design:type", Function),
  __metadata13("design:paramtypes", [String, typeof (_f2 = typeof UpdateEmployeeDto !== "undefined" && UpdateEmployeeDto) === "function" ? _f2 : Object, typeof (_h = typeof Express !== "undefined" && (_g = Express.Multer) !== void 0 && _g.File) === "function" ? _h : Object]),
  __metadata13("design:returntype", void 0)
], EmployeesController.prototype, "update", null);
__decorate16([
  (0, import_common14.Patch)(":id/approve"),
  Roles(...ADMIN_ONLY),
  __param9(0, (0, import_common14.Param)("id")),
  __metadata13("design:type", Function),
  __metadata13("design:paramtypes", [String]),
  __metadata13("design:returntype", void 0)
], EmployeesController.prototype, "approve", null);
__decorate16([
  (0, import_common14.Delete)(":id/reject"),
  Roles(...ADMIN_ONLY),
  __param9(0, (0, import_common14.Param)("id")),
  __metadata13("design:type", Function),
  __metadata13("design:paramtypes", [String]),
  __metadata13("design:returntype", void 0)
], EmployeesController.prototype, "reject", null);
__decorate16([
  (0, import_common14.Delete)(":id"),
  Roles(...ADMIN_ONLY),
  __param9(0, (0, import_common14.Param)("id")),
  __metadata13("design:type", Function),
  __metadata13("design:paramtypes", [String]),
  __metadata13("design:returntype", void 0)
], EmployeesController.prototype, "remove", null);
EmployeesController = __decorate16([
  (0, import_common14.UseGuards)(JwtAuthGuard, RolesGuard),
  (0, import_common14.Controller)("employees"),
  __param9(0, (0, import_common14.Inject)(EmployeesService)),
  __metadata13("design:paramtypes", [typeof (_a12 = typeof EmployeesService !== "undefined" && EmployeesService) === "function" ? _a12 : Object])
], EmployeesController);

// src/mail/mail.module.ts
var import_common15 = require("@nestjs/common");
var import_config3 = require("@nestjs/config");
var import_mailer2 = require("@nestjs-modules/mailer");
var import_handlebars = require("@nestjs-modules/mailer/adapters/handlebars.adapter");
var import_path = require("path");
var __decorate17 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailModule = class MailModule2 {
};
MailModule = __decorate17([
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
            port: Number(config.get("MAIL_PORT")),
            secure: false,
            auth: {
              user: config.get("MAIL_USER"),
              pass: config.get("MAIL_PASSWORD")
            }
          },
          defaults: {
            from: config.get("MAIL_FROM") || config.get("MAIL_USER") || "noreply@localhost"
          },
          template: {
            dir: (0, import_path.join)(process.cwd(), process.env.VERCEL ? "api/src/mail/templates" : "src/mail/templates"),
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
      cloud_name: configService.get("CLOUDINARY_CLOUD_NAME"),
      api_key: configService.get("CLOUDINARY_API_KEY"),
      api_secret: configService.get("CLOUDINARY_API_SECRET")
    });
    return import_cloudinary2.v2;
  },
  inject: [import_config4.ConfigService]
};

// src/common/cloudinary/cloudinary.module.ts
var __decorate18 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CloudinaryModule = class CloudinaryModule2 {
};
CloudinaryModule = __decorate18([
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
var __decorate19 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeesModule = class EmployeesModule2 {
};
EmployeesModule = __decorate19([
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
var __decorate20 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UsersModule = class UsersModule2 {
};
UsersModule = __decorate20([
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
var __decorate21 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata14 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param10 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a13;
var _b7;
var _c6;
var _d5;
var _e3;
var AuthService = class AuthService2 {
  usersService;
  jwtService;
  configService;
  mailService;
  employeesRepository;
  constructor(usersService, jwtService, configService, mailService, employeesRepository) {
    this.usersService = usersService;
    this.jwtService = jwtService;
    this.configService = configService;
    this.mailService = mailService;
    this.employeesRepository = employeesRepository;
  }
  async createUser(dto) {
    const exists = await this.usersService.existsByEmail(dto.email);
    if (exists) {
      throw new import_common19.BadRequestException("Email already exists.");
    }
    const hashedPassword = await bcrypt2.hash(dto.password, 10);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
      isVerified: false,
      mustChangePassword: false
    });
    const token = (0, import_crypto.randomUUID)();
    const expires = new Date(Date.now() + 1e3 * 60 * 60 * 24);
    await this.usersService.updateVerificationToken(String(user._id), token, expires);
    await this.mailService.sendVerificationEmail(user);
    return {
      success: true,
      message: "Account created successfully. Verification email sent."
    };
  }
  async login(dto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email);
    if (!user) {
      throw new import_common19.UnauthorizedException("Invalid email or password.");
    }
    if (user.lockUntil && user.lockUntil > /* @__PURE__ */ new Date()) {
      throw new import_common19.ForbiddenException("Account temporarily locked.");
    }
    const matched = await bcrypt2.compare(dto.password, user.password);
    if (!matched) {
      await this.usersService.incrementLoginAttempts(String(user._id));
      throw new import_common19.UnauthorizedException("Invalid email or password.");
    }
    await this.usersService.resetLoginAttempts(String(user._id));
    await this.usersService.updateLastLogin(String(user._id));
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    const hashedRefresh = await bcrypt2.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(String(user._id), hashedRefresh);
    const employee = await this.employeesRepository.findByUserId(String(user._id));
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
  async forgotPassword(email) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return {
        success: true
      };
    }
    const token = (0, import_crypto.randomUUID)();
    const expires = new Date(Date.now() + 1e3 * 60 * 60);
    await this.usersService.savePasswordResetToken(String(user._id), token, expires);
    await this.mailService.sendResetPasswordEmail(user, token);
    return {
      success: true
    };
  }
  async resetPassword(token, password) {
    const user = await this.usersService.findByPasswordResetToken(token);
    if (!user) {
      throw new import_common19.BadRequestException("Invalid token.");
    }
    if (user.passwordResetExpires && user.passwordResetExpires < /* @__PURE__ */ new Date()) {
      throw new import_common19.BadRequestException("Token expired.");
    }
    const hashed = await bcrypt2.hash(password, 10);
    await this.usersService.updatePassword(String(user._id), hashed);
    return {
      success: true,
      message: "Password updated."
    };
  }
  async verifyEmail(token) {
    const user = await this.usersService.findByVerificationToken(token);
    if (!user) {
      throw new import_common19.BadRequestException("Invalid verification link.");
    }
    await this.usersService.verifyEmail(String(user._id));
    return {
      success: true,
      message: "Email verified."
    };
  }
  async refresh(refreshToken) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get("JWT_REFRESH_SECRET")
    });
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new import_common19.UnauthorizedException();
    }
    const access = await this.generateAccessToken(user);
    const refresh = await this.generateRefreshToken(user);
    const hash4 = await bcrypt2.hash(refresh, 10);
    await this.usersService.updateRefreshToken(user.id, hash4);
    return {
      accessToken: access,
      refreshToken: refresh
    };
  }
  async logout(userId) {
    await this.usersService.clearRefreshToken(userId);
    return {
      success: true
    };
  }
  async me(userId) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new import_common19.UnauthorizedException();
    }
    const employee = await this.employeesRepository.findByUserId(String(user._id));
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
  generateAccessToken(user) {
    return this.jwtService.signAsync({
      sub: String(user._id),
      email: user.email,
      role: user.role
    });
  }
  generateRefreshToken(user) {
    return this.jwtService.signAsync({
      sub: String(user._id),
      email: user.email,
      role: user.role
    }, {
      secret: this.configService.get("JWT_REFRESH_SECRET"),
      expiresIn: "30d"
    });
  }
};
AuthService = __decorate21([
  (0, import_common19.Injectable)(),
  __param10(0, (0, import_common19.Inject)(UsersService)),
  __param10(1, (0, import_common19.Inject)(import_jwt.JwtService)),
  __param10(2, (0, import_common19.Inject)(import_config5.ConfigService)),
  __param10(3, (0, import_common19.Inject)(MailService)),
  __param10(4, (0, import_common19.Inject)(EmployeesRepository)),
  __metadata14("design:paramtypes", [typeof (_a13 = typeof UsersService !== "undefined" && UsersService) === "function" ? _a13 : Object, typeof (_b7 = typeof import_jwt.JwtService !== "undefined" && import_jwt.JwtService) === "function" ? _b7 : Object, typeof (_c6 = typeof import_config5.ConfigService !== "undefined" && import_config5.ConfigService) === "function" ? _c6 : Object, typeof (_d5 = typeof MailService !== "undefined" && MailService) === "function" ? _d5 : Object, typeof (_e3 = typeof EmployeesRepository !== "undefined" && EmployeesRepository) === "function" ? _e3 : Object])
], AuthService);

// src/auth/dto/login.dto.ts
var import_class_validator3 = require("class-validator");
var __decorate22 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata15 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoginDto = class {
  email;
  password;
};
__decorate22([
  (0, import_class_validator3.IsEmail)(),
  __metadata15("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate22([
  (0, import_class_validator3.IsString)(),
  __metadata15("design:type", String)
], LoginDto.prototype, "password", void 0);

// src/auth/dto/refresh-token.dto.ts
var import_class_validator4 = require("class-validator");
var __decorate23 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata16 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RefreshTokenDto = class {
  refreshToken;
};
__decorate23([
  (0, import_class_validator4.IsString)(),
  __metadata16("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);

// src/auth/dto/register.dto.ts
var import_class_validator5 = require("class-validator");

// src/auth/enums/role.enum.ts
var Role2;
(function(Role3) {
  Role3["ADMIN"] = "ADMIN";
  Role3["HR"] = "HR";
  Role3["PROJECT_MANAGER"] = "PROJECT_MANAGER";
  Role3["EMPLOYEE"] = "EMPLOYEE";
  Role3["CLIENT"] = "CLIENT";
  Role3["INTERN"] = "INTERN";
  Role3["MANAGER"] = "MANAGER";
  Role3["AI"] = "AI";
  Role3["CEO"] = "CEO";
  Role3["STUDENT"] = "STUDENT";
})(Role2 || (Role2 = {}));

// src/auth/dto/register.dto.ts
var __decorate24 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata17 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a14;
var RegisterDto = class {
  firstName;
  lastName;
  email;
  password;
  phone;
  role;
};
__decorate24([
  (0, import_class_validator5.IsString)(),
  (0, import_class_validator5.MinLength)(2),
  __metadata17("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate24([
  (0, import_class_validator5.IsString)(),
  (0, import_class_validator5.MinLength)(2),
  __metadata17("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate24([
  (0, import_class_validator5.IsEmail)(),
  __metadata17("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate24([
  (0, import_class_validator5.IsString)(),
  (0, import_class_validator5.MinLength)(8),
  (0, import_class_validator5.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Password must contain uppercase, lowercase and number"
  }),
  __metadata17("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate24([
  (0, import_class_validator5.IsOptional)(),
  (0, import_class_validator5.IsString)(),
  __metadata17("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate24([
  (0, import_class_validator5.IsOptional)(),
  (0, import_class_validator5.IsEnum)(Role2),
  __metadata17("design:type", typeof (_a14 = typeof Role2 !== "undefined" && Role2) === "function" ? _a14 : Object)
], RegisterDto.prototype, "role", void 0);

// src/auth/decorators/current-user.decorator.ts
var import_common20 = require("@nestjs/common");
var CurrentUser = (0, import_common20.createParamDecorator)((_data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

// src/auth/controllers/auth.controller.ts
var __decorate25 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata18 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param11 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a15;
var _b8;
var _c7;
var _d6;
var _e4;
var AuthController = class AuthController2 {
  authService;
  constructor(authService) {
    this.authService = authService;
  }
  createUser(dto) {
    return this.authService.createUser(dto);
  }
  login(dto) {
    return this.authService.login(dto);
  }
  verifyEmail(token) {
    return this.authService.verifyEmail(token);
  }
  register(dto) {
    return this.authService.createUser({
      ...dto,
      role: Role.STUDENT
    });
  }
  refresh(dto) {
    return this.authService.refresh(dto.refreshToken);
  }
  me(user) {
    return this.authService.me(user.sub);
  }
  logout(user) {
    return this.authService.logout(user.sub);
  }
};
__decorate25([
  (0, import_common21.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common21.Post)("create-user"),
  __param11(0, (0, import_common21.Body)()),
  __metadata18("design:type", Function),
  __metadata18("design:paramtypes", [typeof (_b8 = typeof RegisterDto !== "undefined" && RegisterDto) === "function" ? _b8 : Object]),
  __metadata18("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
__decorate25([
  (0, import_common21.Post)("login"),
  __param11(0, (0, import_common21.Body)()),
  __metadata18("design:type", Function),
  __metadata18("design:paramtypes", [typeof (_c7 = typeof LoginDto !== "undefined" && LoginDto) === "function" ? _c7 : Object]),
  __metadata18("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate25([
  (0, import_common21.Post)("verify-email/:token"),
  __param11(0, (0, import_common21.Param)("token")),
  __metadata18("design:type", Function),
  __metadata18("design:paramtypes", [String]),
  __metadata18("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
__decorate25([
  (0, import_common21.Post)("register"),
  __param11(0, (0, import_common21.Body)()),
  __metadata18("design:type", Function),
  __metadata18("design:paramtypes", [typeof (_d6 = typeof RegisterDto !== "undefined" && RegisterDto) === "function" ? _d6 : Object]),
  __metadata18("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate25([
  (0, import_common21.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN, Role.MANAGER, Role.HR, Role.EMPLOYEE, Role.INTERN, Role.CLIENT, Role.CEO, Role.AI, Role.STUDENT),
  (0, import_common21.Post)("refresh"),
  __param11(0, (0, import_common21.Body)()),
  __metadata18("design:type", Function),
  __metadata18("design:paramtypes", [typeof (_e4 = typeof RefreshTokenDto !== "undefined" && RefreshTokenDto) === "function" ? _e4 : Object]),
  __metadata18("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate25([
  (0, import_common21.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN, Role.MANAGER, Role.HR, Role.EMPLOYEE, Role.INTERN, Role.CLIENT, Role.CEO, Role.AI, Role.STUDENT),
  (0, import_common21.Get)("me"),
  __param11(0, CurrentUser()),
  __metadata18("design:type", Function),
  __metadata18("design:paramtypes", [Object]),
  __metadata18("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate25([
  (0, import_common21.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN, Role.MANAGER, Role.HR, Role.EMPLOYEE, Role.INTERN, Role.CLIENT, Role.CEO, Role.AI, Role.STUDENT),
  (0, import_common21.Post)("logout"),
  __param11(0, CurrentUser()),
  __metadata18("design:type", Function),
  __metadata18("design:paramtypes", [Object]),
  __metadata18("design:returntype", void 0)
], AuthController.prototype, "logout", null);
AuthController = __decorate25([
  (0, import_common21.Controller)("auth"),
  __param11(0, (0, import_common21.Inject)(AuthService)),
  __metadata18("design:paramtypes", [typeof (_a15 = typeof AuthService !== "undefined" && AuthService) === "function" ? _a15 : Object])
], AuthController);

// src/auth/strategies/jwt.strategy.ts
var import_common22 = require("@nestjs/common");
var import_config6 = require("@nestjs/config");
var import_passport2 = require("@nestjs/passport");
var import_passport_jwt = require("passport-jwt");
var __decorate26 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata19 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param12 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a16;
var JwtStrategy = class JwtStrategy2 extends (0, import_passport2.PassportStrategy)(import_passport_jwt.Strategy) {
  constructor(configService) {
    super({
      jwtFromRequest: import_passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET")
    });
  }
  async validate(payload) {
    return payload;
  }
};
JwtStrategy = __decorate26([
  (0, import_common22.Injectable)(),
  __param12(0, (0, import_common22.Inject)(import_config6.ConfigService)),
  __metadata19("design:paramtypes", [typeof (_a16 = typeof import_config6.ConfigService !== "undefined" && import_config6.ConfigService) === "function" ? _a16 : Object])
], JwtStrategy);

// src/auth/auth.module.ts
var __decorate27 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule = class AuthModule2 {
};
AuthModule = __decorate27([
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
          secret: config.getOrThrow("JWT_SECRET"),
          signOptions: {
            expiresIn: config.get("JWT_EXPIRES") ?? "15m"
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
var ProjectPriority;
(function(ProjectPriority2) {
  ProjectPriority2["LOW"] = "Low";
  ProjectPriority2["MEDIUM"] = "Medium";
  ProjectPriority2["HIGH"] = "High";
  ProjectPriority2["CRITICAL"] = "Critical";
})(ProjectPriority || (ProjectPriority = {}));

// src/projects/enums/project-status.enum.ts
var ProjectStatus;
(function(ProjectStatus2) {
  ProjectStatus2["PLANNING"] = "Planning";
  ProjectStatus2["ACTIVE"] = "Active";
  ProjectStatus2["ON_HOLD"] = "On Hold";
  ProjectStatus2["COMPLETED"] = "Completed";
})(ProjectStatus || (ProjectStatus = {}));

// src/projects/schemas/project.schema.ts
var __decorate28 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata20 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a17;
var _b9;
var _c8;
var _d7;
var Project = class Project2 {
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
__decorate28([
  (0, import_mongoose12.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata20("design:type", String)
], Project.prototype, "name", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: String,
    default: "",
    trim: true
  }),
  __metadata20("design:type", String)
], Project.prototype, "description", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: String,
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING
  }),
  __metadata20("design:type", typeof (_a17 = typeof ProjectStatus !== "undefined" && ProjectStatus) === "function" ? _a17 : Object)
], Project.prototype, "status", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: String,
    enum: ProjectPriority,
    default: ProjectPriority.MEDIUM
  }),
  __metadata20("design:type", typeof (_b9 = typeof ProjectPriority !== "undefined" && ProjectPriority) === "function" ? _b9 : Object)
], Project.prototype, "priority", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }),
  __metadata20("design:type", Number)
], Project.prototype, "progress", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: Number,
    default: 0
  }),
  __metadata20("design:type", Number)
], Project.prototype, "totalTasks", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: Number,
    default: 0
  }),
  __metadata20("design:type", Number)
], Project.prototype, "completedTasks", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: Date,
    required: true
  }),
  __metadata20("design:type", typeof (_c8 = typeof Date !== "undefined" && Date) === "function" ? _c8 : Object)
], Project.prototype, "startDate", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: Date,
    required: true
  }),
  __metadata20("design:type", typeof (_d7 = typeof Date !== "undefined" && Date) === "function" ? _d7 : Object)
], Project.prototype, "dueDate", void 0);
__decorate28([
  (0, import_mongoose12.Prop)({
    type: [
      {
        type: import_mongoose13.Types.ObjectId,
        ref: "Employee"
      }
    ],
    default: []
  }),
  __metadata20("design:type", Array)
], Project.prototype, "members", void 0);
Project = __decorate28([
  (0, import_mongoose12.Schema)({
    timestamps: true
  })
], Project);
var ProjectSchema = import_mongoose12.SchemaFactory.createForClass(Project);

// src/tasks/schemas/task.schema.ts
var import_mongoose14 = require("@nestjs/mongoose");
var import_mongoose15 = require("mongoose");

// src/tasks/enums/task-priority.enum.ts
var TaskPriority;
(function(TaskPriority2) {
  TaskPriority2["LOW"] = "Low";
  TaskPriority2["MEDIUM"] = "Medium";
  TaskPriority2["HIGH"] = "High";
  TaskPriority2["CRITICAL"] = "Critical";
})(TaskPriority || (TaskPriority = {}));

// src/tasks/enums/task-status.enum.ts
var TaskStatus;
(function(TaskStatus2) {
  TaskStatus2["TODO"] = "Todo";
  TaskStatus2["IN_PROGRESS"] = "In Progress";
  TaskStatus2["REVIEW"] = "Review";
  TaskStatus2["COMPLETED"] = "Completed";
})(TaskStatus || (TaskStatus = {}));

// src/tasks/schemas/task.schema.ts
var __decorate29 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata21 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a18;
var _b10;
var _c9;
var _d8;
var _e5;
var Task = class Task2 {
  title;
  description;
  project;
  assignedTo;
  status;
  priority;
  progress;
  dueDate;
};
__decorate29([
  (0, import_mongoose14.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata21("design:type", String)
], Task.prototype, "title", void 0);
__decorate29([
  (0, import_mongoose14.Prop)({
    type: String,
    default: "",
    trim: true
  }),
  __metadata21("design:type", String)
], Task.prototype, "description", void 0);
__decorate29([
  (0, import_mongoose14.Prop)({
    type: import_mongoose15.Types.ObjectId,
    ref: "Project",
    required: true
  }),
  __metadata21("design:type", typeof (_a18 = typeof import_mongoose15.Types !== "undefined" && import_mongoose15.Types.ObjectId) === "function" ? _a18 : Object)
], Task.prototype, "project", void 0);
__decorate29([
  (0, import_mongoose14.Prop)({
    type: import_mongoose15.Types.ObjectId,
    ref: "Employee",
    required: true
  }),
  __metadata21("design:type", typeof (_b10 = typeof import_mongoose15.Types !== "undefined" && import_mongoose15.Types.ObjectId) === "function" ? _b10 : Object)
], Task.prototype, "assignedTo", void 0);
__decorate29([
  (0, import_mongoose14.Prop)({
    type: String,
    enum: TaskStatus,
    default: TaskStatus.TODO
  }),
  __metadata21("design:type", typeof (_c9 = typeof TaskStatus !== "undefined" && TaskStatus) === "function" ? _c9 : Object)
], Task.prototype, "status", void 0);
__decorate29([
  (0, import_mongoose14.Prop)({
    type: String,
    enum: TaskPriority,
    default: TaskPriority.MEDIUM
  }),
  __metadata21("design:type", typeof (_d8 = typeof TaskPriority !== "undefined" && TaskPriority) === "function" ? _d8 : Object)
], Task.prototype, "priority", void 0);
__decorate29([
  (0, import_mongoose14.Prop)({
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }),
  __metadata21("design:type", Number)
], Task.prototype, "progress", void 0);
__decorate29([
  (0, import_mongoose14.Prop)({
    type: Date,
    required: true
  }),
  __metadata21("design:type", typeof (_e5 = typeof Date !== "undefined" && Date) === "function" ? _e5 : Object)
], Task.prototype, "dueDate", void 0);
Task = __decorate29([
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
var __decorate30 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata22 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param13 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a19;
var _b11;
var _c10;
var DashboardRepository = class DashboardRepository2 {
  employeeModel;
  projectModel;
  taskModel;
  constructor(employeeModel, projectModel, taskModel) {
    this.employeeModel = employeeModel;
    this.projectModel = projectModel;
    this.taskModel = taskModel;
  }
  async getStatistics() {
    const [employees, projects, tasks] = await Promise.all([
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
    return analytics.map((item) => ({
      month: months[item._id.month - 1],
      employees: item.employees,
      revenue: 0
    }));
  }
  async getRecentActivities() {
    const employees = await this.employeeModel.find().sort({
      joiningDate: -1
    }).limit(5).select("firstName lastName joiningDate").lean();
    return employees.map((employee) => ({
      id: employee._id.toString(),
      title: `${employee.firstName} ${employee.lastName} joined the company`,
      time: employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : ""
    }));
  }
  async getLatestProjects() {
    const projects = await this.projectModel.find().sort({
      createdAt: -1
    }).limit(5).lean();
    return projects.map((project) => ({
      id: project._id.toString(),
      name: project.name,
      progress: project.progress,
      due: project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "",
      members: project.members?.length ?? 0,
      status: project.status
    }));
  }
  async getPerformance() {
    const employees = await this.employeeModel.find().sort({
      performance: -1
    }).limit(5).select("firstName lastName designation performance").lean();
    return employees.map((employee) => ({
      id: employee._id.toString(),
      name: `${employee.firstName} ${employee.lastName}`,
      role: employee.designation,
      performance: employee.performance ?? 0
    }));
  }
};
DashboardRepository = __decorate30([
  (0, import_common24.Injectable)(),
  __param13(0, (0, import_mongoose16.InjectModel)(Employee.name)),
  __param13(0, (0, import_common24.Inject)(import_mongoose17.Model)),
  __param13(1, (0, import_mongoose16.InjectModel)(Project.name)),
  __param13(1, (0, import_common24.Inject)(import_mongoose17.Model)),
  __param13(2, (0, import_mongoose16.InjectModel)(Task.name)),
  __param13(2, (0, import_common24.Inject)(import_mongoose17.Model)),
  __metadata22("design:paramtypes", [typeof (_a19 = typeof import_mongoose17.Model !== "undefined" && import_mongoose17.Model) === "function" ? _a19 : Object, typeof (_b11 = typeof import_mongoose17.Model !== "undefined" && import_mongoose17.Model) === "function" ? _b11 : Object, typeof (_c10 = typeof import_mongoose17.Model !== "undefined" && import_mongoose17.Model) === "function" ? _c10 : Object])
], DashboardRepository);

// src/dashboard/services/dashboard.service.ts
var __decorate31 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata23 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param14 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a20;
var DashboardService = class DashboardService2 {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  async getDashboard() {
    const [statistics, analytics, activities, latestProjects, performance] = await Promise.all([
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
DashboardService = __decorate31([
  (0, import_common25.Injectable)(),
  __param14(0, (0, import_common25.Inject)(DashboardRepository)),
  __metadata23("design:paramtypes", [typeof (_a20 = typeof DashboardRepository !== "undefined" && DashboardRepository) === "function" ? _a20 : Object])
], DashboardService);

// src/dashboard/controllers/dashboard.controller.ts
var __decorate32 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata24 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param15 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a21;
var DashboardController = class DashboardController2 {
  dashboardService;
  constructor(dashboardService) {
    this.dashboardService = dashboardService;
  }
  getDashboard() {
    return this.dashboardService.getDashboard();
  }
};
__decorate32([
  (0, import_common26.Get)(),
  Roles(...VIEW_ROLES),
  __metadata24("design:type", Function),
  __metadata24("design:paramtypes", []),
  __metadata24("design:returntype", void 0)
], DashboardController.prototype, "getDashboard", null);
DashboardController = __decorate32([
  (0, import_swagger.ApiTags)("Dashboard"),
  (0, import_swagger.ApiBearerAuth)(),
  (0, import_common26.UseGuards)(JwtAuthGuard, RolesGuard),
  (0, import_common26.Controller)("dashboard"),
  __param15(0, (0, import_common26.Inject)(DashboardService)),
  __metadata24("design:paramtypes", [typeof (_a21 = typeof DashboardService !== "undefined" && DashboardService) === "function" ? _a21 : Object])
], DashboardController);

// src/dashboard/dashboard.module.ts
var __decorate33 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DashboardModule = class DashboardModule2 {
};
DashboardModule = __decorate33([
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
var import_swagger3 = require("@nestjs/swagger");

// src/projects/dto/create-project.dto.ts
var import_class_validator6 = require("class-validator");
var __decorate34 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata25 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a22;
var _b12;
var CreateProjectDto = class {
  name;
  description;
  status;
  priority;
  startDate;
  dueDate;
  members;
};
__decorate34([
  (0, import_class_validator6.IsString)(),
  (0, import_class_validator6.MinLength)(3),
  __metadata25("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate34([
  (0, import_class_validator6.IsString)(),
  (0, import_class_validator6.IsOptional)(),
  __metadata25("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate34([
  (0, import_class_validator6.IsOptional)(),
  (0, import_class_validator6.IsEnum)(ProjectStatus),
  __metadata25("design:type", typeof (_a22 = typeof ProjectStatus !== "undefined" && ProjectStatus) === "function" ? _a22 : Object)
], CreateProjectDto.prototype, "status", void 0);
__decorate34([
  (0, import_class_validator6.IsOptional)(),
  (0, import_class_validator6.IsEnum)(ProjectPriority),
  __metadata25("design:type", typeof (_b12 = typeof ProjectPriority !== "undefined" && ProjectPriority) === "function" ? _b12 : Object)
], CreateProjectDto.prototype, "priority", void 0);
__decorate34([
  (0, import_class_validator6.IsDateString)(),
  __metadata25("design:type", String)
], CreateProjectDto.prototype, "startDate", void 0);
__decorate34([
  (0, import_class_validator6.IsDateString)(),
  __metadata25("design:type", String)
], CreateProjectDto.prototype, "dueDate", void 0);
__decorate34([
  (0, import_class_validator6.IsOptional)(),
  (0, import_class_validator6.IsArray)(),
  (0, import_class_validator6.IsMongoId)({
    each: true
  }),
  __metadata25("design:type", Array)
], CreateProjectDto.prototype, "members", void 0);

// src/projects/dto/update-project.dto.ts
var import_swagger2 = require("@nestjs/swagger");
var UpdateProjectDto = class extends (0, import_swagger2.PartialType)(CreateProjectDto) {
};

// src/projects/dto/project-query.dto.ts
var import_class_validator7 = require("class-validator");
var import_class_transformer3 = require("class-transformer");
var __decorate35 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata26 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a23;
var _b13;
var ProjectQueryDto = class {
  page = 1;
  limit = 10;
  search;
  status;
  priority;
  sortBy = "createdAt";
  order = "desc";
};
__decorate35([
  (0, import_class_validator7.IsOptional)(),
  (0, import_class_transformer3.Type)(() => Number),
  (0, import_class_validator7.IsNumber)(),
  __metadata26("design:type", Number)
], ProjectQueryDto.prototype, "page", void 0);
__decorate35([
  (0, import_class_validator7.IsOptional)(),
  (0, import_class_transformer3.Type)(() => Number),
  (0, import_class_validator7.IsNumber)(),
  __metadata26("design:type", Number)
], ProjectQueryDto.prototype, "limit", void 0);
__decorate35([
  (0, import_class_validator7.IsOptional)(),
  (0, import_class_validator7.IsString)(),
  __metadata26("design:type", String)
], ProjectQueryDto.prototype, "search", void 0);
__decorate35([
  (0, import_class_validator7.IsOptional)(),
  (0, import_class_validator7.IsEnum)(ProjectStatus),
  __metadata26("design:type", typeof (_a23 = typeof ProjectStatus !== "undefined" && ProjectStatus) === "function" ? _a23 : Object)
], ProjectQueryDto.prototype, "status", void 0);
__decorate35([
  (0, import_class_validator7.IsOptional)(),
  (0, import_class_validator7.IsEnum)(ProjectPriority),
  __metadata26("design:type", typeof (_b13 = typeof ProjectPriority !== "undefined" && ProjectPriority) === "function" ? _b13 : Object)
], ProjectQueryDto.prototype, "priority", void 0);
__decorate35([
  (0, import_class_validator7.IsOptional)(),
  (0, import_class_validator7.IsString)(),
  __metadata26("design:type", String)
], ProjectQueryDto.prototype, "sortBy", void 0);
__decorate35([
  (0, import_class_validator7.IsOptional)(),
  (0, import_class_validator7.IsIn)(["asc", "desc"]),
  __metadata26("design:type", String)
], ProjectQueryDto.prototype, "order", void 0);

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
      members: project.members?.map((member) => ({
        id: member._id.toString(),
        name: `${member.firstName} ${member.lastName}`,
        avatar: member.avatar ?? "",
        role: member.designation
      })) ?? []
    };
  }
  static toDetails(project) {
    return this.toList(project);
  }
  static toCollection(projects) {
    return projects.map((project) => this.toList(project));
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
var __decorate36 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata27 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param16 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a24;
var ProjectsRepository = class ProjectsRepository2 {
  projectModel;
  constructor(projectModel) {
    this.projectModel = projectModel;
  }
  memberPopulate = {
    path: "members",
    select: "firstName lastName fullName designation avatar email"
  };
  async create(dto) {
    const created = await this.projectModel.create({
      ...dto,
      startDate: new Date(dto.startDate),
      dueDate: new Date(dto.dueDate)
    });
    const project = await this.projectModel.findById(created._id).populate(this.memberPopulate).lean();
    return project;
  }
  async findAll(query) {
    const { page = 1, limit = 10, search, status, priority, sortBy = "createdAt", order = "desc" } = query;
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
    const total = await this.projectModel.countDocuments(filter);
    const projects = await this.projectModel.find(filter).populate(this.memberPopulate).sort({
      [sortBy]: order === "asc" ? 1 : -1
    }).skip((page - 1) * limit).limit(limit).lean();
    return {
      items: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  async findById(id) {
    const project = await this.projectModel.findById(id).populate(this.memberPopulate).lean();
    if (!project) {
      throw new import_common28.NotFoundException("Project not found.");
    }
    return project;
  }
  async update(id, dto) {
    const updated = await this.projectModel.findByIdAndUpdate(id, {
      ...dto,
      ...dto.startDate && {
        startDate: new Date(dto.startDate)
      },
      ...dto.dueDate && {
        dueDate: new Date(dto.dueDate)
      }
    }, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      throw new import_common28.NotFoundException("Project not found.");
    }
    const project = await this.projectModel.findById(updated._id).populate(this.memberPopulate).lean();
    return project;
  }
  async remove(id) {
    const deleted = await this.projectModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new import_common28.NotFoundException("Project not found.");
    }
  }
  async getStatistics() {
    const [total, active, completed, planning] = await Promise.all([
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
ProjectsRepository = __decorate36([
  (0, import_common28.Injectable)(),
  __param16(0, (0, import_mongoose19.InjectModel)(Project.name)),
  __param16(0, (0, import_common28.Inject)(import_mongoose20.Model)),
  __metadata27("design:paramtypes", [typeof (_a24 = typeof import_mongoose20.Model !== "undefined" && import_mongoose20.Model) === "function" ? _a24 : Object])
], ProjectsRepository);

// src/projects/services/projects.service.ts
var __decorate37 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata28 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param17 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a25;
var ProjectsService = class ProjectsService2 {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  async create(dto) {
    const project = await this.repository.create(dto);
    return ProjectMapper.toDetails(project);
  }
  async findAll(query) {
    const result = await this.repository.findAll(query);
    return {
      items: ProjectMapper.toCollection(result.items),
      pagination: result.pagination
    };
  }
  async findById(id) {
    const project = await this.repository.findById(id);
    return ProjectMapper.toDetails(project);
  }
  async update(id, dto) {
    const project = await this.repository.update(id, dto);
    return ProjectMapper.toDetails(project);
  }
  async remove(id) {
    await this.repository.remove(id);
    return {
      message: "Project deleted successfully."
    };
  }
  async getStatistics() {
    const statistics = await this.repository.getStatistics();
    return ProjectMapper.statistics(statistics);
  }
};
ProjectsService = __decorate37([
  (0, import_common29.Injectable)(),
  __param17(0, (0, import_common29.Inject)(ProjectsRepository)),
  __metadata28("design:paramtypes", [typeof (_a25 = typeof ProjectsRepository !== "undefined" && ProjectsRepository) === "function" ? _a25 : Object])
], ProjectsService);

// src/projects/controllers/projects.controller.ts
var __decorate38 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata29 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param18 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a26;
var _b14;
var _c11;
var _d9;
var ProjectsController = class ProjectsController2 {
  projectsService;
  constructor(projectsService) {
    this.projectsService = projectsService;
  }
  create(dto) {
    return this.projectsService.create(dto);
  }
  findAll(query) {
    return this.projectsService.findAll(query);
  }
  getStatistics() {
    return this.projectsService.getStatistics();
  }
  findById(id) {
    return this.projectsService.findById(id);
  }
  update(id, dto) {
    return this.projectsService.update(id, dto);
  }
  remove(id) {
    return this.projectsService.remove(id);
  }
};
__decorate38([
  (0, import_common30.Post)(),
  Roles(...MANAGE_ROLES),
  __param18(0, (0, import_common30.Body)()),
  __metadata29("design:type", Function),
  __metadata29("design:paramtypes", [typeof (_b14 = typeof CreateProjectDto !== "undefined" && CreateProjectDto) === "function" ? _b14 : Object]),
  __metadata29("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate38([
  (0, import_common30.Get)(),
  Roles(...VIEW_ROLES),
  __param18(0, (0, import_common30.Query)()),
  __metadata29("design:type", Function),
  __metadata29("design:paramtypes", [typeof (_c11 = typeof ProjectQueryDto !== "undefined" && ProjectQueryDto) === "function" ? _c11 : Object]),
  __metadata29("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate38([
  (0, import_common30.Get)("stats"),
  Roles(...VIEW_ROLES),
  __metadata29("design:type", Function),
  __metadata29("design:paramtypes", []),
  __metadata29("design:returntype", void 0)
], ProjectsController.prototype, "getStatistics", null);
__decorate38([
  (0, import_common30.Get)(":id"),
  Roles(...VIEW_ROLES),
  __param18(0, (0, import_common30.Param)("id")),
  __metadata29("design:type", Function),
  __metadata29("design:paramtypes", [String]),
  __metadata29("design:returntype", void 0)
], ProjectsController.prototype, "findById", null);
__decorate38([
  (0, import_common30.Patch)(":id"),
  Roles(...MANAGE_ROLES),
  __param18(0, (0, import_common30.Param)("id")),
  __param18(1, (0, import_common30.Body)()),
  __metadata29("design:type", Function),
  __metadata29("design:paramtypes", [String, typeof (_d9 = typeof UpdateProjectDto !== "undefined" && UpdateProjectDto) === "function" ? _d9 : Object]),
  __metadata29("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate38([
  (0, import_common30.Delete)(":id"),
  Roles(...ADMIN_ONLY),
  __param18(0, (0, import_common30.Param)("id")),
  __metadata29("design:type", Function),
  __metadata29("design:paramtypes", [String]),
  __metadata29("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
ProjectsController = __decorate38([
  (0, import_swagger3.ApiTags)("Projects"),
  (0, import_swagger3.ApiBearerAuth)(),
  (0, import_common30.UseGuards)(JwtAuthGuard, RolesGuard),
  (0, import_common30.Controller)("projects"),
  __param18(0, (0, import_common30.Inject)(ProjectsService)),
  __metadata29("design:paramtypes", [typeof (_a26 = typeof ProjectsService !== "undefined" && ProjectsService) === "function" ? _a26 : Object])
], ProjectsController);

// src/projects/projects.module.ts
var __decorate39 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectsModule = class ProjectsModule2 {
};
ProjectsModule = __decorate39([
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
var __decorate40 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata30 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param19 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a27;
var TaskRepository = class TaskRepository2 {
  taskModel;
  constructor(taskModel) {
    this.taskModel = taskModel;
  }
  async create(dto) {
    return this.taskModel.create({
      ...dto,
      dueDate: new Date(dto.dueDate)
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
      throw new import_common32.NotFoundException("Task not found.");
    }
    return task;
  }
  async update(id, dto) {
    const task = await this.taskModel.findByIdAndUpdate(id, {
      ...dto,
      ...dto.dueDate && {
        dueDate: new Date(dto.dueDate)
      }
    }, {
      new: true
    }).populate({
      path: "project",
      select: "name"
    }).populate({
      path: "assignedTo",
      select: "firstName lastName fullName avatar designation"
    });
    if (!task) {
      throw new import_common32.NotFoundException("Task not found.");
    }
    return task;
  }
  async remove(id) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) {
      throw new import_common32.NotFoundException("Task not found.");
    }
    return task;
  }
  async count(filter = {}) {
    return this.taskModel.countDocuments(filter);
  }
  async getStatistics() {
    const [total, todo, progress, review, completed] = await Promise.all([
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
TaskRepository = __decorate40([
  (0, import_common32.Injectable)(),
  __param19(0, (0, import_mongoose22.InjectModel)(Task.name)),
  __param19(0, (0, import_common32.Inject)(import_mongoose23.Model)),
  __metadata30("design:paramtypes", [typeof (_a27 = typeof import_mongoose23.Model !== "undefined" && import_mongoose23.Model) === "function" ? _a27 : Object])
], TaskRepository);

// src/tasks/services/tasks.service.ts
var __decorate41 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata31 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param20 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a28;
var TaskService = class TaskService2 {
  tasksRepository;
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  async create(dto) {
    return this.tasksRepository.create(dto);
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
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new import_common33.NotFoundException("Task not found.");
    }
    return task;
  }
  async update(id, dto) {
    const task = await this.tasksRepository.update(id, dto);
    if (!task) {
      throw new import_common33.NotFoundException("Task not found.");
    }
    return task;
  }
  async remove(id) {
    await this.tasksRepository.remove(id);
    return {
      message: "Task deleted successfully."
    };
  }
  async statistics() {
    return this.tasksRepository.getStatistics();
  }
};
TaskService = __decorate41([
  (0, import_common33.Injectable)(),
  __param20(0, (0, import_common33.Inject)(TaskRepository)),
  __metadata31("design:paramtypes", [typeof (_a28 = typeof TaskRepository !== "undefined" && TaskRepository) === "function" ? _a28 : Object])
], TaskService);

// src/tasks/dto/create-task.dto.ts
var import_class_validator8 = require("class-validator");
var __decorate42 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata32 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a29;
var _b15;
var CreateTaskDto = class {
  title;
  description;
  project;
  assignedTo;
  status;
  priority;
  progress;
  dueDate;
};
__decorate42([
  (0, import_class_validator8.IsString)(),
  (0, import_class_validator8.MinLength)(3),
  __metadata32("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate42([
  (0, import_class_validator8.IsString)(),
  (0, import_class_validator8.IsOptional)(),
  __metadata32("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate42([
  (0, import_class_validator8.IsMongoId)(),
  __metadata32("design:type", String)
], CreateTaskDto.prototype, "project", void 0);
__decorate42([
  (0, import_class_validator8.IsMongoId)(),
  __metadata32("design:type", String)
], CreateTaskDto.prototype, "assignedTo", void 0);
__decorate42([
  (0, import_class_validator8.IsEnum)(TaskStatus),
  __metadata32("design:type", typeof (_a29 = typeof TaskStatus !== "undefined" && TaskStatus) === "function" ? _a29 : Object)
], CreateTaskDto.prototype, "status", void 0);
__decorate42([
  (0, import_class_validator8.IsEnum)(TaskPriority),
  __metadata32("design:type", typeof (_b15 = typeof TaskPriority !== "undefined" && TaskPriority) === "function" ? _b15 : Object)
], CreateTaskDto.prototype, "priority", void 0);
__decorate42([
  (0, import_class_validator8.IsNumber)(),
  (0, import_class_validator8.Min)(0),
  (0, import_class_validator8.Max)(100),
  (0, import_class_validator8.IsOptional)(),
  __metadata32("design:type", Number)
], CreateTaskDto.prototype, "progress", void 0);
__decorate42([
  (0, import_class_validator8.IsDateString)(),
  __metadata32("design:type", String)
], CreateTaskDto.prototype, "dueDate", void 0);

// src/tasks/dto/update-task.dto.ts
var import_mapped_types2 = require("@nestjs/mapped-types");
var UpdateTaskDto = class extends (0, import_mapped_types2.PartialType)(CreateTaskDto) {
};

// src/tasks/dto/task-filter.dto.ts
var import_class_validator9 = require("class-validator");
var __decorate43 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata33 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a30;
var _b16;
var TaskFilterDto = class {
  search;
  status;
  priority;
  project;
  employee;
  page;
  limit;
};
__decorate43([
  (0, import_class_validator9.IsOptional)(),
  (0, import_class_validator9.IsString)(),
  __metadata33("design:type", String)
], TaskFilterDto.prototype, "search", void 0);
__decorate43([
  (0, import_class_validator9.IsOptional)(),
  (0, import_class_validator9.IsEnum)(TaskStatus),
  __metadata33("design:type", typeof (_a30 = typeof TaskStatus !== "undefined" && TaskStatus) === "function" ? _a30 : Object)
], TaskFilterDto.prototype, "status", void 0);
__decorate43([
  (0, import_class_validator9.IsOptional)(),
  (0, import_class_validator9.IsEnum)(TaskPriority),
  __metadata33("design:type", typeof (_b16 = typeof TaskPriority !== "undefined" && TaskPriority) === "function" ? _b16 : Object)
], TaskFilterDto.prototype, "priority", void 0);
__decorate43([
  (0, import_class_validator9.IsOptional)(),
  (0, import_class_validator9.IsString)(),
  __metadata33("design:type", String)
], TaskFilterDto.prototype, "project", void 0);
__decorate43([
  (0, import_class_validator9.IsOptional)(),
  (0, import_class_validator9.IsString)(),
  __metadata33("design:type", String)
], TaskFilterDto.prototype, "employee", void 0);
__decorate43([
  (0, import_class_validator9.IsOptional)(),
  (0, import_class_validator9.IsNumberString)(),
  __metadata33("design:type", String)
], TaskFilterDto.prototype, "page", void 0);
__decorate43([
  (0, import_class_validator9.IsOptional)(),
  (0, import_class_validator9.IsNumberString)(),
  __metadata33("design:type", String)
], TaskFilterDto.prototype, "limit", void 0);

// src/tasks/controllers/tasks.controller.ts
var __decorate44 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata34 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param21 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a31;
var _b17;
var _c12;
var _d10;
var TaskController = class TaskController2 {
  taskService;
  constructor(taskService) {
    this.taskService = taskService;
  }
  create(dto) {
    return this.taskService.create(dto);
  }
  findAll(filter) {
    return this.taskService.findAll(filter);
  }
  statistics() {
    return this.taskService.statistics();
  }
  findOne(id) {
    return this.taskService.findOne(id);
  }
  update(id, dto) {
    return this.taskService.update(id, dto);
  }
  remove(id) {
    return this.taskService.remove(id);
  }
};
__decorate44([
  (0, import_common34.Post)(),
  Roles(...MANAGE_ROLES),
  __param21(0, (0, import_common34.Body)()),
  __metadata34("design:type", Function),
  __metadata34("design:paramtypes", [typeof (_b17 = typeof CreateTaskDto !== "undefined" && CreateTaskDto) === "function" ? _b17 : Object]),
  __metadata34("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate44([
  (0, import_common34.Get)(),
  Roles(...VIEW_ROLES),
  __param21(0, (0, import_common34.Query)()),
  __metadata34("design:type", Function),
  __metadata34("design:paramtypes", [typeof (_c12 = typeof TaskFilterDto !== "undefined" && TaskFilterDto) === "function" ? _c12 : Object]),
  __metadata34("design:returntype", void 0)
], TaskController.prototype, "findAll", null);
__decorate44([
  (0, import_common34.Get)("statistics"),
  Roles(...VIEW_ROLES),
  __metadata34("design:type", Function),
  __metadata34("design:paramtypes", []),
  __metadata34("design:returntype", void 0)
], TaskController.prototype, "statistics", null);
__decorate44([
  (0, import_common34.Get)(":id"),
  Roles(...VIEW_ROLES),
  __param21(0, (0, import_common34.Param)("id")),
  __metadata34("design:type", Function),
  __metadata34("design:paramtypes", [String]),
  __metadata34("design:returntype", void 0)
], TaskController.prototype, "findOne", null);
__decorate44([
  (0, import_common34.Patch)(":id"),
  Roles(...MANAGE_ROLES),
  __param21(0, (0, import_common34.Param)("id")),
  __param21(1, (0, import_common34.Body)()),
  __metadata34("design:type", Function),
  __metadata34("design:paramtypes", [String, typeof (_d10 = typeof UpdateTaskDto !== "undefined" && UpdateTaskDto) === "function" ? _d10 : Object]),
  __metadata34("design:returntype", void 0)
], TaskController.prototype, "update", null);
__decorate44([
  (0, import_common34.Delete)(":id"),
  Roles(...ADMIN_ONLY),
  __param21(0, (0, import_common34.Param)("id")),
  __metadata34("design:type", Function),
  __metadata34("design:paramtypes", [String]),
  __metadata34("design:returntype", void 0)
], TaskController.prototype, "remove", null);
TaskController = __decorate44([
  (0, import_common34.UseGuards)(JwtAuthGuard, RolesGuard),
  (0, import_common34.Controller)("tasks"),
  __param21(0, (0, import_common34.Inject)(TaskService)),
  __metadata34("design:paramtypes", [typeof (_a31 = typeof TaskService !== "undefined" && TaskService) === "function" ? _a31 : Object])
], TaskController);

// src/tasks/mappers/tasks.mapper.ts
var import_common35 = require("@nestjs/common");
var __decorate45 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TasksMapper = class TasksMapper2 {
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
    return tasks.map((task) => this.toResponse(task));
  }
};
TasksMapper = __decorate45([
  (0, import_common35.Injectable)()
], TasksMapper);

// src/tasks/tasks.module.ts
var __decorate46 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TaskModule = class TaskModule2 {
};
TaskModule = __decorate46([
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
var __decorate47 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerMiddleware = class LoggerMiddleware2 {
  use(req, res, next) {
    const start = Date.now();
    console.log(`\u27A1\uFE0F ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      console.log(`\u2705 ${req.method} ${req.originalUrl} ${res.statusCode} (${Date.now() - start}ms)`);
    });
    next();
  }
};
LoggerMiddleware = __decorate47([
  (0, import_common37.Injectable)()
], LoggerMiddleware);

// src/attendance/attendance.module.ts
var import_common42 = require("@nestjs/common");
var import_mongoose29 = require("@nestjs/mongoose");

// src/attendance/schemas/attendance.schema.ts
var import_mongoose25 = require("@nestjs/mongoose");
var import_mongoose26 = require("mongoose");

// src/attendance/enums/attendance-status.enum.ts
var AttendanceStatus;
(function(AttendanceStatus2) {
  AttendanceStatus2["PRESENT"] = "Present";
  AttendanceStatus2["LATE"] = "Late";
  AttendanceStatus2["ABSENT"] = "Absent";
  AttendanceStatus2["LEAVE"] = "Leave";
})(AttendanceStatus || (AttendanceStatus = {}));

// src/attendance/schemas/attendance.schema.ts
var __decorate48 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata35 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a32;
var _b18;
var _c13;
var Attendance = class Attendance2 {
  employee;
  date;
  checkIn;
  checkOut;
  workingHours;
  status;
};
__decorate48([
  (0, import_mongoose25.Prop)({
    type: import_mongoose26.Types.ObjectId,
    ref: "Employee",
    required: true
  }),
  __metadata35("design:type", typeof (_a32 = typeof import_mongoose26.Types !== "undefined" && import_mongoose26.Types.ObjectId) === "function" ? _a32 : Object)
], Attendance.prototype, "employee", void 0);
__decorate48([
  (0, import_mongoose25.Prop)({
    type: Date,
    required: true
  }),
  __metadata35("design:type", typeof (_b18 = typeof Date !== "undefined" && Date) === "function" ? _b18 : Object)
], Attendance.prototype, "date", void 0);
__decorate48([
  (0, import_mongoose25.Prop)({
    type: String
  }),
  __metadata35("design:type", String)
], Attendance.prototype, "checkIn", void 0);
__decorate48([
  (0, import_mongoose25.Prop)({
    type: String
  }),
  __metadata35("design:type", String)
], Attendance.prototype, "checkOut", void 0);
__decorate48([
  (0, import_mongoose25.Prop)({
    type: Number,
    default: 0
  }),
  __metadata35("design:type", Number)
], Attendance.prototype, "workingHours", void 0);
__decorate48([
  (0, import_mongoose25.Prop)({
    type: String,
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT
  }),
  __metadata35("design:type", typeof (_c13 = typeof AttendanceStatus !== "undefined" && AttendanceStatus) === "function" ? _c13 : Object)
], Attendance.prototype, "status", void 0);
Attendance = __decorate48([
  (0, import_mongoose25.Schema)({
    timestamps: true
  })
], Attendance);
var AttendanceSchema = import_mongoose25.SchemaFactory.createForClass(Attendance);

// src/attendance/controllers/attendance.controller.ts
var import_common40 = require("@nestjs/common");

// src/attendance/services/attendance.service.ts
var import_common39 = require("@nestjs/common");

// src/attendance/repositories/attendance.repository.ts
var import_common38 = require("@nestjs/common");
var import_mongoose27 = require("@nestjs/mongoose");
var import_mongoose28 = require("mongoose");
var __decorate49 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata36 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param22 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a33;
var AttendanceRepository = class AttendanceRepository2 {
  attendanceModel;
  constructor(attendanceModel) {
    this.attendanceModel = attendanceModel;
  }
  calculateWorkingHours(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
      return 0;
    }
    const start = /* @__PURE__ */ new Date(`2026-01-01T${checkIn}`);
    const end = /* @__PURE__ */ new Date(`2026-01-01T${checkOut}`);
    return Number(((end.getTime() - start.getTime()) / 36e5).toFixed(1));
  }
  async create(dto) {
    const attendance = await this.attendanceModel.create({
      employee: dto.employee,
      date: new Date(dto.date),
      checkIn: dto.checkIn,
      checkOut: dto.checkOut,
      workingHours: this.calculateWorkingHours(dto.checkIn, dto.checkOut),
      status: dto.status
    });
    return this.findById(attendance.id);
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
      throw new import_common38.NotFoundException("Attendance record not found.");
    }
    return attendance;
  }
  async update(id, dto) {
    const existing = await this.attendanceModel.findById(id);
    if (!existing) {
      throw new import_common38.NotFoundException("Attendance record not found.");
    }
    const checkIn = dto.checkIn ?? existing.checkIn;
    const checkOut = dto.checkOut ?? existing.checkOut;
    await this.attendanceModel.findByIdAndUpdate(id, {
      ...dto,
      ...dto.date && {
        date: new Date(dto.date)
      },
      workingHours: this.calculateWorkingHours(checkIn, checkOut)
    }, {
      new: true
    });
    return this.findById(id);
  }
  async remove(id) {
    const attendance = await this.attendanceModel.findByIdAndDelete(id);
    if (!attendance) {
      throw new import_common38.NotFoundException("Attendance record not found.");
    }
    return attendance;
  }
  async count(filter = {}) {
    return this.attendanceModel.countDocuments(filter);
  }
  async getStatistics() {
    const [present, late, absent, leave] = await Promise.all([
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
AttendanceRepository = __decorate49([
  (0, import_common38.Injectable)(),
  __param22(0, (0, import_mongoose27.InjectModel)(Attendance.name)),
  __param22(0, (0, import_common38.Inject)(import_mongoose28.Model)),
  __metadata36("design:paramtypes", [typeof (_a33 = typeof import_mongoose28.Model !== "undefined" && import_mongoose28.Model) === "function" ? _a33 : Object])
], AttendanceRepository);

// src/attendance/services/attendance.service.ts
var __decorate50 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata37 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param23 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a34;
var AttendanceService = class AttendanceService2 {
  attendanceRepository;
  constructor(attendanceRepository) {
    this.attendanceRepository = attendanceRepository;
  }
  async create(dto) {
    return this.attendanceRepository.create(dto);
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
      query.date = new Date(filter.date);
    }
    const records = await this.attendanceRepository.findAll(query);
    const items = records.filter((record) => {
      const fullName = record.employee?.fullName ?? `${record.employee?.firstName ?? ""} ${record.employee?.lastName ?? ""}`.trim();
      const matchesSearch = !filter.search || fullName.toLowerCase().includes(filter.search.toLowerCase());
      const matchesDepartment = !filter.department || record.employee?.department === filter.department;
      return matchesSearch && matchesDepartment;
    });
    return items;
  }
  async findOne(id) {
    const attendance = await this.attendanceRepository.findById(id);
    if (!attendance) {
      throw new import_common39.NotFoundException("Attendance record not found.");
    }
    return attendance;
  }
  async update(id, dto) {
    const attendance = await this.attendanceRepository.update(id, dto);
    if (!attendance) {
      throw new import_common39.NotFoundException("Attendance record not found.");
    }
    return attendance;
  }
  async remove(id) {
    await this.attendanceRepository.remove(id);
    return {
      message: "Attendance deleted successfully."
    };
  }
  async statistics() {
    return this.attendanceRepository.getStatistics();
  }
};
AttendanceService = __decorate50([
  (0, import_common39.Injectable)(),
  __param23(0, (0, import_common39.Inject)(AttendanceRepository)),
  __metadata37("design:paramtypes", [typeof (_a34 = typeof AttendanceRepository !== "undefined" && AttendanceRepository) === "function" ? _a34 : Object])
], AttendanceService);

// src/attendance/dto/create-attendance.dto.ts
var import_class_validator10 = require("class-validator");
var __decorate51 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata38 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a35;
var CreateAttendanceDto = class {
  employee;
  date;
  checkIn;
  checkOut;
  status;
};
__decorate51([
  (0, import_class_validator10.IsMongoId)(),
  __metadata38("design:type", String)
], CreateAttendanceDto.prototype, "employee", void 0);
__decorate51([
  (0, import_class_validator10.IsDateString)(),
  __metadata38("design:type", String)
], CreateAttendanceDto.prototype, "date", void 0);
__decorate51([
  (0, import_class_validator10.IsOptional)(),
  (0, import_class_validator10.IsString)(),
  __metadata38("design:type", String)
], CreateAttendanceDto.prototype, "checkIn", void 0);
__decorate51([
  (0, import_class_validator10.IsOptional)(),
  (0, import_class_validator10.IsString)(),
  __metadata38("design:type", String)
], CreateAttendanceDto.prototype, "checkOut", void 0);
__decorate51([
  (0, import_class_validator10.IsEnum)(AttendanceStatus),
  __metadata38("design:type", typeof (_a35 = typeof AttendanceStatus !== "undefined" && AttendanceStatus) === "function" ? _a35 : Object)
], CreateAttendanceDto.prototype, "status", void 0);

// src/attendance/dto/update-attendance.dto.ts
var import_mapped_types3 = require("@nestjs/mapped-types");
var UpdateAttendanceDto = class extends (0, import_mapped_types3.PartialType)(CreateAttendanceDto) {
};

// src/attendance/dto/attendance-filter.dto.ts
var import_class_validator11 = require("class-validator");
var __decorate52 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata39 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a36;
var AttendanceFilterDto = class {
  search;
  department;
  status;
  employee;
  date;
  page;
  limit;
};
__decorate52([
  (0, import_class_validator11.IsOptional)(),
  (0, import_class_validator11.IsString)(),
  __metadata39("design:type", String)
], AttendanceFilterDto.prototype, "search", void 0);
__decorate52([
  (0, import_class_validator11.IsOptional)(),
  (0, import_class_validator11.IsString)(),
  __metadata39("design:type", String)
], AttendanceFilterDto.prototype, "department", void 0);
__decorate52([
  (0, import_class_validator11.IsOptional)(),
  (0, import_class_validator11.IsEnum)(AttendanceStatus),
  __metadata39("design:type", typeof (_a36 = typeof AttendanceStatus !== "undefined" && AttendanceStatus) === "function" ? _a36 : Object)
], AttendanceFilterDto.prototype, "status", void 0);
__decorate52([
  (0, import_class_validator11.IsOptional)(),
  (0, import_class_validator11.IsString)(),
  __metadata39("design:type", String)
], AttendanceFilterDto.prototype, "employee", void 0);
__decorate52([
  (0, import_class_validator11.IsOptional)(),
  (0, import_class_validator11.IsString)(),
  __metadata39("design:type", String)
], AttendanceFilterDto.prototype, "date", void 0);
__decorate52([
  (0, import_class_validator11.IsOptional)(),
  (0, import_class_validator11.IsNumberString)(),
  __metadata39("design:type", String)
], AttendanceFilterDto.prototype, "page", void 0);
__decorate52([
  (0, import_class_validator11.IsOptional)(),
  (0, import_class_validator11.IsNumberString)(),
  __metadata39("design:type", String)
], AttendanceFilterDto.prototype, "limit", void 0);

// src/attendance/controllers/attendance.controller.ts
var __decorate53 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata40 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param24 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a37;
var _b19;
var _c14;
var _d11;
var AttendanceController = class AttendanceController2 {
  attendanceService;
  constructor(attendanceService) {
    this.attendanceService = attendanceService;
  }
  create(dto) {
    return this.attendanceService.create(dto);
  }
  findAll(filter) {
    return this.attendanceService.findAll(filter);
  }
  statistics() {
    return this.attendanceService.statistics();
  }
  findOne(id) {
    return this.attendanceService.findOne(id);
  }
  update(id, dto) {
    return this.attendanceService.update(id, dto);
  }
  remove(id) {
    return this.attendanceService.remove(id);
  }
};
__decorate53([
  (0, import_common40.Post)(),
  __param24(0, (0, import_common40.Body)()),
  __metadata40("design:type", Function),
  __metadata40("design:paramtypes", [typeof (_b19 = typeof CreateAttendanceDto !== "undefined" && CreateAttendanceDto) === "function" ? _b19 : Object]),
  __metadata40("design:returntype", void 0)
], AttendanceController.prototype, "create", null);
__decorate53([
  (0, import_common40.Get)(),
  __param24(0, (0, import_common40.Query)()),
  __metadata40("design:type", Function),
  __metadata40("design:paramtypes", [typeof (_c14 = typeof AttendanceFilterDto !== "undefined" && AttendanceFilterDto) === "function" ? _c14 : Object]),
  __metadata40("design:returntype", void 0)
], AttendanceController.prototype, "findAll", null);
__decorate53([
  (0, import_common40.Get)("statistics"),
  __metadata40("design:type", Function),
  __metadata40("design:paramtypes", []),
  __metadata40("design:returntype", void 0)
], AttendanceController.prototype, "statistics", null);
__decorate53([
  (0, import_common40.Get)(":id"),
  __param24(0, (0, import_common40.Param)("id")),
  __metadata40("design:type", Function),
  __metadata40("design:paramtypes", [String]),
  __metadata40("design:returntype", void 0)
], AttendanceController.prototype, "findOne", null);
__decorate53([
  (0, import_common40.Patch)(":id"),
  __param24(0, (0, import_common40.Param)("id")),
  __param24(1, (0, import_common40.Body)()),
  __metadata40("design:type", Function),
  __metadata40("design:paramtypes", [String, typeof (_d11 = typeof UpdateAttendanceDto !== "undefined" && UpdateAttendanceDto) === "function" ? _d11 : Object]),
  __metadata40("design:returntype", void 0)
], AttendanceController.prototype, "update", null);
__decorate53([
  (0, import_common40.Delete)(":id"),
  __param24(0, (0, import_common40.Param)("id")),
  __metadata40("design:type", Function),
  __metadata40("design:paramtypes", [String]),
  __metadata40("design:returntype", void 0)
], AttendanceController.prototype, "remove", null);
AttendanceController = __decorate53([
  (0, import_common40.UseGuards)(JwtAuthGuard),
  (0, import_common40.Controller)("attendance"),
  __param24(0, (0, import_common40.Inject)(AttendanceService)),
  __metadata40("design:paramtypes", [typeof (_a37 = typeof AttendanceService !== "undefined" && AttendanceService) === "function" ? _a37 : Object])
], AttendanceController);

// src/attendance/mapper/attendance.mapper.ts
var import_common41 = require("@nestjs/common");
var __decorate54 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AttendanceMapper = class AttendanceMapper2 {
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
    return attendance.map((item) => this.toResponse(item));
  }
};
AttendanceMapper = __decorate54([
  (0, import_common41.Injectable)()
], AttendanceMapper);

// src/attendance/attendance.module.ts
var __decorate55 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AttendanceModule = class AttendanceModule2 {
};
AttendanceModule = __decorate55([
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
var CalendarEventType;
(function(CalendarEventType2) {
  CalendarEventType2["MEETING"] = "Meeting";
  CalendarEventType2["PROJECT"] = "Project";
  CalendarEventType2["HOLIDAY"] = "Holiday";
  CalendarEventType2["BIRTHDAY"] = "Birthday";
  CalendarEventType2["LEAVE"] = "Leave";
  CalendarEventType2["INTERVIEW"] = "Interview";
  CalendarEventType2["DEADLINE"] = "Deadline";
})(CalendarEventType || (CalendarEventType = {}));

// src/calender/schemas/calendar-event.schema.ts
var __decorate56 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata41 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a38;
var _b20;
var CalendarEvent = class CalendarEvent2 {
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
__decorate56([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata41("design:type", String)
], CalendarEvent.prototype, "title", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: String,
    trim: true,
    default: ""
  }),
  __metadata41("design:type", String)
], CalendarEvent.prototype, "description", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    enum: CalendarEventType
  }),
  __metadata41("design:type", typeof (_a38 = typeof CalendarEventType !== "undefined" && CalendarEventType) === "function" ? _a38 : Object)
], CalendarEvent.prototype, "type", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: Date,
    required: true
  }),
  __metadata41("design:type", typeof (_b20 = typeof Date !== "undefined" && Date) === "function" ? _b20 : Object)
], CalendarEvent.prototype, "date", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata41("design:type", String)
], CalendarEvent.prototype, "startTime", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata41("design:type", String)
], CalendarEvent.prototype, "endTime", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: String,
    trim: true,
    default: ""
  }),
  __metadata41("design:type", String)
], CalendarEvent.prototype, "location", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: [
      {
        type: import_mongoose31.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  }),
  __metadata41("design:type", Array)
], CalendarEvent.prototype, "attendees", void 0);
__decorate56([
  (0, import_mongoose30.Prop)({
    type: String,
    default: "#06b6d4",
    trim: true
  }),
  __metadata41("design:type", String)
], CalendarEvent.prototype, "color", void 0);
CalendarEvent = __decorate56([
  (0, import_mongoose30.Schema)({
    timestamps: true
  })
], CalendarEvent);
var CalendarEventSchema = import_mongoose30.SchemaFactory.createForClass(CalendarEvent);

// src/calender/controller/calendar.controller.ts
var import_common46 = require("@nestjs/common");

// src/calender/service/calendar.service.ts
var import_common45 = require("@nestjs/common");
var import_mongoose34 = require("mongoose");

// src/calender/repository/calendar.repository.ts
var import_common43 = require("@nestjs/common");
var import_mongoose32 = require("@nestjs/mongoose");
var import_mongoose33 = require("mongoose");
var __decorate57 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata42 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param25 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a39;
var CalendarRepository = class CalendarRepository2 {
  calendarModel;
  constructor(calendarModel) {
    this.calendarModel = calendarModel;
  }
  async create(data) {
    return this.calendarModel.create(data);
  }
  async findAll(filter) {
    const { search, type, page = "1", limit = "10", sortBy = "date", order = "asc" } = filter;
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
    const total = await this.calendarModel.countDocuments(query);
    const items = await this.calendarModel.find(query).populate("attendees", "firstName lastName email avatar").sort({
      [sortBy]: order === "asc" ? 1 : -1
    }).skip((currentPage - 1) * pageSize).limit(pageSize).lean();
    return {
      items,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }
  async findById(id) {
    return this.calendarModel.findById(id).populate("attendees", "firstName lastName email avatar");
  }
  async update(id, data) {
    return this.calendarModel.findByIdAndUpdate(id, data, {
      new: true
    }).populate("attendees", "firstName lastName email avatar");
  }
  async remove(id) {
    return this.calendarModel.findByIdAndDelete(id);
  }
  async statistics() {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [total, todayEvents, meetings, birthdays, deadlines] = await Promise.all([
      this.calendarModel.countDocuments(),
      this.calendarModel.countDocuments({
        date: {
          $gte: today,
          $lt: tomorrow
        }
      }),
      this.calendarModel.countDocuments({
        type: "Meeting"
      }),
      this.calendarModel.countDocuments({
        type: "Birthday"
      }),
      this.calendarModel.countDocuments({
        type: "Deadline"
      })
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
    }).populate("attendees", "firstName lastName email avatar").sort({
      date: 1,
      startTime: 1
    }).limit(limit).lean();
  }
};
CalendarRepository = __decorate57([
  (0, import_common43.Injectable)(),
  __param25(0, (0, import_mongoose32.InjectModel)(CalendarEvent.name)),
  __param25(0, (0, import_common43.Inject)(import_mongoose33.Model)),
  __metadata42("design:paramtypes", [typeof (_a39 = typeof import_mongoose33.Model !== "undefined" && import_mongoose33.Model) === "function" ? _a39 : Object])
], CalendarRepository);

// src/calender/mapper/calendar.mapper.ts
var import_common44 = require("@nestjs/common");
var __decorate58 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CalendarMapper = class CalendarMapper2 {
  toResponse(event) {
    if (!event) {
      return null;
    }
    return {
      id: event._id?.toString() ?? event.id,
      title: event.title,
      description: event.description,
      type: event.type,
      date: this.formatDate(event.date),
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      attendees: this.mapAttendees(event.attendees),
      color: event.color
    };
  }
  toList(events) {
    return events.map((event) => this.toResponse(event));
  }
  mapAttendees(attendees = []) {
    return attendees.map((employee) => {
      if (typeof employee === "string") {
        return employee;
      }
      return employee.fullName ?? `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
    });
  }
  formatDate(value) {
    if (!value) {
      return "";
    }
    return new Date(value).toISOString().split("T")[0];
  }
};
CalendarMapper = __decorate58([
  (0, import_common44.Injectable)()
], CalendarMapper);

// src/calender/service/calendar.service.ts
var __decorate59 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata43 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param26 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a40;
var _b21;
var CalendarService = class CalendarService2 {
  calendarRepository;
  calendarMapper;
  constructor(calendarRepository, calendarMapper) {
    this.calendarRepository = calendarRepository;
    this.calendarMapper = calendarMapper;
  }
  async create(dto) {
    const event = await this.calendarRepository.create({
      title: dto.title,
      description: dto.description,
      type: dto.type,
      date: new Date(dto.date),
      startTime: dto.startTime,
      endTime: dto.endTime,
      location: dto.location,
      attendees: dto.attendees?.map((id) => new import_mongoose34.Types.ObjectId(id)) ?? [],
      color: dto.color
    });
    return this.calendarMapper.toResponse(event);
  }
  async findAll(filter) {
    const result = await this.calendarRepository.findAll(filter);
    return {
      items: this.calendarMapper.toList(result.items),
      pagination: result.pagination
    };
  }
  async findOne(id) {
    const event = await this.calendarRepository.findById(id);
    if (!event) {
      throw new import_common45.NotFoundException("Calendar event not found.");
    }
    return this.calendarMapper.toResponse(event);
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
      updateData.date = new Date(dto.date);
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
      updateData.attendees = dto.attendees.map((id2) => new import_mongoose34.Types.ObjectId(id2));
    }
    if (dto.color !== void 0) {
      updateData.color = dto.color;
    }
    const event = await this.calendarRepository.update(id, updateData);
    if (!event) {
      throw new import_common45.NotFoundException("Calendar event not found.");
    }
    return this.calendarMapper.toResponse(event);
  }
  async remove(id) {
    const event = await this.calendarRepository.remove(id);
    if (!event) {
      throw new import_common45.NotFoundException("Calendar event not found.");
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
    return this.calendarMapper.toList(events);
  }
};
CalendarService = __decorate59([
  (0, import_common45.Injectable)(),
  __param26(0, (0, import_common45.Inject)(CalendarRepository)),
  __param26(1, (0, import_common45.Inject)(CalendarMapper)),
  __metadata43("design:paramtypes", [typeof (_a40 = typeof CalendarRepository !== "undefined" && CalendarRepository) === "function" ? _a40 : Object, typeof (_b21 = typeof CalendarMapper !== "undefined" && CalendarMapper) === "function" ? _b21 : Object])
], CalendarService);

// src/calender/dto/create-calendar-event.dto.ts
var import_class_validator12 = require("class-validator");
var __decorate60 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata44 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a41;
var CreateCalendarEventDto = class {
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
__decorate60([
  (0, import_class_validator12.IsString)(),
  __metadata44("design:type", String)
], CreateCalendarEventDto.prototype, "title", void 0);
__decorate60([
  (0, import_class_validator12.IsOptional)(),
  (0, import_class_validator12.IsString)(),
  __metadata44("design:type", String)
], CreateCalendarEventDto.prototype, "description", void 0);
__decorate60([
  (0, import_class_validator12.IsEnum)(CalendarEventType),
  __metadata44("design:type", typeof (_a41 = typeof CalendarEventType !== "undefined" && CalendarEventType) === "function" ? _a41 : Object)
], CreateCalendarEventDto.prototype, "type", void 0);
__decorate60([
  (0, import_class_validator12.IsDateString)(),
  __metadata44("design:type", String)
], CreateCalendarEventDto.prototype, "date", void 0);
__decorate60([
  (0, import_class_validator12.IsString)(),
  __metadata44("design:type", String)
], CreateCalendarEventDto.prototype, "startTime", void 0);
__decorate60([
  (0, import_class_validator12.IsString)(),
  __metadata44("design:type", String)
], CreateCalendarEventDto.prototype, "endTime", void 0);
__decorate60([
  (0, import_class_validator12.IsOptional)(),
  (0, import_class_validator12.IsString)(),
  __metadata44("design:type", String)
], CreateCalendarEventDto.prototype, "location", void 0);
__decorate60([
  (0, import_class_validator12.IsOptional)(),
  (0, import_class_validator12.IsArray)(),
  (0, import_class_validator12.ArrayUnique)(),
  (0, import_class_validator12.IsMongoId)({
    each: true
  }),
  __metadata44("design:type", Array)
], CreateCalendarEventDto.prototype, "attendees", void 0);
__decorate60([
  (0, import_class_validator12.IsOptional)(),
  (0, import_class_validator12.IsHexColor)(),
  __metadata44("design:type", String)
], CreateCalendarEventDto.prototype, "color", void 0);

// src/calender/dto/update-calendar-event.dto.ts
var import_mapped_types4 = require("@nestjs/mapped-types");
var UpdateCalendarEventDto = class extends (0, import_mapped_types4.PartialType)(CreateCalendarEventDto) {
};

// src/calender/dto/calendar-filter.dto.ts
var import_class_validator13 = require("class-validator");
var __decorate61 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata45 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a42;
var CalendarFilterDto = class {
  search;
  type;
  page;
  limit;
  sortBy;
  order;
};
__decorate61([
  (0, import_class_validator13.IsOptional)(),
  (0, import_class_validator13.IsString)(),
  __metadata45("design:type", String)
], CalendarFilterDto.prototype, "search", void 0);
__decorate61([
  (0, import_class_validator13.IsOptional)(),
  (0, import_class_validator13.IsEnum)(CalendarEventType),
  __metadata45("design:type", typeof (_a42 = typeof CalendarEventType !== "undefined" && CalendarEventType) === "function" ? _a42 : Object)
], CalendarFilterDto.prototype, "type", void 0);
__decorate61([
  (0, import_class_validator13.IsOptional)(),
  (0, import_class_validator13.IsNumberString)(),
  __metadata45("design:type", String)
], CalendarFilterDto.prototype, "page", void 0);
__decorate61([
  (0, import_class_validator13.IsOptional)(),
  (0, import_class_validator13.IsNumberString)(),
  __metadata45("design:type", String)
], CalendarFilterDto.prototype, "limit", void 0);
__decorate61([
  (0, import_class_validator13.IsOptional)(),
  (0, import_class_validator13.IsString)(),
  __metadata45("design:type", String)
], CalendarFilterDto.prototype, "sortBy", void 0);
__decorate61([
  (0, import_class_validator13.IsOptional)(),
  (0, import_class_validator13.IsString)(),
  __metadata45("design:type", String)
], CalendarFilterDto.prototype, "order", void 0);

// src/calender/controller/calendar.controller.ts
var __decorate62 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata46 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param27 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a43;
var _b22;
var _c15;
var _d12;
var CalendarController = class CalendarController2 {
  calendarService;
  constructor(calendarService) {
    this.calendarService = calendarService;
  }
  create(dto) {
    return this.calendarService.create(dto);
  }
  findAll(filter) {
    return this.calendarService.findAll(filter);
  }
  statistics() {
    return this.calendarService.statistics();
  }
  upcoming() {
    return this.calendarService.upcoming();
  }
  findOne(id) {
    return this.calendarService.findOne(id);
  }
  update(id, dto) {
    return this.calendarService.update(id, dto);
  }
  remove(id) {
    return this.calendarService.remove(id);
  }
};
__decorate62([
  (0, import_common46.Post)(),
  __param27(0, (0, import_common46.Body)()),
  __metadata46("design:type", Function),
  __metadata46("design:paramtypes", [typeof (_b22 = typeof CreateCalendarEventDto !== "undefined" && CreateCalendarEventDto) === "function" ? _b22 : Object]),
  __metadata46("design:returntype", void 0)
], CalendarController.prototype, "create", null);
__decorate62([
  (0, import_common46.Get)(),
  __param27(0, (0, import_common46.Query)()),
  __metadata46("design:type", Function),
  __metadata46("design:paramtypes", [typeof (_c15 = typeof CalendarFilterDto !== "undefined" && CalendarFilterDto) === "function" ? _c15 : Object]),
  __metadata46("design:returntype", void 0)
], CalendarController.prototype, "findAll", null);
__decorate62([
  (0, import_common46.Get)("statistics"),
  __metadata46("design:type", Function),
  __metadata46("design:paramtypes", []),
  __metadata46("design:returntype", void 0)
], CalendarController.prototype, "statistics", null);
__decorate62([
  (0, import_common46.Get)("upcoming"),
  __metadata46("design:type", Function),
  __metadata46("design:paramtypes", []),
  __metadata46("design:returntype", void 0)
], CalendarController.prototype, "upcoming", null);
__decorate62([
  (0, import_common46.Get)(":id"),
  __param27(0, (0, import_common46.Param)("id")),
  __metadata46("design:type", Function),
  __metadata46("design:paramtypes", [String]),
  __metadata46("design:returntype", void 0)
], CalendarController.prototype, "findOne", null);
__decorate62([
  (0, import_common46.Patch)(":id"),
  __param27(0, (0, import_common46.Param)("id")),
  __param27(1, (0, import_common46.Body)()),
  __metadata46("design:type", Function),
  __metadata46("design:paramtypes", [String, typeof (_d12 = typeof UpdateCalendarEventDto !== "undefined" && UpdateCalendarEventDto) === "function" ? _d12 : Object]),
  __metadata46("design:returntype", void 0)
], CalendarController.prototype, "update", null);
__decorate62([
  (0, import_common46.Delete)(":id"),
  __param27(0, (0, import_common46.Param)("id")),
  __metadata46("design:type", Function),
  __metadata46("design:paramtypes", [String]),
  __metadata46("design:returntype", void 0)
], CalendarController.prototype, "remove", null);
CalendarController = __decorate62([
  (0, import_common46.UseGuards)(JwtAuthGuard),
  (0, import_common46.Controller)("calendar"),
  __param27(0, (0, import_common46.Inject)(CalendarService)),
  __metadata46("design:paramtypes", [typeof (_a43 = typeof CalendarService !== "undefined" && CalendarService) === "function" ? _a43 : Object])
], CalendarController);

// src/calender/calender.module.ts
var __decorate63 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CalendarModule = class CalendarModule2 {
};
CalendarModule = __decorate63([
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
var import_swagger4 = require("@nestjs/swagger");

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
var ConversationType;
(function(ConversationType2) {
  ConversationType2["DIRECT"] = "DIRECT";
  ConversationType2["GROUP"] = "GROUP";
})(ConversationType || (ConversationType = {}));

// src/chat/schema/conversation.schema.ts
var __decorate64 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata47 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a44;
var _b23;
var Conversation = class Conversation2 {
  participants;
  type;
  lastMessage;
  lastMessageAt;
  createdAt;
  updatedAt;
};
__decorate64([
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
  }),
  __metadata47("design:type", Array)
], Conversation.prototype, "participants", void 0);
__decorate64([
  (0, import_mongoose36.Prop)({
    type: String,
    enum: ConversationType,
    default: ConversationType.DIRECT
  }),
  __metadata47("design:type", typeof (_a44 = typeof ConversationType !== "undefined" && ConversationType) === "function" ? _a44 : Object)
], Conversation.prototype, "type", void 0);
__decorate64([
  (0, import_mongoose36.Prop)({
    type: String,
    trim: true,
    default: ""
  }),
  __metadata47("design:type", String)
], Conversation.prototype, "lastMessage", void 0);
__decorate64([
  (0, import_mongoose36.Prop)({
    type: Date,
    default: null
  }),
  __metadata47("design:type", typeof (_b23 = typeof Date !== "undefined" && Date) === "function" ? _b23 : Object)
], Conversation.prototype, "lastMessageAt", void 0);
Conversation = __decorate64([
  (0, import_mongoose36.Schema)({
    timestamps: true,
    versionKey: false
  })
], Conversation);
var ConversationSchema = import_mongoose36.SchemaFactory.createForClass(Conversation);
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
var MessageType;
(function(MessageType2) {
  MessageType2["TEXT"] = "TEXT";
  MessageType2["IMAGE"] = "IMAGE";
  MessageType2["FILE"] = "FILE";
  MessageType2["VOICE"] = "VOICE";
  MessageType2["AUDIO_CALL"] = "AUDIO_CALL";
  MessageType2["VIDEO_CALL"] = "VIDEO_CALL";
  MessageType2["SYSTEM"] = "SYSTEM";
})(MessageType || (MessageType = {}));
var CallLogStatus;
(function(CallLogStatus2) {
  CallLogStatus2["COMPLETED"] = "COMPLETED";
  CallLogStatus2["MISSED"] = "MISSED";
  CallLogStatus2["DECLINED"] = "DECLINED";
})(CallLogStatus || (CallLogStatus = {}));

// src/chat/schema/message.schema.ts
var __decorate65 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata48 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a45;
var _b24;
var _c16;
var _d13;
var _e6;
var _f3;
var _g2;
var _h2;
var Message = class Message2 {
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
__decorate65([
  (0, import_mongoose38.Prop)({
    type: import_mongoose39.Types.ObjectId,
    ref: Conversation.name,
    required: true,
    index: true
  }),
  __metadata48("design:type", typeof (_a45 = typeof import_mongoose39.Types !== "undefined" && import_mongoose39.Types.ObjectId) === "function" ? _a45 : Object)
], Message.prototype, "conversation", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: import_mongoose39.Types.ObjectId,
    ref: Employee.name,
    required: true,
    index: true
  }),
  __metadata48("design:type", typeof (_b24 = typeof import_mongoose39.Types !== "undefined" && import_mongoose39.Types.ObjectId) === "function" ? _b24 : Object)
], Message.prototype, "sender", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: String,
    enum: MessageType,
    default: MessageType.TEXT,
    required: true
  }),
  __metadata48("design:type", typeof (_c16 = typeof MessageType !== "undefined" && MessageType) === "function" ? _c16 : Object)
], Message.prototype, "type", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: String,
    trim: true,
    maxlength: 5e3,
    default: ""
  }),
  __metadata48("design:type", String)
], Message.prototype, "content", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: String,
    trim: true,
    default: ""
  }),
  __metadata48("design:type", String)
], Message.prototype, "attachment", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: String,
    trim: true,
    default: ""
  }),
  __metadata48("design:type", String)
], Message.prototype, "fileName", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Number,
    default: 0
  }),
  __metadata48("design:type", Number)
], Message.prototype, "fileSize", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: import_mongoose39.Types.ObjectId,
    ref: Message.name,
    default: null
  }),
  __metadata48("design:type", typeof (_d13 = typeof import_mongoose39.Types !== "undefined" && import_mongoose39.Types.ObjectId) === "function" ? _d13 : Object)
], Message.prototype, "replyTo", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Boolean,
    default: false
  }),
  __metadata48("design:type", Boolean)
], Message.prototype, "edited", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Date,
    default: null
  }),
  __metadata48("design:type", typeof (_e6 = typeof Date !== "undefined" && Date) === "function" ? _e6 : Object)
], Message.prototype, "editedAt", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Boolean,
    default: false
  }),
  __metadata48("design:type", Boolean)
], Message.prototype, "deleted", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Date,
    default: null
  }),
  __metadata48("design:type", typeof (_f3 = typeof Date !== "undefined" && Date) === "function" ? _f3 : Object)
], Message.prototype, "deletedAt", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Boolean,
    default: false
  }),
  __metadata48("design:type", Boolean)
], Message.prototype, "read", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Date,
    default: null
  }),
  __metadata48("design:type", typeof (_g2 = typeof Date !== "undefined" && Date) === "function" ? _g2 : Object)
], Message.prototype, "readAt", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: [
      {
        type: import_mongoose39.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  }),
  __metadata48("design:type", Array)
], Message.prototype, "seenBy", void 0);
__decorate65([
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
  }),
  __metadata48("design:type", Array)
], Message.prototype, "reactions", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: String,
    enum: CallLogStatus,
    default: null
  }),
  __metadata48("design:type", typeof (_h2 = typeof CallLogStatus !== "undefined" && CallLogStatus) === "function" ? _h2 : Object)
], Message.prototype, "callStatus", void 0);
__decorate65([
  (0, import_mongoose38.Prop)({
    type: Number,
    default: 0
  }),
  __metadata48("design:type", Number)
], Message.prototype, "callDuration", void 0);
Message = __decorate65([
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
var __decorate66 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata49 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param28 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a46;
var _b25;
var ChatRepository = class ChatRepository2 {
  conversationModel;
  messageModel;
  constructor(conversationModel, messageModel) {
    this.conversationModel = conversationModel;
    this.messageModel = messageModel;
  }
  async createConversation(participants) {
    return this.conversationModel.create({
      participants: participants.map((id) => new import_mongoose41.Types.ObjectId(id))
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
    const [items, total] = await Promise.all([
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
      this.conversationModel.countDocuments(query)
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
    return this.conversationModel.findByIdAndUpdate(conversationId, {
      lastMessage: content,
      lastMessageAt: /* @__PURE__ */ new Date()
    }, {
      new: true
    });
  }
  async createMessage(data) {
    return this.messageModel.create(data);
  }
  async findMessages(conversationId, filter) {
    console.log("========== FIND MESSAGES ==========");
    console.log("conversationId:", conversationId);
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 50;
    const skip = (page - 1) * limit;
    const query = {
      conversation: new import_mongoose41.Types.ObjectId(conversationId)
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
    const total = await this.messageModel.countDocuments(query);
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
    return this.messageModel.findByIdAndUpdate(id, {
      content,
      edited: true,
      editedAt: /* @__PURE__ */ new Date()
    }, {
      new: true
    }).populate({
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
    return this.messageModel.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: /* @__PURE__ */ new Date(),
      content: "This message was deleted."
    }, {
      new: true
    }).populate({
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
    return this.messageModel.updateMany({
      conversation: new import_mongoose41.Types.ObjectId(conversationId),
      sender: {
        $ne: new import_mongoose41.Types.ObjectId(employeeId)
      },
      read: false
    }, {
      read: true,
      readAt: /* @__PURE__ */ new Date()
    });
  }
  async getUnreadCount(employeeId) {
    return this.messageModel.countDocuments({
      sender: {
        $ne: new import_mongoose41.Types.ObjectId(employeeId)
      },
      read: false
    });
  }
};
ChatRepository = __decorate66([
  (0, import_common48.Injectable)(),
  __param28(0, (0, import_mongoose40.InjectModel)(Conversation.name)),
  __param28(0, (0, import_common48.Inject)(import_mongoose41.Model)),
  __param28(1, (0, import_mongoose40.InjectModel)(Message.name)),
  __param28(1, (0, import_common48.Inject)(import_mongoose41.Model)),
  __metadata49("design:paramtypes", [typeof (_a46 = typeof import_mongoose41.Model !== "undefined" && import_mongoose41.Model) === "function" ? _a46 : Object, typeof (_b25 = typeof import_mongoose41.Model !== "undefined" && import_mongoose41.Model) === "function" ? _b25 : Object])
], ChatRepository);

// src/chat/mapper/chat.mapper.ts
var import_common49 = require("@nestjs/common");
var __decorate67 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ChatMapper = class ChatMapper2 {
  toConversation(conversation, currentEmployeeId) {
    const participants = conversation.participants;
    const otherParticipant = participants.find((employee) => employee._id.toString() !== currentEmployeeId);
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
      items: response.items.map((conversation) => this.toConversation(conversation, currentEmployeeId)),
      pagination: response.pagination
    };
  }
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
      items: response.items.map((message) => this.toMessage(message, currentEmployeeId)),
      pagination: response.pagination
    };
  }
};
ChatMapper = __decorate67([
  (0, import_common49.Injectable)()
], ChatMapper);

// src/chat/gateway/chat.gateway.ts
var import_websockets = require("@nestjs/websockets");
var import_socket = require("socket.io");
var import_mongoose42 = require("mongoose");
var import_common50 = require("@nestjs/common");
var __decorate68 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata50 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param29 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a47;
var _b26;
var _c17;
var _d14;
var _e7;
var _f4;
var _g3;
var _h3;
var _j;
var ChatGateway = class ChatGateway2 {
  repository;
  mapper;
  constructor(repository, mapper) {
    this.repository = repository;
    this.mapper = mapper;
  }
  server;
  users = /* @__PURE__ */ new Map();
  activeCalls = /* @__PURE__ */ new Map();
  RING_TIMEOUT_MS = 45e3;
  handleConnection(client) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F50C} SOCKET CONNECTED");
    console.log("======================================================");
    console.log("Socket ID:");
    console.log(client.id);
    console.log("--------------------------------");
    console.log("Handshake Query:");
    console.log(client.handshake.query);
    console.log("--------------------------------");
    console.log("Handshake Auth:");
    console.log(client.handshake.auth);
    console.log("--------------------------------");
    console.log("Client Rooms:");
    console.log([
      ...client.rooms
    ]);
    console.log("--------------------------------");
    console.log("Connected Clients:");
    console.log(this.server.engine.clientsCount);
    console.log("======================================================");
    console.log("\n");
  }
  handleDisconnect(client) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F50C} SOCKET DISCONNECTED");
    console.log("======================================================");
    console.log("Socket ID:");
    console.log(client.id);
    console.log("--------------------------------");
    let disconnectedEmployee = null;
    console.log("Users BEFORE cleanup");
    console.table([
      ...this.users.entries()
    ].map(([employeeId, sockets]) => ({
      employeeId,
      sockets: [
        ...sockets
      ]
    })));
    for (const [employeeId, socketIds] of this.users) {
      if (socketIds.has(client.id)) {
        disconnectedEmployee = employeeId;
        socketIds.delete(client.id);
        console.log("Removed socket:");
        console.log(client.id);
        console.log("Employee:");
        console.log(employeeId);
        if (socketIds.size === 0) {
          this.users.delete(employeeId);
          this.emitUserOffline(employeeId);
        }
        break;
      }
    }
    console.log("--------------------------------");
    console.log("Users AFTER cleanup");
    console.table([
      ...this.users.entries()
    ].map(([employeeId, sockets]) => ({
      employeeId,
      sockets: [
        ...sockets
      ]
    })));
    if (disconnectedEmployee) {
      console.log("Checking Active Calls");
      for (const [conversationId, call] of this.activeCalls) {
        if (call.callerId === disconnectedEmployee || call.receiverId === disconnectedEmployee) {
          console.log("Ending call:");
          console.log(conversationId);
          if (call.ringTimeout) {
            clearTimeout(call.ringTimeout);
          }
          this.server.to(call.callerId).emit("call:ended", {
            conversationId
          });
          this.server.to(call.receiverId).emit("call:ended", {
            conversationId
          });
          this.activeCalls.delete(conversationId);
          const outcome = call.status === "accepted" ? CallLogStatus.COMPLETED : CallLogStatus.MISSED;
          void this.logCallOutcome(call, outcome);
        }
      }
    }
    console.log("Remaining Users:");
    console.log([
      ...this.users.keys()
    ]);
    console.log("Active Calls:");
    console.table([
      ...this.activeCalls.entries()
    ]);
    console.log("======================================================");
    console.log("\n");
  }
  emitUserOffline(employeeId) {
    console.log("\u{1F534} USER OFFLINE:", employeeId);
    this.server.emit("user:offline", {
      employeeId
    });
  }
  join(client, employeeId) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F464} USER JOIN");
    console.log("======================================================");
    console.log("Socket:");
    console.log(client.id);
    console.log("Employee:");
    console.log(employeeId);
    console.log("Users BEFORE");
    console.table([
      ...this.users.entries()
    ].map(([id, sockets2]) => ({
      employeeId: id,
      sockets: [
        ...sockets2
      ]
    })));
    if (!this.users.has(employeeId)) {
      this.users.set(employeeId, /* @__PURE__ */ new Set());
    }
    const sockets = this.users.get(employeeId);
    const wasOffline = sockets.size === 0;
    sockets.add(client.id);
    client.join(employeeId);
    console.log("Users AFTER");
    console.table([
      ...this.users.entries()
    ].map(([id, sockets2]) => ({
      employeeId: id,
      sockets: [
        ...sockets2
      ]
    })));
    console.log("Client Rooms:");
    console.log([
      ...client.rooms
    ]);
    if (wasOffline) {
      this.emitUserOnline(employeeId);
    }
    console.log("======================================================");
    console.log("\n");
    return {
      success: true
    };
  }
  emitUserOnline(employeeId) {
    console.log("\u{1F7E2} USER ONLINE:", employeeId);
    this.server.emit("user:online", {
      employeeId
    });
  }
  joinConversation(client, conversationId) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F4AC} CONVERSATION JOIN");
    console.log("======================================================");
    console.log("Socket:");
    console.log(client.id);
    console.log("Conversation:");
    console.log(conversationId);
    console.log("Rooms BEFORE");
    console.log([
      ...client.rooms
    ]);
    client.join(conversationId);
    console.log("Rooms AFTER");
    console.log([
      ...client.rooms
    ]);
    const room = this.server.sockets.adapter.rooms.get(conversationId);
    console.log("Participants:");
    console.log(room ? [
      ...room
    ] : []);
    console.log("======================================================");
    console.log("\n");
    return {
      success: true
    };
  }
  leaveConversation(client, conversationId) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F6AA} CONVERSATION LEAVE");
    console.log("======================================================");
    console.log("Socket:");
    console.log(client.id);
    console.log("Conversation:");
    console.log(conversationId);
    console.log("Rooms BEFORE");
    console.log([
      ...client.rooms
    ]);
    client.leave(conversationId);
    console.log("Rooms AFTER");
    console.log([
      ...client.rooms
    ]);
    const room = this.server.sockets.adapter.rooms.get(conversationId);
    console.log("Remaining Participants:");
    console.log(room ? [
      ...room
    ] : []);
    console.log("======================================================");
    console.log("\n");
    return {
      success: true
    };
  }
  startCall(payload) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F4DE} CALL START");
    console.log("======================================================");
    console.log("Conversation:");
    console.log(payload.conversationId);
    console.log("Caller:");
    console.log(payload.callerId);
    console.log("Receiver:");
    console.log(payload.receiverId);
    console.log("Type:");
    console.log(payload.type);
    if (this.activeCalls.has(payload.conversationId)) {
      console.log("Call already exists.");
      return;
    }
    const call = {
      ...payload,
      status: "ringing",
      startedAt: /* @__PURE__ */ new Date()
    };
    call.ringTimeout = setTimeout(() => {
      this.handleMissedCall(payload.conversationId);
    }, this.RING_TIMEOUT_MS);
    this.activeCalls.set(payload.conversationId, call);
    console.log("Active Calls:");
    console.table([
      ...this.activeCalls.entries()
    ]);
    this.server.to(payload.receiverId).emit("call:incoming", payload);
    console.log("Incoming call emitted.");
    console.log("======================================================");
    console.log("\n");
  }
  acceptCall(payload) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u2705 CALL ACCEPT");
    console.log("======================================================");
    console.log("Conversation:");
    console.log(payload.conversationId);
    const call = this.activeCalls.get(payload.conversationId);
    if (!call) {
      console.log("No active call found.");
      return;
    }
    if (call.ringTimeout) {
      clearTimeout(call.ringTimeout);
      call.ringTimeout = void 0;
    }
    call.status = "accepted";
    call.acceptedAt = /* @__PURE__ */ new Date();
    this.activeCalls.set(payload.conversationId, call);
    console.log("Active Calls:");
    console.table([
      ...this.activeCalls.entries()
    ]);
    this.server.to(payload.callerId).emit("call:accepted", payload);
    this.server.to(payload.receiverId).emit("call:accepted", payload);
    console.log("Call accepted event emitted.");
    console.log("======================================================");
    console.log("\n");
  }
  rejectCall(payload) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u274C CALL REJECT");
    console.log("======================================================");
    console.log("Conversation:");
    console.log(payload.conversationId);
    const call = this.activeCalls.get(payload.conversationId);
    if (!call) {
      console.log("No active call found.");
      return;
    }
    if (call.ringTimeout) {
      clearTimeout(call.ringTimeout);
    }
    this.activeCalls.delete(payload.conversationId);
    console.log("Active Calls:");
    console.table([
      ...this.activeCalls.entries()
    ]);
    this.server.to(payload.callerId).emit("call:rejected", payload);
    this.server.to(payload.receiverId).emit("call:rejected", payload);
    console.log("Call rejected event emitted.");
    void this.logCallOutcome(call, CallLogStatus.DECLINED);
    console.log("======================================================");
    console.log("\n");
  }
  endCall(payload) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F4F4} CALL END");
    console.log("======================================================");
    console.log("Conversation:");
    console.log(payload.conversationId);
    const call = this.activeCalls.get(payload.conversationId);
    if (!call) {
      console.log("No active call found.");
      return;
    }
    if (call.ringTimeout) {
      clearTimeout(call.ringTimeout);
    }
    this.activeCalls.delete(payload.conversationId);
    console.log("Active Calls:");
    console.table([
      ...this.activeCalls.entries()
    ]);
    this.server.to(payload.callerId).emit("call:ended", payload);
    this.server.to(payload.receiverId).emit("call:ended", payload);
    console.log("Call ended event emitted.");
    const outcome = call.status === "accepted" ? CallLogStatus.COMPLETED : CallLogStatus.MISSED;
    void this.logCallOutcome(call, outcome);
    console.log("======================================================");
    console.log("\n");
  }
  offer(client, payload) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F4E1} WEBRTC OFFER");
    console.log("======================================================");
    console.log("Socket:");
    console.log(client.id);
    console.log("Conversation:");
    console.log(payload.conversationId);
    console.log("Sender:");
    console.log(payload.senderId);
    console.log("Receiver:");
    console.log(payload.receiverId);
    console.log("Signal:");
    console.dir(payload.offer, {
      depth: null
    });
    const receiverSockets = this.users.get(payload.receiverId);
    if (!receiverSockets || receiverSockets.size === 0) {
      console.log("Receiver is offline.");
      return;
    }
    for (const socketId of receiverSockets) {
      this.server.to(socketId).emit("webrtc:offer", payload);
    }
    console.log("Offer delivered.");
    console.log("======================================================");
    console.log("\n");
  }
  answer(client, payload) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F4E1} WEBRTC ANSWER");
    console.log("======================================================");
    console.log("Socket:");
    console.log(client.id);
    console.log("Conversation:");
    console.log(payload.conversationId);
    console.log("Sender:");
    console.log(payload.senderId);
    console.log("Receiver:");
    console.log(payload.receiverId);
    console.log("Signal:");
    console.dir(payload.offer, {
      depth: null
    });
    const receiverSockets = this.users.get(payload.receiverId);
    if (!receiverSockets || receiverSockets.size === 0) {
      console.log("Receiver is offline.");
      return;
    }
    for (const socketId of receiverSockets) {
      this.server.to(socketId).emit("webrtc:answer", payload);
    }
    console.log("Answer delivered.");
    console.log("======================================================");
    console.log("\n");
  }
  candidate(client, payload) {
    console.log("\n");
    console.log("======================================================");
    console.log("\u{1F9CA} WEBRTC ICE CANDIDATE");
    console.log("======================================================");
    console.log("Socket:");
    console.log(client.id);
    console.log("Conversation:");
    console.log(payload.conversationId);
    console.log("Sender:");
    console.log(payload.senderId);
    console.log("Receiver:");
    console.log(payload.receiverId);
    console.log("Candidate:");
    console.dir(payload.candidate, {
      depth: null
    });
    const receiverSockets = this.users.get(payload.receiverId);
    if (!receiverSockets || receiverSockets.size === 0) {
      console.log("Receiver is offline.");
      return;
    }
    for (const socketId of receiverSockets) {
      this.server.to(socketId).emit("webrtc:candidate", payload);
    }
    console.log("ICE candidate delivered.");
    console.log("======================================================");
    console.log("\n");
  }
  async logCallOutcome(call, callStatus) {
    try {
      const duration = callStatus === CallLogStatus.COMPLETED && call.acceptedAt ? Math.max(0, Math.round((Date.now() - call.acceptedAt.getTime()) / 1e3)) : 0;
      const type = call.type === "video" ? MessageType.VIDEO_CALL : MessageType.AUDIO_CALL;
      const created = await this.repository.createMessage({
        conversation: new import_mongoose42.Types.ObjectId(call.conversationId),
        sender: new import_mongoose42.Types.ObjectId(call.callerId),
        type,
        content: "",
        callStatus,
        callDuration: duration
      });
      const populated = await this.repository.findMessageById(created.id);
      if (!populated) {
        console.log("Call message not found after creation.");
        return;
      }
      const lastMessage = callStatus === CallLogStatus.MISSED ? call.type === "video" ? "\u{1F3A5} Missed video call" : "\u{1F4DE} Missed audio call" : callStatus === CallLogStatus.DECLINED ? "\u{1F4DE} Call declined" : call.type === "video" ? "\u{1F3A5} Video call" : "\u{1F4DE} Audio call";
      await this.repository.updateConversationLastMessage(call.conversationId, lastMessage);
      const response = this.mapper.toMessage(populated, call.callerId);
      this.emitMessage(call.conversationId, response);
      console.log("\u{1F4DD} Call logged:", callStatus, "duration:", duration);
    } catch (error) {
      console.error("Failed to log call message:", error);
    }
  }
  handleMissedCall(conversationId) {
    const call = this.activeCalls.get(conversationId);
    if (!call || call.status !== "ringing") {
      return;
    }
    console.log("\u23F0 Call timed out (missed):", conversationId);
    this.activeCalls.delete(conversationId);
    this.server.to(call.callerId).emit("call:ended", {
      conversationId
    });
    this.server.to(call.receiverId).emit("call:ended", {
      conversationId
    });
    void this.logCallOutcome(call, CallLogStatus.MISSED);
  }
  emitMessage(conversationId, message) {
    this.server.to(conversationId).emit("message:new", message);
  }
  emitUpdatedMessage(conversationId, message) {
    this.server.to(conversationId).emit("message:updated", message);
  }
  emitDeletedMessage(conversationId, payload) {
    this.server.to(conversationId).emit("message:deleted", payload);
  }
  emitConversationRead(conversationId, payload) {
    this.server.to(conversationId).emit("conversation:read", payload);
  }
};
__decorate68([
  (0, import_websockets.WebSocketServer)(),
  __metadata50("design:type", typeof (_c17 = typeof import_socket.Server !== "undefined" && import_socket.Server) === "function" ? _c17 : Object)
], ChatGateway.prototype, "server", void 0);
__decorate68([
  (0, import_websockets.SubscribeMessage)("user:join"),
  __param29(0, (0, import_websockets.ConnectedSocket)()),
  __param29(1, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [typeof (_d14 = typeof import_socket.Socket !== "undefined" && import_socket.Socket) === "function" ? _d14 : Object, String]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "join", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("conversation:join"),
  __param29(0, (0, import_websockets.ConnectedSocket)()),
  __param29(1, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [typeof (_e7 = typeof import_socket.Socket !== "undefined" && import_socket.Socket) === "function" ? _e7 : Object, String]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "joinConversation", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("conversation:leave"),
  __param29(0, (0, import_websockets.ConnectedSocket)()),
  __param29(1, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [typeof (_f4 = typeof import_socket.Socket !== "undefined" && import_socket.Socket) === "function" ? _f4 : Object, String]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "leaveConversation", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("call:start"),
  __param29(0, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [Object]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "startCall", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("call:accept"),
  __param29(0, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [Object]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "acceptCall", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("call:reject"),
  __param29(0, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [Object]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "rejectCall", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("call:end"),
  __param29(0, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [Object]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "endCall", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("webrtc:offer"),
  __param29(0, (0, import_websockets.ConnectedSocket)()),
  __param29(1, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [typeof (_g3 = typeof import_socket.Socket !== "undefined" && import_socket.Socket) === "function" ? _g3 : Object, Object]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "offer", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("webrtc:answer"),
  __param29(0, (0, import_websockets.ConnectedSocket)()),
  __param29(1, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [typeof (_h3 = typeof import_socket.Socket !== "undefined" && import_socket.Socket) === "function" ? _h3 : Object, Object]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "answer", null);
__decorate68([
  (0, import_websockets.SubscribeMessage)("webrtc:candidate"),
  __param29(0, (0, import_websockets.ConnectedSocket)()),
  __param29(1, (0, import_websockets.MessageBody)()),
  __metadata50("design:type", Function),
  __metadata50("design:paramtypes", [typeof (_j = typeof import_socket.Socket !== "undefined" && import_socket.Socket) === "function" ? _j : Object, Object]),
  __metadata50("design:returntype", void 0)
], ChatGateway.prototype, "candidate", null);
ChatGateway = __decorate68([
  (0, import_websockets.WebSocketGateway)({
    cors: {
      origin: "*"
    }
  }),
  __param29(0, (0, import_common50.Inject)(ChatRepository)),
  __param29(1, (0, import_common50.Inject)(ChatMapper)),
  __metadata50("design:paramtypes", [typeof (_a47 = typeof ChatRepository !== "undefined" && ChatRepository) === "function" ? _a47 : Object, typeof (_b26 = typeof ChatMapper !== "undefined" && ChatMapper) === "function" ? _b26 : Object])
], ChatGateway);

// src/chat/service/chat.service.ts
var import_mongoose43 = require("mongoose");
var __decorate69 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata51 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param30 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a48;
var _b27;
var _c18;
var _d15;
var _e8;
var ChatService = class ChatService2 {
  repository;
  employeesRepository;
  mapper;
  gateway;
  cloudinary;
  constructor(repository, employeesRepository, mapper, gateway, cloudinary2) {
    this.repository = repository;
    this.employeesRepository = employeesRepository;
    this.mapper = mapper;
    this.gateway = gateway;
    this.cloudinary = cloudinary2;
  }
  async conversations(userId, filter) {
    const employeeId = await this.getEmployeeId(userId);
    const result = await this.repository.findUserConversations(employeeId, filter);
    return this.mapper.toConversationList(result, employeeId);
  }
  async createConversation(userId, dto) {
    const employeeId = await this.getEmployeeId(userId);
    if (employeeId === dto.participantId) {
      throw new import_common51.ForbiddenException("You cannot create a conversation with yourself.");
    }
    const participant = await this.employeesRepository.findById(dto.participantId);
    if (!participant) {
      throw new import_common51.NotFoundException("Employee not found.");
    }
    let conversation = await this.repository.findConversationBetweenUsers(employeeId, dto.participantId);
    if (!conversation) {
      const created = await this.repository.createConversation([
        employeeId,
        dto.participantId
      ]);
      conversation = await this.repository.findConversationById(created.id);
    }
    return this.mapper.toConversation(conversation, employeeId);
  }
  async messages(userId, conversationId, filter) {
    console.log("conversationId from controller:");
    console.log(conversationId);
    const employeeId = await this.getEmployeeId(userId);
    const conversation = await this.repository.findConversationById(conversationId);
    if (!conversation) {
      throw new import_common51.NotFoundException("Conversation not found.");
    }
    const participants = conversation.participants;
    const isParticipant = participants.some((participant) => participant._id.toString() === employeeId);
    if (!isParticipant) {
      throw new import_common51.ForbiddenException("You are not a participant of this conversation.");
    }
    const result = await this.repository.findMessages(conversationId, filter);
    return this.mapper.toMessageList(result, employeeId);
  }
  async sendMessage(userId, dto) {
    const employeeId = await this.getEmployeeId(userId);
    const conversation = await this.repository.findConversationById(dto.conversationId);
    if (!conversation) {
      throw new import_common51.NotFoundException("Conversation not found.");
    }
    const participants = conversation.participants;
    const isParticipant = participants.some((participant) => participant._id.toString() === employeeId);
    if (!isParticipant) {
      throw new import_common51.ForbiddenException("You are not a participant of this conversation.");
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
      conversation: new import_mongoose43.Types.ObjectId(dto.conversationId),
      sender: new import_mongoose43.Types.ObjectId(employeeId),
      type: dto.type,
      content: dto.content ?? "",
      attachment: dto.attachment ?? "",
      fileName: dto.fileName ?? "",
      fileSize: dto.fileSize ?? 0,
      replyTo: dto.replyTo ? new import_mongoose43.Types.ObjectId(dto.replyTo) : void 0
    });
    let lastMessage = dto.content;
    switch (dto.type) {
      case MessageType.IMAGE:
        lastMessage = dto.content?.trim() ? `\u{1F4F7} ${dto.content}` : "\u{1F4F7} Photo";
        break;
      case MessageType.FILE:
        lastMessage = dto.fileName ? `\u{1F4C4} ${dto.fileName}` : "\u{1F4C4} File";
        break;
      case MessageType.VOICE:
        lastMessage = "\u{1F3A4} Voice message";
        break;
      case MessageType.TEXT:
      default:
        lastMessage = dto.content;
        break;
    }
    await this.repository.updateConversationLastMessage(dto.conversationId, lastMessage);
    const populated = await this.repository.findMessageById(message.id);
    if (!populated) {
      throw new import_common51.NotFoundException("Message not found after creation.");
    }
    const response = this.mapper.toMessage(populated, employeeId);
    this.gateway.emitMessage(dto.conversationId, response);
    return response;
  }
  async updateMessage(userId, messageId, dto) {
    const employeeId = await this.getEmployeeId(userId);
    const message = await this.repository.findMessageById(messageId);
    if (!message) {
      throw new import_common51.NotFoundException("Message not found.");
    }
    const sender = message.sender;
    if (sender._id.toString() !== employeeId) {
      throw new import_common51.ForbiddenException("You can edit only your own messages.");
    }
    const updated = await this.repository.updateMessage(messageId, dto.content);
    if (!updated) {
      throw new import_common51.NotFoundException("Unable to update message.");
    }
    const response = this.mapper.toMessage(updated, employeeId);
    this.gateway.emitUpdatedMessage(response.conversation, response);
    return response;
  }
  async deleteMessage(userId, messageId) {
    const employeeId = await this.getEmployeeId(userId);
    const message = await this.repository.findMessageById(messageId);
    if (!message) {
      throw new import_common51.NotFoundException("Message not found.");
    }
    const sender = message.sender;
    if (sender._id.toString() !== employeeId) {
      throw new import_common51.ForbiddenException("You can delete only your own messages.");
    }
    const deleted = await this.repository.deleteMessage(messageId);
    if (!deleted) {
      throw new import_common51.NotFoundException("Unable to delete message.");
    }
    const response = this.mapper.toMessage(deleted, employeeId);
    this.gateway.emitDeletedMessage(response.conversation, response.id);
    return response;
  }
  async markAsRead(conversationId, userId) {
    const employeeId = await this.getEmployeeId(userId);
    const conversation = await this.repository.findConversationById(conversationId);
    if (!conversation) {
      throw new import_common51.NotFoundException("Conversation not found.");
    }
    const participants = conversation.participants;
    const isParticipant = participants.some((participant) => participant._id.toString() === employeeId);
    if (!isParticipant) {
      throw new import_common51.ForbiddenException("You are not a participant of this conversation.");
    }
    await this.repository.markConversationAsRead(conversationId, employeeId);
    this.gateway.emitConversationRead(conversationId, employeeId);
    return {
      success: true
    };
  }
  async unreadCount(userId) {
    const employeeId = await this.getEmployeeId(userId);
    const unread = await this.repository.getUnreadCount(employeeId);
    return {
      unread
    };
  }
  async uploadFile(file) {
    if (!file) {
      throw new import_common51.NotFoundException("No file uploaded.");
    }
    const result = await this.cloudinary.uploadFile(file, "company-management/chat");
    console.log(result);
    const isImage = file.mimetype.startsWith("image/");
    return {
      url: result.secure_url,
      publicId: result.public_id,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      type: isImage ? "IMAGE" : "FILE"
    };
  }
  async getEmployeeId(userId) {
    const employee = await this.employeesRepository.findByUserId(userId);
    if (!employee) {
      throw new import_common51.NotFoundException("Employee profile not found.");
    }
    return employee._id.toString();
  }
};
ChatService = __decorate69([
  (0, import_common51.Injectable)(),
  __param30(0, (0, import_common51.Inject)(ChatRepository)),
  __param30(1, (0, import_common51.Inject)(EmployeesRepository)),
  __param30(2, (0, import_common51.Inject)(ChatMapper)),
  __param30(3, (0, import_common51.Inject)(ChatGateway)),
  __param30(4, (0, import_common51.Inject)(CloudinaryService)),
  __metadata51("design:paramtypes", [typeof (_a48 = typeof ChatRepository !== "undefined" && ChatRepository) === "function" ? _a48 : Object, typeof (_b27 = typeof EmployeesRepository !== "undefined" && EmployeesRepository) === "function" ? _b27 : Object, typeof (_c18 = typeof ChatMapper !== "undefined" && ChatMapper) === "function" ? _c18 : Object, typeof (_d15 = typeof ChatGateway !== "undefined" && ChatGateway) === "function" ? _d15 : Object, typeof (_e8 = typeof CloudinaryService !== "undefined" && CloudinaryService) === "function" ? _e8 : Object])
], ChatService);

// src/chat/dto/conversation-filter.dto.ts
var import_class_transformer4 = require("class-transformer");
var import_class_validator14 = require("class-validator");
var __decorate70 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata52 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ConversationFilterDto = class {
  search;
  page = 1;
  limit = 20;
};
__decorate70([
  (0, import_class_validator14.IsOptional)(),
  (0, import_class_validator14.IsString)(),
  __metadata52("design:type", String)
], ConversationFilterDto.prototype, "search", void 0);
__decorate70([
  (0, import_class_validator14.IsOptional)(),
  (0, import_class_transformer4.Type)(() => Number),
  (0, import_class_validator14.IsInt)(),
  (0, import_class_validator14.Min)(1),
  __metadata52("design:type", Object)
], ConversationFilterDto.prototype, "page", void 0);
__decorate70([
  (0, import_class_validator14.IsOptional)(),
  (0, import_class_transformer4.Type)(() => Number),
  (0, import_class_validator14.IsInt)(),
  (0, import_class_validator14.Min)(1),
  (0, import_class_validator14.Max)(100),
  __metadata52("design:type", Object)
], ConversationFilterDto.prototype, "limit", void 0);

// src/chat/dto/message-filter.dto.ts
var import_class_transformer5 = require("class-transformer");
var import_class_validator15 = require("class-validator");
var __decorate71 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata53 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MessageFilterDto = class {
  page = 1;
  limit = 50;
};
__decorate71([
  (0, import_class_validator15.IsOptional)(),
  (0, import_class_transformer5.Type)(() => Number),
  (0, import_class_validator15.IsInt)(),
  (0, import_class_validator15.Min)(1),
  __metadata53("design:type", Object)
], MessageFilterDto.prototype, "page", void 0);
__decorate71([
  (0, import_class_validator15.IsOptional)(),
  (0, import_class_transformer5.Type)(() => Number),
  (0, import_class_validator15.IsInt)(),
  (0, import_class_validator15.Min)(1),
  (0, import_class_validator15.Max)(100),
  __metadata53("design:type", Object)
], MessageFilterDto.prototype, "limit", void 0);

// src/chat/dto/create-conversation.dto.ts
var import_class_validator16 = require("class-validator");
var __decorate72 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata54 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateConversationDto = class {
  participantId;
};
__decorate72([
  (0, import_class_validator16.IsMongoId)(),
  __metadata54("design:type", String)
], CreateConversationDto.prototype, "participantId", void 0);

// src/chat/dto/update-message.dto.ts
var import_class_validator17 = require("class-validator");
var __decorate73 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata55 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UpdateMessageDto = class {
  content;
};
__decorate73([
  (0, import_class_validator17.IsString)(),
  (0, import_class_validator17.MaxLength)(5e3),
  __metadata55("design:type", String)
], UpdateMessageDto.prototype, "content", void 0);

// src/chat/controller/chat.controller.ts
var __decorate74 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata56 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param31 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a49;
var _b28;
var _c19;
var _d16;
var _e9;
var _f5;
var _g4;
var ChatController = class ChatController2 {
  service;
  constructor(service) {
    this.service = service;
  }
  conversations(req, filter) {
    return this.service.conversations(req.user.sub, filter);
  }
  createConversation(req, dto) {
    return this.service.createConversation(req.user.sub, dto);
  }
  messages(req, conversationId, filter) {
    return this.service.messages(req.user.sub, conversationId, filter);
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
    return this.service.sendMessage(req.user.sub, body);
  }
  updateMessage(req, id, dto) {
    return this.service.updateMessage(req.user.sub, id, dto);
  }
  deleteMessage(req, id) {
    return this.service.deleteMessage(req.user.sub, id);
  }
  upload(file) {
    return this.service.uploadFile(file);
  }
  markAsRead(req, id) {
    return this.service.markAsRead(id, req.user.sub);
  }
  unreadCount(req) {
    return this.service.unreadCount(req.user.sub);
  }
};
__decorate74([
  (0, import_common52.Get)("conversations"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __param31(1, (0, import_common52.Query)()),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object, typeof (_b28 = typeof ConversationFilterDto !== "undefined" && ConversationFilterDto) === "function" ? _b28 : Object]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "conversations", null);
__decorate74([
  (0, import_common52.Post)("conversations"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __param31(1, (0, import_common52.Body)()),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object, typeof (_c19 = typeof CreateConversationDto !== "undefined" && CreateConversationDto) === "function" ? _c19 : Object]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "createConversation", null);
__decorate74([
  (0, import_common52.Get)("conversations/:conversationId/messages"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __param31(1, (0, import_common52.Param)("conversationId")),
  __param31(2, (0, import_common52.Query)()),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object, String, typeof (_d16 = typeof MessageFilterDto !== "undefined" && MessageFilterDto) === "function" ? _d16 : Object]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "messages", null);
__decorate74([
  (0, import_common52.Post)("messages"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __param31(1, (0, import_common52.Body)()),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object, Object]),
  __metadata56("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate74([
  (0, import_common52.Patch)("messages/:id"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __param31(1, (0, import_common52.Param)("id")),
  __param31(2, (0, import_common52.Body)()),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object, String, typeof (_e9 = typeof UpdateMessageDto !== "undefined" && UpdateMessageDto) === "function" ? _e9 : Object]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "updateMessage", null);
__decorate74([
  (0, import_common52.Delete)("messages/:id"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __param31(1, (0, import_common52.Param)("id")),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object, String]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "deleteMessage", null);
__decorate74([
  (0, import_common52.Post)("upload"),
  Roles(...VIEW_ROLES),
  (0, import_common52.UseInterceptors)((0, import_platform_express2.FileInterceptor)("file")),
  __param31(0, (0, import_common52.UploadedFile)()),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [typeof (_g4 = typeof Express !== "undefined" && (_f5 = Express.Multer) !== void 0 && _f5.File) === "function" ? _g4 : Object]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "upload", null);
__decorate74([
  (0, import_common52.Patch)("conversations/:id/read"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __param31(1, (0, import_common52.Param)("id")),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object, String]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "markAsRead", null);
__decorate74([
  (0, import_common52.Get)("unread-count"),
  Roles(...VIEW_ROLES),
  __param31(0, (0, import_common52.Req)()),
  __metadata56("design:type", Function),
  __metadata56("design:paramtypes", [Object]),
  __metadata56("design:returntype", void 0)
], ChatController.prototype, "unreadCount", null);
ChatController = __decorate74([
  (0, import_swagger4.ApiTags)("Chat"),
  (0, import_swagger4.ApiBearerAuth)(),
  (0, import_common52.UseGuards)(JwtAuthGuard, RolesGuard),
  (0, import_common52.Controller)("chat"),
  __param31(0, (0, import_common52.Inject)(ChatService)),
  __metadata56("design:paramtypes", [typeof (_a49 = typeof ChatService !== "undefined" && ChatService) === "function" ? _a49 : Object])
], ChatController);

// src/chat/chat.module.ts
var __decorate75 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ChatModule = class ChatModule2 {
};
ChatModule = __decorate75([
  (0, import_common53.Module)({
    imports: [
      EmployeesModule,
      CloudinaryModule,
      import_platform_express3.MulterModule.register({
        limits: {
          fileSize: 25 * 1024 * 1024
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
var FileType;
(function(FileType2) {
  FileType2["FOLDER"] = "folder";
  FileType2["IMAGE"] = "image";
  FileType2["DOCUMENT"] = "document";
  FileType2["PDF"] = "pdf";
  FileType2["SPREADSHEET"] = "spreadsheet";
  FileType2["VIDEO"] = "video";
  FileType2["ARCHIVE"] = "archive";
  FileType2["OTHER"] = "other";
})(FileType || (FileType = {}));

// src/files/schemas/file.schema.ts
var __decorate76 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata57 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a50;
var _c20;
var _d17;
var _e10;
var File = class File2 {
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
  createdAt;
  updatedAt;
};
__decorate76([
  (0, import_mongoose45.Prop)({
    type: String,
    required: true,
    trim: true
  }),
  __metadata57("design:type", String)
], File.prototype, "name", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  }),
  __metadata57("design:type", String)
], File.prototype, "originalName", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  }),
  __metadata57("design:type", String)
], File.prototype, "extension", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: String,
    required: true,
    enum: FileType,
    default: FileType.OTHER
  }),
  __metadata57("design:type", typeof (_a50 = typeof FileType !== "undefined" && FileType) === "function" ? _a50 : Object)
], File.prototype, "type", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  }),
  __metadata57("design:type", String)
], File.prototype, "mimeType", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: Number,
    default: 0
  }),
  __metadata57("design:type", Number)
], File.prototype, "size", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  }),
  __metadata57("design:type", String)
], File.prototype, "url", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: String,
    default: ""
  }),
  __metadata57("design:type", String)
], File.prototype, "thumbnail", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: File.name,
    default: null
  }),
  __metadata57("design:type", Object)
], File.prototype, "parentFolder", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: Employee.name,
    required: true
  }),
  __metadata57("design:type", typeof (_c20 = typeof import_mongoose46.Types !== "undefined" && import_mongoose46.Types.ObjectId) === "function" ? _c20 : Object)
], File.prototype, "owner", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: [
      {
        type: import_mongoose46.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  }),
  __metadata57("design:type", Array)
], File.prototype, "sharedWith", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: [
      {
        type: import_mongoose46.Types.ObjectId,
        ref: Employee.name
      }
    ],
    default: []
  }),
  __metadata57("design:type", Array)
], File.prototype, "favoriteBy", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: Boolean,
    default: false
  }),
  __metadata57("design:type", Boolean)
], File.prototype, "isDeleted", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: Employee.name,
    required: true
  }),
  __metadata57("design:type", typeof (_d17 = typeof import_mongoose46.Types !== "undefined" && import_mongoose46.Types.ObjectId) === "function" ? _d17 : Object)
], File.prototype, "createdBy", void 0);
__decorate76([
  (0, import_mongoose45.Prop)({
    type: import_mongoose46.Types.ObjectId,
    ref: Employee.name,
    required: true
  }),
  __metadata57("design:type", typeof (_e10 = typeof import_mongoose46.Types !== "undefined" && import_mongoose46.Types.ObjectId) === "function" ? _e10 : Object)
], File.prototype, "updatedBy", void 0);
File = __decorate76([
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
var __decorate77 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata58 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param32 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a51;
var FilesRepository = class FilesRepository2 {
  fileModel;
  constructor(fileModel) {
    this.fileModel = fileModel;
  }
  create(data) {
    return this.fileModel.create(data);
  }
  findById(id) {
    return this.fileModel.findById(id).populate("owner").populate("sharedWith").populate("createdBy").populate("updatedBy").populate("parentFolder");
  }
  findFolder(id) {
    return this.fileModel.findOne({
      _id: id,
      type: "folder",
      isDeleted: false
    });
  }
  async findAll(employeeId, query) {
    const filter = {
      isDeleted: false
    };
    if (query.parentFolder) {
      filter.parentFolder = new import_mongoose48.Types.ObjectId(query.parentFolder);
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
          new import_mongoose48.Types.ObjectId(employeeId)
        ]
      };
    }
    const total = await this.fileModel.countDocuments(filter);
    const items = await this.fileModel.find(filter).populate("owner").populate("parentFolder").sort({
      updatedAt: -1
    }).skip((query.page - 1) * query.limit).limit(query.limit);
    return {
      items,
      total,
      page: query.page,
      limit: query.limit
    };
  }
  rename(id, name, updatedBy) {
    return this.fileModel.findByIdAndUpdate(id, {
      name,
      updatedBy: new import_mongoose48.Types.ObjectId(updatedBy)
    }, {
      new: true
    });
  }
  move(id, parentFolder, updatedBy) {
    return this.fileModel.findByIdAndUpdate(id, {
      parentFolder: parentFolder ? new import_mongoose48.Types.ObjectId(parentFolder) : null,
      updatedBy: new import_mongoose48.Types.ObjectId(updatedBy)
    }, {
      new: true
    });
  }
  share(id, employeeIds, updatedBy) {
    return this.fileModel.findByIdAndUpdate(id, {
      sharedWith: employeeIds.map((id2) => new import_mongoose48.Types.ObjectId(id2)),
      updatedBy: new import_mongoose48.Types.ObjectId(updatedBy)
    }, {
      new: true
    });
  }
  async addFavorite(fileId, employeeId) {
    return this.fileModel.findByIdAndUpdate(fileId, {
      $addToSet: {
        favoriteBy: new import_mongoose48.Types.ObjectId(employeeId)
      }
    }, {
      new: true
    });
  }
  async removeFavorite(fileId, employeeId) {
    return this.fileModel.findByIdAndUpdate(fileId, {
      $pull: {
        favoriteBy: new import_mongoose48.Types.ObjectId(employeeId)
      }
    }, {
      new: true
    });
  }
  delete(id, updatedBy) {
    return this.fileModel.findByIdAndUpdate(id, {
      isDeleted: true,
      updatedBy: new import_mongoose48.Types.ObjectId(updatedBy)
    }, {
      new: true
    });
  }
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
FilesRepository = __decorate77([
  (0, import_common54.Injectable)(),
  __param32(0, (0, import_mongoose47.InjectModel)(File.name)),
  __param32(0, (0, import_common54.Inject)(import_mongoose48.Model)),
  __metadata58("design:paramtypes", [typeof (_a51 = typeof import_mongoose48.Model !== "undefined" && import_mongoose48.Model) === "function" ? _a51 : Object])
], FilesRepository);

// src/files/mapper/files.mapper.ts
var import_common55 = require("@nestjs/common");
var __decorate78 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FilesMapper = class FilesMapper2 {
  toFile(file, employeeId, canManage) {
    const owner = file.owner;
    const ownerId = owner?._id?.toString() ?? owner?.toString();
    const isOwner = ownerId === employeeId;
    const isSharedWithMe = file.sharedWith.some((entry) => {
      const id = entry?._id?.toString() ?? entry?.toString();
      return id === employeeId;
    });
    const canAccess = canManage || isOwner || isSharedWithMe;
    return {
      id: file.id,
      name: file.name,
      type: file.type,
      size: this.formatSize(file.size),
      uploadedBy: owner?.fullName ?? "",
      uploadedAt: this.formatDate(file.createdAt),
      favorite: file.favoriteBy.some((id) => {
        const favId = id?._id?.toString() ?? id?.toString();
        return favId === employeeId;
      }),
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
  toFileList(result, employeeId, canManage) {
    return {
      items: result.items.map((file) => this.toFile(file, employeeId, canManage)),
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit)
      }
    };
  }
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
    return `${size.toFixed(size < 10 ? 1 : 0)} ${units[index]}`;
  }
  formatDate(date) {
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 6e4);
    if (minutes < 1) {
      return "Just now";
    }
    if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    const days = Math.floor(hours / 24);
    if (days === 1) {
      return "Yesterday";
    }
    if (days < 7) {
      return `${days} days ago`;
    }
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
};
FilesMapper = __decorate78([
  (0, import_common55.Injectable)()
], FilesMapper);

// src/files/services/files.service.ts
var __decorate79 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata59 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param33 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a52;
var _b29;
var _c21;
var _d18;
var FilesService = class FilesService2 {
  repository;
  employeesRepository;
  mapper;
  cloudinary;
  constructor(repository, employeesRepository, mapper, cloudinary2) {
    this.repository = repository;
    this.employeesRepository = employeesRepository;
    this.mapper = mapper;
    this.cloudinary = cloudinary2;
  }
  async files(userId, query) {
    const employee = await this.getEmployee(userId);
    const canManage = this.canManage(this.getRole(employee));
    const result = await this.repository.findAll(employee._id.toString(), query);
    return this.mapper.toFileList(result, employee._id.toString(), canManage);
  }
  async createFolder(userId, dto) {
    const employee = await this.getEmployee(userId);
    this.ensureCanManage(this.getRole(employee));
    if (dto.parentFolder) {
      const folder2 = await this.repository.findFolder(dto.parentFolder);
      if (!folder2) {
        throw new import_common56.NotFoundException("Parent folder not found.");
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
      type: FileType.FOLDER,
      owner: new import_mongoose49.Types.ObjectId(employee._id),
      createdBy: new import_mongoose49.Types.ObjectId(employee._id),
      updatedBy: new import_mongoose49.Types.ObjectId(employee._id),
      parentFolder: dto.parentFolder ? new import_mongoose49.Types.ObjectId(dto.parentFolder) : void 0,
      sharedWith: [],
      favoriteBy: [],
      isDeleted: false
    });
    const folder = await this.repository.findById(created.id);
    return this.mapper.toFile(folder, employee._id.toString(), true);
  }
  async upload(userId, file, dto) {
    const employee = await this.getEmployee(userId);
    if (!file) {
      throw new import_common56.NotFoundException("No file uploaded.");
    }
    if (dto.parentFolder) {
      const folder = await this.repository.findFolder(dto.parentFolder);
      if (!folder) {
        throw new import_common56.NotFoundException("Parent folder not found.");
      }
    }
    const upload = await this.cloudinary.uploadFile(file, "company-management/files");
    const created = await this.repository.create({
      name: dto.name,
      originalName: file.originalname,
      extension: file.originalname.split(".").pop() ?? "",
      mimeType: file.mimetype,
      size: file.size,
      url: upload.secure_url,
      thumbnail: file.mimetype.startsWith("image/") ? upload.secure_url : "",
      type: dto.type,
      owner: new import_mongoose49.Types.ObjectId(employee._id),
      createdBy: new import_mongoose49.Types.ObjectId(employee._id),
      updatedBy: new import_mongoose49.Types.ObjectId(employee._id),
      parentFolder: dto.parentFolder ? new import_mongoose49.Types.ObjectId(dto.parentFolder) : void 0,
      sharedWith: [],
      favoriteBy: [],
      isDeleted: false
    });
    const uploaded = await this.repository.findById(created.id);
    return this.mapper.toFile(uploaded, employee._id.toString(), this.canManage(this.getRole(employee)));
  }
  async rename(userId, fileId, name) {
    const employee = await this.getEmployee(userId);
    const file = await this.repository.findById(fileId);
    if (!file) {
      throw new import_common56.NotFoundException("File not found.");
    }
    this.ensureCanModify(file, employee);
    const updated = await this.repository.rename(fileId, name, employee._id.toString());
    if (!updated) {
      throw new import_common56.NotFoundException("Unable to rename file.");
    }
    return this.mapper.toFile(updated, employee._id.toString(), this.canManage(this.getRole(employee)));
  }
  async move(userId, fileId, parentFolder) {
    const employee = await this.getEmployee(userId);
    const file = await this.repository.findById(fileId);
    if (!file) {
      throw new import_common56.NotFoundException("File not found.");
    }
    this.ensureCanModify(file, employee);
    if (parentFolder) {
      const folder = await this.repository.findFolder(parentFolder);
      if (!folder) {
        throw new import_common56.NotFoundException("Destination folder not found.");
      }
    }
    const moved = await this.repository.move(fileId, parentFolder, employee._id.toString());
    if (!moved) {
      throw new import_common56.NotFoundException("Unable to move file.");
    }
    return this.mapper.toFile(moved, employee._id.toString(), this.canManage(this.getRole(employee)));
  }
  async share(userId, fileId, employeeIds) {
    const employee = await this.getEmployee(userId);
    const file = await this.repository.findById(fileId);
    if (!file) {
      throw new import_common56.NotFoundException("File not found.");
    }
    this.ensureCanModify(file, employee);
    const shared = await this.repository.share(fileId, employeeIds, employee._id.toString());
    if (!shared) {
      throw new import_common56.NotFoundException("Unable to share file.");
    }
    return this.mapper.toFile(shared, employee._id.toString(), this.canManage(this.getRole(employee)));
  }
  async toggleFavorite(userId, fileId) {
    const employee = await this.getEmployee(userId);
    const file = await this.repository.findById(fileId);
    if (!file) {
      throw new import_common56.NotFoundException("File not found.");
    }
    const canManage = this.canManage(this.getRole(employee));
    const canAccess = canManage || this.toIdString(file.owner) === employee._id.toString() || file.sharedWith.some((entry) => this.toIdString(entry) === employee._id.toString());
    if (!canAccess) {
      throw new import_common56.ForbiddenException("You don't have permission to access this file.");
    }
    const alreadyFavorite = file.favoriteBy.some((id) => this.toIdString(id) === employee._id.toString());
    const updated = alreadyFavorite ? await this.repository.removeFavorite(fileId, employee._id.toString()) : await this.repository.addFavorite(fileId, employee._id.toString());
    if (!updated) {
      throw new import_common56.NotFoundException("Unable to update favorite status.");
    }
    return this.mapper.toFile(updated, employee._id.toString(), canManage);
  }
  async delete(userId, fileId) {
    const employee = await this.getEmployee(userId);
    const file = await this.repository.findById(fileId);
    if (!file) {
      throw new import_common56.NotFoundException("File not found.");
    }
    this.ensureCanModify(file, employee);
    await this.repository.delete(fileId, employee._id.toString());
    return {
      success: true
    };
  }
  async download(userId, fileId) {
    const employee = await this.getEmployee(userId);
    const file = await this.repository.findById(fileId);
    if (!file) {
      throw new import_common56.NotFoundException("File not found.");
    }
    const canManage = this.canManage(this.getRole(employee));
    const canAccess = canManage || this.toIdString(file.owner) === employee._id.toString() || file.sharedWith.some((entry) => this.toIdString(entry) === employee._id.toString());
    if (!canAccess) {
      throw new import_common56.ForbiddenException("You don't have permission to access this file.");
    }
    return {
      url: file.url,
      fileName: file.originalName,
      mimeType: file.mimeType
    };
  }
  async storage(userId) {
    await this.getEmployee(userId);
    const used = await this.repository.storageUsed();
    return {
      used,
      limit: 100 * 1024 * 1024 * 1024
    };
  }
  async getEmployee(userId) {
    const employee = await this.employeesRepository.findByUserId(userId);
    if (!employee) {
      throw new import_common56.NotFoundException("Employee profile not found.");
    }
    return employee;
  }
  getRole(employee) {
    const user = employee.user;
    return user?.role;
  }
  canManage(role) {
    return role === Role.ADMIN || role === Role.HR;
  }
  ensureCanManage(role) {
    if (!this.canManage(role)) {
      throw new import_common56.ForbiddenException("You don't have permission to perform this action.");
    }
  }
  ensureCanModify(file, employee) {
    const role = this.getRole(employee);
    const isOwner = this.toIdString(file.owner) === employee._id.toString();
    if (!this.canManage(role) && !isOwner) {
      throw new import_common56.ForbiddenException("You can only modify files you uploaded.");
    }
  }
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
FilesService = __decorate79([
  (0, import_common56.Injectable)(),
  __param33(0, (0, import_common56.Inject)(FilesRepository)),
  __param33(1, (0, import_common56.Inject)(EmployeesRepository)),
  __param33(2, (0, import_common56.Inject)(FilesMapper)),
  __param33(3, (0, import_common56.Inject)(CloudinaryService)),
  __metadata59("design:paramtypes", [typeof (_a52 = typeof FilesRepository !== "undefined" && FilesRepository) === "function" ? _a52 : Object, typeof (_b29 = typeof EmployeesRepository !== "undefined" && EmployeesRepository) === "function" ? _b29 : Object, typeof (_c21 = typeof FilesMapper !== "undefined" && FilesMapper) === "function" ? _c21 : Object, typeof (_d18 = typeof CloudinaryService !== "undefined" && CloudinaryService) === "function" ? _d18 : Object])
], FilesService);

// src/files/dto/file-query.dto.ts
var import_class_validator18 = require("class-validator");
var import_class_transformer6 = require("class-transformer");
var import_class_validator19 = require("class-validator");
var __decorate80 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata60 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a53;
var FileQueryDto = class {
  page = 1;
  limit = 20;
  search;
  type;
  parentFolder;
  favorite;
};
__decorate80([
  (0, import_class_validator18.IsOptional)(),
  (0, import_class_transformer6.Type)(() => Number),
  (0, import_class_validator19.IsInt)(),
  (0, import_class_validator19.Min)(1),
  __metadata60("design:type", Object)
], FileQueryDto.prototype, "page", void 0);
__decorate80([
  (0, import_class_validator18.IsOptional)(),
  (0, import_class_transformer6.Type)(() => Number),
  (0, import_class_validator19.IsInt)(),
  (0, import_class_validator19.Min)(1),
  __metadata60("design:type", Object)
], FileQueryDto.prototype, "limit", void 0);
__decorate80([
  (0, import_class_validator18.IsOptional)(),
  (0, import_class_validator18.IsString)(),
  __metadata60("design:type", String)
], FileQueryDto.prototype, "search", void 0);
__decorate80([
  (0, import_class_validator18.IsOptional)(),
  (0, import_class_validator18.IsEnum)(FileType),
  __metadata60("design:type", typeof (_a53 = typeof FileType !== "undefined" && FileType) === "function" ? _a53 : Object)
], FileQueryDto.prototype, "type", void 0);
__decorate80([
  (0, import_class_validator18.IsOptional)(),
  (0, import_class_validator18.IsString)(),
  __metadata60("design:type", String)
], FileQueryDto.prototype, "parentFolder", void 0);
__decorate80([
  (0, import_class_validator18.IsOptional)(),
  __metadata60("design:type", String)
], FileQueryDto.prototype, "favorite", void 0);

// src/files/dto/create-folder.dto.ts
var import_class_validator20 = require("class-validator");
var __decorate81 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata61 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateFolderDto = class {
  name;
  parentFolder;
};
__decorate81([
  (0, import_class_validator20.IsString)(),
  (0, import_class_validator20.Length)(1, 120),
  __metadata61("design:type", String)
], CreateFolderDto.prototype, "name", void 0);
__decorate81([
  (0, import_class_validator20.IsOptional)(),
  (0, import_class_validator20.IsMongoId)(),
  __metadata61("design:type", String)
], CreateFolderDto.prototype, "parentFolder", void 0);

// src/files/dto/upload-file.dto.ts
var import_class_validator21 = require("class-validator");
var __decorate82 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata62 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a54;
var UploadFileDto = class {
  name;
  type;
  parentFolder;
};
__decorate82([
  (0, import_class_validator21.IsString)(),
  __metadata62("design:type", String)
], UploadFileDto.prototype, "name", void 0);
__decorate82([
  (0, import_class_validator21.IsEnum)(FileType),
  __metadata62("design:type", typeof (_a54 = typeof FileType !== "undefined" && FileType) === "function" ? _a54 : Object)
], UploadFileDto.prototype, "type", void 0);
__decorate82([
  (0, import_class_validator21.IsOptional)(),
  (0, import_class_validator21.IsMongoId)(),
  __metadata62("design:type", String)
], UploadFileDto.prototype, "parentFolder", void 0);

// src/files/dto/rename-file.dto.ts
var import_class_validator22 = require("class-validator");
var __decorate83 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata63 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RenameFileDto = class {
  name;
};
__decorate83([
  (0, import_class_validator22.IsString)(),
  (0, import_class_validator22.Length)(1, 120),
  __metadata63("design:type", String)
], RenameFileDto.prototype, "name", void 0);

// src/files/dto/move-file.dto.ts
var import_class_validator23 = require("class-validator");
var __decorate84 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata64 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MoveFileDto = class {
  parentFolder;
};
__decorate84([
  (0, import_class_validator23.IsOptional)(),
  (0, import_class_validator23.IsMongoId)(),
  __metadata64("design:type", String)
], MoveFileDto.prototype, "parentFolder", void 0);

// src/files/dto/share-file.dto.ts
var import_class_validator24 = require("class-validator");
var __decorate85 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata65 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ShareFileDto = class {
  employeeIds;
};
__decorate85([
  (0, import_class_validator24.IsArray)(),
  (0, import_class_validator24.ArrayNotEmpty)(),
  (0, import_class_validator24.IsMongoId)({
    each: true
  }),
  __metadata65("design:type", Array)
], ShareFileDto.prototype, "employeeIds", void 0);

// src/files/controllers/files.controller.ts
var __decorate86 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata66 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param34 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a55;
var _b30;
var _c22;
var _d19;
var _e11;
var _f6;
var _g5;
var _h4;
var _j2;
var FilesController = class FilesController2 {
  filesService;
  constructor(filesService) {
    this.filesService = filesService;
  }
  files(req, query) {
    return this.filesService.files(req.user.sub, query);
  }
  storage(req) {
    return this.filesService.storage(req.user.sub);
  }
  download(req, id) {
    return this.filesService.download(req.user.sub, id);
  }
  createFolder(req, dto) {
    return this.filesService.createFolder(req.user.sub, dto);
  }
  upload(req, file, dto) {
    return this.filesService.upload(req.user.sub, file, dto);
  }
  rename(req, id, dto) {
    return this.filesService.rename(req.user.sub, id, dto.name);
  }
  move(req, id, dto) {
    return this.filesService.move(req.user.sub, id, dto.parentFolder ?? null);
  }
  share(req, id, dto) {
    return this.filesService.share(req.user.sub, id, dto.employeeIds);
  }
  favorite(req, id) {
    return this.filesService.toggleFavorite(req.user.sub, id);
  }
  delete(req, id) {
    return this.filesService.delete(req.user.sub, id);
  }
};
__decorate86([
  (0, import_common57.Get)(),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Query)()),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, typeof (_b30 = typeof FileQueryDto !== "undefined" && FileQueryDto) === "function" ? _b30 : Object]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "files", null);
__decorate86([
  (0, import_common57.Get)("storage"),
  __param34(0, (0, import_common57.Req)()),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "storage", null);
__decorate86([
  (0, import_common57.Get)(":id/download"),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Param)("id")),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, String]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "download", null);
__decorate86([
  (0, import_common57.Post)("folders"),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Body)()),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, typeof (_c22 = typeof CreateFolderDto !== "undefined" && CreateFolderDto) === "function" ? _c22 : Object]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "createFolder", null);
__decorate86([
  (0, import_common57.Post)("upload"),
  (0, import_common57.UseInterceptors)((0, import_platform_express4.FileInterceptor)("file")),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.UploadedFile)()),
  __param34(2, (0, import_common57.Body)()),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, typeof (_e11 = typeof Express !== "undefined" && (_d19 = Express.Multer) !== void 0 && _d19.File) === "function" ? _e11 : Object, typeof (_f6 = typeof UploadFileDto !== "undefined" && UploadFileDto) === "function" ? _f6 : Object]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "upload", null);
__decorate86([
  (0, import_common57.Patch)(":id/rename"),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Param)("id")),
  __param34(2, (0, import_common57.Body)()),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, String, typeof (_g5 = typeof RenameFileDto !== "undefined" && RenameFileDto) === "function" ? _g5 : Object]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "rename", null);
__decorate86([
  (0, import_common57.Patch)(":id/move"),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Param)("id")),
  __param34(2, (0, import_common57.Body)()),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, String, typeof (_h4 = typeof MoveFileDto !== "undefined" && MoveFileDto) === "function" ? _h4 : Object]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "move", null);
__decorate86([
  (0, import_common57.Patch)(":id/share"),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Param)("id")),
  __param34(2, (0, import_common57.Body)()),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, String, typeof (_j2 = typeof ShareFileDto !== "undefined" && ShareFileDto) === "function" ? _j2 : Object]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "share", null);
__decorate86([
  (0, import_common57.Patch)(":id/favorite"),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Param)("id")),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, String]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "favorite", null);
__decorate86([
  (0, import_common57.Delete)(":id"),
  __param34(0, (0, import_common57.Req)()),
  __param34(1, (0, import_common57.Param)("id")),
  __metadata66("design:type", Function),
  __metadata66("design:paramtypes", [Object, String]),
  __metadata66("design:returntype", void 0)
], FilesController.prototype, "delete", null);
FilesController = __decorate86([
  (0, import_common57.Controller)("files"),
  (0, import_common57.UseGuards)(JwtAuthGuard),
  __param34(0, (0, import_common57.Inject)(FilesService)),
  __metadata66("design:paramtypes", [typeof (_a55 = typeof FilesService !== "undefined" && FilesService) === "function" ? _a55 : Object])
], FilesController);

// src/files/files.module.ts
var __decorate87 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FilesModule = class FilesModule2 {
};
FilesModule = __decorate87([
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
var import_express = __toESM(require("express"));

// src/reports/services/reports.service.ts
var import_common60 = require("@nestjs/common");

// src/reports/repositories/reports.repository.ts
var import_common59 = require("@nestjs/common");
var import_mongoose51 = require("@nestjs/mongoose");
var import_mongoose52 = require("mongoose");
var __decorate88 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata67 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param35 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a56;
var _b31;
var _c23;
var _d20;
var ReportsRepository = class ReportsRepository2 {
  employeeModel;
  projectModel;
  taskModel;
  attendanceModel;
  constructor(employeeModel, projectModel, taskModel, attendanceModel) {
    this.employeeModel = employeeModel;
    this.projectModel = projectModel;
    this.taskModel = taskModel;
    this.attendanceModel = attendanceModel;
  }
  async getReports() {
    const [statistics, payroll, attendance, performance, departments, projects, taskStatistics, monthlyEmployees] = await Promise.all([
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
  async getStatistics() {
    const [employees, projects, activeProjects, completedProjects, payrollResult] = await Promise.all([
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
      monthlyPayroll: Math.round(payrollData.totalSalary ?? 0),
      averageSalary: Math.round(payrollData.averageSalary ?? 0)
    };
  }
  async getPayroll() {
    const [overall, byDepartment] = await Promise.all([
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
      totalMonthly: Math.round(data.totalMonthly ?? 0),
      averageSalary: Math.round(data.averageSalary ?? 0),
      byDepartment
    };
  }
  async getAttendance() {
    const [overallResult, byDepartment] = await Promise.all([
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
      overall: Math.round(overall * 10) / 10,
      employees: await this.employeeModel.countDocuments(),
      byDepartment: byDepartment.map((item) => ({
        department: item.department,
        attendance: Math.round(item.attendance * 10) / 10,
        employees: item.employees
      }))
    };
  }
  async getPerformance() {
    const employees = await this.employeeModel.find().select("_id firstName lastName fullName designation department").lean();
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
      scoreMap.set(item._id.toString(), {
        averageScore: item.averageScore ?? 0,
        totalTasks: item.totalTasks ?? 0,
        completedTasks: item.completedTasks ?? 0
      });
    }
    return employees.map((employee) => {
      const stats = scoreMap.get(employee._id.toString());
      const score = stats?.averageScore ?? 0;
      return {
        id: employee._id.toString(),
        employee: employee.fullName ?? `${employee.firstName} ${employee.lastName}`,
        role: employee.designation,
        department: employee.department,
        score: Math.round(score * 10) / 10,
        totalTasks: stats?.totalTasks ?? 0,
        completedTasks: stats?.completedTasks ?? 0
      };
    }).sort((a, b) => b.score - a.score);
  }
  async getDepartments() {
    const [employeeData, attendanceData, performanceData] = await Promise.all([
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
      attendanceMap.set(item._id, Math.round(percentage * 10) / 10);
    }
    const performanceMap = /* @__PURE__ */ new Map();
    for (const item of performanceData) {
      const current = performanceMap.get(item.department) ?? {
        total: 0,
        count: 0
      };
      current.total += item.score;
      current.count += 1;
      performanceMap.set(item.department, current);
    }
    return employeeData.map((department) => {
      const performance = performanceMap.get(department._id);
      return {
        name: department._id,
        employees: department.employees,
        payroll: Math.round(department.payroll ?? 0),
        averagePerformance: performance && performance.count > 0 ? Math.round(performance.total / performance.count * 10) / 10 : 0,
        averageAttendance: attendanceMap.get(department._id) ?? 0
      };
    });
  }
  async getProjects() {
    const projects = await this.projectModel.find().sort({
      createdAt: -1
    }).lean();
    return projects.map((project) => {
      const progress = project.status === "Completed" ? 100 : Math.max(0, Math.min(100, project.progress ?? 0));
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
        members: Array.isArray(project.members) ? project.members.length : 0
      };
    });
  }
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
    const remainingTasks = Math.max(0, data.totalTasks - data.completedTasks);
    const completionRate = data.totalTasks > 0 ? data.completedTasks / data.totalTasks * 100 : 0;
    return {
      totalTasks: data.totalTasks,
      completedTasks: data.completedTasks,
      remainingTasks,
      completionRate: Math.round(completionRate * 10) / 10
    };
  }
  async getMonthlyEmployees() {
    const now = /* @__PURE__ */ new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
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
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const found = result.find((item) => item._id.year === year && item._id.month === month);
      output.push({
        month: months[month - 1],
        year,
        employees: found?.employees ?? 0
      });
    }
    return output;
  }
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
ReportsRepository = __decorate88([
  (0, import_common59.Injectable)(),
  __param35(0, (0, import_mongoose51.InjectModel)(Employee.name)),
  __param35(0, (0, import_common59.Inject)(import_mongoose52.Model)),
  __param35(1, (0, import_mongoose51.InjectModel)(Project.name)),
  __param35(1, (0, import_common59.Inject)(import_mongoose52.Model)),
  __param35(2, (0, import_mongoose51.InjectModel)(Task.name)),
  __param35(2, (0, import_common59.Inject)(import_mongoose52.Model)),
  __param35(3, (0, import_mongoose51.InjectModel)(Attendance.name)),
  __param35(3, (0, import_common59.Inject)(import_mongoose52.Model)),
  __metadata67("design:paramtypes", [typeof (_a56 = typeof import_mongoose52.Model !== "undefined" && import_mongoose52.Model) === "function" ? _a56 : Object, typeof (_b31 = typeof import_mongoose52.Model !== "undefined" && import_mongoose52.Model) === "function" ? _b31 : Object, typeof (_c23 = typeof import_mongoose52.Model !== "undefined" && import_mongoose52.Model) === "function" ? _c23 : Object, typeof (_d20 = typeof import_mongoose52.Model !== "undefined" && import_mongoose52.Model) === "function" ? _d20 : Object])
], ReportsRepository);

// src/reports/services/reports.service.ts
var __decorate89 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata68 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param36 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a57;
var ReportsService = class ReportsService2 {
  reportsRepository;
  constructor(reportsRepository) {
    this.reportsRepository = reportsRepository;
  }
  async getReports() {
    return this.reportsRepository.getReports();
  }
};
ReportsService = __decorate89([
  (0, import_common60.Injectable)(),
  __param36(0, (0, import_common60.Inject)(ReportsRepository)),
  __metadata68("design:paramtypes", [typeof (_a57 = typeof ReportsRepository !== "undefined" && ReportsRepository) === "function" ? _a57 : Object])
], ReportsService);

// src/reports/services/reports-export.service.ts
var import_common61 = require("@nestjs/common");
var import_exceljs = __toESM(require("exceljs"));
var import_pdfkit = __toESM(require("pdfkit"));
var __decorate90 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata69 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param37 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a58;
var ReportsExportService = class ReportsExportService2 {
  reportsRepository;
  constructor(reportsRepository) {
    this.reportsRepository = reportsRepository;
  }
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
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    return Buffer.from(csv, "utf-8");
  }
  async excel() {
    const report = await this.reportsRepository.getReports();
    const workbook = new import_exceljs.default.Workbook();
    const summary = workbook.addWorksheet("Summary");
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
    const employees = workbook.addWorksheet("Performance");
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
    employees.addRows(report.performance);
    const projects = workbook.addWorksheet("Projects");
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
    projects.addRows(report.projects);
    const payroll = workbook.addWorksheet("Payroll");
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
    payroll.addRows(report.payroll.byDepartment);
    return Buffer.from(await workbook.xlsx.writeBuffer());
  }
  async pdf() {
    const report = await this.reportsRepository.getReports();
    return new Promise((resolve) => {
      const document = new import_pdfkit.default({
        margin: 40
      });
      const chunks = [];
      document.on("data", (chunk) => chunks.push(chunk));
      document.on("end", () => resolve(Buffer.concat(chunks)));
      document.fontSize(24).text("Reports & Analytics");
      document.moveDown();
      document.fontSize(14).text(`Employees: ${report.statistics.employees}`);
      document.text(`Projects: ${report.statistics.projects}`);
      document.text(`Active Projects: ${report.statistics.activeProjects}`);
      document.text(`Completed Projects: ${report.statistics.completedProjects}`);
      document.text(`Monthly Payroll: $${report.statistics.monthlyPayroll.toLocaleString()}`);
      document.text(`Average Salary: $${report.statistics.averageSalary.toLocaleString()}`);
      document.moveDown();
      document.fontSize(18).text("Task Statistics");
      document.fontSize(14).text(`Total Tasks: ${report.taskStatistics.totalTasks}`);
      document.text(`Completed Tasks: ${report.taskStatistics.completedTasks}`);
      document.text(`Remaining Tasks: ${report.taskStatistics.remainingTasks}`);
      document.text(`Completion Rate: ${Math.round(report.taskStatistics.completionRate)}%`);
      document.moveDown();
      document.fontSize(18).text("Projects");
      document.moveDown(0.5);
      for (const project of report.projects) {
        document.fontSize(11).text(`${project.name} \u2014 ${project.status} \u2014 ${project.progress}% \u2014 ${project.completedTasks}/${project.totalTasks} tasks`);
      }
      document.moveDown();
      document.fontSize(18).text("Employee Performance");
      document.moveDown(0.5);
      for (const employee of report.performance) {
        document.fontSize(11).text(`${employee.employee} \u2014 ${employee.department} \u2014 ${employee.score}%`);
      }
      document.end();
    });
  }
};
ReportsExportService = __decorate90([
  (0, import_common61.Injectable)(),
  __param37(0, (0, import_common61.Inject)(ReportsRepository)),
  __metadata69("design:paramtypes", [typeof (_a58 = typeof ReportsRepository !== "undefined" && ReportsRepository) === "function" ? _a58 : Object])
], ReportsExportService);

// src/reports/guards/reports-access.guard.ts
var import_common62 = require("@nestjs/common");
var import_passport4 = require("@nestjs/passport");
var __decorate91 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReportsAccessGuard = class ReportsAccessGuard2 extends (0, import_passport4.AuthGuard)("jwt") {
  async canActivate(context) {
    const authenticated = await super.canActivate(context);
    if (!authenticated) {
      throw new import_common62.UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = String(user?.role ?? user?.roles?.[0] ?? "").trim().toUpperCase();
    const allowed = [
      "ADMIN",
      "HR",
      "HUMAN_RESOURCES"
    ].includes(role);
    if (!allowed) {
      throw new import_common62.ForbiddenException("Only Admin or HR can access reports.");
    }
    return true;
  }
};
ReportsAccessGuard = __decorate91([
  (0, import_common62.Injectable)()
], ReportsAccessGuard);

// src/reports/controllers/reports.controller.ts
var __decorate92 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata70 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param38 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a59;
var _b32;
var _c24;
var ReportsController = class ReportsController2 {
  reportsService;
  reportsExportService;
  constructor(reportsService, reportsExportService) {
    this.reportsService = reportsService;
    this.reportsExportService = reportsExportService;
  }
  async getReports() {
    return this.reportsService.getReports();
  }
  async exportReport(format, response) {
    const normalized = format.toLowerCase();
    if (normalized === "csv") {
      const buffer = await this.reportsExportService.csv();
      response.setHeader("Content-Type", "text/csv");
      response.setHeader("Content-Disposition", 'attachment; filename="reports.csv"');
      return response.send(buffer);
    }
    if (normalized === "excel") {
      const buffer = await this.reportsExportService.excel();
      response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      response.setHeader("Content-Disposition", 'attachment; filename="reports.xlsx"');
      return response.send(buffer);
    }
    if (normalized === "pdf") {
      const buffer = await this.reportsExportService.pdf();
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader("Content-Disposition", 'attachment; filename="reports.pdf"');
      return response.send(buffer);
    }
    return response.status(400).json({
      message: "Unsupported export format."
    });
  }
};
__decorate92([
  (0, import_common63.Get)(),
  __metadata70("design:type", Function),
  __metadata70("design:paramtypes", []),
  __metadata70("design:returntype", Promise)
], ReportsController.prototype, "getReports", null);
__decorate92([
  (0, import_common63.Get)("export/:format"),
  __param38(0, (0, import_common63.Param)("format")),
  __param38(1, (0, import_common63.Res)()),
  __metadata70("design:type", Function),
  __metadata70("design:paramtypes", [String, typeof (_c24 = typeof import_express.default !== "undefined" && import_express.default.Response) === "function" ? _c24 : Object]),
  __metadata70("design:returntype", Promise)
], ReportsController.prototype, "exportReport", null);
ReportsController = __decorate92([
  (0, import_common63.Controller)("reports"),
  (0, import_common63.UseGuards)(ReportsAccessGuard),
  __param38(0, (0, import_common63.Inject)(ReportsService)),
  __param38(1, (0, import_common63.Inject)(ReportsExportService)),
  __metadata70("design:paramtypes", [typeof (_a59 = typeof ReportsService !== "undefined" && ReportsService) === "function" ? _a59 : Object, typeof (_b32 = typeof ReportsExportService !== "undefined" && ReportsExportService) === "function" ? _b32 : Object])
], ReportsController);

// src/reports/reports.module.ts
var __decorate93 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReportsModule = class ReportsModule2 {
};
ReportsModule = __decorate93([
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
var __decorate94 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata71 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a60;
var PortfolioContent = class PortfolioContent2 {
  content;
};
__decorate94([
  (0, import_mongoose54.Prop)({
    type: Object,
    required: true
  }),
  __metadata71("design:type", typeof (_a60 = typeof Record !== "undefined" && Record) === "function" ? _a60 : Object)
], PortfolioContent.prototype, "content", void 0);
PortfolioContent = __decorate94([
  (0, import_mongoose54.Schema)({
    timestamps: true
  })
], PortfolioContent);
var PortfolioContentSchema = import_mongoose54.SchemaFactory.createForClass(PortfolioContent);

// src/portfolio/repositories/portfolio.repository.ts
var __decorate95 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata72 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param39 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a61;
var PortfolioRepository = class PortfolioRepository2 {
  portfolioModel;
  constructor(portfolioModel) {
    this.portfolioModel = portfolioModel;
  }
  async get() {
    return this.portfolioModel.findOne().lean();
  }
  async create(content) {
    return this.portfolioModel.create({
      content
    });
  }
  async update(content) {
    return this.portfolioModel.findOneAndUpdate({}, {
      content
    }, {
      new: true,
      upsert: true
    }).lean();
  }
  async updateSection(key, data) {
    return this.portfolioModel.findOneAndUpdate({}, { $set: { [`content.${key}`]: data } }, { new: true, upsert: true }).lean();
  }
};
PortfolioRepository = __decorate95([
  (0, import_common65.Injectable)(),
  __param39(0, (0, import_mongoose55.InjectModel)(PortfolioContent.name)),
  __param39(0, (0, import_common65.Inject)(import_mongoose56.Model)),
  __metadata72("design:paramtypes", [typeof (_a61 = typeof import_mongoose56.Model !== "undefined" && import_mongoose56.Model) === "function" ? _a61 : Object])
], PortfolioRepository);

// src/portfolio/services/portfolio.service.ts
var __decorate96 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata73 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param40 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a62;
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
var PortfolioService = class PortfolioService2 {
  portfolioRepository;
  constructor(portfolioRepository) {
    this.portfolioRepository = portfolioRepository;
  }
  async getPortfolio() {
    const portfolio = await this.portfolioRepository.get();
    return {
      success: true,
      data: portfolio?.content ?? DEFAULT_PORTFOLIO_CONTENT
    };
  }
  async updatePortfolio(content) {
    const portfolio = await this.portfolioRepository.update(content);
    return {
      success: true,
      message: "Portfolio updated successfully.",
      data: portfolio?.content
    };
  }
  async updateSection(key, data) {
    const portfolio = await this.portfolioRepository.updateSection(key, data);
    return { success: true, message: `${key} updated successfully.`, data: portfolio?.content };
  }
};
PortfolioService = __decorate96([
  (0, import_common66.Injectable)(),
  __param40(0, (0, import_common66.Inject)(PortfolioRepository)),
  __metadata73("design:paramtypes", [typeof (_a62 = typeof PortfolioRepository !== "undefined" && PortfolioRepository) === "function" ? _a62 : Object])
], PortfolioService);

// src/portfolio/controllers/portfolio.controller.ts
var __decorate97 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata74 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param41 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a63;
var _b33;
var _c25;
var _d21;
var _e12;
var _f7;
var PortfolioController = class PortfolioController2 {
  portfolioService;
  cloudinary;
  constructor(portfolioService, cloudinary2) {
    this.portfolioService = portfolioService;
    this.cloudinary = cloudinary2;
  }
  getPortfolio() {
    return this.portfolioService.getPortfolio();
  }
  updatePortfolio(body) {
    return this.portfolioService.updatePortfolio(body);
  }
  updateSection(body, key) {
    return this.portfolioService.updateSection(key, body);
  }
  async uploadImage(file) {
    const upload = await this.cloudinary.uploadFile(file, "company-management/portfolio/images");
    return {
      success: true,
      data: {
        url: upload.secure_url
      }
    };
  }
};
__decorate97([
  (0, import_common67.Get)(),
  __metadata74("design:type", Function),
  __metadata74("design:paramtypes", []),
  __metadata74("design:returntype", void 0)
], PortfolioController.prototype, "getPortfolio", null);
__decorate97([
  (0, import_common67.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common67.Put)(),
  __param41(0, (0, import_common67.Body)()),
  __metadata74("design:type", Function),
  __metadata74("design:paramtypes", [typeof (_c25 = typeof Record !== "undefined" && Record) === "function" ? _c25 : Object]),
  __metadata74("design:returntype", void 0)
], PortfolioController.prototype, "updatePortfolio", null);
__decorate97([
  (0, import_common67.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common67.Put)(":key"),
  __param41(0, (0, import_common67.Body)()),
  __param41(1, (0, import_common67.Param)("key")),
  __metadata74("design:type", Function),
  __metadata74("design:paramtypes", [typeof (_d21 = typeof Record !== "undefined" && Record) === "function" ? _d21 : Object, String]),
  __metadata74("design:returntype", void 0)
], PortfolioController.prototype, "updateSection", null);
__decorate97([
  (0, import_common67.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common67.Post)("upload-image"),
  (0, import_common67.UseInterceptors)((0, import_platform_express5.FileInterceptor)("file")),
  __param41(0, (0, import_common67.UploadedFile)()),
  __metadata74("design:type", Function),
  __metadata74("design:paramtypes", [typeof (_f7 = typeof Express !== "undefined" && (_e12 = Express.Multer) !== void 0 && _e12.File) === "function" ? _f7 : Object]),
  __metadata74("design:returntype", Promise)
], PortfolioController.prototype, "uploadImage", null);
PortfolioController = __decorate97([
  (0, import_common67.Controller)("portfolio"),
  __param41(0, (0, import_common67.Inject)(PortfolioService)),
  __param41(1, (0, import_common67.Inject)(CloudinaryService)),
  __metadata74("design:paramtypes", [typeof (_a63 = typeof PortfolioService !== "undefined" && PortfolioService) === "function" ? _a63 : Object, typeof (_b33 = typeof CloudinaryService !== "undefined" && CloudinaryService) === "function" ? _b33 : Object])
], PortfolioController);

// src/portfolio/portfolio.module.ts
var __decorate98 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PortfolioModule = class PortfolioModule2 {
};
PortfolioModule = __decorate98([
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
var __decorate99 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata75 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a64;
var UserSettingsDoc = class UserSettingsDoc2 {
  userId;
  content;
};
__decorate99([
  (0, import_mongoose58.Prop)({
    type: String,
    required: true,
    unique: true,
    index: true
  }),
  __metadata75("design:type", String)
], UserSettingsDoc.prototype, "userId", void 0);
__decorate99([
  (0, import_mongoose58.Prop)({
    type: Object,
    required: true
  }),
  __metadata75("design:type", typeof (_a64 = typeof Record !== "undefined" && Record) === "function" ? _a64 : Object)
], UserSettingsDoc.prototype, "content", void 0);
UserSettingsDoc = __decorate99([
  (0, import_mongoose58.Schema)({
    timestamps: true
  })
], UserSettingsDoc);
var UserSettingsSchema = import_mongoose58.SchemaFactory.createForClass(UserSettingsDoc);

// src/settings/repositories/settings.repository.ts
var __decorate100 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata76 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param42 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a65;
var SettingsRepository = class SettingsRepository2 {
  settingsModel;
  constructor(settingsModel) {
    this.settingsModel = settingsModel;
  }
  async getByUserId(userId) {
    return this.settingsModel.findOne({ userId }).lean();
  }
  async upsert(userId, content) {
    return this.settingsModel.findOneAndUpdate({ userId }, { userId, content }, {
      new: true,
      upsert: true
    }).lean();
  }
};
SettingsRepository = __decorate100([
  (0, import_common69.Injectable)(),
  __param42(0, (0, import_mongoose59.InjectModel)(UserSettingsDoc.name)),
  __param42(0, (0, import_common69.Inject)(import_mongoose60.Model)),
  __metadata76("design:paramtypes", [typeof (_a65 = typeof import_mongoose60.Model !== "undefined" && import_mongoose60.Model) === "function" ? _a65 : Object])
], SettingsRepository);

// src/settings/services/settings.service.ts
var __decorate101 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata77 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param43 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a66;
var SettingsService = class SettingsService2 {
  settingsRepository;
  constructor(settingsRepository) {
    this.settingsRepository = settingsRepository;
  }
  async getSettings(userId) {
    const settings = await this.settingsRepository.getByUserId(userId);
    return {
      success: true,
      data: settings?.content ?? null
    };
  }
  async updateSettings(userId, content) {
    const settings = await this.settingsRepository.upsert(userId, content);
    return {
      success: true,
      message: "Settings updated successfully.",
      data: settings?.content
    };
  }
};
SettingsService = __decorate101([
  (0, import_common70.Injectable)(),
  __param43(0, (0, import_common70.Inject)(SettingsRepository)),
  __metadata77("design:paramtypes", [typeof (_a66 = typeof SettingsRepository !== "undefined" && SettingsRepository) === "function" ? _a66 : Object])
], SettingsService);

// src/settings/controllers/settings.controller.ts
var __decorate102 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata78 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param44 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a67;
var _b34;
var ADMIN_ONLY_FIELDS = [
  "company",
  "website",
  "address"
];
var SettingsController = class SettingsController2 {
  settingsService;
  constructor(settingsService) {
    this.settingsService = settingsService;
  }
  getSettings(req) {
    return this.settingsService.getSettings(req.user.sub);
  }
  updateSettings(req, body) {
    const isAdmin = req.user.role === Role.ADMIN;
    if (!isAdmin) {
      const attemptedAdminField = ADMIN_ONLY_FIELDS.find((field) => field in body);
      if (attemptedAdminField) {
        throw new import_common71.ForbiddenException("Only an admin can update company settings.");
      }
    }
    return this.settingsService.updateSettings(req.user.sub, body);
  }
};
__decorate102([
  (0, import_common71.Get)(),
  __param44(0, (0, import_common71.Req)()),
  __metadata78("design:type", Function),
  __metadata78("design:paramtypes", [Object]),
  __metadata78("design:returntype", void 0)
], SettingsController.prototype, "getSettings", null);
__decorate102([
  (0, import_common71.Put)(),
  __param44(0, (0, import_common71.Req)()),
  __param44(1, (0, import_common71.Body)()),
  __metadata78("design:type", Function),
  __metadata78("design:paramtypes", [Object, typeof (_b34 = typeof Record !== "undefined" && Record) === "function" ? _b34 : Object]),
  __metadata78("design:returntype", void 0)
], SettingsController.prototype, "updateSettings", null);
SettingsController = __decorate102([
  (0, import_common71.UseGuards)(JwtAuthGuard),
  (0, import_common71.Controller)("settings"),
  __param44(0, (0, import_common71.Inject)(SettingsService)),
  __metadata78("design:paramtypes", [typeof (_a67 = typeof SettingsService !== "undefined" && SettingsService) === "function" ? _a67 : Object])
], SettingsController);

// src/settings/settings.module.ts
var __decorate103 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SettingsModule = class SettingsModule2 {
};
SettingsModule = __decorate103([
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
var __decorate104 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata79 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationDoc = class NotificationDoc2 {
  userId;
  title;
  description;
  type;
  read;
};
__decorate104([
  (0, import_mongoose62.Prop)({
    type: String,
    required: true,
    index: true
  }),
  __metadata79("design:type", String)
], NotificationDoc.prototype, "userId", void 0);
__decorate104([
  (0, import_mongoose62.Prop)({
    type: String,
    required: true
  }),
  __metadata79("design:type", String)
], NotificationDoc.prototype, "title", void 0);
__decorate104([
  (0, import_mongoose62.Prop)({
    type: String,
    required: true
  }),
  __metadata79("design:type", String)
], NotificationDoc.prototype, "description", void 0);
__decorate104([
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
  }),
  __metadata79("design:type", String)
], NotificationDoc.prototype, "type", void 0);
__decorate104([
  (0, import_mongoose62.Prop)({
    type: Boolean,
    default: false
  }),
  __metadata79("design:type", Boolean)
], NotificationDoc.prototype, "read", void 0);
NotificationDoc = __decorate104([
  (0, import_mongoose62.Schema)({
    timestamps: true
  })
], NotificationDoc);
var NotificationSchema = import_mongoose62.SchemaFactory.createForClass(NotificationDoc);

// src/notifications/repositories/notifications.repository.ts
var __decorate105 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata80 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param45 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a68;
var NotificationsRepository = class NotificationsRepository2 {
  notificationModel;
  constructor(notificationModel) {
    this.notificationModel = notificationModel;
  }
  async findByUser(userId) {
    return this.notificationModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }
  async create(data) {
    return this.notificationModel.create(data);
  }
  async markAsRead(id, userId) {
    return this.notificationModel.findOneAndUpdate({ _id: id, userId }, { read: true }, { new: true }).lean();
  }
  async markAllAsRead(userId) {
    return this.notificationModel.updateMany({ userId, read: false }, { read: true });
  }
  async clearAll(userId) {
    return this.notificationModel.deleteMany({
      userId
    });
  }
};
NotificationsRepository = __decorate105([
  (0, import_common73.Injectable)(),
  __param45(0, (0, import_mongoose63.InjectModel)(NotificationDoc.name)),
  __param45(0, (0, import_common73.Inject)(import_mongoose64.Model)),
  __metadata80("design:paramtypes", [typeof (_a68 = typeof import_mongoose64.Model !== "undefined" && import_mongoose64.Model) === "function" ? _a68 : Object])
], NotificationsRepository);

// src/notifications/services/notifications.service.ts
var __decorate106 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata81 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param46 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a69;
var NotificationsService = class NotificationsService2 {
  notificationsRepository;
  constructor(notificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }
  async getMyNotifications(userId) {
    const notifications = await this.notificationsRepository.findByUser(userId);
    return {
      success: true,
      data: notifications
    };
  }
  async create(userId, title, description, type) {
    return this.notificationsRepository.create({
      userId,
      title,
      description,
      type
    });
  }
  async markAsRead(id, userId) {
    const updated = await this.notificationsRepository.markAsRead(id, userId);
    return {
      success: true,
      data: updated
    };
  }
  async markAllAsRead(userId) {
    await this.notificationsRepository.markAllAsRead(userId);
    return {
      success: true,
      message: "All notifications marked as read."
    };
  }
  async clearAll(userId) {
    await this.notificationsRepository.clearAll(userId);
    return {
      success: true,
      message: "All notifications cleared."
    };
  }
};
NotificationsService = __decorate106([
  (0, import_common74.Injectable)(),
  __param46(0, (0, import_common74.Inject)(NotificationsRepository)),
  __metadata81("design:paramtypes", [typeof (_a69 = typeof NotificationsRepository !== "undefined" && NotificationsRepository) === "function" ? _a69 : Object])
], NotificationsService);

// src/notifications/controllers/notifications.controller.ts
var __decorate107 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata82 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param47 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a70;
var NotificationsController = class NotificationsController2 {
  notificationsService;
  constructor(notificationsService) {
    this.notificationsService = notificationsService;
  }
  getMine(req) {
    return this.notificationsService.getMyNotifications(req.user.sub);
  }
  markAsRead(id, req) {
    return this.notificationsService.markAsRead(id, req.user.sub);
  }
  markAllAsRead(req) {
    return this.notificationsService.markAllAsRead(req.user.sub);
  }
  clearAll(req) {
    return this.notificationsService.clearAll(req.user.sub);
  }
};
__decorate107([
  (0, import_common75.Get)(),
  __param47(0, (0, import_common75.Req)()),
  __metadata82("design:type", Function),
  __metadata82("design:paramtypes", [Object]),
  __metadata82("design:returntype", void 0)
], NotificationsController.prototype, "getMine", null);
__decorate107([
  (0, import_common75.Patch)(":id/read"),
  __param47(0, (0, import_common75.Param)("id")),
  __param47(1, (0, import_common75.Req)()),
  __metadata82("design:type", Function),
  __metadata82("design:paramtypes", [String, Object]),
  __metadata82("design:returntype", void 0)
], NotificationsController.prototype, "markAsRead", null);
__decorate107([
  (0, import_common75.Patch)("read-all"),
  __param47(0, (0, import_common75.Req)()),
  __metadata82("design:type", Function),
  __metadata82("design:paramtypes", [Object]),
  __metadata82("design:returntype", void 0)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate107([
  (0, import_common75.Delete)(),
  __param47(0, (0, import_common75.Req)()),
  __metadata82("design:type", Function),
  __metadata82("design:paramtypes", [Object]),
  __metadata82("design:returntype", void 0)
], NotificationsController.prototype, "clearAll", null);
NotificationsController = __decorate107([
  (0, import_common75.UseGuards)(JwtAuthGuard),
  (0, import_common75.Controller)("notifications"),
  __param47(0, (0, import_common75.Inject)(NotificationsService)),
  __metadata82("design:paramtypes", [typeof (_a70 = typeof NotificationsService !== "undefined" && NotificationsService) === "function" ? _a70 : Object])
], NotificationsController);

// src/notifications/notifications.module.ts
var __decorate108 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationsModule = class NotificationsModule2 {
};
NotificationsModule = __decorate108([
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
var __decorate109 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata83 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a71;
var UpdatesContent = class UpdatesContent2 {
  content;
};
__decorate109([
  (0, import_mongoose66.Prop)({
    type: Object,
    required: true
  }),
  __metadata83("design:type", typeof (_a71 = typeof Record !== "undefined" && Record) === "function" ? _a71 : Object)
], UpdatesContent.prototype, "content", void 0);
UpdatesContent = __decorate109([
  (0, import_mongoose66.Schema)({
    timestamps: true
  })
], UpdatesContent);
var UpdatesContentSchema = import_mongoose66.SchemaFactory.createForClass(UpdatesContent);

// src/updates/repositories/updates.repository.ts
var __decorate110 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata84 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param48 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a72;
var UpdatesRepository = class UpdatesRepository2 {
  updatesModel;
  constructor(updatesModel) {
    this.updatesModel = updatesModel;
  }
  async get() {
    return this.updatesModel.findOne().lean();
  }
  async updateSection(key, value) {
    return this.updatesModel.findOneAndUpdate({}, { $set: { [`content.${key}`]: value } }, {
      new: true,
      upsert: true
    }).lean();
  }
};
UpdatesRepository = __decorate110([
  (0, import_common77.Injectable)(),
  __param48(0, (0, import_mongoose67.InjectModel)(UpdatesContent.name)),
  __param48(0, (0, import_common77.Inject)(import_mongoose68.Model)),
  __metadata84("design:paramtypes", [typeof (_a72 = typeof import_mongoose68.Model !== "undefined" && import_mongoose68.Model) === "function" ? _a72 : Object])
], UpdatesRepository);

// src/updates/services/updates.service.ts
var __decorate111 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata85 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param49 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a73;
var UpdatesService = class UpdatesService2 {
  updatesRepository;
  constructor(updatesRepository) {
    this.updatesRepository = updatesRepository;
  }
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
    const updates = await this.updatesRepository.updateSection("ceoMessage", ceoMessage);
    return {
      success: true,
      message: "Message saved successfully.",
      data: updates?.content
    };
  }
  async updateGalleries(galleries) {
    const updates = await this.updatesRepository.updateSection("galleries", galleries);
    return {
      success: true,
      message: "Galleries saved successfully.",
      data: updates?.content
    };
  }
};
UpdatesService = __decorate111([
  (0, import_common78.Injectable)(),
  __param49(0, (0, import_common78.Inject)(UpdatesRepository)),
  __metadata85("design:paramtypes", [typeof (_a73 = typeof UpdatesRepository !== "undefined" && UpdatesRepository) === "function" ? _a73 : Object])
], UpdatesService);

// src/updates/controllers/updates.controller.ts
var __decorate112 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata86 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param50 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a74;
var _b35;
var _c26;
var _d22;
var _e13;
var _f8;
var _g6;
var UpdatesController = class UpdatesController2 {
  updatesService;
  cloudinary;
  constructor(updatesService, cloudinary2) {
    this.updatesService = updatesService;
    this.cloudinary = cloudinary2;
  }
  getUpdates() {
    return this.updatesService.getUpdates();
  }
  updateCeoMessage(body) {
    return this.updatesService.updateCeoMessage(body);
  }
  updateGalleries(body) {
    return this.updatesService.updateGalleries(body.galleries);
  }
  async uploadVideo(file) {
    const upload = await this.cloudinary.uploadFile(file, "company-management/updates/videos");
    return {
      success: true,
      data: {
        url: upload.secure_url
      }
    };
  }
  async uploadImage(file) {
    const upload = await this.cloudinary.uploadFile(file, "company-management/updates/gallery");
    return {
      success: true,
      data: {
        url: upload.secure_url
      }
    };
  }
};
__decorate112([
  (0, import_common79.Get)(),
  __metadata86("design:type", Function),
  __metadata86("design:paramtypes", []),
  __metadata86("design:returntype", void 0)
], UpdatesController.prototype, "getUpdates", null);
__decorate112([
  (0, import_common79.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common79.Put)("ceo-message"),
  __param50(0, (0, import_common79.Body)()),
  __metadata86("design:type", Function),
  __metadata86("design:paramtypes", [typeof (_c26 = typeof Record !== "undefined" && Record) === "function" ? _c26 : Object]),
  __metadata86("design:returntype", void 0)
], UpdatesController.prototype, "updateCeoMessage", null);
__decorate112([
  (0, import_common79.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common79.Put)("galleries"),
  __param50(0, (0, import_common79.Body)()),
  __metadata86("design:type", Function),
  __metadata86("design:paramtypes", [Object]),
  __metadata86("design:returntype", void 0)
], UpdatesController.prototype, "updateGalleries", null);
__decorate112([
  (0, import_common79.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common79.Post)("upload-video"),
  (0, import_common79.UseInterceptors)((0, import_platform_express6.FileInterceptor)("file")),
  __param50(0, (0, import_common79.UploadedFile)()),
  __metadata86("design:type", Function),
  __metadata86("design:paramtypes", [typeof (_e13 = typeof Express !== "undefined" && (_d22 = Express.Multer) !== void 0 && _d22.File) === "function" ? _e13 : Object]),
  __metadata86("design:returntype", Promise)
], UpdatesController.prototype, "uploadVideo", null);
__decorate112([
  (0, import_common79.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common79.Post)("upload-image"),
  (0, import_common79.UseInterceptors)((0, import_platform_express6.FileInterceptor)("file")),
  __param50(0, (0, import_common79.UploadedFile)()),
  __metadata86("design:type", Function),
  __metadata86("design:paramtypes", [typeof (_g6 = typeof Express !== "undefined" && (_f8 = Express.Multer) !== void 0 && _f8.File) === "function" ? _g6 : Object]),
  __metadata86("design:returntype", Promise)
], UpdatesController.prototype, "uploadImage", null);
UpdatesController = __decorate112([
  (0, import_common79.Controller)("updates"),
  __param50(0, (0, import_common79.Inject)(UpdatesService)),
  __param50(1, (0, import_common79.Inject)(CloudinaryService)),
  __metadata86("design:paramtypes", [typeof (_a74 = typeof UpdatesService !== "undefined" && UpdatesService) === "function" ? _a74 : Object, typeof (_b35 = typeof CloudinaryService !== "undefined" && CloudinaryService) === "function" ? _b35 : Object])
], UpdatesController);

// src/updates/updates.module.ts
var __decorate113 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UpdatesModule = class UpdatesModule2 {
};
UpdatesModule = __decorate113([
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
var __decorate114 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata87 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a75;
var FooterContentDoc = class FooterContentDoc2 {
  content;
};
__decorate114([
  (0, import_mongoose70.Prop)({ type: Object, required: true }),
  __metadata87("design:type", typeof (_a75 = typeof Record !== "undefined" && Record) === "function" ? _a75 : Object)
], FooterContentDoc.prototype, "content", void 0);
FooterContentDoc = __decorate114([
  (0, import_mongoose70.Schema)({ timestamps: true })
], FooterContentDoc);
var FooterContentSchema = import_mongoose70.SchemaFactory.createForClass(FooterContentDoc);

// src/footer/repositories/footer.repository.ts
var __decorate115 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata88 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param51 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a76;
var FooterRepository = class FooterRepository2 {
  footerModel;
  constructor(footerModel) {
    this.footerModel = footerModel;
  }
  async get() {
    return this.footerModel.findOne().lean();
  }
  async replace(content) {
    return this.footerModel.findOneAndUpdate({}, { $set: { content } }, { new: true, upsert: true }).lean();
  }
};
FooterRepository = __decorate115([
  (0, import_common81.Injectable)(),
  __param51(0, (0, import_mongoose71.InjectModel)(FooterContentDoc.name)),
  __param51(0, (0, import_common81.Inject)(import_mongoose72.Model)),
  __metadata88("design:paramtypes", [typeof (_a76 = typeof import_mongoose72.Model !== "undefined" && import_mongoose72.Model) === "function" ? _a76 : Object])
], FooterRepository);

// src/footer/services/footer.service.ts
var __decorate116 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata89 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param52 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a77;
var DEFAULT_CONTENT = {
  description: "Building scalable web, mobile, AI and cloud solutions for startups, businesses and enterprises.",
  copyrightText: "AI Company Management Platform. All rights reserved.",
  socialLinks: [],
  sections: { company: [], services: [], legal: [] }
};
var FooterService = class FooterService2 {
  footerRepository;
  constructor(footerRepository) {
    this.footerRepository = footerRepository;
  }
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
FooterService = __decorate116([
  (0, import_common82.Injectable)(),
  __param52(0, (0, import_common82.Inject)(FooterRepository)),
  __metadata89("design:paramtypes", [typeof (_a77 = typeof FooterRepository !== "undefined" && FooterRepository) === "function" ? _a77 : Object])
], FooterService);

// src/footer/controllers/footer.controller.ts
var __decorate117 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata90 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param53 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a78;
var _b36;
var FooterController = class FooterController2 {
  footerService;
  constructor(footerService) {
    this.footerService = footerService;
  }
  getFooter() {
    return this.footerService.getFooter();
  }
  saveFooter(body) {
    return this.footerService.saveFooter(body);
  }
};
__decorate117([
  (0, import_common83.Get)(),
  __metadata90("design:type", Function),
  __metadata90("design:paramtypes", []),
  __metadata90("design:returntype", void 0)
], FooterController.prototype, "getFooter", null);
__decorate117([
  (0, import_common83.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  (0, import_common83.Put)(),
  __param53(0, (0, import_common83.Body)()),
  __metadata90("design:type", Function),
  __metadata90("design:paramtypes", [typeof (_b36 = typeof Record !== "undefined" && Record) === "function" ? _b36 : Object]),
  __metadata90("design:returntype", void 0)
], FooterController.prototype, "saveFooter", null);
FooterController = __decorate117([
  (0, import_common83.Controller)("footer"),
  __param53(0, (0, import_common83.Inject)(FooterService)),
  __metadata90("design:paramtypes", [typeof (_a78 = typeof FooterService !== "undefined" && FooterService) === "function" ? _a78 : Object])
], FooterController);

// src/footer/footer.module.ts
var __decorate118 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FooterModule = class FooterModule2 {
};
FooterModule = __decorate118([
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
var import_mongoose77 = require("@nestjs/mongoose");

// src/newsletter/newsletter.controller.ts
var import_common87 = require("@nestjs/common");

// src/newsletter/newsletter.service.ts
var import_common86 = require("@nestjs/common");

// src/newsletter/repositories/newsletter.repository.ts
var import_common85 = require("@nestjs/common");
var import_mongoose75 = require("@nestjs/mongoose");
var import_mongoose76 = require("mongoose");

// src/newsletter/schemas/newsletter-subscriber.schema.ts
var import_mongoose74 = require("@nestjs/mongoose");
var __decorate119 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata91 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NewsletterSubscriberDoc = class NewsletterSubscriberDoc2 {
  email;
  active;
};
__decorate119([
  (0, import_mongoose74.Prop)({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  }),
  __metadata91("design:type", String)
], NewsletterSubscriberDoc.prototype, "email", void 0);
__decorate119([
  (0, import_mongoose74.Prop)({
    type: Boolean,
    default: true
  }),
  __metadata91("design:type", Boolean)
], NewsletterSubscriberDoc.prototype, "active", void 0);
NewsletterSubscriberDoc = __decorate119([
  (0, import_mongoose74.Schema)({
    timestamps: true,
    collection: "newsletter_subscribers"
  })
], NewsletterSubscriberDoc);
var NewsletterSubscriberSchema = import_mongoose74.SchemaFactory.createForClass(NewsletterSubscriberDoc);

// src/newsletter/repositories/newsletter.repository.ts
var __decorate120 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata92 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param54 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a79;
var NewsletterRepository = class NewsletterRepository2 {
  model;
  constructor(model) {
    this.model = model;
  }
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
NewsletterRepository = __decorate120([
  (0, import_common85.Injectable)(),
  __param54(0, (0, import_mongoose75.InjectModel)(NewsletterSubscriberDoc.name)),
  __metadata92("design:paramtypes", [typeof (_a79 = typeof import_mongoose76.Model !== "undefined" && import_mongoose76.Model) === "function" ? _a79 : Object])
], NewsletterRepository);

// src/newsletter/newsletter.service.ts
var __decorate121 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata93 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param55 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a80;
var _b37;
var NewsletterService = class NewsletterService2 {
  mailService;
  newsletterRepository;
  constructor(mailService, newsletterRepository) {
    this.mailService = mailService;
    this.newsletterRepository = newsletterRepository;
  }
  async subscribe(email) {
    const normalized = email.toLowerCase().trim();
    const existing = await this.newsletterRepository.findByEmail(normalized);
    if (existing) {
      return {
        success: true,
        message: "You're already subscribed. Thanks for staying with us.",
        alreadySubscribed: true
      };
    }
    await this.newsletterRepository.create(normalized);
    try {
      await this.mailService.sendNewsletterSubscriptionNotification(normalized);
    } catch (error) {
      console.error("[NEWSLETTER] Notification email failed (subscriber saved):", error?.message ?? error);
    }
    return {
      success: true,
      message: "Thanks for subscribing! We'll keep you posted.",
      alreadySubscribed: false
    };
  }
};
NewsletterService = __decorate121([
  (0, import_common86.Injectable)(),
  __param55(0, (0, import_common86.Inject)(MailService)),
  __param55(1, (0, import_common86.Inject)(NewsletterRepository)),
  __metadata93("design:paramtypes", [typeof (_a80 = typeof MailService !== "undefined" && MailService) === "function" ? _a80 : Object, typeof (_b37 = typeof NewsletterRepository !== "undefined" && NewsletterRepository) === "function" ? _b37 : Object])
], NewsletterService);

// src/newsletter/dto/subscribe-newsletter.dto.ts
var import_class_validator25 = require("class-validator");
var __decorate122 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata94 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SubscribeNewsletterDto = class {
  email;
};
__decorate122([
  (0, import_class_validator25.IsEmail)({}, { message: "Please enter a valid email address." }),
  (0, import_class_validator25.IsNotEmpty)(),
  __metadata94("design:type", String)
], SubscribeNewsletterDto.prototype, "email", void 0);

// src/newsletter/newsletter.controller.ts
var __decorate123 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata95 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param56 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a81;
var _b38;
var NewsletterController = class NewsletterController2 {
  service;
  constructor(service) {
    this.service = service;
  }
  subscribe(dto) {
    console.log("[NEWSLETTER DEBUG v3] this.service is:", this.service, "| typeof:", typeof this.service);
    return this.service.subscribe(dto.email);
  }
};
__decorate123([
  (0, import_common87.Post)("subscribe"),
  __param56(0, (0, import_common87.Body)()),
  __metadata95("design:type", Function),
  __metadata95("design:paramtypes", [typeof (_b38 = typeof SubscribeNewsletterDto !== "undefined" && SubscribeNewsletterDto) === "function" ? _b38 : Object]),
  __metadata95("design:returntype", void 0)
], NewsletterController.prototype, "subscribe", null);
NewsletterController = __decorate123([
  (0, import_common87.Controller)("newsletter"),
  __param56(0, (0, import_common87.Inject)(NewsletterService)),
  __metadata95("design:paramtypes", [typeof (_a81 = typeof NewsletterService !== "undefined" && NewsletterService) === "function" ? _a81 : Object])
], NewsletterController);

// src/newsletter/newsletter.module.ts
var __decorate124 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NewsletterModule = class NewsletterModule2 {
};
NewsletterModule = __decorate124([
  (0, import_common88.Module)({
    imports: [
      MailModule,
      import_mongoose77.MongooseModule.forFeature([
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
var __decorate125 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata96 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param57 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a82;
var CalcomService = class CalcomService2 {
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
    const json = await this.calFetch(url.toString(), { method: "GET" }, "2024-09-04");
    if (json.status !== "success") {
      throw new import_common89.BadRequestException(json.error?.message || "Unable to load available slots from Cal.com");
    }
    const days = json.data ?? {};
    const slots = Object.entries(days).flatMap(([date, items]) => (items ?? []).map((item) => ({
      date,
      start: item.start
    })));
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
    const json = await this.calFetch(`${this.apiBase}/bookings`, {
      method: "POST",
      body: JSON.stringify(body)
    }, "2024-08-13");
    if (json.status !== "success") {
      throw new import_common89.BadRequestException(json.error?.message || "Cal.com could not create the booking. Please try another time.");
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
    if (!raw)
      return null;
    try {
      if (/^https?:\/\//i.test(raw)) {
        raw = new URL(raw).pathname.replace(/^\/+|\/+$/g, "");
      }
    } catch {
    }
    const parts = raw.replace(/\/embed$/i, "").replace(/^\/+|\/+$/g, "").toLowerCase().split("/").filter(Boolean);
    if (parts.length < 2)
      return null;
    return {
      username: parts[0],
      eventSlug: parts[1]
    };
  }
  assertConfigured() {
    if (!this.isConfigured()) {
      throw new import_common89.ServiceUnavailableException("Cal.com is not configured. Set CALCOM_LINK=username/event-slug in the API env.");
    }
  }
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
      throw new import_common89.ServiceUnavailableException("Unable to reach Cal.com. Please try again shortly.");
    }
    const text = await response.text();
    let json;
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      console.error("[CALCOM] Non-JSON response", response.status, text.slice(0, 300));
      throw new import_common89.ServiceUnavailableException("Unexpected response from Cal.com");
    }
    if (!response.ok) {
      const message = json?.error?.message || json?.message || `Cal.com request failed (${response.status})`;
      console.error("[CALCOM] Error", response.status, message);
      throw new import_common89.BadRequestException(message);
    }
    return json;
  }
};
CalcomService = __decorate125([
  (0, import_common89.Injectable)(),
  __param57(0, (0, import_common89.Inject)(import_config8.ConfigService)),
  __metadata96("design:paramtypes", [typeof (_a82 = typeof import_config8.ConfigService !== "undefined" && import_config8.ConfigService) === "function" ? _a82 : Object])
], CalcomService);

// src/calcom/dto/create-cal-booking.dto.ts
var import_class_validator26 = require("class-validator");
var __decorate126 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata97 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateCalBookingDto = class {
  start;
  name;
  email;
  timeZone;
  notes;
};
__decorate126([
  (0, import_class_validator26.IsString)(),
  (0, import_class_validator26.IsNotEmpty)(),
  __metadata97("design:type", String)
], CreateCalBookingDto.prototype, "start", void 0);
__decorate126([
  (0, import_class_validator26.IsString)(),
  (0, import_class_validator26.IsNotEmpty)(),
  __metadata97("design:type", String)
], CreateCalBookingDto.prototype, "name", void 0);
__decorate126([
  (0, import_class_validator26.IsEmail)(),
  (0, import_class_validator26.IsNotEmpty)(),
  __metadata97("design:type", String)
], CreateCalBookingDto.prototype, "email", void 0);
__decorate126([
  (0, import_class_validator26.IsString)(),
  (0, import_class_validator26.IsOptional)(),
  __metadata97("design:type", String)
], CreateCalBookingDto.prototype, "timeZone", void 0);
__decorate126([
  (0, import_class_validator26.IsString)(),
  (0, import_class_validator26.IsOptional)(),
  __metadata97("design:type", String)
], CreateCalBookingDto.prototype, "notes", void 0);

// src/calcom/dto/get-cal-slots.dto.ts
var import_class_validator27 = require("class-validator");
var __decorate127 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata98 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GetCalSlotsDto = class {
  start;
  end;
};
__decorate127([
  (0, import_class_validator27.IsString)(),
  (0, import_class_validator27.IsNotEmpty)(),
  (0, import_class_validator27.Matches)(/^\d{4}-\d{2}-\d{2}/, {
    message: "start must be a date (YYYY-MM-DD) or ISO datetime"
  }),
  __metadata98("design:type", String)
], GetCalSlotsDto.prototype, "start", void 0);
__decorate127([
  (0, import_class_validator27.IsString)(),
  (0, import_class_validator27.IsNotEmpty)(),
  (0, import_class_validator27.Matches)(/^\d{4}-\d{2}-\d{2}/, {
    message: "end must be a date (YYYY-MM-DD) or ISO datetime"
  }),
  __metadata98("design:type", String)
], GetCalSlotsDto.prototype, "end", void 0);

// src/calcom/calcom.controller.ts
var __decorate128 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata99 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param58 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a83;
var _b39;
var _c27;
var CalcomController = class CalcomController2 {
  calcomService;
  constructor(calcomService) {
    this.calcomService = calcomService;
  }
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
__decorate128([
  (0, import_common90.Get)("config"),
  __metadata99("design:type", Function),
  __metadata99("design:paramtypes", []),
  __metadata99("design:returntype", void 0)
], CalcomController.prototype, "getConfig", null);
__decorate128([
  (0, import_common90.Get)("slots"),
  __param58(0, (0, import_common90.Query)()),
  __metadata99("design:type", Function),
  __metadata99("design:paramtypes", [typeof (_b39 = typeof GetCalSlotsDto !== "undefined" && GetCalSlotsDto) === "function" ? _b39 : Object]),
  __metadata99("design:returntype", void 0)
], CalcomController.prototype, "getSlots", null);
__decorate128([
  (0, import_common90.Post)("bookings"),
  __param58(0, (0, import_common90.Body)()),
  __metadata99("design:type", Function),
  __metadata99("design:paramtypes", [typeof (_c27 = typeof CreateCalBookingDto !== "undefined" && CreateCalBookingDto) === "function" ? _c27 : Object]),
  __metadata99("design:returntype", void 0)
], CalcomController.prototype, "createBooking", null);
CalcomController = __decorate128([
  (0, import_common90.Controller)("calcom"),
  __param58(0, (0, import_common90.Inject)(CalcomService)),
  __metadata99("design:paramtypes", [typeof (_a83 = typeof CalcomService !== "undefined" && CalcomService) === "function" ? _a83 : Object])
], CalcomController);

// src/calcom/calcom.module.ts
var __decorate129 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CalcomModule = class CalcomModule2 {
};
CalcomModule = __decorate129([
  (0, import_common91.Module)({
    controllers: [CalcomController],
    providers: [CalcomService],
    exports: [CalcomService]
  })
], CalcomModule);

// src/tutorial/tutorial.module.ts
var import_common107 = require("@nestjs/common");
var import_mongoose105 = require("@nestjs/mongoose");

// src/tutorial/schemas/course.schema.ts
var import_mongoose78 = require("@nestjs/mongoose");
var import_mongoose79 = require("mongoose");
var __decorate130 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata100 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a84;
var CourseVideo = class CourseVideo2 {
  _id;
  title;
  description;
  videoUrl;
  durationMinutes;
  coinCost;
  order;
};
__decorate130([
  (0, import_mongoose78.Prop)({ type: String, required: true, trim: true }),
  __metadata100("design:type", String)
], CourseVideo.prototype, "title", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: String, default: "", trim: true }),
  __metadata100("design:type", String)
], CourseVideo.prototype, "description", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: String, required: true }),
  __metadata100("design:type", String)
], CourseVideo.prototype, "videoUrl", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: Number, required: true, default: 0 }),
  __metadata100("design:type", Number)
], CourseVideo.prototype, "durationMinutes", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: Number, required: true, default: 0, min: 0 }),
  __metadata100("design:type", Number)
], CourseVideo.prototype, "coinCost", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: Number, required: true, default: 0 }),
  __metadata100("design:type", Number)
], CourseVideo.prototype, "order", void 0);
CourseVideo = __decorate130([
  (0, import_mongoose78.Schema)({ _id: true, timestamps: false })
], CourseVideo);
var CourseVideoSchema = import_mongoose78.SchemaFactory.createForClass(CourseVideo);
var Course = class Course2 {
  title;
  description;
  thumbnailUrl;
  priceLabel;
  coinsIncluded;
  videos;
  isPublished;
  createdBy;
};
__decorate130([
  (0, import_mongoose78.Prop)({ type: String, required: true, trim: true }),
  __metadata100("design:type", String)
], Course.prototype, "title", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: String, default: "", trim: true }),
  __metadata100("design:type", String)
], Course.prototype, "description", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: String, default: "" }),
  __metadata100("design:type", String)
], Course.prototype, "thumbnailUrl", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: String, default: "" }),
  __metadata100("design:type", String)
], Course.prototype, "priceLabel", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: Number, default: 0, min: 0 }),
  __metadata100("design:type", Number)
], Course.prototype, "coinsIncluded", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: [CourseVideoSchema], default: [] }),
  __metadata100("design:type", Array)
], Course.prototype, "videos", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: Boolean, default: false }),
  __metadata100("design:type", Boolean)
], Course.prototype, "isPublished", void 0);
__decorate130([
  (0, import_mongoose78.Prop)({ type: import_mongoose79.Types.ObjectId, ref: "User" }),
  __metadata100("design:type", typeof (_a84 = typeof import_mongoose79.Types !== "undefined" && import_mongoose79.Types.ObjectId) === "function" ? _a84 : Object)
], Course.prototype, "createdBy", void 0);
Course = __decorate130([
  (0, import_mongoose78.Schema)({ timestamps: true })
], Course);
var CourseSchema = import_mongoose78.SchemaFactory.createForClass(Course);

// src/tutorial/schemas/enrollment.schema.ts
var import_mongoose80 = require("@nestjs/mongoose");
var import_mongoose81 = require("mongoose");

// src/tutorial/enums/enrollment-status.enum.ts
var EnrollmentStatus;
(function(EnrollmentStatus2) {
  EnrollmentStatus2["PENDING"] = "PENDING";
  EnrollmentStatus2["ACTIVE"] = "ACTIVE";
  EnrollmentStatus2["REJECTED"] = "REJECTED";
})(EnrollmentStatus || (EnrollmentStatus = {}));

// src/tutorial/schemas/enrollment.schema.ts
var __decorate131 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata101 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a85;
var _b40;
var _c28;
var Enrollment = class Enrollment2 {
  user;
  course;
  status;
  approvedAt;
};
__decorate131([
  (0, import_mongoose80.Prop)({ type: import_mongoose81.Types.ObjectId, ref: "User", required: true }),
  __metadata101("design:type", typeof (_a85 = typeof import_mongoose81.Types !== "undefined" && import_mongoose81.Types.ObjectId) === "function" ? _a85 : Object)
], Enrollment.prototype, "user", void 0);
__decorate131([
  (0, import_mongoose80.Prop)({ type: import_mongoose81.Types.ObjectId, ref: "Course", required: true }),
  __metadata101("design:type", typeof (_b40 = typeof import_mongoose81.Types !== "undefined" && import_mongoose81.Types.ObjectId) === "function" ? _b40 : Object)
], Enrollment.prototype, "course", void 0);
__decorate131([
  (0, import_mongoose80.Prop)({
    type: String,
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING
  }),
  __metadata101("design:type", typeof (_c28 = typeof EnrollmentStatus !== "undefined" && EnrollmentStatus) === "function" ? _c28 : Object)
], Enrollment.prototype, "status", void 0);
__decorate131([
  (0, import_mongoose80.Prop)({ type: Date, default: null }),
  __metadata101("design:type", Object)
], Enrollment.prototype, "approvedAt", void 0);
Enrollment = __decorate131([
  (0, import_mongoose80.Schema)({ timestamps: true })
], Enrollment);
var EnrollmentSchema = import_mongoose80.SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// src/tutorial/schemas/wallet.schema.ts
var import_mongoose82 = require("@nestjs/mongoose");
var import_mongoose83 = require("mongoose");
var __decorate132 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata102 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a86;
var Wallet = class Wallet2 {
  user;
  balance;
};
__decorate132([
  (0, import_mongoose82.Prop)({
    type: import_mongoose83.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  }),
  __metadata102("design:type", typeof (_a86 = typeof import_mongoose83.Types !== "undefined" && import_mongoose83.Types.ObjectId) === "function" ? _a86 : Object)
], Wallet.prototype, "user", void 0);
__decorate132([
  (0, import_mongoose82.Prop)({ type: Number, required: true, default: 0, min: 0 }),
  __metadata102("design:type", Number)
], Wallet.prototype, "balance", void 0);
Wallet = __decorate132([
  (0, import_mongoose82.Schema)({ timestamps: true })
], Wallet);
var WalletSchema = import_mongoose82.SchemaFactory.createForClass(Wallet);

// src/tutorial/schemas/coin-transaction.schema.ts
var import_mongoose84 = require("@nestjs/mongoose");
var import_mongoose85 = require("mongoose");
var __decorate133 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata103 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a87;
var _b41;
var CoinTransactionType;
(function(CoinTransactionType2) {
  CoinTransactionType2["CREDIT"] = "CREDIT";
  CoinTransactionType2["DEBIT"] = "DEBIT";
})(CoinTransactionType || (CoinTransactionType = {}));
var CoinTransaction = class CoinTransaction2 {
  user;
  type;
  amount;
  reason;
  meta;
};
__decorate133([
  (0, import_mongoose84.Prop)({ type: import_mongoose85.Types.ObjectId, ref: "User", required: true }),
  __metadata103("design:type", typeof (_a87 = typeof import_mongoose85.Types !== "undefined" && import_mongoose85.Types.ObjectId) === "function" ? _a87 : Object)
], CoinTransaction.prototype, "user", void 0);
__decorate133([
  (0, import_mongoose84.Prop)({
    type: String,
    enum: CoinTransactionType,
    required: true
  }),
  __metadata103("design:type", String)
], CoinTransaction.prototype, "type", void 0);
__decorate133([
  (0, import_mongoose84.Prop)({ type: Number, required: true, min: 1 }),
  __metadata103("design:type", Number)
], CoinTransaction.prototype, "amount", void 0);
__decorate133([
  (0, import_mongoose84.Prop)({ type: String, default: "" }),
  __metadata103("design:type", String)
], CoinTransaction.prototype, "reason", void 0);
__decorate133([
  (0, import_mongoose84.Prop)({ type: Object, default: {} }),
  __metadata103("design:type", typeof (_b41 = typeof Record !== "undefined" && Record) === "function" ? _b41 : Object)
], CoinTransaction.prototype, "meta", void 0);
CoinTransaction = __decorate133([
  (0, import_mongoose84.Schema)({ timestamps: true })
], CoinTransaction);
var CoinTransactionSchema = import_mongoose84.SchemaFactory.createForClass(CoinTransaction);

// src/tutorial/schemas/payment-request.schema.ts
var import_mongoose86 = require("@nestjs/mongoose");
var import_mongoose87 = require("mongoose");

// src/tutorial/enums/payment-request.enum.ts
var PaymentRequestStatus;
(function(PaymentRequestStatus2) {
  PaymentRequestStatus2["PENDING"] = "PENDING";
  PaymentRequestStatus2["APPROVED"] = "APPROVED";
  PaymentRequestStatus2["REJECTED"] = "REJECTED";
})(PaymentRequestStatus || (PaymentRequestStatus = {}));
var PaymentRequestType;
(function(PaymentRequestType2) {
  PaymentRequestType2["ENROLLMENT"] = "ENROLLMENT";
  PaymentRequestType2["TOPUP"] = "TOPUP";
})(PaymentRequestType || (PaymentRequestType = {}));

// src/tutorial/schemas/payment-request.schema.ts
var __decorate134 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata104 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a88;
var _b42;
var _d23;
var PaymentRequest = class PaymentRequest2 {
  user;
  type;
  course;
  coinsRequested;
  coinsGranted;
  note;
  proofUrl;
  proofPublicId;
  status;
  reviewedBy;
  reviewedAt;
  reviewNote;
  rejectionReason;
};
__decorate134([
  (0, import_mongoose86.Prop)({ type: import_mongoose87.Types.ObjectId, ref: "User", required: true }),
  __metadata104("design:type", typeof (_a88 = typeof import_mongoose87.Types !== "undefined" && import_mongoose87.Types.ObjectId) === "function" ? _a88 : Object)
], PaymentRequest.prototype, "user", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({
    type: String,
    enum: PaymentRequestType,
    required: true
  }),
  __metadata104("design:type", typeof (_b42 = typeof PaymentRequestType !== "undefined" && PaymentRequestType) === "function" ? _b42 : Object)
], PaymentRequest.prototype, "type", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: import_mongoose87.Types.ObjectId, ref: "Course", default: null }),
  __metadata104("design:type", Object)
], PaymentRequest.prototype, "course", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: Number, default: null }),
  __metadata104("design:type", Object)
], PaymentRequest.prototype, "coinsRequested", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: Number, default: null }),
  __metadata104("design:type", Object)
], PaymentRequest.prototype, "coinsGranted", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: String, default: "" }),
  __metadata104("design:type", String)
], PaymentRequest.prototype, "note", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: String, required: true }),
  __metadata104("design:type", String)
], PaymentRequest.prototype, "proofUrl", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: String, default: "" }),
  __metadata104("design:type", String)
], PaymentRequest.prototype, "proofPublicId", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({
    type: String,
    enum: PaymentRequestStatus,
    default: PaymentRequestStatus.PENDING
  }),
  __metadata104("design:type", typeof (_d23 = typeof PaymentRequestStatus !== "undefined" && PaymentRequestStatus) === "function" ? _d23 : Object)
], PaymentRequest.prototype, "status", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: import_mongoose87.Types.ObjectId, ref: "User", default: null }),
  __metadata104("design:type", Object)
], PaymentRequest.prototype, "reviewedBy", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: Date, default: null }),
  __metadata104("design:type", Object)
], PaymentRequest.prototype, "reviewedAt", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: String, default: "" }),
  __metadata104("design:type", String)
], PaymentRequest.prototype, "reviewNote", void 0);
__decorate134([
  (0, import_mongoose86.Prop)({ type: String, default: "" }),
  __metadata104("design:type", String)
], PaymentRequest.prototype, "rejectionReason", void 0);
PaymentRequest = __decorate134([
  (0, import_mongoose86.Schema)({ timestamps: true })
], PaymentRequest);
var PaymentRequestSchema = import_mongoose86.SchemaFactory.createForClass(PaymentRequest);
PaymentRequestSchema.index({ status: 1, type: 1, createdAt: -1 });
PaymentRequestSchema.index({ user: 1, createdAt: -1 });

// src/tutorial/schemas/video-access.schema.ts
var import_mongoose88 = require("@nestjs/mongoose");
var import_mongoose89 = require("mongoose");
var __decorate135 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata105 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a89;
var _b43;
var VideoAccess = class VideoAccess2 {
  user;
  course;
  videoId;
  coinsSpent;
};
__decorate135([
  (0, import_mongoose88.Prop)({ type: import_mongoose89.Types.ObjectId, ref: "User", required: true }),
  __metadata105("design:type", typeof (_a89 = typeof import_mongoose89.Types !== "undefined" && import_mongoose89.Types.ObjectId) === "function" ? _a89 : Object)
], VideoAccess.prototype, "user", void 0);
__decorate135([
  (0, import_mongoose88.Prop)({ type: import_mongoose89.Types.ObjectId, ref: "Course", required: true }),
  __metadata105("design:type", typeof (_b43 = typeof import_mongoose89.Types !== "undefined" && import_mongoose89.Types.ObjectId) === "function" ? _b43 : Object)
], VideoAccess.prototype, "course", void 0);
__decorate135([
  (0, import_mongoose88.Prop)({ type: String, required: true }),
  __metadata105("design:type", String)
], VideoAccess.prototype, "videoId", void 0);
__decorate135([
  (0, import_mongoose88.Prop)({ type: Number, required: true, default: 0 }),
  __metadata105("design:type", Number)
], VideoAccess.prototype, "coinsSpent", void 0);
VideoAccess = __decorate135([
  (0, import_mongoose88.Schema)({ timestamps: true })
], VideoAccess);
var VideoAccessSchema = import_mongoose88.SchemaFactory.createForClass(VideoAccess);
VideoAccessSchema.index({ user: 1, videoId: 1 }, { unique: true });

// src/tutorial/schemas/payment-settings.schema.ts
var import_mongoose90 = require("@nestjs/mongoose");
var __decorate136 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata106 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentSettings = class PaymentSettings2 {
  qrCodeUrl;
  accountTitle;
  accountNumber;
  bankName;
  instructions;
};
__decorate136([
  (0, import_mongoose90.Prop)({ type: String, default: "" }),
  __metadata106("design:type", String)
], PaymentSettings.prototype, "qrCodeUrl", void 0);
__decorate136([
  (0, import_mongoose90.Prop)({ type: String, default: "" }),
  __metadata106("design:type", String)
], PaymentSettings.prototype, "accountTitle", void 0);
__decorate136([
  (0, import_mongoose90.Prop)({ type: String, default: "" }),
  __metadata106("design:type", String)
], PaymentSettings.prototype, "accountNumber", void 0);
__decorate136([
  (0, import_mongoose90.Prop)({ type: String, default: "" }),
  __metadata106("design:type", String)
], PaymentSettings.prototype, "bankName", void 0);
__decorate136([
  (0, import_mongoose90.Prop)({ type: String, default: "" }),
  __metadata106("design:type", String)
], PaymentSettings.prototype, "instructions", void 0);
PaymentSettings = __decorate136([
  (0, import_mongoose90.Schema)({ timestamps: true })
], PaymentSettings);
var PaymentSettingsSchema = import_mongoose90.SchemaFactory.createForClass(PaymentSettings);

// src/tutorial/repositories/courses.repository.ts
var import_common92 = require("@nestjs/common");
var import_mongoose91 = require("@nestjs/mongoose");
var import_mongoose92 = require("mongoose");
var __decorate137 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata107 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param59 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a90;
var CoursesRepository = class CoursesRepository2 {
  courseModel;
  constructor(courseModel) {
    this.courseModel = courseModel;
  }
  async create(data) {
    return this.courseModel.create(data);
  }
  async findAll() {
    return this.courseModel.find().sort({ createdAt: -1 }).exec();
  }
  async findPublished() {
    return this.courseModel.find({ isPublished: true }).sort({ createdAt: -1 }).exec();
  }
  async findById(id) {
    if (!import_mongoose92.Types.ObjectId.isValid(id))
      return null;
    return this.courseModel.findById(id).exec();
  }
  async update(id, data) {
    return this.courseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  async remove(id) {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
  async addVideo(id, video) {
    return this.courseModel.findByIdAndUpdate(id, { $push: { videos: video } }, { new: true }).exec();
  }
  async updateVideo(id, videoId, data) {
    const set = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== void 0) {
        set[`videos.$.${key}`] = value;
      }
    }
    return this.courseModel.findOneAndUpdate({ _id: id, "videos._id": videoId }, { $set: set }, { new: true }).exec();
  }
  async removeVideo(id, videoId) {
    return this.courseModel.findByIdAndUpdate(id, { $pull: { videos: { _id: videoId } } }, { new: true }).exec();
  }
};
CoursesRepository = __decorate137([
  (0, import_common92.Injectable)(),
  __param59(0, (0, import_mongoose91.InjectModel)(Course.name)),
  __metadata107("design:paramtypes", [typeof (_a90 = typeof import_mongoose92.Model !== "undefined" && import_mongoose92.Model) === "function" ? _a90 : Object])
], CoursesRepository);

// src/tutorial/repositories/enrollments.repository.ts
var import_common93 = require("@nestjs/common");
var import_mongoose93 = require("@nestjs/mongoose");
var import_mongoose94 = require("mongoose");
var __decorate138 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata108 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param60 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a91;
var EnrollmentsRepository = class EnrollmentsRepository2 {
  enrollmentModel;
  constructor(enrollmentModel) {
    this.enrollmentModel = enrollmentModel;
  }
  async findOne(userId, courseId) {
    return this.enrollmentModel.findOne({ user: userId, course: courseId }).exec();
  }
  async upsertPending(userId, courseId) {
    return this.enrollmentModel.findOneAndUpdate({ user: userId, course: courseId }, {
      $setOnInsert: {
        user: userId,
        course: courseId,
        status: EnrollmentStatus.PENDING
      }
    }, { upsert: true, new: true }).exec();
  }
  async setStatus(userId, courseId, status) {
    const approvedAt = status === EnrollmentStatus.ACTIVE ? /* @__PURE__ */ new Date() : null;
    return this.enrollmentModel.findOneAndUpdate({ user: userId, course: courseId }, { $set: { status, approvedAt } }, { new: true, upsert: true }).exec();
  }
  async findActiveForUser(userId) {
    return this.enrollmentModel.find({ user: userId, status: EnrollmentStatus.ACTIVE }).populate("course").sort({ approvedAt: -1 }).exec();
  }
};
EnrollmentsRepository = __decorate138([
  (0, import_common93.Injectable)(),
  __param60(0, (0, import_mongoose93.InjectModel)(Enrollment.name)),
  __metadata108("design:paramtypes", [typeof (_a91 = typeof import_mongoose94.Model !== "undefined" && import_mongoose94.Model) === "function" ? _a91 : Object])
], EnrollmentsRepository);

// src/tutorial/repositories/wallets.repository.ts
var import_common94 = require("@nestjs/common");
var import_mongoose95 = require("@nestjs/mongoose");
var import_mongoose96 = require("mongoose");
var __decorate139 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata109 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param61 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a92;
var WalletsRepository = class WalletsRepository2 {
  walletModel;
  constructor(walletModel) {
    this.walletModel = walletModel;
  }
  async findOrCreate(userId) {
    return this.walletModel.findOneAndUpdate({ user: userId }, { $setOnInsert: { user: userId, balance: 0 } }, { upsert: true, new: true }).exec();
  }
  async incrementBalance(userId, delta) {
    return this.walletModel.findOneAndUpdate({ user: userId }, { $inc: { balance: delta } }, { upsert: true, new: true }).exec();
  }
  async debitIfSufficient(userId, amount) {
    return this.walletModel.findOneAndUpdate({ user: userId, balance: { $gte: amount } }, { $inc: { balance: -amount } }, { new: true }).exec();
  }
};
WalletsRepository = __decorate139([
  (0, import_common94.Injectable)(),
  __param61(0, (0, import_mongoose95.InjectModel)(Wallet.name)),
  __metadata109("design:paramtypes", [typeof (_a92 = typeof import_mongoose96.Model !== "undefined" && import_mongoose96.Model) === "function" ? _a92 : Object])
], WalletsRepository);

// src/tutorial/repositories/coin-transactions.repository.ts
var import_common95 = require("@nestjs/common");
var import_mongoose97 = require("@nestjs/mongoose");
var import_mongoose98 = require("mongoose");
var __decorate140 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata110 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param62 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a93;
var CoinTransactionsRepository = class CoinTransactionsRepository2 {
  coinTransactionModel;
  constructor(coinTransactionModel) {
    this.coinTransactionModel = coinTransactionModel;
  }
  async create(data) {
    return this.coinTransactionModel.create(data);
  }
  async findForUser(userId, limit = 50) {
    return this.coinTransactionModel.find({ user: userId }).sort({ createdAt: -1 }).limit(limit).exec();
  }
};
CoinTransactionsRepository = __decorate140([
  (0, import_common95.Injectable)(),
  __param62(0, (0, import_mongoose97.InjectModel)(CoinTransaction.name)),
  __metadata110("design:paramtypes", [typeof (_a93 = typeof import_mongoose98.Model !== "undefined" && import_mongoose98.Model) === "function" ? _a93 : Object])
], CoinTransactionsRepository);

// src/tutorial/repositories/payment-requests.repository.ts
var import_common96 = require("@nestjs/common");
var import_mongoose99 = require("@nestjs/mongoose");
var import_mongoose100 = require("mongoose");
var __decorate141 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata111 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param63 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a94;
var PaymentRequestsRepository = class PaymentRequestsRepository2 {
  paymentRequestModel;
  constructor(paymentRequestModel) {
    this.paymentRequestModel = paymentRequestModel;
  }
  async create(data) {
    return this.paymentRequestModel.create(data);
  }
  async findById(id) {
    if (!import_mongoose100.Types.ObjectId.isValid(id))
      return null;
    return this.paymentRequestModel.findById(id).exec();
  }
  async findPendingForUserAndCourse(userId, courseId) {
    return this.paymentRequestModel.findOne({
      user: userId,
      course: courseId,
      type: PaymentRequestType.ENROLLMENT,
      status: PaymentRequestStatus.PENDING
    }).exec();
  }
  async findAllForUser(userId) {
    return this.paymentRequestModel.find({ user: userId }).populate("course").sort({ createdAt: -1 }).exec();
  }
  async findForAdmin(filter) {
    const query = {};
    if (filter.status)
      query.status = filter.status;
    if (filter.type)
      query.type = filter.type;
    return this.paymentRequestModel.find(query).populate("user", "firstName lastName email").populate("course", "title thumbnailUrl coinsIncluded").sort({ createdAt: -1 }).exec();
  }
};
PaymentRequestsRepository = __decorate141([
  (0, import_common96.Injectable)(),
  __param63(0, (0, import_mongoose99.InjectModel)(PaymentRequest.name)),
  __metadata111("design:paramtypes", [typeof (_a94 = typeof import_mongoose100.Model !== "undefined" && import_mongoose100.Model) === "function" ? _a94 : Object])
], PaymentRequestsRepository);

// src/tutorial/repositories/video-access.repository.ts
var import_common97 = require("@nestjs/common");
var import_mongoose101 = require("@nestjs/mongoose");
var import_mongoose102 = require("mongoose");
var __decorate142 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata112 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param64 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a95;
var VideoAccessRepository = class VideoAccessRepository2 {
  videoAccessModel;
  constructor(videoAccessModel) {
    this.videoAccessModel = videoAccessModel;
  }
  async findOne(userId, videoId) {
    return this.videoAccessModel.findOne({ user: userId, videoId }).exec();
  }
  async findAllForUserAndCourse(userId, courseId) {
    return this.videoAccessModel.find({ user: userId, course: courseId }).exec();
  }
  async create(data) {
    return this.videoAccessModel.create(data);
  }
};
VideoAccessRepository = __decorate142([
  (0, import_common97.Injectable)(),
  __param64(0, (0, import_mongoose101.InjectModel)(VideoAccess.name)),
  __metadata112("design:paramtypes", [typeof (_a95 = typeof import_mongoose102.Model !== "undefined" && import_mongoose102.Model) === "function" ? _a95 : Object])
], VideoAccessRepository);

// src/tutorial/repositories/payment-settings.repository.ts
var import_common98 = require("@nestjs/common");
var import_mongoose103 = require("@nestjs/mongoose");
var import_mongoose104 = require("mongoose");
var __decorate143 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata113 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param65 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a96;
var PaymentSettingsRepository = class PaymentSettingsRepository2 {
  paymentSettingsModel;
  constructor(paymentSettingsModel) {
    this.paymentSettingsModel = paymentSettingsModel;
  }
  async getOrCreate() {
    return this.paymentSettingsModel.findOneAndUpdate({}, { $setOnInsert: {} }, { upsert: true, new: true }).exec();
  }
  async update(data) {
    return this.paymentSettingsModel.findOneAndUpdate({}, { $set: data }, { upsert: true, new: true }).exec();
  }
};
PaymentSettingsRepository = __decorate143([
  (0, import_common98.Injectable)(),
  __param65(0, (0, import_mongoose103.InjectModel)(PaymentSettings.name)),
  __metadata113("design:paramtypes", [typeof (_a96 = typeof import_mongoose104.Model !== "undefined" && import_mongoose104.Model) === "function" ? _a96 : Object])
], PaymentSettingsRepository);

// src/tutorial/services/courses.service.ts
var import_common99 = require("@nestjs/common");
var __decorate144 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata114 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a97;
var CoursesService = class CoursesService2 {
  coursesRepository;
  constructor(coursesRepository) {
    this.coursesRepository = coursesRepository;
  }
  async listPublished() {
    const courses = await this.coursesRepository.findPublished();
    return {
      success: true,
      data: courses.map((course) => this.toPublicSummary(course))
    };
  }
  async getPublishedOrThrow(id) {
    const course = await this.coursesRepository.findById(id);
    if (!course || !course.isPublished) {
      throw new import_common99.NotFoundException("Course not found.");
    }
    return course;
  }
  async getByIdOrThrow(id) {
    const course = await this.coursesRepository.findById(id);
    if (!course) {
      throw new import_common99.NotFoundException("Course not found.");
    }
    return course;
  }
  findVideoOrThrow(course, videoId) {
    const video = course.videos.find((item) => String(item._id) === String(videoId));
    if (!video) {
      throw new import_common99.NotFoundException("Lecture not found.");
    }
    return video;
  }
  async listAllForAdmin() {
    const courses = await this.coursesRepository.findAll();
    return {
      success: true,
      data: courses
    };
  }
  async create(dto, adminId) {
    const course = await this.coursesRepository.create({
      ...dto,
      videos: [],
      createdBy: adminId
    });
    return {
      success: true,
      message: "Course created.",
      data: course
    };
  }
  async update(id, dto) {
    const course = await this.coursesRepository.update(id, dto);
    if (!course) {
      throw new import_common99.NotFoundException("Course not found.");
    }
    return {
      success: true,
      message: "Course updated.",
      data: course
    };
  }
  async remove(id) {
    const course = await this.coursesRepository.remove(id);
    if (!course) {
      throw new import_common99.NotFoundException("Course not found.");
    }
    return {
      success: true,
      message: "Course deleted."
    };
  }
  async addVideo(id, dto) {
    const existing = await this.getByIdOrThrow(id);
    const order = dto.order ?? existing.videos.reduce((max, video) => Math.max(max, video.order), 0) + 1;
    const course = await this.coursesRepository.addVideo(id, {
      ...dto,
      order
    });
    if (!course) {
      throw new import_common99.NotFoundException("Course not found.");
    }
    return {
      success: true,
      message: "Lecture added.",
      data: course
    };
  }
  async updateVideo(id, videoId, dto) {
    const course = await this.coursesRepository.updateVideo(id, videoId, dto);
    if (!course) {
      throw new import_common99.NotFoundException("Course or lecture not found.");
    }
    return {
      success: true,
      message: "Lecture updated.",
      data: course
    };
  }
  async removeVideo(id, videoId) {
    const course = await this.coursesRepository.removeVideo(id, videoId);
    if (!course) {
      throw new import_common99.NotFoundException("Course not found.");
    }
    return {
      success: true,
      message: "Lecture removed.",
      data: course
    };
  }
  toPublicSummary(course) {
    return {
      id: String(course._id),
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      priceLabel: course.priceLabel,
      coinsIncluded: course.coinsIncluded,
      videosCount: course.videos.length,
      freePreviewCount: course.videos.filter((video) => video.coinCost === 0).length
    };
  }
};
CoursesService = __decorate144([
  (0, import_common99.Injectable)(),
  __metadata114("design:paramtypes", [typeof (_a97 = typeof CoursesRepository !== "undefined" && CoursesRepository) === "function" ? _a97 : Object])
], CoursesService);

// src/tutorial/services/wallet.service.ts
var import_common100 = require("@nestjs/common");
var __decorate145 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata115 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a98;
var _b44;
var WalletService = class WalletService2 {
  walletsRepository;
  coinTransactionsRepository;
  constructor(walletsRepository, coinTransactionsRepository) {
    this.walletsRepository = walletsRepository;
    this.coinTransactionsRepository = coinTransactionsRepository;
  }
  async getWallet(userId) {
    const wallet = await this.walletsRepository.findOrCreate(userId);
    const transactions = await this.coinTransactionsRepository.findForUser(userId);
    return {
      success: true,
      data: {
        balance: wallet.balance,
        transactions
      }
    };
  }
  async credit(userId, amount, reason, meta = {}) {
    if (amount <= 0)
      return;
    await this.walletsRepository.incrementBalance(userId, amount);
    await this.coinTransactionsRepository.create({
      user: userId,
      type: CoinTransactionType.CREDIT,
      amount,
      reason,
      meta
    });
  }
  async debit(userId, amount, reason, meta = {}) {
    if (amount <= 0)
      return;
    const wallet = await this.walletsRepository.debitIfSufficient(userId, amount);
    if (!wallet) {
      throw new import_common100.BadRequestException("Not enough coins. Top up your wallet to continue.");
    }
    await this.coinTransactionsRepository.create({
      user: userId,
      type: CoinTransactionType.DEBIT,
      amount,
      reason,
      meta
    });
  }
};
WalletService = __decorate145([
  (0, import_common100.Injectable)(),
  __metadata115("design:paramtypes", [typeof (_a98 = typeof WalletsRepository !== "undefined" && WalletsRepository) === "function" ? _a98 : Object, typeof (_b44 = typeof CoinTransactionsRepository !== "undefined" && CoinTransactionsRepository) === "function" ? _b44 : Object])
], WalletService);

// src/tutorial/services/tutorials-auth.service.ts
var import_common101 = require("@nestjs/common");
var bcrypt3 = __toESM(require("bcrypt"));

// src/tutorial/utils/generate-password.ts
var import_crypto2 = require("crypto");
var CHARSET = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
function generateTemporaryPassword(length = 10) {
  const bytes = (0, import_crypto2.randomBytes)(length);
  let password = "";
  for (let i = 0; i < length; i++) {
    password += CHARSET[bytes[i] % CHARSET.length];
  }
  return `${password}9Aa`;
}

// src/tutorial/services/tutorials-auth.service.ts
var __decorate146 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata116 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a99;
var _b45;
var TutorialsAuthService = class TutorialsAuthService2 {
  usersService;
  mailService;
  constructor(usersService, mailService) {
    this.usersService = usersService;
    this.mailService = mailService;
  }
  async register(dto) {
    const exists = await this.usersService.existsByEmail(dto.email);
    if (exists) {
      throw new import_common101.BadRequestException("An account with this email already exists.");
    }
    const temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await bcrypt3.hash(temporaryPassword, 10);
    const user = await this.usersService.createUser({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone ?? "",
      password: hashedPassword,
      role: Role.STUDENT,
      isVerified: false,
      mustChangePassword: true
    });
    try {
      await this.mailService.sendWelcomeEmail(user, temporaryPassword);
    } catch {
    }
    return {
      success: true,
      message: "Registration submitted. Check your email for your login password \u2014 you'll be asked to set a new one on first login.",
      data: {
        email: user.email
      }
    };
  }
};
TutorialsAuthService = __decorate146([
  (0, import_common101.Injectable)(),
  __metadata116("design:paramtypes", [typeof (_a99 = typeof UsersService !== "undefined" && UsersService) === "function" ? _a99 : Object, typeof (_b45 = typeof MailService !== "undefined" && MailService) === "function" ? _b45 : Object])
], TutorialsAuthService);

// src/tutorial/services/enrollment.service.ts
var import_common102 = require("@nestjs/common");
var __decorate147 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata117 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a100;
var _b46;
var _c29;
var _d24;
var _e14;
var _f9;
var PROOF_FOLDER = "company-management/tutorials/payment-proofs";
var EnrollmentService = class EnrollmentService2 {
  coursesService;
  walletService;
  enrollmentsRepository;
  paymentRequestsRepository;
  videoAccessRepository;
  cloudinary;
  constructor(coursesService, walletService, enrollmentsRepository, paymentRequestsRepository, videoAccessRepository, cloudinary2) {
    this.coursesService = coursesService;
    this.walletService = walletService;
    this.enrollmentsRepository = enrollmentsRepository;
    this.paymentRequestsRepository = paymentRequestsRepository;
    this.videoAccessRepository = videoAccessRepository;
    this.cloudinary = cloudinary2;
  }
  async courseDetail(userId, courseId) {
    const course = await this.coursesService.getPublishedOrThrow(courseId);
    const enrollment = await this.enrollmentsRepository.findOne(userId, courseId);
    const isActive = enrollment?.status === EnrollmentStatus.ACTIVE;
    let unlockedVideoIds = /* @__PURE__ */ new Set();
    if (isActive) {
      const access = await this.videoAccessRepository.findAllForUserAndCourse(userId, courseId);
      unlockedVideoIds = new Set(access.map((a) => a.videoId));
    }
    const videos = [...course.videos].sort((a, b) => a.order - b.order).map((video) => {
      const unlocked = isActive && (video.coinCost === 0 || unlockedVideoIds.has(String(video._id)));
      return {
        id: String(video._id),
        title: video.title,
        durationMinutes: video.durationMinutes,
        coinCost: video.coinCost,
        order: video.order,
        description: isActive ? video.description : void 0,
        videoUrl: unlocked ? video.videoUrl : null,
        unlocked: isActive ? unlocked : false
      };
    });
    return {
      id: String(course._id),
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      priceLabel: course.priceLabel,
      coinsIncluded: course.coinsIncluded,
      enrollmentStatus: enrollment?.status ?? "NONE",
      videos
    };
  }
  async requestEnrollment(userId, courseId, file, note) {
    if (!file) {
      throw new import_common102.BadRequestException("Please attach your payment proof (screenshot or PDF).");
    }
    const course = await this.coursesService.getPublishedOrThrow(courseId);
    const existingEnrollment = await this.enrollmentsRepository.findOne(userId, courseId);
    if (existingEnrollment?.status === EnrollmentStatus.ACTIVE) {
      throw new import_common102.BadRequestException("You already have access to this course.");
    }
    const pendingRequest = await this.paymentRequestsRepository.findPendingForUserAndCourse(userId, courseId);
    if (pendingRequest) {
      throw new import_common102.BadRequestException("You already have a pending enrollment request for this course.");
    }
    const upload = await this.cloudinary.uploadFile(file, PROOF_FOLDER);
    const request = await this.paymentRequestsRepository.create({
      user: userId,
      type: PaymentRequestType.ENROLLMENT,
      course: course._id,
      note: note ?? "",
      proofUrl: upload.secure_url,
      proofPublicId: upload.public_id,
      status: PaymentRequestStatus.PENDING
    });
    await this.enrollmentsRepository.upsertPending(userId, courseId);
    return {
      success: true,
      message: "Enrollment request submitted. You'll get access once an admin approves your payment proof.",
      data: request
    };
  }
  async requestTopup(userId, coinsRequested, file, note) {
    if (!file) {
      throw new import_common102.BadRequestException("Please attach your payment proof (screenshot or PDF).");
    }
    const upload = await this.cloudinary.uploadFile(file, PROOF_FOLDER);
    const request = await this.paymentRequestsRepository.create({
      user: userId,
      type: PaymentRequestType.TOPUP,
      coinsRequested,
      note: note ?? "",
      proofUrl: upload.secure_url,
      proofPublicId: upload.public_id,
      status: PaymentRequestStatus.PENDING
    });
    return {
      success: true,
      message: "Top-up request submitted. Coins will appear in your wallet once an admin approves your payment proof.",
      data: request
    };
  }
  async myEnrollments(userId) {
    return this.paymentRequestsRepository.findAllForUser(userId);
  }
  async myCourses(userId) {
    const enrollments = await this.enrollmentsRepository.findActiveForUser(userId);
    return enrollments.map((e) => ({
      enrollmentId: String(e._id),
      approvedAt: e.approvedAt,
      course: {
        id: String(e.course._id),
        title: e.course.title,
        thumbnailUrl: e.course.thumbnailUrl,
        videosCount: e.course.videos?.length ?? 0
      }
    }));
  }
  async watchVideo(userId, courseId, videoId) {
    const enrollment = await this.enrollmentsRepository.findOne(userId, courseId);
    if (enrollment?.status !== EnrollmentStatus.ACTIVE) {
      throw new import_common102.ForbiddenException("Enroll in this course and get approved to watch its lectures.");
    }
    const course = await this.coursesService.getByIdOrThrow(courseId);
    const video = await this.coursesService.findVideoOrThrow(course, videoId);
    if (video.coinCost === 0) {
      return {
        success: true,
        data: { videoUrl: video.videoUrl, unlocked: true }
      };
    }
    const existingAccess = await this.videoAccessRepository.findOne(userId, videoId);
    if (existingAccess) {
      return {
        success: true,
        data: { videoUrl: video.videoUrl, unlocked: true }
      };
    }
    if (!course.isPublished) {
      throw new import_common102.NotFoundException("Course not found.");
    }
    await this.walletService.debit(userId, video.coinCost, `Unlocked lecture: ${video.title}`, { course: courseId, videoId });
    await this.videoAccessRepository.create({
      user: userId,
      course: courseId,
      videoId,
      coinsSpent: video.coinCost
    });
    return {
      success: true,
      data: { videoUrl: video.videoUrl, unlocked: true }
    };
  }
};
EnrollmentService = __decorate147([
  (0, import_common102.Injectable)(),
  __metadata117("design:paramtypes", [typeof (_a100 = typeof CoursesService !== "undefined" && CoursesService) === "function" ? _a100 : Object, typeof (_b46 = typeof WalletService !== "undefined" && WalletService) === "function" ? _b46 : Object, typeof (_c29 = typeof EnrollmentsRepository !== "undefined" && EnrollmentsRepository) === "function" ? _c29 : Object, typeof (_d24 = typeof PaymentRequestsRepository !== "undefined" && PaymentRequestsRepository) === "function" ? _d24 : Object, typeof (_e14 = typeof VideoAccessRepository !== "undefined" && VideoAccessRepository) === "function" ? _e14 : Object, typeof (_f9 = typeof CloudinaryService !== "undefined" && CloudinaryService) === "function" ? _f9 : Object])
], EnrollmentService);

// src/tutorial/services/admin-review.service.ts
var import_common103 = require("@nestjs/common");
var __decorate148 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata118 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a101;
var _b47;
var _c30;
var _d25;
var AdminReviewService = class AdminReviewService2 {
  paymentRequestsRepository;
  enrollmentsRepository;
  coursesRepository;
  walletService;
  constructor(paymentRequestsRepository, enrollmentsRepository, coursesRepository, walletService) {
    this.paymentRequestsRepository = paymentRequestsRepository;
    this.enrollmentsRepository = enrollmentsRepository;
    this.coursesRepository = coursesRepository;
    this.walletService = walletService;
  }
  async list(status, type) {
    return this.paymentRequestsRepository.findForAdmin({
      status,
      type
    });
  }
  async approve(requestId, adminId, dto) {
    const request = await this.paymentRequestsRepository.findById(requestId);
    if (!request) {
      throw new import_common103.NotFoundException("Request not found.");
    }
    if (request.status !== PaymentRequestStatus.PENDING) {
      throw new import_common103.BadRequestException("This request has already been reviewed.");
    }
    const userId = String(request.user);
    if (request.type === PaymentRequestType.ENROLLMENT) {
      const courseId = String(request.course);
      const course = await this.coursesRepository.findById(courseId);
      if (!course) {
        throw new import_common103.NotFoundException("The course for this request no longer exists.");
      }
      await this.enrollmentsRepository.setStatus(userId, courseId, EnrollmentStatus.ACTIVE);
      if (course.coinsIncluded > 0) {
        await this.walletService.credit(userId, course.coinsIncluded, `Enrollment bonus \u2014 ${course.title}`, { course: courseId, paymentRequest: requestId });
      }
      request.coinsGranted = course.coinsIncluded;
    } else {
      const coinsGranted = dto.coinsGranted ?? request.coinsRequested ?? 0;
      await this.walletService.credit(userId, coinsGranted, "Wallet top-up approved", { paymentRequest: requestId });
      request.coinsGranted = coinsGranted;
    }
    request.status = PaymentRequestStatus.APPROVED;
    request.reviewedBy = adminId;
    request.reviewedAt = /* @__PURE__ */ new Date();
    request.reviewNote = dto.note ?? "";
    await request.save();
    return {
      success: true,
      message: "Request approved.",
      data: request
    };
  }
  async reject(requestId, adminId, dto) {
    const request = await this.paymentRequestsRepository.findById(requestId);
    if (!request) {
      throw new import_common103.NotFoundException("Request not found.");
    }
    if (request.status !== PaymentRequestStatus.PENDING) {
      throw new import_common103.BadRequestException("This request has already been reviewed.");
    }
    if (request.type === PaymentRequestType.ENROLLMENT) {
      await this.enrollmentsRepository.setStatus(String(request.user), String(request.course), EnrollmentStatus.REJECTED);
    }
    request.status = PaymentRequestStatus.REJECTED;
    request.reviewedBy = adminId;
    request.reviewedAt = /* @__PURE__ */ new Date();
    request.rejectionReason = dto.reason;
    await request.save();
    return {
      success: true,
      message: "Request rejected.",
      data: request
    };
  }
};
AdminReviewService = __decorate148([
  (0, import_common103.Injectable)(),
  __metadata118("design:paramtypes", [typeof (_a101 = typeof PaymentRequestsRepository !== "undefined" && PaymentRequestsRepository) === "function" ? _a101 : Object, typeof (_b47 = typeof EnrollmentsRepository !== "undefined" && EnrollmentsRepository) === "function" ? _b47 : Object, typeof (_c30 = typeof CoursesRepository !== "undefined" && CoursesRepository) === "function" ? _c30 : Object, typeof (_d25 = typeof WalletService !== "undefined" && WalletService) === "function" ? _d25 : Object])
], AdminReviewService);

// src/tutorial/services/payment-settings.service.ts
var import_common104 = require("@nestjs/common");
var __decorate149 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata119 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a102;
var PaymentSettingsService = class PaymentSettingsService2 {
  paymentSettingsRepository;
  constructor(paymentSettingsRepository) {
    this.paymentSettingsRepository = paymentSettingsRepository;
  }
  async get() {
    const settings = await this.paymentSettingsRepository.getOrCreate();
    return {
      success: true,
      data: settings
    };
  }
  async update(data) {
    const settings = await this.paymentSettingsRepository.update(data);
    return {
      success: true,
      message: "Payment settings updated.",
      data: settings
    };
  }
};
PaymentSettingsService = __decorate149([
  (0, import_common104.Injectable)(),
  __metadata119("design:paramtypes", [typeof (_a102 = typeof PaymentSettingsRepository !== "undefined" && PaymentSettingsRepository) === "function" ? _a102 : Object])
], PaymentSettingsService);

// src/tutorial/controllers/tutorials.controller.ts
var import_common105 = require("@nestjs/common");
var import_platform_express7 = require("@nestjs/platform-express");

// src/tutorial/dto/tutorial-register.dto.ts
var import_class_validator28 = require("class-validator");
var __decorate150 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata120 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TutorialRegisterDto = class {
  firstName;
  lastName;
  email;
  phone;
};
__decorate150([
  (0, import_class_validator28.IsString)(),
  (0, import_class_validator28.MinLength)(2),
  __metadata120("design:type", String)
], TutorialRegisterDto.prototype, "firstName", void 0);
__decorate150([
  (0, import_class_validator28.IsString)(),
  (0, import_class_validator28.MinLength)(2),
  __metadata120("design:type", String)
], TutorialRegisterDto.prototype, "lastName", void 0);
__decorate150([
  (0, import_class_validator28.IsEmail)(),
  __metadata120("design:type", String)
], TutorialRegisterDto.prototype, "email", void 0);
__decorate150([
  (0, import_class_validator28.IsOptional)(),
  (0, import_class_validator28.IsString)(),
  __metadata120("design:type", String)
], TutorialRegisterDto.prototype, "phone", void 0);

// src/tutorial/dto/create-enrollment.dto.ts
var import_class_validator29 = require("class-validator");
var __decorate151 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata121 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateEnrollmentDto = class {
  courseId;
  note;
};
__decorate151([
  (0, import_class_validator29.IsMongoId)(),
  __metadata121("design:type", String)
], CreateEnrollmentDto.prototype, "courseId", void 0);
__decorate151([
  (0, import_class_validator29.IsOptional)(),
  (0, import_class_validator29.IsString)(),
  __metadata121("design:type", String)
], CreateEnrollmentDto.prototype, "note", void 0);

// src/tutorial/dto/create-topup.dto.ts
var import_class_validator30 = require("class-validator");
var __decorate152 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata122 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateTopupDto = class {
  coinsRequested;
  note;
};
__decorate152([
  (0, import_class_validator30.IsNumber)(),
  (0, import_class_validator30.Min)(1),
  __metadata122("design:type", Number)
], CreateTopupDto.prototype, "coinsRequested", void 0);
__decorate152([
  (0, import_class_validator30.IsOptional)(),
  (0, import_class_validator30.IsString)(),
  __metadata122("design:type", String)
], CreateTopupDto.prototype, "note", void 0);

// src/tutorial/controllers/tutorials.controller.ts
var __decorate153 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata123 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param66 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a103;
var _b48;
var _c31;
var _d26;
var _e15;
var _f10;
var _g7;
var _h5;
var _j3;
var _k;
var _l;
var _m;
var TutorialsController = class TutorialsController2 {
  tutorialsAuthService;
  coursesService;
  walletService;
  enrollmentService;
  paymentSettingsService;
  constructor(tutorialsAuthService, coursesService, walletService, enrollmentService, paymentSettingsService) {
    this.tutorialsAuthService = tutorialsAuthService;
    this.coursesService = coursesService;
    this.walletService = walletService;
    this.enrollmentService = enrollmentService;
    this.paymentSettingsService = paymentSettingsService;
  }
  register(dto) {
    return this.tutorialsAuthService.register(dto);
  }
  listCourses() {
    return this.coursesService.listPublished();
  }
  paymentSettings() {
    return this.paymentSettingsService.get();
  }
  courseDetail(req, id) {
    return this.enrollmentService.courseDetail(req.user.sub, id);
  }
  enroll(req, file, dto) {
    return this.enrollmentService.requestEnrollment(req.user.sub, dto.courseId, file, dto.note);
  }
  myEnrollments(req) {
    return this.enrollmentService.myEnrollments(req.user.sub);
  }
  myCourses(req) {
    return this.enrollmentService.myCourses(req.user.sub);
  }
  wallet(req) {
    return this.walletService.getWallet(req.user.sub);
  }
  topup(req, file, dto) {
    return this.enrollmentService.requestTopup(req.user.sub, dto.coinsRequested, file, dto.note);
  }
  watchVideo(req, courseId, videoId) {
    return this.enrollmentService.watchVideo(req.user.sub, courseId, videoId);
  }
};
__decorate153([
  (0, import_common105.Post)("register"),
  __param66(0, (0, import_common105.Body)()),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [typeof (_f10 = typeof TutorialRegisterDto !== "undefined" && TutorialRegisterDto) === "function" ? _f10 : Object]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "register", null);
__decorate153([
  (0, import_common105.Get)("courses"),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", []),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "listCourses", null);
__decorate153([
  (0, import_common105.Get)("payment-settings"),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", []),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "paymentSettings", null);
__decorate153([
  (0, import_common105.UseGuards)(JwtAuthGuard),
  (0, import_common105.Get)("courses/:id"),
  __param66(0, (0, import_common105.Req)()),
  __param66(1, (0, import_common105.Param)("id")),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [Object, String]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "courseDetail", null);
__decorate153([
  (0, import_common105.UseGuards)(JwtAuthGuard),
  (0, import_common105.Post)("enrollments"),
  (0, import_common105.UseInterceptors)((0, import_platform_express7.FileInterceptor)("proof", {
    limits: { fileSize: 10 * 1024 * 1024 }
  })),
  __param66(0, (0, import_common105.Req)()),
  __param66(1, (0, import_common105.UploadedFile)()),
  __param66(2, (0, import_common105.Body)()),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [Object, typeof (_h5 = typeof Express !== "undefined" && (_g7 = Express.Multer) !== void 0 && _g7.File) === "function" ? _h5 : Object, typeof (_j3 = typeof CreateEnrollmentDto !== "undefined" && CreateEnrollmentDto) === "function" ? _j3 : Object]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "enroll", null);
__decorate153([
  (0, import_common105.UseGuards)(JwtAuthGuard),
  (0, import_common105.Get)("enrollments/me"),
  __param66(0, (0, import_common105.Req)()),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [Object]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "myEnrollments", null);
__decorate153([
  (0, import_common105.UseGuards)(JwtAuthGuard),
  (0, import_common105.Get)("my-courses"),
  __param66(0, (0, import_common105.Req)()),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [Object]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "myCourses", null);
__decorate153([
  (0, import_common105.UseGuards)(JwtAuthGuard),
  (0, import_common105.Get)("wallet"),
  __param66(0, (0, import_common105.Req)()),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [Object]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "wallet", null);
__decorate153([
  (0, import_common105.UseGuards)(JwtAuthGuard),
  (0, import_common105.Post)("wallet/topup"),
  (0, import_common105.UseInterceptors)((0, import_platform_express7.FileInterceptor)("proof", {
    limits: { fileSize: 10 * 1024 * 1024 }
  })),
  __param66(0, (0, import_common105.Req)()),
  __param66(1, (0, import_common105.UploadedFile)()),
  __param66(2, (0, import_common105.Body)()),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [Object, typeof (_l = typeof Express !== "undefined" && (_k = Express.Multer) !== void 0 && _k.File) === "function" ? _l : Object, typeof (_m = typeof CreateTopupDto !== "undefined" && CreateTopupDto) === "function" ? _m : Object]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "topup", null);
__decorate153([
  (0, import_common105.UseGuards)(JwtAuthGuard),
  (0, import_common105.Post)("courses/:courseId/videos/:videoId/watch"),
  __param66(0, (0, import_common105.Req)()),
  __param66(1, (0, import_common105.Param)("courseId")),
  __param66(2, (0, import_common105.Param)("videoId")),
  __metadata123("design:type", Function),
  __metadata123("design:paramtypes", [Object, String, String]),
  __metadata123("design:returntype", void 0)
], TutorialsController.prototype, "watchVideo", null);
TutorialsController = __decorate153([
  (0, import_common105.Controller)("tutorials"),
  __metadata123("design:paramtypes", [typeof (_a103 = typeof TutorialsAuthService !== "undefined" && TutorialsAuthService) === "function" ? _a103 : Object, typeof (_b48 = typeof CoursesService !== "undefined" && CoursesService) === "function" ? _b48 : Object, typeof (_c31 = typeof WalletService !== "undefined" && WalletService) === "function" ? _c31 : Object, typeof (_d26 = typeof EnrollmentService !== "undefined" && EnrollmentService) === "function" ? _d26 : Object, typeof (_e15 = typeof PaymentSettingsService !== "undefined" && PaymentSettingsService) === "function" ? _e15 : Object])
], TutorialsController);

// src/tutorial/controllers/tutorials-admin.controller.ts
var import_common106 = require("@nestjs/common");
var import_platform_express8 = require("@nestjs/platform-express");

// src/tutorial/dto/create-course.dto.ts
var import_class_validator31 = require("class-validator");
var __decorate154 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata124 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CreateCourseDto = class {
  title;
  description;
  thumbnailUrl;
  priceLabel;
  coinsIncluded;
  isPublished;
};
__decorate154([
  (0, import_class_validator31.IsString)(),
  (0, import_class_validator31.MinLength)(2),
  __metadata124("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
__decorate154([
  (0, import_class_validator31.IsOptional)(),
  (0, import_class_validator31.IsString)(),
  __metadata124("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate154([
  (0, import_class_validator31.IsOptional)(),
  (0, import_class_validator31.IsString)(),
  __metadata124("design:type", String)
], CreateCourseDto.prototype, "thumbnailUrl", void 0);
__decorate154([
  (0, import_class_validator31.IsOptional)(),
  (0, import_class_validator31.IsString)(),
  __metadata124("design:type", String)
], CreateCourseDto.prototype, "priceLabel", void 0);
__decorate154([
  (0, import_class_validator31.IsOptional)(),
  (0, import_class_validator31.IsNumber)(),
  (0, import_class_validator31.Min)(0),
  __metadata124("design:type", Number)
], CreateCourseDto.prototype, "coinsIncluded", void 0);
__decorate154([
  (0, import_class_validator31.IsOptional)(),
  (0, import_class_validator31.IsBoolean)(),
  __metadata124("design:type", Boolean)
], CreateCourseDto.prototype, "isPublished", void 0);

// src/tutorial/dto/update-course.dto.ts
var import_swagger5 = require("@nestjs/swagger");
var UpdateCourseDto = class extends (0, import_swagger5.PartialType)(CreateCourseDto) {
};

// src/tutorial/dto/add-video.dto.ts
var import_class_validator32 = require("class-validator");
var __decorate155 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata125 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AddVideoDto = class {
  title;
  description;
  videoUrl;
  durationMinutes;
  coinCost;
  order;
};
__decorate155([
  (0, import_class_validator32.IsString)(),
  (0, import_class_validator32.MinLength)(2),
  __metadata125("design:type", String)
], AddVideoDto.prototype, "title", void 0);
__decorate155([
  (0, import_class_validator32.IsOptional)(),
  (0, import_class_validator32.IsString)(),
  __metadata125("design:type", String)
], AddVideoDto.prototype, "description", void 0);
__decorate155([
  (0, import_class_validator32.IsString)(),
  __metadata125("design:type", String)
], AddVideoDto.prototype, "videoUrl", void 0);
__decorate155([
  (0, import_class_validator32.IsNumber)(),
  (0, import_class_validator32.Min)(0),
  __metadata125("design:type", Number)
], AddVideoDto.prototype, "durationMinutes", void 0);
__decorate155([
  (0, import_class_validator32.IsNumber)(),
  (0, import_class_validator32.Min)(0),
  __metadata125("design:type", Number)
], AddVideoDto.prototype, "coinCost", void 0);
__decorate155([
  (0, import_class_validator32.IsOptional)(),
  (0, import_class_validator32.IsNumber)(),
  (0, import_class_validator32.Min)(0),
  __metadata125("design:type", Number)
], AddVideoDto.prototype, "order", void 0);

// src/tutorial/dto/update-video.dto.ts
var import_swagger6 = require("@nestjs/swagger");
var UpdateVideoDto = class extends (0, import_swagger6.PartialType)(AddVideoDto) {
};

// src/tutorial/dto/approve-request.dto.ts
var import_class_validator33 = require("class-validator");
var __decorate156 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata126 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ApproveRequestDto = class {
  coinsGranted;
  note;
};
__decorate156([
  (0, import_class_validator33.IsOptional)(),
  (0, import_class_validator33.IsNumber)(),
  (0, import_class_validator33.Min)(0),
  __metadata126("design:type", Number)
], ApproveRequestDto.prototype, "coinsGranted", void 0);
__decorate156([
  (0, import_class_validator33.IsOptional)(),
  (0, import_class_validator33.IsString)(),
  __metadata126("design:type", String)
], ApproveRequestDto.prototype, "note", void 0);

// src/tutorial/dto/reject-request.dto.ts
var import_class_validator34 = require("class-validator");
var __decorate157 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata127 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RejectRequestDto = class {
  reason;
};
__decorate157([
  (0, import_class_validator34.IsString)(),
  (0, import_class_validator34.MinLength)(3),
  __metadata127("design:type", String)
], RejectRequestDto.prototype, "reason", void 0);

// src/tutorial/dto/update-payment-settings.dto.ts
var import_class_validator35 = require("class-validator");
var __decorate158 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata128 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UpdatePaymentSettingsDto = class {
  qrCodeUrl;
  accountTitle;
  accountNumber;
  bankName;
  instructions;
};
__decorate158([
  (0, import_class_validator35.IsOptional)(),
  (0, import_class_validator35.IsString)(),
  __metadata128("design:type", String)
], UpdatePaymentSettingsDto.prototype, "qrCodeUrl", void 0);
__decorate158([
  (0, import_class_validator35.IsOptional)(),
  (0, import_class_validator35.IsString)(),
  __metadata128("design:type", String)
], UpdatePaymentSettingsDto.prototype, "accountTitle", void 0);
__decorate158([
  (0, import_class_validator35.IsOptional)(),
  (0, import_class_validator35.IsString)(),
  __metadata128("design:type", String)
], UpdatePaymentSettingsDto.prototype, "accountNumber", void 0);
__decorate158([
  (0, import_class_validator35.IsOptional)(),
  (0, import_class_validator35.IsString)(),
  __metadata128("design:type", String)
], UpdatePaymentSettingsDto.prototype, "bankName", void 0);
__decorate158([
  (0, import_class_validator35.IsOptional)(),
  (0, import_class_validator35.IsString)(),
  __metadata128("design:type", String)
], UpdatePaymentSettingsDto.prototype, "instructions", void 0);

// src/tutorial/controllers/tutorials-admin.controller.ts
var __decorate159 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata129 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param67 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var _a104;
var _b49;
var _c32;
var _d27;
var _e16;
var _f11;
var _g8;
var _h6;
var _j4;
var _k2;
var _l2;
var _m2;
var _o;
var _p;
var _q;
var _r;
var _s;
var _t;
var _u;
var TutorialsAdminController = class TutorialsAdminController2 {
  coursesService;
  adminReviewService;
  paymentSettingsService;
  cloudinary;
  constructor(coursesService, adminReviewService, paymentSettingsService, cloudinary2) {
    this.coursesService = coursesService;
    this.adminReviewService = adminReviewService;
    this.paymentSettingsService = paymentSettingsService;
    this.cloudinary = cloudinary2;
  }
  listCourses() {
    return this.coursesService.listAllForAdmin();
  }
  getCourse(id) {
    return this.coursesService.getByIdOrThrow(id);
  }
  createCourse(req, dto) {
    return this.coursesService.create(dto, req.user.sub);
  }
  updateCourse(id, dto) {
    return this.coursesService.update(id, dto);
  }
  removeCourse(id) {
    return this.coursesService.remove(id);
  }
  async uploadThumbnail(file) {
    const upload = await this.cloudinary.uploadFile(file, "company-management/tutorials/thumbnails");
    return {
      success: true,
      data: { url: upload.secure_url }
    };
  }
  async uploadVideo(file) {
    const upload = await this.cloudinary.uploadFile(file, "company-management/tutorials/videos");
    return {
      success: true,
      data: {
        url: upload.secure_url,
        durationMinutes: upload.duration ? Math.ceil(upload.duration / 60) : void 0
      }
    };
  }
  addVideo(id, dto) {
    return this.coursesService.addVideo(id, dto);
  }
  updateVideo(id, videoId, dto) {
    return this.coursesService.updateVideo(id, videoId, dto);
  }
  removeVideo(id, videoId) {
    return this.coursesService.removeVideo(id, videoId);
  }
  listRequests(status, type) {
    return this.adminReviewService.list(status, type);
  }
  approveRequest(req, id, dto) {
    return this.adminReviewService.approve(id, req.user.sub, dto);
  }
  rejectRequest(req, id, dto) {
    return this.adminReviewService.reject(id, req.user.sub, dto);
  }
  getPaymentSettings() {
    return this.paymentSettingsService.get();
  }
  updatePaymentSettings(dto) {
    return this.paymentSettingsService.update(dto);
  }
  async uploadQrCode(file) {
    const upload = await this.cloudinary.uploadFile(file, "company-management/tutorials/payment-qr");
    return {
      success: true,
      data: { url: upload.secure_url }
    };
  }
};
__decorate159([
  (0, import_common106.Get)("courses"),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", []),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "listCourses", null);
__decorate159([
  (0, import_common106.Get)("courses/:id"),
  __param67(0, (0, import_common106.Param)("id")),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [String]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "getCourse", null);
__decorate159([
  (0, import_common106.Post)("courses"),
  __param67(0, (0, import_common106.Req)()),
  __param67(1, (0, import_common106.Body)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [Object, typeof (_e16 = typeof CreateCourseDto !== "undefined" && CreateCourseDto) === "function" ? _e16 : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "createCourse", null);
__decorate159([
  (0, import_common106.Patch)("courses/:id"),
  __param67(0, (0, import_common106.Param)("id")),
  __param67(1, (0, import_common106.Body)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [String, typeof (_f11 = typeof UpdateCourseDto !== "undefined" && UpdateCourseDto) === "function" ? _f11 : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "updateCourse", null);
__decorate159([
  (0, import_common106.Delete)("courses/:id"),
  __param67(0, (0, import_common106.Param)("id")),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [String]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "removeCourse", null);
__decorate159([
  (0, import_common106.Post)("upload-thumbnail"),
  (0, import_common106.UseInterceptors)((0, import_platform_express8.FileInterceptor)("file", {
    limits: { fileSize: 10 * 1024 * 1024 }
  })),
  __param67(0, (0, import_common106.UploadedFile)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [typeof (_h6 = typeof Express !== "undefined" && (_g8 = Express.Multer) !== void 0 && _g8.File) === "function" ? _h6 : Object]),
  __metadata129("design:returntype", Promise)
], TutorialsAdminController.prototype, "uploadThumbnail", null);
__decorate159([
  (0, import_common106.Post)("upload-video"),
  (0, import_common106.UseInterceptors)((0, import_platform_express8.FileInterceptor)("file", {
    limits: { fileSize: 500 * 1024 * 1024 }
  })),
  __param67(0, (0, import_common106.UploadedFile)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [typeof (_k2 = typeof Express !== "undefined" && (_j4 = Express.Multer) !== void 0 && _j4.File) === "function" ? _k2 : Object]),
  __metadata129("design:returntype", Promise)
], TutorialsAdminController.prototype, "uploadVideo", null);
__decorate159([
  (0, import_common106.Post)("courses/:id/videos"),
  __param67(0, (0, import_common106.Param)("id")),
  __param67(1, (0, import_common106.Body)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [String, typeof (_l2 = typeof AddVideoDto !== "undefined" && AddVideoDto) === "function" ? _l2 : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "addVideo", null);
__decorate159([
  (0, import_common106.Patch)("courses/:id/videos/:videoId"),
  __param67(0, (0, import_common106.Param)("id")),
  __param67(1, (0, import_common106.Param)("videoId")),
  __param67(2, (0, import_common106.Body)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [String, String, typeof (_m2 = typeof UpdateVideoDto !== "undefined" && UpdateVideoDto) === "function" ? _m2 : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "updateVideo", null);
__decorate159([
  (0, import_common106.Delete)("courses/:id/videos/:videoId"),
  __param67(0, (0, import_common106.Param)("id")),
  __param67(1, (0, import_common106.Param)("videoId")),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [String, String]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "removeVideo", null);
__decorate159([
  (0, import_common106.Get)("requests"),
  __param67(0, (0, import_common106.Query)("status")),
  __param67(1, (0, import_common106.Query)("type")),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [typeof (_o = typeof PaymentRequestStatus !== "undefined" && PaymentRequestStatus) === "function" ? _o : Object, typeof (_p = typeof PaymentRequestType !== "undefined" && PaymentRequestType) === "function" ? _p : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "listRequests", null);
__decorate159([
  (0, import_common106.Patch)("requests/:id/approve"),
  __param67(0, (0, import_common106.Req)()),
  __param67(1, (0, import_common106.Param)("id")),
  __param67(2, (0, import_common106.Body)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [Object, String, typeof (_q = typeof ApproveRequestDto !== "undefined" && ApproveRequestDto) === "function" ? _q : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "approveRequest", null);
__decorate159([
  (0, import_common106.Patch)("requests/:id/reject"),
  __param67(0, (0, import_common106.Req)()),
  __param67(1, (0, import_common106.Param)("id")),
  __param67(2, (0, import_common106.Body)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [Object, String, typeof (_r = typeof RejectRequestDto !== "undefined" && RejectRequestDto) === "function" ? _r : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "rejectRequest", null);
__decorate159([
  (0, import_common106.Get)("payment-settings"),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", []),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "getPaymentSettings", null);
__decorate159([
  (0, import_common106.Patch)("payment-settings"),
  __param67(0, (0, import_common106.Body)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [typeof (_s = typeof UpdatePaymentSettingsDto !== "undefined" && UpdatePaymentSettingsDto) === "function" ? _s : Object]),
  __metadata129("design:returntype", void 0)
], TutorialsAdminController.prototype, "updatePaymentSettings", null);
__decorate159([
  (0, import_common106.Post)("upload-qr-code"),
  (0, import_common106.UseInterceptors)((0, import_platform_express8.FileInterceptor)("file", {
    limits: { fileSize: 5 * 1024 * 1024 }
  })),
  __param67(0, (0, import_common106.UploadedFile)()),
  __metadata129("design:type", Function),
  __metadata129("design:paramtypes", [typeof (_u = typeof Express !== "undefined" && (_t = Express.Multer) !== void 0 && _t.File) === "function" ? _u : Object]),
  __metadata129("design:returntype", Promise)
], TutorialsAdminController.prototype, "uploadQrCode", null);
TutorialsAdminController = __decorate159([
  (0, import_common106.Controller)("tutorials/admin"),
  (0, import_common106.UseGuards)(JwtAuthGuard, RolesGuard),
  Roles(Role.ADMIN),
  __metadata129("design:paramtypes", [typeof (_a104 = typeof CoursesService !== "undefined" && CoursesService) === "function" ? _a104 : Object, typeof (_b49 = typeof AdminReviewService !== "undefined" && AdminReviewService) === "function" ? _b49 : Object, typeof (_c32 = typeof PaymentSettingsService !== "undefined" && PaymentSettingsService) === "function" ? _c32 : Object, typeof (_d27 = typeof CloudinaryService !== "undefined" && CloudinaryService) === "function" ? _d27 : Object])
], TutorialsAdminController);

// src/tutorial/tutorial.module.ts
var __decorate160 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TutorialsModule = class TutorialsModule2 {
};
TutorialsModule = __decorate160([
  (0, import_common107.Module)({
    imports: [
      import_mongoose105.MongooseModule.forFeature([
        { name: Course.name, schema: CourseSchema },
        { name: Enrollment.name, schema: EnrollmentSchema },
        { name: Wallet.name, schema: WalletSchema },
        { name: CoinTransaction.name, schema: CoinTransactionSchema },
        { name: PaymentRequest.name, schema: PaymentRequestSchema },
        { name: VideoAccess.name, schema: VideoAccessSchema },
        { name: PaymentSettings.name, schema: PaymentSettingsSchema }
      ]),
      AuthModule,
      UsersModule,
      MailModule,
      CloudinaryModule
    ],
    controllers: [
      TutorialsController,
      TutorialsAdminController
    ],
    providers: [
      CoursesRepository,
      EnrollmentsRepository,
      WalletsRepository,
      CoinTransactionsRepository,
      PaymentRequestsRepository,
      VideoAccessRepository,
      PaymentSettingsRepository,
      CoursesService,
      WalletService,
      TutorialsAuthService,
      EnrollmentService,
      AdminReviewService,
      PaymentSettingsService
    ]
  })
], TutorialsModule);

// src/app.module.ts
var __decorate161 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule = class AppModule2 {
  configure(consumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
};
AppModule = __decorate161([
  (0, import_common108.Module)({
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
      CalcomModule,
      TutorialsModule
    ]
  })
], AppModule);

// api/index.ts
var cachedApp;
async function bootstrap() {
  const app = await import_core2.NestFactory.create(AppModule);
  app.useStaticAssets((0, import_path2.join)(process.cwd(), "uploads"), {
    prefix: "/uploads/"
  });
  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true
  });
  app.useGlobalPipes(new import_common109.ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  const config = new import_swagger7.DocumentBuilder().setTitle("AI Company Management API").setDescription("Enterprise Management System API").setVersion("1.0").addBearerAuth().build();
  const document = import_swagger7.SwaggerModule.createDocument(app, config);
  import_swagger7.SwaggerModule.setup("docs", app, document);
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
