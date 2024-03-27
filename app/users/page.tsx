import UserForm from "@/components/UserForm";
import React from "react";
import DataTableUser from "./DataTableUser";
import prisma from "@/prisma/db";

async function Users() {
  const users = await prisma.user.findMany();
  return (
    <div>
      <UserForm />
      <DataTableUser users={users} />
    </div>
  );
}

export default Users;
