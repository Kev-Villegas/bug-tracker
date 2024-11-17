import React from "react";

const BugCardSkeleton = () => {
  return (
    <div className="mt-4 animate-pulse space-y-4">
      <div className="h-6 w-3/4 rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
      <div className="h-8 w-full rounded bg-gray-200"></div>
      <br />
    </div>
  );
};

export default BugCardSkeleton;
