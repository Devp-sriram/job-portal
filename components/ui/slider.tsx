"use client"

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value: propValue,
  min = 0,
  max = 50,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {

  const [rangeValue, setRangeValue] = React.useState<[number, number]>([min, max]);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={propValue ?? rangeValue}
      onValueChange={setRangeValue}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className="bg-[#CCC2C2] relative grow overflow-hidden rounded-full h-[2px]"
      >
        <SliderPrimitive.Range className="bg-[#222222] absolute h-full" />
      </SliderPrimitive.Track>

      {/* Two thumbs */}
      <SliderPrimitive.Thumb
        className="border-primary bg-white border-6 ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
      />
      <SliderPrimitive.Thumb
        className="border-primary bg-white border-6 ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderPrimitive.Root>
  );
}

export { Slider };
