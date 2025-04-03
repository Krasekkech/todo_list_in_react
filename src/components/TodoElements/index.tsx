import {Input} from "antd";
import styles from "./index.module.css"

type TodoElementsProps = {
    todo: { id: number; text: string; completed: boolean };
    toggleTodo: (id: number) => void;
}

export const TodoElements = ({ todo, toggleTodo }: TodoElementsProps) => {
    return (
        <li className={styles.element__activities}>
            <Input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span className={styles.element} style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "black"}}>
                {todo.text}
            </span>
        </li>
    )
}
