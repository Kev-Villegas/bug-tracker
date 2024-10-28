"use server";

import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { createBugSchema } from "@/app/_schemas/validationSchemas";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const validation = createBugSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });
  }

  const newBug = await db.bug.create({
    data: {
      title: body.title,
      summary: body.summary,
      description: body.description,
      priority: body.priority,
      status: body.status,
    },
  });
  return NextResponse.json(newBug, { status: 201 });
}
