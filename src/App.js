import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import Input from "./components/input"
import Todo from "./components/todo"

function App() {

  const baseUrl = "http://localhost:8080"

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, [])

  async function getTodos() {
    await axios
      .get(baseUrl + "/todo")
      .then((response) => {
        setTodos(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function insertTodo(evnt) {
    evnt.preventDefault()

    const insertTodo = async () => {
      await axios
            .post(baseUrl + "/todo", {
              todoName: input
            })
            .then((response) => {
              console.log(response.data);
              setInput("");
              getTodos();
            })
            .catch((error) => {
              console.error(error)
            })
    }
    insertTodo()
    console.log("할 일이 추가되었습니다.")
  }

  function updateTodo(id) {
    const updateTodo = async () => {
      await axios
            .put(baseUrl + "/todo/" + id, {
              todoName: input
            })
            .then((response) => {
              console.log(response.data);
              // getTodos();
              setTodos(
                todos.map((todo) => 
                  todo.id === id ? { ...todo, completed: !todo.completed} : todo
                )
              )
            })
            .catch((error) => {
              console.error(error)
            })
    }
    updateTodo();
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
            .delete(baseUrl + "/todo/" + id, {
              todoName: input
            })
            .then((response) => {
              setTodos(
                todos.filter((todo) => todo.id !== id)
              )
            })
            .catch((error) => {
              console.error(error)
            })
    }
    deleteTodo();
  }

  function changeText(evnt) {
    evnt.preventDefault();
    setInput(evnt.target.value)
  }

  return (
    <div className="App">
      <h1  className="colored-header">
        <div className="colored-text">
          {[...'ToDo List'].map((char, index) => (
            <span className={`char-${index % 9}`} key={index}>{char}</span>
          ))}
        </div>
      </h1>
      <Input handleSubmit = {insertTodo} input = {input} handleChange={changeText}/>

      {
        todos
        ? todos.map((todo) => {
          return (
            <Todo key = {todo.id} todo={todo} handleClick={() => updateTodo(todo.id)} handleDelete={() => deleteTodo(todo.id)}/>
          )
        })
         : null
      }

    </div>
  );
}

export default App;
