import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { patchBugSchema } from "@/app/_schemas/validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validation = patchBugSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  if (body.assignedToUserId) {
    const user = await db.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

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
      assignedToUserId: body.assignedToUserId,
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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
