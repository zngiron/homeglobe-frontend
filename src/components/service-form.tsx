'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputDate } from '@/components/input-date';
import { InputNumber } from '@/components/input-number';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  location: z.string().min(1, {
    message: 'Location is required',
  }),
  from: z.string().min(1, {
    message: 'Check-in date is required',
  }),
  to: z.string().min(1, {
    message: 'Check-out date is required',
  }),
  adults: z.number().min(1, {
    message: 'Add at least one adult',
  }),
  children: z.number().optional(),
});

export function ServiceForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      from: '',
      to: '',
      adults: 1,
      children: 0,
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    router.push('/?success=true');
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="grid grid-cols-2 gap-4 items-start"
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-muted"
                  placeholder="Anywhere"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <InputDate
                  value={field.value}
                  onValueChange={field.onChange}
                  disabledBefore={new Date(new Date().setHours(0, 0, 0, 0)).toISOString()}
                  align="start"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <InputDate
                  value={field.value}
                  onValueChange={field.onChange}
                  disabledBefore={
                    form.watch('from')
                      ? new Date(
                          new Date(form.watch('from')).setDate(new Date(form.watch('from')).getDate() + 1),
                        ).toISOString()
                      : undefined
                  }
                  align="end"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adults"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adults</FormLabel>
              <FormControl>
                <InputNumber
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="children"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Children</FormLabel>
              <FormControl>
                <InputNumber
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="col-span-full h-12 cursor-pointer"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}
