import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  /*   componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((data) => this.setState({ todos: data }));
  }
 */

  componentDidMount() {
    const temp = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      const temp = JSON.stringify(todos);
      localStorage.setItem('todos', temp);
    }
  }

  handleChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  delTodo = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: [...todos.filter((todo) => todo.id !== id)],
    });
  };

  addTodoItem = (title) => {
    const { todos } = this.state;
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    this.setState({
      todos: [...todos, newTodo],
    });
  }

  handleUpdate = (updatedTitle, id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: updatedTitle,
          };
        }
        return todo;
      }),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoItem={this.addTodoItem} />
          <TodoList
            todos={todos}
            handleChange={this.handleChange}
            delTodo={this.delTodo}
            handleUpdate={this.handleUpdate}
          />
        </div>
      </div>
    );
  }
}

export default TodoContainer;
