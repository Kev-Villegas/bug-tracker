import React from "react";
import { db } from "../_lib/prisma";
import BugCard from "../_components/BugCard";

const BugsPage = async () => {
  const bugs = await db.bug.findMany();
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bugs.map((bug) => (
          <BugCard
            key={bug.id}
            title={bug.title}
            description={bug.description}
            assignedTo="Jose"
            status="in-progress"
          />
        ))}
      </div>
    </section>
  );
};

export default BugsPage;
