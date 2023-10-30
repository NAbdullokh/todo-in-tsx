import React, { FC, useState } from "react";

import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

type TodosContextProviderProps = {
  children: React.ReactNode;
};

const TodosContextProvider: FC<TodosContextProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onAddTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prev) => {
      return prev.concat(newTodo);
    });
  };

  const onRemoveTodoHandler = (todoId: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== todoId);
    });
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: onAddTodoHandler,
    removeTodo: onRemoveTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
