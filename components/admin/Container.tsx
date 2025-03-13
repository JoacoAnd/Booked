import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={clsx("w-full rounded-2xl bg-white p-7", className)}>
      {children}
    </div>
  );
};

export default Container;
