"use server";

import apiServer from "@/config/axios/server.instance";
import { server_url } from "@/config/urls";
import { errorResponse } from "@/lib/error";
import { successResponse } from "@/lib/success";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userCookie = request.cookies.get("access");
    const user = userCookie?.value;
    const { data } = await apiServer.get(server_url.sitesreview, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    if (data) {
      return successResponse("Review Fetched Sucessfully!!", 200, data || []);
    }
    throw new Error("Something went wrong!!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return errorResponse(
      err?.response?.data?.message || err?.message || "Something went wrong!!"
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const userCookie = request.cookies.get("access");
    const user = userCookie?.value;
    const payload = await request.json();
    console.log(payload);
    const { data } = await apiServer.post(server_url.sitesreview, payload, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    if (data) {
      return successResponse("Review Created Sucessfully!!", 200, data || []);
    }
    throw new Error("Something went wrong!!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    return errorResponse(
      err?.response?.data?.message || err?.message || "Something went wrong!!"
    );
  }
}
