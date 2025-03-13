import Container from "@/components/admin/Container";
import BooksTable from "@/components/admin/BooksTable";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const Page = async () => {
  const data = (await db
    .select()
    .from(books)
    .orderBy(books.createdAt)) as Book[];
  return (
    <Container className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All books</h2>
        <Button
          className="bg-primary-admin hover:bg-blue-950 transition-colors"
          asChild
        >
          <Link href="/admin/books/new" className="text-white">
            + Create a new book
          </Link>
        </Button>
      </div>
      <BooksTable data={data} />
    </Container>
  );
};

export default Page;
