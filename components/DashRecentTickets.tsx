import { Ticket } from "@prisma/client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";
import TicketPriority from "./TicketPriority";

interface Props {
  tickets: Ticket[];
}

const DashRecentTickets = ({ tickets }: Props) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {tickets
            ? tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center">
                  <TicketStatusBadge status={ticket.status} />
                  <div className="ml-4 space-y-1">
                    <Link href={`tickets/${ticket.id}`}>
                      <p>{ticket.title}</p>
                      <p>{ticket.description}</p>
                    </Link>
                  </div>
                  <div className="ml-auto font-medium">
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashRecentTickets;
