import React from "react";
import axios from "axios";
import Form from "./Form";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    error: "",
    toDoInput: "",
    displayCompleated: true,
  };

  // Update the state with the input value when there's a change in the input field
  onToDoInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, toDoInput: value });
  };

  // Reset the toDoInput state to an empty string
  resetForm = () => {
    this.setState({ toDoInput: "" });
  };

  // Update the state with the error message when there's an Axios error
  axiosError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message });
  };

  // Add a new todo item by making a POST request to the API
  postNewTodo = () => {
    axios
      .post(URL, { name: this.state.toDoInput })
      .then((res) => {
        // Update todos state by concatenating the new todo item
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data),
        });
        this.resetForm(); // Reset the form after adding a todo
      })
      .catch(
        this.axiosError // Catch any errors and update the error state
      );
  };

  // Handle form submission
  onTodoFormSubmit = (evt) => {
    evt.preventDefault();
    this.postNewTodo(); // Call method to add a new todo
  };

  // Fetch all todos from the API
  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        // Update todos state with the fetched data and reset error state
        this.setState({ ...this.state, todos: res.data.data, error: "" });
      })
      .catch(this.axiosError); // Catch any errors and update the error state
  };

  toggleCompleted = (id) => () => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((td) => {
            if (td.id !== id) return td;
            return res.data.data;
          }),
        });
      })
      .catch(this.axiosError);
  };

  toggleDisplayCompleted = () => {
    this.setState({
      ...this.state,
      displayCompleated: !this.state.displayCompleated,
    });
  };

  // Fetch all todos when the component mounts
  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <div id="error">
          {this.state.error && <span>Error: {this.state.error}</span>}
        </div>

       
        <div className="todos">
          <h2>Todos:</h2>
          {this.state.todos.reduce((acc, td) => {
            if (this.state.displayCompleated || !td.completed) {
              return acc.concat(
                <div key={td.id} onClick={this.toggleCompleted(td.id)}>
                  {td.name} {td.completed ? "✓" : ""}
                </div>
              );
            }
            return acc;
          }, [])}
        </div>

        <Form 
        onTodoFormSubmit = {this.onTodoFormSubmit}
        toggleDisplayCompleted = {this.toggleDisplayCompleted}
        onToDoInputChange = {this.onToDoInputChange}
        toDoInput = {this.state.toDoInput}
         displayCompleated = {this.state.displayCompleated}
        />
      </div>
    );
  }
}
