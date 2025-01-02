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
    const { data } = await apiServer.post(server_url.register, payload);
    if (data.data) {
      cookieStore.set("vt", data.data[0].code, {
        maxAge: 6900,
        httpOnly: true,
        sameSite: "lax",
      });
      return successResponse("Login Successful!!", 200, data.data);
    }
    throw new Error("Something went wrong!!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return errorResponse(
      err?.response?.data?.message || "Something went wrong!!"
    );
  }
}
