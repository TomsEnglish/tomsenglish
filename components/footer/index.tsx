"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { footerContent } from "./content/en";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full mt-14 pb-8 text-sm">
      <div className="w-fit">
        <div className="grid grid-cols-2 sm:grid-cols-2  gap-4">
          {footerContent.sections.map((section) => (
            <FooterSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}

          {/* <div className="prose w-full flex flex-col">
            <h4>{footerContent.newsletter.title}</h4>
            <NewsletterForm />
          </div> */}
        </div>
      </div>

      <Separator className="my-8 w-full" />

      <span>{footerContent.title}</span>

      {/* <ul className="flex flex-row items-center gap-6 py-4 list-none p-0">

        {footerContent.social.map((social) => (
          <li key={social.href}>
            <a href={social.href} target="_blank" rel="noopener noreferrer">
              <Image
                src={social.icon}
                height={32}
                width={32}
                alt={social.alt}
                unoptimized
              />
            </a>
          </li>
        ))}
      </ul> */}
    </footer>
  );
}

function FooterSection({
  title,
  items,
}: {
  title: string;
  items: { text: string; href: string }[];
}) {
  return (
    <div className="prose w-full flex flex-col px-8">
      <h4>{title}</h4>
      <ul className="flex flex-col list-none p-0!">
        {items.map((item) => (
          <li key={item.href} className="p-0! mt-0! text-sm">
            <a href={item.href} className="font-normal!">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const NewsletterForm = () => {
  type FormValues = { email: string };
  const formSchema = z.object({ email: z.string().email() });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = (data: FormValues) => console.log(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit">
          Subscribe
        </Button>
      </form>
    </FormProvider>
  );
};
