import fs from "fs";
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

type UUID = string;

interface ITodo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

export function create(content: string): ITodo {
  const todo: ITodo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: ITodo[] = [...read(), todo];

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos }, null, 2)
  );
  return todo;
}

export function read(): Array<ITodo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

export function update(id: UUID, partialTodo: Partial<ITodo>): ITodo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos }, null, 2)
  );

  if (!updatedTodo) {
    throw new Error("Couldn't update");
  }

  return updatedTodo;
}

export function deleteById(id: UUID) {
  const todos = read();

  const todosWithoutOne = todos.filter((todo) => {
    if (todo.id === id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: todosWithoutOne }, null, 2)
  );
}
