import { Priority } from "@prisma/client";
import { Badge } from "@/app/_components/ui/badge";

const priorityMap: Record<Priority, { label: string; className: string }> = {
  LOW: { label: "Low", className: "bg-green-500 text-gray-900" },
  MEDIUM: {
    label: "Medium",
    className: "bg-yellow-500 text-yellow-950",
  },
  HIGH: { label: "High", className: "bg-red-500 text-gray-200" },
};

const BugPriorityBadge = ({ priority }: { priority: Priority }) => {
  const { label, className } = priorityMap[priority];

  return <Badge className={className}>{label}</Badge>;
};

export default BugPriorityBadge;
