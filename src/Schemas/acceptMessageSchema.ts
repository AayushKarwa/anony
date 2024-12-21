import { z } from "zod";

export const acceptMessage = z.object({
  acceptMessage: z.boolean(),
});
