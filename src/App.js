import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleChange = (event) => setTodo(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setTodoList([
      ...todoList,
      {
        id: `${todoList.length + 1}`,
        value: todo,
        isComplete: false,
      },
    ]);
    setTodo("");
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodoList(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todoList.filter((todo) => id !== todo.id);
    setTodoList(updatedTodos);
  };

  const List = (
    <div id="todo-list" data-testid="list">
      {todoList.map((item) => {
        return (
          <div id="todo-item" data-testid="listItem" key={item.id}>
            {item.completed ? (
              <>
                <h3 data-testid="itemText">{item.value} completed</h3>
                <div id="buttons-container">
                  <button onClick={() => handleCompleteTodo(item.id)}>
                    Mark as incomplete
                  </button>
                  <button onClick={() => handleDeleteTodo(item.id)}>
                    Delete
                  </button>{" "}
                </div>
              </>
            ) : (
              <>
                <h3 data-testid="itemText">{item.value}</h3>
                <div id="buttons-container">
                  <button onClick={() => handleCompleteTodo(item.id)}>
                    Mark as complete
                  </button>
                  <button onClick={() => handleDeleteTodo(item.id)}>
                    Delete
                  </button>{" "}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="container">
      <div className="todobox">
        <div className="heading">
          <h1 data-testid="heading">Todomatic</h1>
        </div>
        <div className="todoinput-container">
          <label htmlFor="input">Whats on your mind ?</label>
          <form
            className="input-and-submit-container"
            data-testid="form"
            onSubmit={handleSubmit}
          >
            <input
              id="input"
              className="todoinput"
              placeholder="Enter todo item"
              data-testid="todoInput"
              value={todo}
              onChange={handleChange}
            />
            <input
              className="submit"
              disabled={todo === ""}
              data-testid="submit"
              type="submit"
              value="ADD Todo"
            />
          </form>
        </div>
        {List}
      </div>
    </div>
  );
};

export default App;
