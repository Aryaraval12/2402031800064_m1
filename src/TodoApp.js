import React, { useState } from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './Redux_ex2';
import './TodoApp.css'; // Optional: for custom styling

const TodoApp = () => {
    const [inputText, setInputText] = useState('');
    const todos = useSelector(state => state.todos || []);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (inputText.trim()) {
            dispatch(addTodo(inputText.trim()));
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className="todo-app">
            <div className="todo-header">
                <h2>My Todo List</h2>
                <p>Get things done, one task at a time!</p>
            </div>

            <div className="todo-input-section">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter a new todo..."
                    className="todo-input"
                />
                <button
                    onClick={handleAddTodo}
                    disabled={!inputText.trim()}
                    className="add-todo-btn"
                >
                    Add Todo
                </button>
            </div>

            <div className="todo-stats">
                <span>Total: {todos.length}</span>
                <span>Completed: {todos.filter(todo => todo.completed).length}</span>
                <span>Pending: {todos.filter(todo => !todo.completed).length}</span>
            </div>

            <ul className="todo-list">
                {todos.length === 0 ? (
                    <li className="empty-todo">
                        <span>No todos yet. Add one above!</span>
                    </li>
                ) : (
                    todos.map(todo => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <div className="todo-content">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}
                                    className="todo-checkbox"
                                />
                                <span
                                    className="todo-text"
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        opacity: todo.completed ? 0.6 : 1
                                    }}
                                >
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="delete-todo-btn"
                                title="Delete todo"
                            >
                            X
                            </button>
                        </li>
                    ))
                )}
            </ul>

            {todos.length > 0 && (
                <div className="todo-actions">
                    <button
                        onClick={() => todos.forEach(todo => dispatch(deleteTodo(todo.id)))}
                        className="clear-all-btn"
                    >
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodoApp;