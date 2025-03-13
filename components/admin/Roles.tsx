import React, { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { Check } from "lucide-react";
import { updateUserRole } from "@/lib/admin/actions/users";
import { toast } from "sonner";

const Rol = ({
  rol,
  selected,
}: {
  rol: "USER" | "ADMIN";
  selected: boolean;
}) => {
  return (
    <div
      className={clsx(
        "py-1 px-3 rounded-full capitalize font-semibold text-sm flex items-center gap-2",
        rol === "USER"
          ? "bg-pink-100 text-pink-500"
          : "bg-green-100 text-green-500"
      )}
    >
      {rol.toLowerCase()}
      {selected && <Check size={16} />}
    </div>
  );
};

const Roles = ({
  userId,
  initialRole,
}: {
  userId: string;
  initialRole: "USER" | "ADMIN";
}) => {
  const [role, setRole] = useState(initialRole);
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: "USER" | "ADMIN") => {
    if (newRole === role) return;

    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);

      if (result.success) {
        setRole(newRole);
        toast.success(`Role updated to ${newRole}`);
      } else {
        toast.error(result.message || "Failed to update role");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending}>
        <Rol rol={role} selected />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleRoleChange("USER")}
        >
          <Rol rol="USER" selected={role === "USER"} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleRoleChange("ADMIN")}
        >
          <Rol rol="ADMIN" selected={role === "ADMIN"} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Roles;
