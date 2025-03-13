import Container from "@/components/admin/Container";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { count, eq } from "drizzle-orm";
import React from "react";

const Admin = async () => {
  const totalBooks = await db.select({ count: count() }).from(books);

  const totalUsers = await db.select({ count: count() }).from(users);

  const borrowedBooks = await db
    .select({ count: count() })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"));

  const cards = [
    {
      title: "Borrowed books",
      number: borrowedBooks[0].count,
    },
    {
      title: "Total users",
      number: totalUsers[0].count,
    },
    {
      title: "Total books",
      number: totalBooks[0].count,
    },
  ];

  return (
    <div className="">
      <div className="flex gap-4">
        {cards.map((card) => (
          <Container key={card.title}>
            <h2 className="text-base font-medium text-slate-500 mb-2">
              {card.title}
            </h2>
            <p className="text-3xl font-semibold">{card.number}</p>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default Admin;
