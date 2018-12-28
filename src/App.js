import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>This is a todo app</h3>
        <hr />
        <p>Add a Todo Item:</p>
        <input id="new_todo_item" />
        <input type="submit" onClick={this.addComment} />
      </div>
    );
  }
}

export default App;
