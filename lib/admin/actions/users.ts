"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await db.delete(users).where(eq(users.id, id)).returning();

    if (!deletedUser.length) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while deleting the user",
    };
  }
};

export const updateUserRole = async (userId: string, role: "ADMIN" | "USER") => {
  try {
    await db.update(users).set({ role }).where(eq(users.id, userId)); 

    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "Failed to update user role" };
  }
};

export const updateUserStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
  try {
    await db
      .update(users)
      .set({ status })
      .where(eq(users.id, id))

      return { success: true };
  } catch (error) {
    console.error("Error updating user status:", error);
    return { success: false, message: "Failed to update user status" };
  }
};

export const updateBorrowedBookStatus = async (id: string, status: "BORROWED" | "RETURNED") => {
  try {
    const borrowRecord = await db
    .select({ bookId: borrowRecords.bookId })
    .from(borrowRecords)
    .where(eq(borrowRecords.id, id))
    .limit(1);

  if (!borrowRecord.length) {
    return { success: false, message: "Borrow record not found" };
  }

  const bookId = borrowRecord[0].bookId;

    const updateData = {
      status,
      returnDate: status === "RETURNED" ? dayjs().format('YYYY-MM-DD') : null,
    };
    await db
      .update(borrowRecords)
      .set(updateData)
      .where(eq(borrowRecords.id, id))

      if (status === "RETURNED") {
        const book = await db
        .select({ availableCopies: books.availableCopies })
        .from(books)
        .where(eq(books.id, bookId))
        .limit(1);

        await db
          .update(books)
          .set({ availableCopies: book[0].availableCopies + 1 })
          .where(eq(books.id, bookId));
      }

      return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Failed to update status" };
  }
};