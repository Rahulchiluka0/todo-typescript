import React, { useEffect, useState } from 'react';
import './TodoList.css';
import { verse } from "../assets/verses.json";


interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

let randomId = Math.floor(Math.random() * 701) + 1;
let shlok = verse[randomId].text;

function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        setTodos([...todos, { id: Math.random(), text: inputValue, completed: false }]);
        setInputValue('');
        
    };

    const handleComplete = (id: number) : void => {
        setTodos(todos.map((todo: Todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDelete = (id: number) : void => {
        setTodos(todos.filter((todo: Todo) => todo.id !== id));
    };
    return (
        <div className='container'>
            <div className="todo-container">
                <h1>The-Bhagwad-Geeta</h1>
                <form onSubmit={handleSubmit} className="todo-form">
                    <div className="input-with-button">
                        <input
                            type="text"
                            placeholder="Enter your todo..."
                            value={inputValue}
                            onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
                            required
                        />
                        <button type="submit">Add Todo</button>
                    </div>
                </form>
                <h2>Your Tasks</h2>
                {todos.length === 0 ? (
                    <div className='shloka'><p>{shlok}</p></div>
                ) : (
                    <ul className="todo-list">
                        {todos.map((todo, index: number) => (
                            <li key={todo.id} className={todo.completed ? 'completed' : ''} style={{ animationDelay: `${index * 0.1}s` }}>
                                <span
                                    onClick={() => handleComplete(todo.id)}
                                >
                                    {todo.text}
                                </span>
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>)}
            </div>
        </div>

    );
}

export default TodoApp;