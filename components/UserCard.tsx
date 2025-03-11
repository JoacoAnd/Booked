"use client";

import config from "@/config";
import { IKImage } from "imagekitio-next";
import { BadgeCheck, BadgeX, CircleCheck, CircleUser } from "lucide-react";
import React from "react";

const UserCard = ({
  user: { fullName, universityId, email, universityCard, status },
}: {
  user: User;
}) => {
  return (
    <div className="bg-gradient-to-b rounded-xl p-8 from-[#232839] to-[#12141D] w-full h-fit">
      <div className="flex items-center gap-6 mb-8">
        <CircleUser className="size-24 text-white" />
        <div className="flex flex-col">
          <p className="text-sm flex gap-1 items-center text-slate-300 mb-1">
            {status === "APPROVED" ? (
              <>
                <BadgeCheck className="w-3 h-3 text-yellow-200" />
                Verified student
              </>
            ) : (
              <>
                <BadgeX className="w-3 h-3 text-red-600" />
                Pending approval
              </>
            )}
          </p>
          <p className="text-xl font-bold text-white">{fullName}</p>
          <p className="text-base text-slate-300">{email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <p className="text-base text-slate-300">Student ID</p>
        <p className="text-xl font-bold text-white">{universityId}</p>
      </div>

      <IKImage
        path={universityCard}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        alt="University Card"
        className="w-full rounded-md"
        width={500}
        height={300}
      />
    </div>
  );
};

export default UserCard;
