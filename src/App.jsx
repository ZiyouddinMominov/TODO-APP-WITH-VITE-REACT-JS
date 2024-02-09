import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const inputRef = useRef("");
  const [dataLocal, setDataLocal] = useState([]);

  useEffect(() => {
    let data = [];
    if (localStorage.getItem("todos")) {
      data = JSON.parse(localStorage.getItem("todos"));
    }

    setDataLocal(data);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value.trim().length < 3) {
      alert("3tadan kam belgi kiritilmasin");
      inputRef.current.focus();
      return;
    }
    const todo = {
      id: Date.now(),
      name: inputRef.current.value,
      status: "unchecked",
    };
    let copied = JSON.parse(JSON.stringify(dataLocal));
    copied.push(todo);
    setDataLocal(copied);
    localStorage.setItem("todos", JSON.stringify(copied));
    inputRef.current.value = "";
  }

  function handleChecked(e, todo) {
    let copied = JSON.parse(JSON.stringify(dataLocal));
    copied = copied.map((el) => {
      if (el.id == todo.id) {
        if (e.target.checked) {
          el.status = "checked";
        } else {
          el.status = "unchecked";
        }
      }
      return el;
    });
    setDataLocal(copied);
    localStorage.setItem("todos", JSON.stringify(copied));
  }
  return (
    <>
      <div className="container">
        <h1 className="headerTitle">Todo App</h1>
        <div className="todoWrapper">
          <form className="formWrapper" onSubmit={handleSubmit}>
            <input className="inputRef" ref={inputRef} type="text" />
            <button className="createBtn">Add</button>
          </form>
          <ul className="listWrapper">
            {dataLocal.map((todo, index) => {
              return (
                <li className="item" key={index}>
                  <div className="textWrapper">
                    <input
                      className="checkbox"
                      checked={todo.status == "checked" ? true : false}
                      onChange={(e) => {
                        handleChecked(e, todo);
                      }}
                      type="checkbox"
                    />
                    <p className="todoText">{todo.name}</p>
                  </div>
                  <div className="editWrapper">
                    <button className="editBtn">Update</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
