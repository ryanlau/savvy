"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image'
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const formSchema = z.object({
  query: z.string().min(0, {
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
    <div className="flex bg-gray-900 py-6">

    <div className="w-[350px] pl-20">

    <Image
      src="/savvywhite.png"
      width={120}
      height={40}
      alt="Logo"
    />
    </div>
    
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grow">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div className="flex space-x-2 min-w-[300px] max-w-1/2">
                    <FormControl>
                      <Input placeholder="Looking for something else? Start a new shopping trip" {...field} />
                    </FormControl>
                    <Button type="submit" variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>


    <div className="w-[350px] flex items-center justify-end pr-5">
      <Menu width="25" height="25" color="white"/>
    </div>
    </div>
  );
}

export default TopBar;

/*
<Input placeholder="Looking for something else? Start a new shopping trip" />
        <Button type="submit">Search</Button>
        */
