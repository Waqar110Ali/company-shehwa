import { Link } from "react-router-dom";
import { LogIn, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PremiumButton from "@/components/premium/PremiumButton";

import NavigationLink from "@/components/common/NavLink";
import { navigation } from "@/constants/navigation";

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "text-white hover:bg-white/10 hover:text-cyan-300 lg:hidden",
        )}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] border-white/10 bg-slate-950/95 text-white backdrop-blur-2xl sm:w-[380px]"
      >
        <div className="mt-10 flex flex-col gap-6">
          {navigation.map((item) => (
            <NavigationLink
              key={item.label}
              href={item.href}
              label={item.label}
              // Always render the "scrolled" (light text on dark bg)
              // variant here - the Sheet panel is always dark, unlike
              // the top navbar which can be transparent-on-light.
              scrolled
            />
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <Link to="/login">
            <PremiumButton
              variant="outline"
              className="w-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-slate-900"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </PremiumButton>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}