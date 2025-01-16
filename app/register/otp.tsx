"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client_url } from "@/config/urls";
import apiClient from "@/config/axios/client.instance";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  tokens: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});
type inputotpprops = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};
export default function InputOTPForm({ open, setOpen }: inputotpprops) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tokens: "",
    },
  });

  const { mutate: handleRegister, isPending: isRegisterPending } = useMutation<
    Response,
    AxiosError,
    z.infer<typeof FormSchema>
  >({
    mutationFn: async (value: z.infer<typeof FormSchema>) => {
      const { data } = await apiClient.post(client_url.verifyOTP, {
        ...value,
      });
      return data;
    },
    onSuccess: () => {
      toast("User Verified Successfull!!");
      form.reset();
      router.push("/login");
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[300px] sm:max-w-md rounded-xl flex flex-col justify-center items-center mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Enter OTP</DialogTitle>
          <DialogDescription>Please enter the 4-digit OTP.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              handleRegister as SubmitHandler<z.infer<typeof FormSchema>>
            )}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="tokens"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center items-center">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Ask Nirdosh for OTP.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="w-full flex justify-between">
              <Button
                type="submit"
                disabled={isRegisterPending}
                className="bg-green-500 hover:bg-green-500/80"
              >
                Verify OTP
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="bg-red-500 hover:bg-red-500/80 text-white  mb-4"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
