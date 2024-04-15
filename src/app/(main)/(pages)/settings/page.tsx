import { currentUser } from "@clerk/nextjs";

import { Loading } from "@/components/Loading";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { db } from "@/lib/db";
import { ProfilePicture } from "./_components/ProfilePicture";

const SettingsPage = async () => {
  const authUser = await currentUser();
  if (!authUser) return <Loading />;

  const user = await db.user.findUnique({
    where: {
      clerkId: authUser.id,
    },
  });

  const uploadProfileImage = async (imageUrl: string) => {
    "use server";

    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        profileImage: imageUrl,
      },
    });

    return response;
  };

  const removeProfileImage = async () => {
    "use server";

    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        profileImage: "",
      },
    });

    return response;
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span className="">Settings</span>
      </h1>

      <div className="flex flex-col gap-10 p-6">
        <div className="">
          <h2 className="text-2xl font-bold">User Profile</h2>

          <p className="text-base text-zinc-500 dark:text-white/50">
            Add or update your information
          </p>
        </div>

        <ProfilePicture
          onDelete={removeProfileImage}
          userImage={user?.profileImage || ""}
          onUpload={uploadProfileImage}
        />
        <ProfileForm />
      </div>
    </div>
  );
};

export default SettingsPage;
