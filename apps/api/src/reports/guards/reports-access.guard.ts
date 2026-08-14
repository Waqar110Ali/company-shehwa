import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ReportsAccessGuard
  extends AuthGuard("jwt")
  implements CanActivate
{
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const authenticated =
      await super.canActivate(
        context,
      );

    if (!authenticated) {
      throw new UnauthorizedException();
    }

    const request =
      context.switchToHttp().getRequest();

    const user =
      request.user;

    const role = String(
      user?.role ??
        user?.roles?.[0] ??
        "",
    )
      .trim()
      .toUpperCase();

    const allowed =
      [
        "ADMIN",
        "HR",
        "HUMAN_RESOURCES",
      ].includes(role);

    if (!allowed) {
      throw new ForbiddenException(
        "Only Admin or HR can access reports.",
      );
    }

    return true;
  }
}