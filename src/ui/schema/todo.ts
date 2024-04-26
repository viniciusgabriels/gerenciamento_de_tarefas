import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1),
  date: z.string().datetime(),
  done: z.boolean(),
});

export type ITodo = z.infer<typeof TodoSchema>;
