import React, { Component } from "react";
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: ""
    };

    this.displayTodos = this.displayTodos.bind(this);
  }

  componentDidMount() {
    // Initialize the App Client
    this.client = Stitch.initializeDefaultAppClient("waeinv-synha");
    // Get a MongoDB Service Client, used for logging in and communicating with Stitch
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    // Get a reference to the todo database
    this.db = mongodb.db("coreTec");
    this.displayTodosOnLoad();
  }

  /*displayTodos() {
    this.db
      .collection("inventory")
      .find({}, { limit: 1 })
      .asArray()
      .then(todos => {
        this.setState({
          todos
        });
        var dosc = todos.map(ele => ele.LineCard)
        console.log(this.state.todos) 
      });
  }*/

  displayTodos() {
    const agg = [
      {
        $project: {
          in: "$TrafficIn(Maximum)",
          out: "$TrafficOut(Maximum)",
          name: "$name",
          day: "$day",
          month: "$month",
          year: "$year"
        }
      },
      {
        $sort: {
          month: -1
        }
      }
    ];
    this.db
      .collection("coreInOut")
      .aggregate(agg)
      .asArray()
      .then(todos => {
        this.setState({
          todos
        });
      });
  }

  displayTodosOnLoad() {
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.displayTodos)
      .catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <h3>Trafico</h3>
        <hr />
        <table>
          <td>
            {this.state.todos.map(todo => {
              return <tr>{todo.day}</tr>;
            })}
          </td>
          <td>
            {this.state.todos.map(todo => {
              return <tr>{todo.month}</tr>;
            })}
          </td>
          <td>
            {this.state.todos.map(todo => {
              return <tr>{todo.year}</tr>;
            })}
          </td>
          <td>
            {this.state.todos.map(todo => {
              return <tr>{todo.name}</tr>;
            })}
          </td>
          <td>
            {this.state.todos.map(todo => {
              return <tr>{todo.in / 1000}</tr>;
            })}
          </td>
          <td>
            {this.state.todos.map(todo => {
              return <tr>{todo.out / 1000}</tr>;
            })}
          </td>
        </table>
      </div>
    );
  }
}

export default App;
