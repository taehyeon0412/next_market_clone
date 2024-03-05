import client from "@/app/_libs/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await client.user.create({
    data: {
      email: "ddddddd",
      name: "hi",
    },
  });

  return NextResponse.json({
    ok: true,
    data: "xx",
  });
}
