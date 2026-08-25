import { Body, Controller, Get, Put, UseGuards, Inject } from "@nestjs/common";

import { FooterService } from "../services/footer.service";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";
import { Role } from "@/users/enums/role.enum";

@Controller("footer")
export class FooterController {
  constructor(@Inject(FooterService) private readonly footerService: FooterService) {}

  // PUBLIC — every page's footer reads this, no auth needed.
  @Get()
  getFooter() {
    return this.footerService.getFooter();
  }

  // ADMIN ONLY — replaces the whole footer document at once,
  // since it's one cohesive block (description, socials, links).
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put()
  saveFooter(@Body() body: Record<string, any>) {
    return this.footerService.saveFooter(body);
  }
}