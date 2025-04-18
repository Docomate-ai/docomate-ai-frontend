"use client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { toast } from "sonner";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

const FormSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: localStorage.getItem("email") || "",
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData: { email: string; otp: string }) => {
      const response = await axios.post("/auth/verify", {
        ...formData,
        otp: Number(formData.otp),
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("OTP verification Success:", data);
      toast.success(
        <div>
          <strong>{data.message}</strong>
        </div>
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        console.log("OTP verfication Failed:", error.response.data.message);
        toast.error(
          <div>
            <strong>{error.response.data.message}</strong>
          </div>
        );
      } else {
        console.error("Unexpected error:", error);
        toast(
          <div>
            <strong>An unexpected error occurred. Please try again.</strong>
          </div>
        );
      }
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      mutation.mutate(data);
    } catch (error) {
      console.error("Error submitting otp form: ", error);
    }
  }

  return (
    <div className="flex flex-col w-2xl m-auto text-center">
      <h1 className="text-2xl font-bold">Enter your One Time Password</h1>
      <br />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border-2 border-black p-4 rounded-2xl"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-3">
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup className="flex gap-0.5 border-2 border-black rounded-md">
                      <InputOTPSlot index={0} className="bg-gray-300" />
                      <InputOTPSlot index={1} className="bg-gray-300" />
                      <InputOTPSlot index={2} className="bg-gray-300" />
                      <InputOTPSlot index={3} className="bg-gray-300" />
                      <InputOTPSlot index={4} className="bg-gray-300" />
                      <InputOTPSlot index={5} className="bg-gray-300" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
