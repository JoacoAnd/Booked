"use client";
import React from "react";

import {
  Table as TableComponent,
  TableBody,
  TableCaption,
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";

interface Props {
  head: string[];
  data: Book[];
}

const Table = ({ data, head }: Props) => {
  const router = useRouter();
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
    <TableComponent>
      <TableHeader className="bg-slate-50">
        <TableRow>
          {head.map((item) => (
            <TableHead key={item}>{item}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
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
            {item.createdAt && (
              <TableCell>
                {item.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
            )}
            <TableCell className="flex justify-center items-center gap-2">
              <button
                onClick={() => redirect(`/admin/books/edit/${item.id}`)}
                className="text-blue-100 cursor-pointer"
              >
                <Edit size={24} />
              </button>
              <Dialog>
                <DialogTrigger>
                  <button className="text-red-400 cursor-pointer">
                    <Trash2 size={24} />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                    <Button
                      variant="destructive"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableComponent>
  );
};

export default Table;
