import React from "react";
import { db } from "../_lib/prisma";
import SearchFilters from "./_components/SearchFilters";

const BugsPage = async () => {
  const bugs = await db.bug.findMany();

  const formattedBugs = bugs.map((bug) => ({
    ...bug,
    createdAt: bug.createdAt.toISOString(),
    updatedAt: bug.updatedAt.toISOString(),
  }));

  return (
    <section>
      <div className="px-4">
        <SearchFilters bugs={formattedBugs} />
      </div>
    </section>
  );
};

export default BugsPage;
