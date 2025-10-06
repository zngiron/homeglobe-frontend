'use client';

import { useState } from 'react';

import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface InputDateProps {
  value?: string;
  onValueChange?: (value: string) => void;
  align?: 'start' | 'center' | 'end';
  disabledBefore?: string | undefined;
}

export function InputDate({ value, onValueChange, disabledBefore, align = 'start' }: InputDateProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="justify-start cursor-pointer"
        >
          {value ? format(value, 'MMMM d, yyyy') : 'Add Date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align}>
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => onValueChange?.(date ? date.toISOString() : '')}
          onDayClick={() => setOpen(false)}
          disabled={(date) => (disabledBefore ? new Date(disabledBefore) > date : false)}
        />
      </PopoverContent>
    </Popover>
  );
}
