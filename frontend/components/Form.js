import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.onTodoFormSubmit}>
          <input
            value={this.props.toDoInput}
            onChange={this.props.onToDoInputChange}
            type="text"
            placeholder="add here"
          />
          <button type="submit">Add</button>
        </form>
        <button onClick={this.props.toggleDisplayCompleted}>
          {this.props.displayCompleated ? "Hide" : "Show"} Completed
        </button>
      </>
    );
  }
}
