"use client";

import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

type CheckBoxProps = {
  label?: string;
  value?: boolean | "indeterminate";
  setChecked?(checked: boolean | "indeterminate"): void;
};

export default function CheckBox({ label, value, setChecked }: CheckBoxProps) {
  return (
    <div className="flex mb-5">
      <Checkbox.Root
        className="bg-primary border-secondary-grey border rounded-sm w-6 h-6 mr-3 data-[state=checked]:bg-secondary-grey"
        checked={value}
        onCheckedChange={setChecked}
        id="c1"
      >
        <Checkbox.Indicator>
          <Check className="text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="Label" htmlFor="c1">
        {label}
      </label>
    </div>
  );
}
