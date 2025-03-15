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
import { updateUserStatus } from "@/lib/admin/actions/users";

interface Props {
  data: User[];
}

const AccountReqTable = ({ data }: Props) => {
  const router = useRouter();
  const head = [
    "Name",
    "Date Joined",
    "University ID N°",
    "University ID Card",
    "Actions",
  ];

  const onApprove = async (id: string) => {
    const result = await updateUserStatus(id, "APPROVED");

    if (result?.success) {
      toast.success("Account approved successfully");
      router.push("/admin/account-requests");
    } else {
      toast.error(result?.message || "Something went wrong");
    }
  };

  const onReject = async (id: string) => {
    const result = await updateUserStatus(id, "REJECTED");

    if (result?.success) {
      toast.success("Account rejected successfully");
      router.push("/admin/account-requests");
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
            <TableCell>{item.universityId}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger>
                  <p className="text-blue-100 flex items-center gap-1 hover:underline">
                    <Eye size={20} />
                    View ID Card
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center">
                    {item.fullName} ID Card
                  </DialogTitle>
                  <IKImage
                    alt={item.universityCard}
                    path={item.universityCard}
                    urlEndpoint={config.env.imagekit.urlEndpoint}
                    width={500}
                    height={300}
                  />
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell className="flex items-center gap-4">
              <Button
                onClick={() => onApprove(item.id)}
                className="bg-green-100 text-green-500 hover:bg-green-200 transition-colors"
              >
                Approve Account
              </Button>
              <Dialog>
                <DialogTrigger>
                  <XCircle
                    className="text-red-400 hover:text-red-600 cursor-pointer transition-colors"
                    size={20}
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center">
                    Are you sure you want to rejected this user?
                  </DialogTitle>
                  <Button
                    variant="destructive"
                    onClick={() => onReject(item.id)}
                  >
                    Reject
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

export default AccountReqTable;
