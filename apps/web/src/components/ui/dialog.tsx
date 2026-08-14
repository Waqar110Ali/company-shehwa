import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// ======================================================
// Root
// ======================================================

function Dialog(
  props: DialogPrimitive.Root.Props,
) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      {...props}
    />
  );
}

// ======================================================
// Trigger
// ======================================================

function DialogTrigger(
  props: DialogPrimitive.Trigger.Props,
) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...props}
    />
  );
}

// ======================================================
// Portal
// ======================================================

function DialogPortal(
  props: DialogPrimitive.Portal.Props,
) {
  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      {...props}
    />
  );
}

// ======================================================
// Overlay
// ======================================================

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
        "transition-opacity duration-200",
        className,
      )}
      {...props}
    />
  );
}

// ======================================================
// Close
// ======================================================

function DialogClose(
  props: DialogPrimitive.Close.Props,
) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...props}
    />
  );
}

// ======================================================
// Content
// ======================================================

interface DialogContentProps
  extends DialogPrimitive.Popup.Props {
  showCloseButton?: boolean;
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-[60]",
          "w-[calc(100%-2rem)]",
          "max-w-lg",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded-2xl",
          "border border-white/10",
          "bg-[#0F172A]",
          "shadow-2xl",
          "outline-none",
          "transition-all duration-200",
          className,
        )}
        {...props}
      >
        {showCloseButton && (
          <DialogClose
            className={cn(
              "absolute right-3 top-3 z-30",
              "flex h-8 w-8 items-center justify-center",
              "rounded-md",
              "text-muted-foreground",
              "transition-colors",
              "hover:bg-white/10",
              "hover:text-white",
            )}
          >
            <X className="h-4 w-4" />
          </DialogClose>
        )}

        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

// ======================================================
// Header
// ======================================================

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-2",
        className,
      )}
      {...props}
    />
  );
}

// ======================================================
// Footer
// ======================================================

interface DialogFooterProps
  extends React.ComponentProps<"div"> {
  showCloseButton?: boolean;
}

function DialogFooter({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {showCloseButton && (
        <DialogClose
          className="rounded-md border border-white/10 px-4 py-2 hover:bg-white/10"
        >
          Close
        </DialogClose>
      )}

      {children}
    </div>
  );
}

// ======================================================
// Title
// ======================================================

function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-lg font-semibold",
        className,
      )}
      {...props}
    />
  );
}

// ======================================================
// Description
// ======================================================

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};