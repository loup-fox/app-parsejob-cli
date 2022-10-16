import { z } from "zod";

export const Parser = z.object({
  sourceCode: z.string().nullable().optional(),
  sourceCodePostParser: z.string().nullable().optional(),
  sourceCodeAnonymization: z.string().nullable().optional(),
  samples: z.any(),
});
