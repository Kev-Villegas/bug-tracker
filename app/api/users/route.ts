/* eslint-disable */
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await db.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}
