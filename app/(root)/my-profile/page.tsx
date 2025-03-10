import { auth } from "@/auth";
import BookList from "@/components/BookList";
import UserCard from "@/components/UserCard";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";

const Page = async () => {
  const session = await auth();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user?.id as string))
    .limit(1);

  console.log(user);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] max-w-7xl mx-auto gap-8">
      <UserCard user={user} />
    </div>
  );
};

export default Page;
