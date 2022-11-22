import { User } from "@prisma/client";
import { CreateHistoryModal } from "@/components/create-history-modal";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { HistoriesTable } from "@/components/histories-table";

async function getHistoriesForUserOrganization(
  organizationId: User["organizationId"]
) {
  return await db.history.findMany({
    where: {
      organizationId: organizationId,
    },
  });
}

export default async function HistoriesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions.pages.signIn);
  }
  const histories = await getHistoriesForUserOrganization(user.organizationId);

  console.log("histories", histories);
  return (
    <main className="pt-10">
      <h1 className="text-4xl font-bold">Historias</h1>
      <p className="pb-8">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </p>
      <div className="mb-4 flex justify-end">
        <CreateHistoryModal />
      </div>
      <HistoriesTable histories={histories} />
    </main>
  );
}
