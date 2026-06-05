import { createSlice, configureStore } from "@reduxjs/toolkit";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: Date.now(), text: action.payload, completed: false });
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        }
    }
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

function TodoApp(){
    const [text, setText] = useState('');
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Todo List</h2>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => {
                dispatch(addTodo(text));
                setText('');
            }}>   Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} >
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => dispatch(toggleTodo(todo.id))}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TodoApp;