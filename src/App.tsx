import { useState } from "react";
import {Button, Input} from "antd";
import styles from "./App.module.css"
import {TodoQueue} from "./components";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const App = () => {
  const [todoElement, setTodoElement] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(() => {
    return todoElement.length > 0 ? Math.max(...todoElement.map(todo => todo.id)) + 1 : 1;
  });

  const addTodo = () => {
    if (input.trim()) {
      setTodoElement([...todoElement, { id: nextId, text: input, completed: false }]);
      setInput("");
      setNextId(nextId + 1);
    }
  };

  const toggleTodo = (id: number) => {
    setTodoElement(todoElement.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const clearCompleted = () => {
    setTodoElement(todoElement.filter(todo => !todo.completed));
  };

  const filteredTodoElement = todoElement.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Todo лист</h1>
        <div className={styles.main__container}>
          <div className={styles.input__container}>
            <Input
                className={styles.input__field}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="Введите ваши дела"
            />
          </div>
          <TodoQueue todoElement={filteredTodoElement} toggleTodo={toggleTodo} />
        </div>
        <div className={styles.nav__container}>
          <span>Незавершенных дел: {todoElement.filter(todo => !todo.completed).length}</span>
          <div className={styles.filter__container}>
            <div className={styles.filter__bar}>
              <Button onClick={() => setFilter("all")} className={styles.btn__filter}>Все</Button>
              <Button onClick={() => setFilter("active")} className={styles.btn__filter}>Активные</Button>
              <Button onClick={() => setFilter("completed")} className={styles.btn__filter}>Завершенные</Button>
            </div>
            <Button className={styles.btn__delete} onClick={clearCompleted}>Удалить завершенные</Button>
          </div>
        </div>
      </div>
  );
};

