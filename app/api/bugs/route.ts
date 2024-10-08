"use server";

import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createBugSchema } from "@/app/_schemas/validationSchemas";

export async function POST(request: NextRequest) {
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
      description: body.description,
    },
  });
  return NextResponse.json(newBug, { status: 201 });
}
