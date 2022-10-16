import { z } from "zod";

export const StatusLog = z.object({
  date: z.date().optional().nullable(),
  email: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  autolog: z.boolean().optional().nullable(),
});
export type StatusLog = z.infer<typeof StatusLog>;
