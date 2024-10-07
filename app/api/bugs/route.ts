"use server";

import { z } from "zod";
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const createBugSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be a string." })
    .min(4, { message: "Title must be at least 4 characters." })
    .max(255, { message: "Title must be at most 255 characters." }),
  description: z
    .string({ invalid_type_error: "Description must be a string." })
    .min(4, { message: "Description must be at least 4 characters." })
    .max(255, {
      message: "Description must be at most 255 characters.",
    }),
});

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
