import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const loginSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4),
});

type FormField = z.infer<typeof loginSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const response = await axios.post("/auth/register", formData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Register Success:", data);
      toast.success(
        <div>
          <strong>{data.message}</strong>
        </div>
      );
      setTimeout(() => {
        navigate("/auth/verify-otp");
      }, 2000);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Register Failed:", error.response.data.message);
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

  const onSubmit: SubmitHandler<FormField> = (data) => {
    try {
      // Trigger the mutation with the form data
      localStorage.setItem("email", data.email);
      mutation.mutate(data);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast(
        <div>
          <strong>An unexpected error occurred. Please try again.</strong>
        </div>
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden  p-0">
        <CardContent className="grid p-0  md:grid-cols-1">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <strong className="text-red-500 text-sm font-medium m-b-2 bg-red-100 p-0.5 pl-2 rounded-sm">
                {errors.root.message}
              </strong>
            )}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to Docomate AI</h1>
                <p className="text-muted-foreground text-balance">
                  Register your Docomate AI account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Gitanshu sankhla"
                  {...register("name")}
                />
                {errors.name && (
                  <strong className="text-red-500 text-sm font-medium m-b-2 bg-red-100 p-0.5 pl-2 rounded-sm">
                    {errors.name.message}
                  </strong>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <strong className="text-red-500 text-sm font-medium m-b-2 bg-red-100 p-0.5 pl-2 rounded-sm">
                    {errors.email.message}
                  </strong>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <strong className="text-red-500 text-sm font-medium m-b-2 bg-red-100 p-0.5 pl-2 rounded-sm">
                    {errors.password.message}
                  </strong>
                )}
              </div>
              <Button type="submit" className="w-full">
                Send Verification Code
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
