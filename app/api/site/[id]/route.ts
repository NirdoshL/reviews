import apiServer from "@/config/axios/server.instance";
import { server_url } from "@/config/urls";
import { errorResponse } from "@/lib/error";
import { successResponse } from "@/lib/success";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userCookie = request.cookies.get("access");
    const user = userCookie?.value;
    const { id } = await params;

    const { data } = await apiServer.get(
      server_url.sitesreview + "/sites/" + id,
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    console.log(data);
    if (data) {
      return successResponse("Review Fetched Sucessfully!!", 200, data || []);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userCookie = request.cookies.get("access");
    const user = userCookie?.value;
    const { id } = await params;

    const { data } = await apiServer.delete(server_url.sitesreview + "/" + id, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    if (data) {
      return successResponse(
        "Review Delete Sucessfully!!",
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
