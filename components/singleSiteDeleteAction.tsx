"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { client_url } from "@/config/urls";
import apiClient from "@/config/axios/client.instance";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Trash } from "lucide-react";
import { queryClient } from "@/providers/reactquery.provider";

interface DeleteActionProps {
  id: string;
  onSuccess?: () => void;
}

export default function SingleDeleteAction({
  id,
  onSuccess,
}: DeleteActionProps) {
  const { handleSubmit } = useForm();

  const deleteReviewsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete(
        client_url.sitesreview + `/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reviews deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["site-reviews"],
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
    deleteReviewsMutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash className="mr-2 h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mx-auto"
        >
          <div className="gap-2">
            <h1 className="text-center text-lg text-red-600 font-semibold">
              Are you sure you want to delete this site?
            </h1>
            <p className="text-center text-sm w-full">
              This action can&apos;t be undone!
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              variant="destructive"
              disabled={deleteReviewsMutation.isPending}
            >
              {deleteReviewsMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
