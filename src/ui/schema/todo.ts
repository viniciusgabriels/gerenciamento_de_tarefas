import { z as schema } from "zod";

export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().min(1),
  date: schema.string().datetime(),
  done: schema.boolean(),
});

export type ITodo = schema.infer<typeof TodoSchema>;
