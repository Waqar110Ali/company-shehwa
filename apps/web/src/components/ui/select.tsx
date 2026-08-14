import * as React from "react";
import * as SelectPrimitive from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 text-sm outline-none",
        )}
      >
        <SelectPrimitive.Value
          placeholder={
            placeholder ??
            "Select"
          }
        />

        <ChevronDown
          size={16}
        />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner>
          <SelectPrimitive.Popup className="z-50 mt-2 w-[var(--anchor-width)] rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-xl">
            {options.map(
              (option) => (
                <SelectPrimitive.Item
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                  className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-white hover:bg-cyan-500/20"
                >
                  <SelectPrimitive.ItemText>
                    {
                      option.label
                    }
                  </SelectPrimitive.ItemText>

                  <SelectPrimitive.ItemIndicator>
                    <Check
                      size={16}
                    />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ),
            )}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}