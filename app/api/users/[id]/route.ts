import apiServer from "@/config/axios/server.instance";
import { server_url } from "@/config/urls";
import { errorResponse } from "@/lib/error";
import { successResponse } from "@/lib/success";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userCookie = request.cookies.get("access");
    const user = userCookie?.value;
    const { id } = await params;

    const { data } = await apiServer.get(server_url.users + "/disable/" + id, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    if (data) {
      return successResponse(
        "User Disabled Sucessfully!!",
        200,
        data.data || []
      );
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
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userCookie = request.cookies.get("access");
    const user = userCookie?.value;
    const { id } = await params;

    const { data } = await apiServer.get(server_url.users + "/enable/" + id, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    if (data) {
      return successResponse(
        "User Disabled Sucessfully!!",
        200,
        data.data || []
      );
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
