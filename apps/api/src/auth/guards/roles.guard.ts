import {
  CanActivate,
  ExecutionContext,
  Injectable, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "../decorators/roles.decorator";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

import { Role } from "@/users/enums/role.enum";

@Injectable()
export class RolesGuard
  implements CanActivate
{
  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<
        Role[]
      >(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (
      !requiredRoles ||
      requiredRoles.length === 0
    ) {
      return true;
    }

    const request =
      context
        .switchToHttp()
        .getRequest();

    const user =
      request.user as JwtPayload;

    if (!user) {
      return false;
    }

    return requiredRoles.includes(
      user.role,
    );
  }
}