import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email_addresses, first_name, image_url } = body?.data;
    const email = email_addresses[0]?.email_address;

    await db.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        email,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: first_name || "user",
        profileImage: image_url,
      },
    });

    return new NextResponse("User updated successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error("🔴 POST clerk-webhook: ", error);

    return new NextResponse("Error while updating user", { status: 500 });
  }
}
