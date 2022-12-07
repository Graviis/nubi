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

  return (
    <section className="container items-center justify-center pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
      <div className="mb-4 flex justify-end">
        <CreateHistoryModal />
      </div>
      <HistoriesTable histories={histories} />
    </section>
  );
}
