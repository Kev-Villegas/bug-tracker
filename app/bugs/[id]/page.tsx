import React from "react";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import BugTicketDetail from "../_components/BugTicketDetail";

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
      description={bug.description}
      id={bug.id}
      title={bug.title}
      status={bug.status}
      assignedTo="John Doe"
      createdAt={bug.createdAt}
      updatedAt={bug.updatedAt}
    />
  );
};

export default BugsDetailsPage;
