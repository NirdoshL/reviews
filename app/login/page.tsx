"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, LoginSchemaType } from "@/types/auth/login";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/config/axios/client.instance";
import { client_url } from "@/config/urls";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: handleLogin, isPending: isLoginPending } = useMutation<
    Response,
    AxiosError,
    LoginSchemaType
  >({
    mutationFn: async (value: LoginSchemaType) => {
      const { data } = await apiClient.post(client_url.login, {
        ...value,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Login Successfull!!");
      form.reset();
      return router.replace("/dvls/dashboard");
    },
    onError: (error) => {
      const originalError = Array.isArray(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error?.response?.data as any)?.message
      )
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error?.response?.data as any)?.message[0]
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error?.response?.data as any)?.message;
      toast.error(originalError ?? "Something went wrong!");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-red-500 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-white">Your reviews matter. Let&apos;s dive in!</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              handleLogin as SubmitHandler<LoginSchemaType>
            )}
            className="p-8 space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Your Email Address"
                        className="w-full px-3 py-2 border rounded-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border rounded-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoginPending}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition duration-300"
            >
              Log In
            </Button>
          </form>
        </Form>
        <div className="px-8 pb-8 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-red-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <div className="absolute top-4 left-4 text-yellow-500">
          <Star className="h-8 w-8" />
        </div>
        <div className="absolute bottom-4 right-4 text-red-500">
          <Star className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
