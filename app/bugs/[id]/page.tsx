import React from "react";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

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
    <section>
      <div>{bug.title}</div>
    </section>
  );
};

export default BugsDetailsPage;
