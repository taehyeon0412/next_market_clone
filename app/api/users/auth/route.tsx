import client from "@/app/_libs/_server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const res = await req.json();

  console.log(res);

  return NextResponse.json({ res });
}
