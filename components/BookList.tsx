import React from "react";
import BookCard from "./BookCard";
import BorrowedCard from "./BorrowedCard";

interface Props {
  title: string;
  books?: Book[];
  borrowedBooks?: BorrowedBook[];
  containerClassName?: string;
}

const BookList = ({
  title,
  books,
  borrowedBooks,
  containerClassName,
}: Props) => {
  if (books && books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books && books.map((book) => <BookCard key={book.title} {...book} />)}
      </ul>
      <ul className="grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {borrowedBooks &&
          borrowedBooks.map((book) => (
            <BorrowedCard key={book.title} {...book} />
          ))}
      </ul>
    </section>
  );
};

export default BookList;
