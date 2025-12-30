"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import useWeb3Forms from "@web3forms/react";

const formSchema = z.object({
  name: z.string().min(5, "Please enter your full name"),
  email: z.email("Please enter a valid email"),
  subject: z.string().min(6, "Please enter a subject"),
  message: z.string().max(600, "Message too long").optional(),
  "h-captcha-response": z.string().min(1, "Please complete the CAPTCHA"),
});

type FormValues = z.infer<typeof formSchema>;
type SubmitState = "idle" | "sending" | "success" | "error";

export default function Form() {
  const WEB3FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORM_KEY;
  const HCAPTCHA_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_KEY;

   if (!WEB3FORM_KEY || !HCAPTCHA_KEY) {
    return null; // or a friendly fallback message
  }

  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { submit } = useWeb3Forms({
    access_key: WEB3FORM_KEY,
    settings: {
      from_name: "Tom's English Contact Form",
      subject: "New contact form message",
    },
    onSuccess: () => {
      setSubmitState("success");
      reset();
    },
    onError: () => {
      setSubmitState("error");
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitState("sending");
    await submit(data);
  };

  if (submitState === "success") {
    return <SuccessMessage />;
  }

  return (
    <>
      <ContactInstructions />

      <form className="php-email-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 form-group">
            <input
              {...register("name")}
              className="form-control"
              placeholder="Your Name"
            />
            {errors.name && <small>{errors.name.message}</small>}
          </div>

          <div className="col-md-6 form-group mt-3 mt-md-0">
            <input
              {...register("email")}
              className="form-control"
              placeholder="Your Email"
            />
            {errors.email && <small>{errors.email.message}</small>}
          </div>
        </div>

        <div className="form-group mt-3">
          <input
            {...register("subject")}
            className="form-control"
            placeholder="Subject"
          />
          {errors.subject && <small>{errors.subject.message}</small>}
        </div>

        <div className="form-group mt-3">
          <textarea
            {...register("message")}
            className="form-control"
            rows={5}
            placeholder="Message"
          />
          {errors.message && <small>{errors.message.message}</small>}
        </div>

        <div className="form-group mt-3">
          <HCaptcha
            sitekey={HCAPTCHA_KEY}
            reCaptchaCompat={false}
            onVerify={(token) =>
              setValue("h-captcha-response", token, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
          {errors["h-captcha-response"] && (
            <small>{errors["h-captcha-response"].message}</small>
          )}
        </div>

        <div className="form-submit mt-3">
          <button type="submit" disabled={submitState === "sending"}>
            {submitState === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>

        {submitState === "error" && (
          <div className="error-message mt-3">
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    </>
  );
}

const ContactInstructions = () => {
  return (
    <div>
      <h3>Get in Touch</h3>
      <p>
        Have a question or want to start learning? Send me a message and I'll
        get back to you as soon as possible.
      </p>
    </div>
  );
};

const SuccessMessage = () => {
  return (
    <div className="success-card">
      <h3>Thank you for your message!</h3>
      <p>
        Your message has been sent successfully.
        <br />
        I'll get back to you within 24 hours.
      </p>
    </div>
  );
};
