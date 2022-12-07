import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { User, History } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Icons } from "@/components/icons";
import Link from "next/link";

interface PageProps {
  params: {
    historyId: string;
  };
}

async function getHistoryDetailsForUserOrganization(
  organizationId: User["organizationId"],
  historyId: History["id"]
) {
  return await db.history.findFirst({
    where: {
      organizationId: organizationId,
      id: historyId,
    },
  });
}

export default async function HistoriesPage({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages.signIn);
  }

  const history = await getHistoryDetailsForUserOrganization(
    user.organizationId,
    Number(params.historyId)
  );

  return (
    <main className="container items-center justify-center pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
      <Link href="/histories">
        <button className="flex cursor-pointer items-center justify-start rounded-lg border p-2 hover:ring-gray-900">
          <Icons.back className="h-4" />
          <span className="text-sm font-semibold">Volver</span>
        </button>
      </Link>
      <h1 className="mt-4 text-4xl font-bold">
        Historia: {history.name} - {history.id}
      </h1>
      <p className="pb-8"></p>
    </main>
  );
}
