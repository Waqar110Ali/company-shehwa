import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import NavigationLink from "@/components/common/NavLink";
import { navigation } from "@/constants/navigation";

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <div className="mt-10 flex flex-col gap-6">
          {navigation.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}