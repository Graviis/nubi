"use client";
import dayjs from "dayjs";
import { History } from "@prisma/client";

import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
  Color,
} from "@tremor/react";
import { useRouter } from "next/navigation";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

type historiesTableProps = {
  histories: History[];
};

const statusMap = {
  DRAFT: "Borrador",
  ON_REVIEW: "En revision",
  APPROVED: "Aprobado",
  DISCREPANCY: "Discrepancia",
  SIGNING: "En firma",
  COMPLETE: "Completado",
};

const statusMapColor = {
  DRAFT: "gray",
  ON_REVIEW: "lime",
  APPROVED: "purple",
  DISCREPANCY: "emerald",
  SIGNING: "yellow",
  COMPLETE: "green",
};

export function HistoriesTable({ histories }: historiesTableProps) {
  const router = useRouter();

  return (
    <Card>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Numero</TableHeaderCell>
            <TableHeaderCell>Fecha</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell>Detalle</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {histories.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{dayjs(item.createdAt).format("L")}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Badge
                  text={statusMap[item.status]}
                  size="xs"
                  color={statusMapColor[item.status] as Color}
                />
              </TableCell>
              <TableCell>
                <Button
                  size="xs"
                  importance="secondary"
                  text="Ver detalle"
                  handleClick={() => router.push(`/histories/${item.id}`)}
                  color="gray"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
