"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

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