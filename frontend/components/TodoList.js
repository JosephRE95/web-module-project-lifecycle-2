import React from 'react'
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return ( <>
    
    <div id="error">
          {this.props.error && <span>Error: {this.props.error}</span>}
        </div>

       
        <div className="todos">
          <h2>Todos:</h2>
          {this.props.todos.reduce((acc, td) => {
            if (this.props.displayCompleated || !td.completed) {
              return acc.concat(
                <Todo 
                key={td.id}
                toggleCompleted ={this.props.toggleCompleted}
                todo={td}
                />
              );
            }
            return acc;
          }, [])}
        </div>
    
    
    </>
    )
  }
}
