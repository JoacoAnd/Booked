import { getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";
import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-semibold text-white">Booked</h1>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className="text-base cursor-pointer capitalize text-light-100 hover:text-yellow-100 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <button className="text-red-400 flex justify-center items-center cursor-pointer hover:text-red-600 transition-colors">
              <LogOut width={22} height={22}/>
            </button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
