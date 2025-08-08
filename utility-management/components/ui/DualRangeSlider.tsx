import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface DualRangeSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  labelPosition?: 'top' | 'bottom';
  label?: (value: number) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>((componentProps, ref) => {
  const { className, label, labelPosition = 'top', ...restProps } = componentProps;
  const value = componentProps.value || [componentProps.min, componentProps.max];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center py-4', className)}
      {...restProps}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {value?.map((val, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing">
            {label && (
              <div
                className={cn(
                  'absolute w-max text-xs font-semibold px-2 py-1 rounded-md bg-card border border-border shadow-sm -translate-x-1/2 left-1/2',
                  labelPosition === 'top' && '-top-10',
                  labelPosition === 'bottom' && 'top-7'
                )}
              >
                {label(val)}
              </div>
            )}
          </SliderPrimitive.Thumb>
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
