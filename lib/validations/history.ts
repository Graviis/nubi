import { z } from "zod";

export const createHistorySchema = z.object({
  name: z.string().min(4),
  doctor: z.string().min(4),
  surgeryDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  surgeryType: z.string(),
  notes: z.string(),
});
