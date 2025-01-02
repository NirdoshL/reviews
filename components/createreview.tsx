"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { client_url } from "@/config/urls";
import apiClient from "@/config/axios/client.instance";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { queryClient } from "@/providers/reactquery.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, reviewSchemaType } from "@/types/auth/review";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { AxiosError } from "axios";

interface CreateActionsProps {
  onSuccess?: () => void;
}
export default function CreateActions({ onSuccess }: CreateActionsProps) {
  const form = useForm<reviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      sitename: "",
      placeid: "",
    },
  });
  const { mutate: handleCreate, isPending: isCreatePending } = useMutation<
    Response,
    AxiosError,
    reviewSchemaType
  >({
    mutationFn: async (value: reviewSchemaType) => {
      const response = await apiClient.post(client_url.reviews, { ...value });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reviews created successfully");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      form.reset();
      onSuccess?.();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const originalError = Array.isArray(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error?.response?.data as any)?.message
      )
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error?.response?.data as any)?.message[0]
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error?.response?.data as any)?.message;
      toast.error(originalError ?? "Failed. Please try again.");
    },
  });

  return (
    <Dialog>
      <DialogTrigger className="my-4">
        <span className="p-2 bg-green-500 text-white rounded-md my-4">
          Create Review
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add new restaurant for reviews</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              handleCreate as SubmitHandler<reviewSchemaType>
            )}
            className="w-full flex flex-col gap-5 mx-auto"
          >
            <div className="gap-2">
              <div className="space-y-2">
                <Label htmlFor="sitename" className="text-gray-700">
                  Site Name
                </Label>
                <FormField
                  control={form.control}
                  name="sitename"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Site Name"
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
                <Label htmlFor="placeid" className="text-gray-700">
                  Place ID
                </Label>
                <FormField
                  control={form.control}
                  name="placeid"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Google Place ID"
                          className="w-full px-3 py-2 border rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                variant="secondary"
                className="w-full bg-green-600 hover:bg-green-500 text-white"
                disabled={isCreatePending}
              >
                {isCreatePending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
