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
import { useState } from "react";

const formSchema = z.object({
  first_name: z.string().min(2, "Please enter your full first name"),
  last_name: z.string().min(2, "Please enter your full last name"),
  email: z.email("Please enter a valid email"),
  level: z.string().nonempty("Please select your current English level"),
  message: z.string().max(600, "Message too long").optional(),
  "h-captcha-response": z.string().nonempty("Please complete the CAPTCHA"),
});

type FormValues = z.infer<typeof formSchema>;

const levelTypes = [
  { value: "0", label: "I have never studied English" },
  { value: "1", label: "I have a beginner level of English" },
  { value: "2", label: "I have an intermediate level of English" },
  { value: "3", label: "I have an advanced level of English" },
];

export default function ClassForm2() {
  const [submitted, setSubmitted] = useState<null | boolean>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      level: "",
      message: "",
      "h-captcha-response": "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setSubmitted(null);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

    try {
      const res = await fetch(`${baseUrl}/api/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setSubmitted(false);
      }
    } catch (err) {
      console.error(err);
      setSubmitted(false);
    }
  };

  const onHCaptchaChange = (token: string) =>
    form.setValue("h-captcha-response", token, { shouldValidate: true });

  return (
    <div className="mt-6 flex flex-col px-[10px] md:border sm:p-4 gap-4">
      <h3 className="mt-2! mb-2 text-lg font-semibold">Registration Form</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        >
          {/* Text Inputs */}
          <FormField
            name="first_name"
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
            name="last_name"
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

          {/* Select Input */}
          <FormField
            name="level"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
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

          {/* CAPTCHA */}
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
              type="submit"
              disabled={form.formState.isSubmitting}
              className="cursor-pointer"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            {submitted === true && (
              <p className="text-sm text-green-600">
                Application sent successfully!
              </p>
            )}
            {submitted === false && (
              <p className="text-sm text-red-600">
                Something went wrong. Try again later.
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
