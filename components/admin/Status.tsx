import React, { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { Check } from "lucide-react";
import {
  updateBorrowedBookStatus,
  updateUserRole,
} from "@/lib/admin/actions/users";
import { toast } from "sonner";

const StatusBadge = ({
  status,
  selected,
}: {
  status: "BORROWED" | "RETURNED";
  selected: boolean;
}) => {
  return (
    <div
      className={clsx(
        "py-1 px-3 rounded-full capitalize font-semibold text-sm flex items-center gap-2",
        status === "BORROWED"
          ? "bg-purple-100 text-purple-500"
          : "bg-blue-200 text-blue-500"
      )}
    >
      {status.toLowerCase()}
      {selected && <Check size={16} />}
    </div>
  );
};

const Status = ({
  borrowBookId,
  initialStatus,
}: {
  borrowBookId: string;
  initialStatus: "BORROWED" | "RETURNED";
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: "BORROWED" | "RETURNED") => {
    if (newStatus === status) return;

    startTransition(async () => {
      const result = await updateBorrowedBookStatus(borrowBookId, newStatus);

      if (result.success) {
        setStatus(newStatus);
        toast.success(`Role updated to ${newStatus}`);
      } else {
        toast.error(result.message || "Failed to update role");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending}>
        <StatusBadge status={status} selected />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleStatusChange("BORROWED")}
        >
          <StatusBadge status="BORROWED" selected={status === "BORROWED"} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleStatusChange("RETURNED")}
        >
          <StatusBadge status="RETURNED" selected={status === "RETURNED"} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Status;
