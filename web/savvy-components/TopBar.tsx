"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function TopBar() {
  // ...
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="bg-black px-3 py-3">

    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <div className="flex space-x-8 min-w-[300px] max-w-1/2">
                <FormControl>
                  <Input
                    placeholder="Looking for something else? Start a new shopping trip"
                    {...field}
                  />
                </FormControl>
                <Button type="submit">Submit</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
    </div>
  );
}

export default TopBar;

/*
<Input placeholder="Looking for something else? Start a new shopping trip" />
        <Button type="submit">Search</Button>
        */
