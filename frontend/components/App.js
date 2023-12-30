import React from "react";
import axios from "axios";


const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    toDoInput: '',
  };

    onToDoInputChange = evt => {
      const { value } = evt.target
      this.setState({ ...this.state, toDoInput: value })
    }

    resetForm = () =>  this.setState({ ...this.state, toDoInput: '' }) 
    
    axiosError = () =>  this.setState({ ...this.state, error: err.response.data.message })

    postNewTodo = () => {
      axios.post(URL, { name: this.state.toDoInput })
      .then( res => {
        this.fetchAllTodos()
        this.resetForm()
      })
      .catch((err) => {
        this.axiosError()
      });
    }
    onTodoFormSubmit = evt => {
      evt.preventDefault()
      this.postNewTodo()
    }

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch(
        this.axiosError()
        );
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

        <form onSubmit={this.onTodoFormSubmit}>
         <input value={this.state.toDoInput} onChange={this.onToDoInputChange} type="text" placeholder="add here"></input>
          <button>Add</button>
          <button>Reset</button>
        </form>
      </div>
    );
  }
}
