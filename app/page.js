"use client"
import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleEdit = (id) => {
    const newText = window.prompt('Edit the todo:', todos.find((t) => t.id === id)?.text);
    if (newText !== null) {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text: newText };
          } else {
            return todo;
          }
        });
        return updatedTodos;
      });
    }
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      return updatedTodos;
    });
  };

  const handleSave = (id, newText) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText, isEditing: false };
        } else {
          return todo;
        }
      });
      return updatedTodos;
    });
  };

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      const newId = todos.length + 1;
      setTodos((prevTodos) => {
        const newTodoObj = { id: newId, text: newTodo, isEditing: false };
        return [...prevTodos, newTodoObj];
      });
      setNewTodo('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-gray-100 p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="border rounded px-2 py-1 w-3/4"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2">
              {todo.isEditing ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => {
                      setTodos((prevTodos) => {
                        const updatedTodos = prevTodos.map((t) => {
                          if (t.id === todo.id) {
                            return { ...t, text: e.target.value };
                          } else {
                            return t;
                          }
                        });
                        return updatedTodos;
                      });
                    }}
                    className="border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleSave(todo.id, todo.text)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span>{todo.text}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
