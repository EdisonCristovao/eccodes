"use client";

import React, { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckBoxProps = {
  label?: string;
  value?: boolean | "indeterminate";
  setChecked?(checked: boolean | "indeterminate"): void;
};

export default function CheckBox({ label, value, setChecked }: CheckBoxProps) {
  const id = useId();

  return (
    <div className="flex mb-5">
      <Checkbox
        id={id}
        checked={value}
        onCheckedChange={setChecked}
        className="size-6 mr-3 border-muted-foreground bg-background data-checked:bg-muted-foreground data-checked:border-muted-foreground data-checked:text-foreground"
      />
      <Label htmlFor={id} className="text-base font-normal text-muted-foreground">
        {label}
      </Label>
    </div>
  );
}
