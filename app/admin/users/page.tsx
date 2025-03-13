import Container from "@/components/admin/Container";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";

import React from "react";
import UsersTable from "@/components/admin/UsersTable";
import { and, count, eq } from "drizzle-orm";

const Page = async () => {
  const data = await db.select().from(users).orderBy(users.createdAt);

  const usersWithBorrowedBooks = await Promise.all(
    data.map(async (user) => {
      const borrowedCount = await db
        .select({ count: count() })
        .from(borrowRecords)
        .where(
          and(
            eq(borrowRecords.userId, user.id),
            eq(borrowRecords.status, "BORROWED")
          )
        );

      return {
        ...user,
        borrowedBooks: borrowedCount[0]?.count || 0,
      };
    })
  );
  return (
    <Container className="space-y-4">
      <h2 className="text-xl font-semibold">All users</h2>
      <UsersTable data={usersWithBorrowedBooks} />
    </Container>
  );
};

export default Page;
