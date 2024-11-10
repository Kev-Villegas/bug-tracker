import React from "react";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import BugTicketDetail from "@/app/bugs/_components/BugTicketDetail";

interface Props {
  params: {
    id: string;
  };
}

const BugsDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const bug = await db.bug.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!bug) notFound();

  return <div>{session && <BugTicketDetail bug={bug} />}</div>;
};

export default BugsDetailsPage;
