import React from "react";
import { db } from "../_lib/prisma";
import { Status } from "@prisma/client";
import { Priority } from "@prisma/client";
import BugCard from "./_components/BugCard";

const BugsPage = async () => {
  const bugs = await db.bug.findMany();

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bugs.map((bug) => (
          <BugCard
            id={bug.id}
            key={bug.id}
            assignedTo="Jose"
            title={bug.title}
            summary={bug.summary}
            status={bug.status as Status}
            priority={bug.priority as Priority}
          />
        ))}
      </div>
    </section>
  );
};

export default BugsPage;
