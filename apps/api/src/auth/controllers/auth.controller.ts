import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards, Inject } from "@nestjs/common";


import { AuthService } from "../services/auth.service";

import { LoginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { RegisterDto } from "../dto/register.dto";

import { CurrentUser } from "../decorators/current-user.decorator";
import { Roles } from "../decorators/roles.decorator";

import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";

import type { JwtPayload } from "../interfaces/jwt-payload.interface";

import { Role } from "@/users/enums/role.enum";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

 @UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(Role.ADMIN)
@Post("create-user")
createUser(
  @Body()
  dto: RegisterDto,
) {
  return this.authService.createUser(dto);
}

  @Post("login")
  login(
    @Body()
    dto: LoginDto,
  ) {
    return this.authService.login(
      dto,
    );
  }

  /**
   * Every role can refresh their own session — this list was
   * previously missing Role.INTERN, Role.CLIENT, and Role.CEO,
   * which meant those roles' sessions could never renew once the
   * access token expired.
   */
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    Role.ADMIN,
    Role.MANAGER,
    Role.HR,
    Role.EMPLOYEE,
    Role.INTERN,
    Role.CLIENT,
    Role.CEO,
    Role.AI,
  )
  @Post("refresh")
  refresh(
    @Body()
    dto: RefreshTokenDto,
  ) {
    return this.authService.refresh(
      dto.refreshToken,
    );
  }

  /**
   * Every role can fetch their own profile — same missing-roles
   * bug as /refresh. This is the endpoint that runs right after
   * login to hydrate the session, so a 403 here for Intern/
   * Client/CEO is what was bouncing them straight back to the
   * login page.
   */
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    Role.ADMIN,
    Role.MANAGER,
    Role.HR,
    Role.EMPLOYEE,
    Role.INTERN,
    Role.CLIENT,
    Role.CEO,
    Role.AI,
  )
  @Get("me")
  me(
    @CurrentUser()
    user: JwtPayload,
  ) {
    return this.authService.me(
      user.sub,
    );
  }

  /**
   * Every role can log themselves out — same fix.
   */
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    Role.ADMIN,
    Role.MANAGER,
    Role.HR,
    Role.EMPLOYEE,
    Role.INTERN,
    Role.CLIENT,
    Role.CEO,
    Role.AI,
  )
  @Post("logout")
  logout(
    @CurrentUser()
    user: JwtPayload,
  ) {
    return this.authService.logout(
      user.sub,
    );
  }
}