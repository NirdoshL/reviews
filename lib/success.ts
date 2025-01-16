"use server";
import { NextResponse } from "next/server";

export const successResponse = async (
  message?: string,
  status?: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
) => {
  return NextResponse.json(
    {
      message: message ? message : "Success without message from server!",
      data: data ? data : null,
    },
    { status: status ? status : 200 }
  );
};
