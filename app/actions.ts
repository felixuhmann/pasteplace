"use server";

import { db } from "@/db";
import { pastes } from "@/db/schema";
import { logout } from "@/lib/auth";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPaste(formData: FormData) {
  const content = formData.get("content") as string;
  if (!content || content.trim() === "") {
    return;
  }

  await db.insert(pastes).values({
    content: content,
  });

  revalidatePath("/");
  redirect("/?page=1");
}

export async function logoutAction() {
  await logout();
  redirect("/login");
}

export async function deletePaste(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.delete(pastes).where(sql`${pastes.id} = ${id}`);
  revalidatePath("/");
}

export async function deleteAllPastes() {
  await db.delete(pastes);
  revalidatePath("/");
}
