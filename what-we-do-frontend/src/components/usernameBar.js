import React, { Component } from "react";
import Title from "./Title";

export default class UserNameBar extends Component {
  constructor() {
    super();
    this.state = { username: "" };
  }

  handleLogIn = e => {
    e.preventDefault();
    this.props.onLogIn(this.state.username);
  };

  render() {
    return (
      <div id="topLevel">
        <div id="title">
          <Title />
        </div>
        <form id="logInForm" onSubmit={this.handleLogIn}>
          <label>User Name</label>
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <button id="button-new" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
