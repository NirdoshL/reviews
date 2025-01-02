"use server";

import apiServer from "@/config/axios/server.instance";
import { server_url } from "@/config/urls";
import { errorResponse } from "@/lib/error";
import { successResponse } from "@/lib/success";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userCookie = request.cookies.get("vt");
    const user = userCookie?.value;
    const payload = await request.json();
    const { data } = await apiServer.post(server_url.verifyOTP, {
      code: user,
      tokens: payload.tokens,
    });
    if (data) {
      cookieStore.delete("vt");
      return successResponse(
        "Otp Verified Sucessfully!!",
        200,
        data.data || []
      );
    }
    throw new Error("Something went wrong!!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return errorResponse(
      err?.response?.data?.message || err?.message || "Something went wrong!!"
    );
  }
}
