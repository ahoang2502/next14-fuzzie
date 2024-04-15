"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";

import { UploadCareButton } from "./UploadCareButton";
import { Button } from "@/components/ui/button";

type Props = {
  userImage: string | null;
  onDelete?: any;
  onUpload?: any;
};

export const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  const router = useRouter();

  const onRemoveProfileImage = async () => {
    const response = await onDelete();

    if (response) router.refresh();
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg text-white font-medium">Profile picture</p>

      <div className="flex h-[30vh] flex-col items-center justify-center">
        {userImage ? (
          <>
            <div className="relative h-full w-full">
              <Image
                src={userImage}
                alt="user-image"
                fill
                className="object-contain"
              />
            </div>

            <Button
              onClick={onRemoveProfileImage}
              className="bg-transparent text-white/70 hover:bg-transparent hover:text-white"
            >
              <X />
              Remove logo
            </Button>
          </>
        ) : (
          <UploadCareButton onUpload={onUpload} />
        )}
      </div>
    </div>
  );
};
