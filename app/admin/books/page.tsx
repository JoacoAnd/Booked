import Container from "@/components/admin/Container";
import Table from "@/components/admin/Table";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

import Link from "next/link";
import React from "react";

const Page = async () => {
  const bookList = (await db
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
      <Table
        head={["Book Title", "Author", "Genre", "Date Created"]}
        data={bookList}
      />
    </Container>
  );
};

export default Page;
