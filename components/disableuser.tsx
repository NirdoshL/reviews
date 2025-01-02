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

interface DisableUserProps {
  id: string;
  onSuccess?: () => void;
}

export default function DisableUser({ id, onSuccess }: DisableUserProps) {
  const { handleSubmit } = useForm();

  const disableUserMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.get(client_url.users + `/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User disabled successfully");
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
    disableUserMutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="p-1 bg-red-500 text-white rounded-md">Disable</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mx-auto"
        >
          <div className="gap-2">
            <h1 className="text-center text-lg text-red-600 font-semibold">
              Are you sure you want to disable this user?
            </h1>
            <p className="text-center text-sm w-full">
              This action can be undone!
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              variant="destructive"
              disabled={disableUserMutation.isPending}
            >
              {disableUserMutation.isPending ? "Disabling..." : "Disable"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
