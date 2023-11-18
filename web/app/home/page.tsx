//Home page which allows searching for a product

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation'
 

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
import { Search } from "lucide-react"

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Type at least 2 characters.",
  }),
});

export function TopBar() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    router.push(`/search?q=${values.query}`)
  };
  // center the div on the page
  return (
    // Flex container for centering
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-center">Savvy</h1>
          <p className="text-center text-gray-500">
            Find the best products for you
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input className="w-[500px]" placeholder="Start a shopping trip" {...field} />
                    </FormControl>
                    <Button type="submit">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="h-[100px]">
        </div>
      </div>
    </div>
  );
}

export default TopBar;
