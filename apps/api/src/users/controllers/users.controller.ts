import {
  Controller,
  Get,
  Param,
  UseGuards, Inject } from "@nestjs/common";

import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
  ) {
    return this.usersService.findById(id);
  }
}