'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { CommandGroup } from 'cmdk';
import { ChevronDown, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { getLocationSuggestions } from '@/data/location';

interface InputLocationProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function InputLocation({ value, onValueChange }: InputLocationProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    search,
  ]);

  const {
    data: locations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'location',
      debouncedSearch,
    ],
    queryFn: async () => await getLocationSuggestions(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-muted hover:bg-white cursor-pointer"
        >
          {value || 'Anywhere'}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-80 p-0 md:min-w-sm"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Search Location"
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin opacity-50" />
              </div>
            ) : error ? (
              'Error loading locations'
            ) : (
              'Location Not Found'
            )}
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.placeId}
                  value={location.label}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue);
                    setOpen(false);
                  }}
                >
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
