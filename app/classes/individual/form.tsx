"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import useWeb3Forms from "@web3forms/react";
import { useState } from "react";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  message: string;
  "h-captcha-response": string;
};

const levelTypes = [
  { value: "1", label: "I have never studied English" },
  { value: "2", label: "I have a beginner level of English" },
  { value: "3", label: "I have an intermediate level of English" },
  { value: "4", label: "I have an advanced level of English" },
];

export default function ClassForm() {
  const formSchema = z.object({
    firstName: z.string().min(2, "Please enter your full first name"),
    lastName: z.string().min(2, "Please enter your full last name"),
    email: z.email(),
    level: z.string().nonempty("Please select your current English level"),
    message: z.string().max(600),
    "h-captcha-response": z.string().nonempty("Please complete the CAPTCHA"),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      level: "",
      message: "",
      "h-captcha-response": "",
    },
  });

  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { submit } = useWeb3Forms({
    access_key: "052660b7-76c1-47ac-a9ea-8cfefa140382",
    settings: {
      from_name: "Tom's English Contact Form",
      subject: "New contact form message",
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
    },
    onError: () => setIsSuccess(false),
  });

  const handleSubmit = (data: FormValues) => submit(data);
  const onHCaptchaChange = (token: string) =>
    form.setValue("h-captcha-response", token, { shouldValidate: true });

  return (
    <>
      <h3>Registration</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="px-[10px] md:border sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        >
          {/* Text Inputs */}
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First name *" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last name *" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email address *" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select Inputs */}

          <FormField
            name="level"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full!">
                    <SelectTrigger>
                      <SelectValue placeholder="Select level *" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levelTypes.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Textarea */}
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Textarea placeholder="Message (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Captcha */}
          <FormField
            name="h-captcha-response"
            control={form.control}
            render={() => (
              <FormItem className="sm:col-span-2">
                <HCaptcha
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  reCaptchaCompat={false}
                  onVerify={onHCaptchaChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex flex-row items-center gap-4 sm:col-span-2">
         
            <Button
              variant="yellow"
              className="w-fit cursor-pointer"
              type="submit" disabled={form.formState.isSubmitting}
            >
Register
            </Button>
            {isSuccess === true && (
              <p className="text-sm text-green-600">Message sent successfully.</p>
            )}
            {isSuccess === false && (
              <p className="text-sm text-red-600">An error occurred. Try again later.</p>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
