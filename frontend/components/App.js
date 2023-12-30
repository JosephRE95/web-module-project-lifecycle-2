import React from "react";
import axios from "axios";
import { response } from "msw";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
  };

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

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
          {this.state.todos.map((td) => {
            return <div key={td.id}>{td.name}</div>;
          })}
        </div>

        <form>
          <input></input>
          <input></input>
          <button>Clear Completed</button>
        </form>
      </div>
    );
  }
}
