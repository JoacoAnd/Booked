import Container from "@/components/admin/Container";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

import React from "react";
import AccountReqTable from "@/components/admin/AccountReqTable";
import { eq } from "drizzle-orm";

const Page = async () => {
  const data = await db
    .select()
    .from(users)
    .where(eq(users.status, "PENDING"))
    .orderBy(users.createdAt);

  return (
    <Container className="space-y-4">
      <h2 className="text-xl font-semibold">All users</h2>
      <AccountReqTable data={data} />
    </Container>
  );
};

export default Page;
