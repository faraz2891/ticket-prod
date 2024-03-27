import React from "react";
import prisma from "@/prisma/db";
import TicketDetails from "./TicketDetails";

interface Props {
  params: { id: string };
}

const ViewTicket = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) {
    return <p className="text-destructive">Ticket Id Not Valid!</p>;
  }
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket Not Found!</p>;
  }
  return <TicketDetails ticket={ticket} />;
};

export default ViewTicket;
