import { Status } from "@prisma/client";
import { Badge } from "@/app/_components/ui/badge";

const statusMap: Record<Status, { label: string; className: string }> = {
  OPEN: { label: "Open", className: "bg-blue-300 text-blue-950" },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-yellow-300 text-yellow-950",
  },
  RESOLVED: { label: "Resolved", className: "bg-green-400 text-green-950" },
};

const BugStatusBadge = ({ status }: { status: Status }) => {
  const { label, className } = statusMap[status];

  return <Badge className={className}>{label}</Badge>;
};

export default BugStatusBadge;
