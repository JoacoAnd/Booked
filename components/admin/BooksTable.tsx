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
import BookCover from "../BookCover";
import { Edit, Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";

interface Props {
  data: Book[];
}

const BooksTable = ({ data }: Props) => {
  const router = useRouter();
  const head = ["Book Title", "Author", "Genre", "Date Created", "Actions"];

  const onDelete = async (id: string) => {
    const result = await deleteBook(id);

    if (result?.success) {
      toast.success(`Book deleted successfully`);
      router.push(`/admin/books`);
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
            <TableCell className="flex items-center gap-2 h-full">
              <BookCover
                variant="extraSmall"
                coverColor={item.coverColor}
                coverUrl={item.coverUrl}
              />{" "}
              {item.title}
            </TableCell>
            <TableCell>{item.author}</TableCell>
            <TableCell>{item.genre}</TableCell>
            <TableCell>
              {item.createdAt &&
                item.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
            </TableCell>
            <TableCell className="flex justify-center items-center gap-2">
              <Edit
                onClick={() => redirect(`/admin/books/edit/${item.id}`)}
                className="text-blue-100 cursor-pointer"
                size={24}
              />
              <Dialog>
                <DialogTrigger>
                  <Trash2 className="text-red-400 cursor-pointer" size={24} />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center">
                    Are you sure you want to delete this book?
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

export default BooksTable;
