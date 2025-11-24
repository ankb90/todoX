import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { options } from '@/lib/data';

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      {/* Select button */}
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-40 justify-between'
          size='lg'
        >
          {dateQuery
            ? options.find((option) => option.value === dateQuery)?.label
            : 'Chọn ngày'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      {/* Popover content  */}
      <PopoverContent className='w-40 p-0'>
        <Command className=''>
          <CommandList className=''>
            <CommandGroup className=''>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setDateQuery(currentValue);
                    setOpen(false);
                  }}
                  className=''
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      dateQuery === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimeFilter;
