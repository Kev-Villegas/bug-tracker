import React from "react";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import BugTicketDetail from "@/app/bugs/_components/BugTicketDetail";

interface Props {
  params: {
    id: string;
  };
}

const BugsDetailsPage = async ({ params }: Props) => {
  const bug = await db.bug.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!bug) notFound();

  return (
    <BugTicketDetail
      id={bug.id}
      title={bug.title}
      status={bug.status}
      summary={bug.summary}
      assignedTo="John Doe"
      priority={bug.priority}
      createdAt={bug.createdAt}
      updatedAt={bug.updatedAt}
      description={bug.description}
    />
  );
};

export default BugsDetailsPage;
