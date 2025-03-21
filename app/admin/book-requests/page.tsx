import Container from "@/components/admin/Container";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";

import React from "react";
import BookReqTable from "@/components/admin/BookReqTable";
import { eq } from "drizzle-orm";

const Page = async () => {
  const data = await db
    .select()
    .from(borrowRecords)
    .leftJoin(users, eq(users.id, borrowRecords.userId))
    .leftJoin(books, eq(books.id, borrowRecords.bookId))
    .orderBy(borrowRecords.borrowDate);

  return (
    <Container className="space-y-4">
      <h2 className="text-xl font-semibold">Borrow Book Requests</h2>
      <BookReqTable data={data} />
    </Container>
  );
};

export default Page;
