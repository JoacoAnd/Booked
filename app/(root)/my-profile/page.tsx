import { auth } from "@/auth";
import BookList from "@/components/BookList";
import UserCard from "@/components/UserCard";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";

const Page = async () => {
  const session = await auth();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user?.id as string))
    .limit(1);

  const borrowedBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, user.id));

  console.log(borrowedBooks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] max-w-7xl mx-auto gap-8">
      <UserCard user={user} />
      {borrowedBooks.length > 0 ? (
        <BookList title="Borrowed books" borrowedBooks={borrowedBooks} />
      ) : (
        <h2 className="font-bebas-neue text-4xl text-light-100">
          No borrowed books
        </h2>
      )}
    </div>
  );
};

export default Page;
