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
import { Eye, Trash2, XCircle } from "lucide-react";
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
import { IKImage } from "imagekitio-next";
import config from "@/config";
import BookCover from "../BookCover";
import Status from "./Status";

interface Props {
  data: {
    borrow_records: {
      id: string;
      userId: string;
      bookId: string;
      borrowDate: Date;
      dueDate: string;
      returnDate: string | null;
      status: "BORROWED" | "RETURNED";
      createdAt: Date | null;
    };
    users: User | null;
    books: Book | null;
  }[];
}

const BookReqTable = ({ data }: Props) => {
  const head = [
    "Book",
    "User Requested",
    "Status",
    "Borrowed date",
    "Return date",
    "Due date",
  ];

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
        {data.map(({ borrow_records, users, books }) => (
          <TableRow className="font-semibold" key={borrow_records.id}>
            <TableCell className="max-w-[150px]">
              <div className="flex items-center gap-2">
                <BookCover
                  variant="extraSmall"
                  coverColor={books?.coverColor || ""}
                  coverUrl={books?.coverUrl || ""}
                />{" "}
                <span className="line-clamp-1">{books?.title}</span>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback className="bg-amber-100">
                    {getInitials(users?.fullName || "IN")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold text-dark-200">
                    {users?.fullName}
                  </p>
                  <p className="text-light-500 text-xs">{users?.email}</p>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <Status
                borrowBookId={borrow_records.id}
                initialStatus={borrow_records.status}
              />
            </TableCell>
            <TableCell>
              {borrow_records.borrowDate.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>
              {borrow_records.returnDate
                ? new Date(borrow_records.returnDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )
                : "-"}
            </TableCell>
            <TableCell>
              {new Date(borrow_records.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookReqTable;
