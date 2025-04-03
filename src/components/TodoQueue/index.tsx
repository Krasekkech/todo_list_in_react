import {TodoElements} from "../TodoElements";
import styles from "../TodoQueue/index.module.css";

type TodoListProps = {
    todoElement: { id: number; text: string; completed: boolean }[];
    toggleTodo: (id: number) => void;
}

export const TodoQueue = ({ todoElement, toggleTodo}: TodoListProps) => {
    return (
        <ul className={styles.list__activities}>
            {todoElement.map(todo => (
                <TodoElements key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
    );
};
