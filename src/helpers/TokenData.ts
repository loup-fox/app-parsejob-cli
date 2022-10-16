import { z } from "zod";

export const TokenData = z.object({
  email: z.string(),
});
export type TokenData = z.infer<typeof TokenData>;
