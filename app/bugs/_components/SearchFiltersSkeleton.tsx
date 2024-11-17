import React from "react";

const SearchFiltersSkeleton = () => {
  return (
    <div>
      <div className="mb-2 grid gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-300"></div>
            <div className="h-10 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="h-10 w-40 rounded-md bg-gray-300"></div>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gray-300"></div>
          <div className="h-10 w-10 rounded-lg bg-gray-300"></div>
          <div className="mx-1 h-6 w-px bg-gray-300"></div>
          <div className="h-10 w-10 rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchFiltersSkeleton;
