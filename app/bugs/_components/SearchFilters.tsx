"use client";

import Link from "next/link";
import BugCard from "./BugCard";
import useBugs from "@/app/_hooks/useBugs";
import { useState, useCallback } from "react";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { CreditCard, RotateCcw, Search, TableOfContents } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/app/_components/ui/select";

const SearchFilters = () => {
  const { data: bugs = [], isLoading, isError, refetch } = useBugs();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"card" | "list">("card");
  const [refreshLoading, setRefreshLoading] = useState(false);
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

  const handleRefresh = async () => {
    setRefreshLoading(true);
    setTimeout(async () => {
      await refetch();
      setRefreshLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-semibold">Loading bugs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          Error fetching bugs. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 grid gap-4 sm:grid-cols-3 md:grid-cols-4">
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
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="mt-4">
          <Button>
            <Link href={"/bugs/new"}>Create New Bug Ticket</Link>
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="group relative">
            <Button
              size="icon"
              variant={view === "card" ? "solid" : "outline"}
              onClick={() => setView("card")}
            >
              <CreditCard
                className={view === "card" ? "text-white" : "text-slate-950"}
              />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-gray-800 px-2 py-1 text-xs text-white transition-transform group-hover:scale-100">
              Card
            </span>
          </div>
          <div className="group relative">
            <Button
              size="icon"
              variant={view === "list" ? "solid" : "outline"}
              onClick={() => setView("list")}
            >
              <TableOfContents
                className={view === "list" ? "text-white" : "text-slate-950"}
              />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-gray-800 px-2 py-1 text-xs text-white transition-transform group-hover:scale-100">
              List
            </span>
          </div>
          <div className="mx-1 h-6 w-px bg-gray-800 font-bold"></div>

          <div className="group relative">
            <Button
              size="icon"
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshLoading}
            >
              {refreshLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-black"></div>
              ) : (
                <RotateCcw className="font-semibold text-slate-950" size={20} />
              )}
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-gray-800 px-2 py-1 text-xs text-white transition-transform group-hover:scale-100">
              Refresh
            </span>
          </div>
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
