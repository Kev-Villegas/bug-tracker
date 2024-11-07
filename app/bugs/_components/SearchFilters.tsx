"use client";

import Link from "next/link";
import BugCard from "./BugCard";
import { Bug } from "@prisma/client";
import { Search } from "lucide-react";
import { useState, useCallback } from "react";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/app/_components/ui/select";

interface SearchFilterProps {
  bugs: Bug[];
}

const SearchFilters = ({ bugs }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "old">("recent");

  const handleSortOrderChange = useCallback((value: "recent" | "old") => {
    setSortOrder(value);
  }, []);

  const filterBugs = () => {
    const filtered = bugs.filter((bug) => {
      const matchesSearchQuery = bug.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        bug.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesPriority =
        priorityFilter === "all" ||
        bug.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearchQuery && matchesStatus && matchesPriority;
    });

    if (sortOrder === "recent") {
      return filtered.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    } else if (sortOrder === "old") {
      return filtered.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      );
    }

    return filtered;
  };

  const filteredBugs = filterBugs();

  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-3 md:grid-cols-4">
        <div>
          <Label htmlFor="search" className="mb-2 block">
            Search Bugs
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search bugs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="priority" className="mb-2 block">
            Priority
          </Label>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status" className="mb-2 block">
            Status
          </Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sortOrder" className="mb-2 block">
            Sort by Update
          </Label>
          <Select value={sortOrder} onValueChange={handleSortOrderChange}>
            <SelectTrigger id="sortOrder">
              <SelectValue placeholder="Select sorting order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Updated Recently</SelectItem>
              <SelectItem value="old">Updated A Long Time Ago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex items-center">
          <Button>
            <Link href={"/bugs/new"}>Create New Bug Ticket</Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBugs.length > 0 ? (
          filteredBugs.map((bug) => <BugCard key={bug.id} bug={bug} />)
        ) : (
          <h3 className="text-xl font-semibold">No results found</h3>
        )}
      </div>
    </>
  );
};

export default SearchFilters;
