"use server";

import apiServer from "@/config/axios/server.instance";
import { server_url } from "@/config/urls";
import { errorResponse } from "@/lib/error";
import { successResponse } from "@/lib/success";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userCookie = req.cookies.get("access");
    const user = userCookie?.value;
    const { data } = await apiServer.get(server_url.me, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    console.log(data);
    if (data) {
      return successResponse("User Fetched Sucessfully!!", 200, data || []);
    }
    throw new Error("Something went wrong!!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err.message);

    return errorResponse(
      err?.response?.data?.message || err?.message || "Something went wrong!!"
    );
  }
}
