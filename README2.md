// GET http://localhost:9000/api/todos
// 1. Expects no payload
// 2. Makes no changes on the server
// 3. Responds with `200 OK` and a payload with all the todos

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

// POST http://localhost:9000/api/todos
// 1. Expects a payload with `name` (string) and optional `completed` (boolean)
// 2. Creates a new todo on the server
// 3. Responds with `201 Created` and a payload with the new todo

// Add a new todo item by making a POST request to the API
postNewTodo = () => {
  axios.post(URL, { name: this.state.toDoInput })
    .then(res => {
      // Update todos state by concatenating the new todo item
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) });
      this.resetForm(); // Reset the form after adding a todo
    })
    .catch(this.axiosError); // Catch any errors and update the error state
};

// PATCH http://localhost:9000/api/todos/:id
// 1. Expects no payload
// 2. Flips the `completed` property on the todo with the id provided in the URL
// 3. Responds with `200 OK` and the updated todo

// Toggle completed status of a todo by ID
toggleCompleted = (id) => () => {
  axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({
        ...this.state,
        todos: this.state.todos.map(td => {
          if (td.id !== id) return td;
          return res.data.data;
        }),
      });
    })
    .catch(this.axiosError);
};
