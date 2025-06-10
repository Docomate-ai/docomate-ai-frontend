import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ✅ Extend schema to include API keys
const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4),
  groqApi: z.string(),
  jinaApi: z.string(),
});

type FormField = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [page, setPage] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormField>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      groqApi: "",
      jinaApi: "",
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData: FormField) => {
      const response = await axios.post("/auth/register", formData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(<strong>{data.message}</strong>);
      setTimeout(() => {
        navigate("/auth/verify-otp");
      }, 2000);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(<strong>{error.response.data.message}</strong>);
      } else {
        toast(<strong>An unexpected error occurred. Please try again.</strong>);
      }
    },
  });

  const onSubmit: SubmitHandler<FormField> = (data) => {
    if (page === 1) {
      localStorage.setItem("email", data.email);
      setPage(2);
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to Docomate AI</h1>
                <p className="text-muted-foreground text-balance">
                  {page === 1
                    ? "Register your Docomate AI account"
                    : "Enter your embedding API keys"}
                </p>
              </div>

              {page === 1 && (
                <>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Gitanshu Sankhla"
                      {...register("name")}
                    />
                    {errors.name && (
                      <strong className="text-red-500 text-sm bg-red-100 p-1 pl-2 rounded-sm">
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
                      <strong className="text-red-500 text-sm bg-red-100 p-1 pl-2 rounded-sm">
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
                      <strong className="text-red-500 text-sm bg-red-100 p-1 pl-2 rounded-sm">
                        {errors.password.message}
                      </strong>
                    )}
                  </div>
                </>
              )}

              {page === 2 && (
                <>
                  <div className="grid gap-3">
                    <Label htmlFor="groq">Groq API Key</Label>
                    <Input
                      id="groq"
                      type="text"
                      placeholder="Enter your Groq API key"
                      {...register("groqApi")}
                    />
                    {!getValues("groqApi") && (
                      <p className="text-sm text-muted-foreground">
                        Don’t have a key?{" "}
                        <a
                          href="https://console.groq.com/keys"
                          target="_blank"
                          className="underline text-blue-600"
                          rel="noreferrer"
                        >
                          Click here to get one — it's absolutely free.
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="jina">Jina Embeddings API Key</Label>
                    <Input
                      id="jina"
                      type="text"
                      placeholder="Enter your Jina API key"
                      {...register("jinaApi")}
                    />
                    {!getValues("jinaApi") && (
                      <p className="text-sm text-muted-foreground">
                        Don’t have a key?{" "}
                        <a
                          href="https://cloud.jina.ai/user/api"
                          target="_blank"
                          className="underline text-blue-600"
                          rel="noreferrer"
                        >
                          Click here to get one — it's absolutely free.
                        </a>
                      </p>
                    )}
                  </div>
                </>
              )}

              <Button type="submit" className="w-full">
                {page === 1 ? "Enter APIs" : "Send Verification Code"}
              </Button>

              {page === 1 && (
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
