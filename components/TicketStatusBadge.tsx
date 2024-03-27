import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusColor: Record<
  Status,
  {
    label: string;
    color: "bg-red-400" | "bg-blue-400" | "bg-green-400";
  }
> = {
  OPEN: { label: "Open", color: "bg-red-400" },
  STARTED: { label: "Started", color: "bg-blue-400" },
  CLOSED: { label: "Closed", color: "bg-green-400" },
};

function TicketStatusBadge({ status }: Props) {
  return (
    <Badge
      className={`${statusColor[status].color} hover:${statusColor[status].color}`}
    >
      {statusColor[status].label}
    </Badge>
  );
}

export default TicketStatusBadge;
