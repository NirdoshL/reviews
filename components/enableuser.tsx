"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { client_url } from "@/config/urls";
import apiClient from "@/config/axios/client.instance";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { queryClient } from "@/providers/reactquery.provider";

interface EnableUserProps {
  id: string;
  onSuccess?: () => void;
}

export default function EnableUser({ id, onSuccess }: EnableUserProps) {
  const { handleSubmit } = useForm();

  const enableUserMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(client_url.users + `/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User Enabled successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
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

  const onSubmit = () => {
    enableUserMutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="p-1 bg-green-500 text-white rounded-md">Enable</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mx-auto"
        >
          <div className="gap-2">
            <h1 className="text-center text-lg text-green-600 font-semibold">
              Are you sure you want to disable this user?
            </h1>
            <p className="text-center text-sm w-full">
              This action can be undone!
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              variant="secondary"
              className="bg-green-600 text-white"
              disabled={enableUserMutation.isPending}
            >
              {enableUserMutation.isPending ? "Enable..." : "Enable"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
