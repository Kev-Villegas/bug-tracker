import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createBugSchema } from "@/app/_schemas/validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = createBugSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const bug = await db.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bug)
    return NextResponse.json(
      { message: "Bug Ticket not found" },
      { status: 404 },
    );

  const updatedBug = await db.bug.update({
    where: { id: bug.id },
    data: {
      title: body.title,
      summary: body.summary,
      description: body.description,
      priority: body.priority,
      status: body.status,
    },
  });
  return NextResponse.json(updatedBug);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const bug = await db.bug.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!bug)
    return NextResponse.json(
      { message: "Bug Ticket not found" },
      { status: 404 },
    );

  await db.bug.delete({ where: { id: bug.id } });
  return NextResponse.json({});
}
