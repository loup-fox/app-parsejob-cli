import { z } from "zod";
import { StatusLog } from "./StatusLog";

export const Parser = z.object({
  sourceCode: z.string().nullable().optional(),
  sourceCodePostParser: z.string().nullable().optional(),
  sourceCodeAnonymization: z.string().nullable().optional(),
  samples: z.any(),
  statusLogs: StatusLog.array().nullable().optional(),
});
export type Parser = z.infer<typeof Parser>;
