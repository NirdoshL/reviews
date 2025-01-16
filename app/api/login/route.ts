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
    const payload = await request.json();
    const { data } = await apiServer.post(server_url.login, payload);
    if (data) {
      cookieStore.set("access", data.access_token, {
        maxAge: 6900,
        httpOnly: true,
        sameSite: "lax",
      });
      cookieStore.set("role", data.role, {
        maxAge: 6900,
        httpOnly: true,
        sameSite: "lax",
      });
      return successResponse("Login Successful!!", 200, {
        access_token: data.access_token,
        role: data.role,
      });
    }
    throw new Error("Something went wrong!!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    return errorResponse(
      err?.response?.data?.message || "Something went wrong!!"
    );
  }
}
