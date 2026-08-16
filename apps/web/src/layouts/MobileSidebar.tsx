import { Sheet, SheetContent } from "@/components/ui/sheet";

import SidebarPanel from "./SidebarPanel";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileSidebar({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-72 border-white/10 bg-slate-950/95 p-0 backdrop-blur-3xl"
      >
        <SidebarPanel onNavigate={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}