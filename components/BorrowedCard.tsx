"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import config from "@/config";
import BookCover from "./BookCover";
import {
  BookOpenText,
  Calendar,
  CircleCheck,
  OctagonAlert,
} from "lucide-react";
import Link from "next/link";

const BorrowedCard = (book: BorrowedBook) => {
  const dueDate = new Date(book.dueDate);
  const borrowDate = new Date(book.borrowDate);
  const returnDate = book.returnDate ? new Date(book.returnDate) : null;
  const today = new Date();

  const isOverdue = book.status === "BORROWED" && today > dueDate;
  const daysLeft = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Link
      href={`/books/${book.id}`}
      className="relative bg-gradient-to-b from-[#232839] to-[#12141D] text-white py-4 px-[5%] rounded-lg shadow-lg w-full max-w-sm"
    >
      {isOverdue && (
        <OctagonAlert
          className="absolute -top-1 -left-1 text-red-400"
          size={32}
        />
      )}

      <div className="w-full flex justify-center">
        <BookCover
          variant="medium"
          coverUrl={book.coverUrl}
          coverColor={book.coverColor}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold line-clamp-2 leading-tight h-[3rem]">
          {book.title}
        </h3>
        <p className="text-sm italic text-gray-400 mt-1">{book.genre}</p>

        <p className="flex text-gray-400 items-center gap-2 mt-2">
          <BookOpenText size={16} /> Borrowed on{" "}
          {borrowDate.toLocaleDateString()}
        </p>

        {book.status === "RETURNED" ? (
          <p className="text-gray-400 flex items-center gap-2">
            <CircleCheck className="text-green-400" size={16} /> Returned on{" "}
            {returnDate?.toLocaleDateString()}
          </p>
        ) : isOverdue ? (
          <p className="text-red-400 flex items-center gap-2">
            <OctagonAlert size={16} /> Overdue Return
          </p>
        ) : (
          <p className="text-gray-400 flex items-center gap-2">
            <Calendar className="text-yellow-200" size={16} /> {daysLeft} days
            left to due
          </p>
        )}
      </div>
    </Link>
  );
};

export default BorrowedCard;
