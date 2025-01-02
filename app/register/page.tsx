"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/types/auth/register";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "@/config/axios/client.instance";
import { toast } from "sonner";
import { client_url } from "@/config/urls";
import { useState } from "react";
import InputOTPForm from "./otp";

export default function SignUpPage() {
  const [open, setOpen] = useState(false);
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: handleRegister, isPending: isRegisterPending } = useMutation<
    Response,
    AxiosError,
    RegisterSchemaType
  >({
    mutationFn: async (value: RegisterSchemaType) => {
      const { data } = await apiClient.post(client_url.register, {
        ...value,
      });
      return data;
    },
    onSuccess: () => {
      toast("User Registered Successfull!!");
      setOpen(true);
      form.reset();
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
      toast(originalError ?? "Something went wrong!");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-red-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full relative">
        <div className="bg-red-500 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Join the Conversation!
          </h1>
          <p className="text-red-100">Start sharing your experiences today.</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              handleRegister as SubmitHandler<RegisterSchemaType>
            )}
            className="p-8 space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Your Full Name"
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
              disabled={isRegisterPending}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition duration-300"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="px-8 pb-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-red-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
        <div className="absolute top-4 left-4 text-yellow-400 animate-pulse">
          <Star className="h-8 w-8" />
        </div>
        <div className="absolute bottom-4 right-4 text-red-400 animate-pulse">
          <MessageSquare className="h-8 w-8" />
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-400 animate-bounce">
          <Star className="h-6 w-6" />
        </div>
      </div>
      <InputOTPForm setOpen={setOpen} open={open} />
    </div>
  );
}
