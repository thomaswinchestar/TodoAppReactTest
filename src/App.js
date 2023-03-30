import React, { useState, useCallback } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Todo = React.memo(({ todo, index, markTodo, removeTodo, editTodo }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const handleEdit = () => {
    editTodo(index, value);
    setEditing(false);
  };
  if (editing) {
    return (
      <div className="todo">
        <Form.Control
          type="text"
          className="input me-3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="outline-success me-3" onClick={handleEdit}>
          Save
        </Button>
        <Button variant="outline-secondary" onClick={() => setEditing(false)}>
          Cancel
        </Button>
      </div>
    );
  } else {
    return (
      <div className="todo">
        <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
          {todo.text}
        </span>
        <div>
          <Button
            variant="outline-primary me-3"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>

          <Button
            variant="outline-danger me-3"
            onClick={() => removeTodo(index)}
          >
            Delete
          </Button>
          <Button
            variant="outline-success me-3"
            onClick={() => markTodo(index)}
          >
            Done
          </Button>
        </div>
      </div>
    );
  }
});

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    },
    [addTodo, value]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        className="input add-form"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new todo"
      />
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
}

export default function App() {
  const [todo, setTodo] = useState([
    {
      text: "Buy Coffee",
      isDone: false,
    },
    {
      text: "Go to School",
      isDone: false,
    },
    {
      text: "Do Homework",
      isDone: false,
    },
    {
      text: "Play Game",
      isDone: false,
    },
    {
      text: "Prepare for School",
      isDone: false,
    },
  ]);

  const addTodo = useCallback((text) => {
    setTodo((prevTodo) => [...prevTodo, { text }]);
  }, []);

  const markTodo = useCallback((index) => {
    setTodo((prevTodo) =>
      prevTodo.map((todo, i) => {
        if (i === index) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  }, []);

  const editTodo = (index, newText) => {
    const newTodo = [...todo];
    if (newTodo[index]) {
      newTodo[index].text = newText;
      setTodo(newTodo);
    }
  };

  const removeTodo = useCallback((index) => {
    setTodo((prevTodo) => prevTodo.filter((todo, i) => i !== index));
  }, []);

  const removeAllDone = () => {
    const newTodo = todo.filter((t) => !t.isDone);
    setTodo(newTodo);
  };

  return (
    <div className="app">
      <div className="container">
        <Row className="mb-3">
          <Col className="pe-0">
            <FormTodo addTodo={addTodo} />
          </Col>
          <Col className="ps-0">
            <Button
              className="delete-all-done"
              variant="danger"
              onClick={removeAllDone}
            >
              Delete All Done
            </Button>
          </Col>
        </Row>
        <div>
          <h3 className="mb-3">To do</h3>
          {todo.map((todo, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Todo
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
