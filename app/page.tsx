import { db } from "@/db";
import { pastes } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import { logoutAction } from "./actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { PasteManager } from "@/components/paste-manager";
import { PaginationControls } from "@/components/pagination-controls";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const [totalCount] = await db.select({ count: count() }).from(pastes);
  const totalPages = Math.ceil(totalCount.count / limit);

  const allPastes = await db
    .select()
    .from(pastes)
    .orderBy(desc(pastes.createdAt))
    .limit(limit)
    .offset(offset);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Pasteplace</h1>
          <form action={logoutAction}>
            <Button variant="ghost" size="icon" title="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </header>

        <PasteManager initialPastes={allPastes} />
        <PaginationControls totalPages={totalPages} />
      </div>
    </div>
  );
}
