"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { deleteUser } from "@/lib/admin/actions/users";
import Roles from "./Roles";

interface Props {
  data: {
    id: string;
    fullName: string;
    email: string;
    universityId: number;
    password: string;
    universityCard: string;
    status: "APPROVED" | "PENDING" | "REJECTED" | null;
    role: "ADMIN" | "USER" | null;
    lastActivityDate: string | null;
    createdAt: Date | null;
    borrowedBooks: number;
  }[];
}

const UsersTable = ({ data }: Props) => {
  const router = useRouter();
  const head = ["Name", "Date Joined", "Role", "Books Borrowed", "Action"];

  const onDelete = async (id: string) => {
    const result = await deleteUser(id);

    if (result?.success) {
      toast.success(`User deleted successfully`);
      router.push(`/admin/users`);
    } else {
      toast.error(result?.message || "Something went wrong");
    }
  };

  return (
    <Table>
      <TableHeader className="bg-slate-50">
        <TableRow>
          {head.map((item) => (
            <TableHead key={item}>{item}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className="font-semibold" key={item.id}>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-amber-100">
                  {getInitials(item.fullName || "IN")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold text-dark-200">{item.fullName}</p>
                <p className="text-light-500 text-xs">{item.email}</p>
              </div>
            </TableCell>
            <TableCell>
              {item.createdAt &&
                item.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
            </TableCell>
            <TableCell>
              <Roles userId={item.id} initialRole={item.role ?? "USER"} />
            </TableCell>
            <TableCell>{item.borrowedBooks}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger>
                  <Trash2 className="text-red-400 cursor-pointer" size={24} />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center">
                    Are you sure you want to delete this user?
                  </DialogTitle>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </Button>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
