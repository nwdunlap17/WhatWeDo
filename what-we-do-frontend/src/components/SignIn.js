import React, { Component } from "react";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  handleSignIn = () => {
    let username = this.state.input;
    this.props.login(username);
  };

  handleOnChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleOnChange}
        />
        <button
          id="button-new"
          className="button-two"
          onClick={this.handleSignIn}
        >
          Sign In
        </button>
      </div>
    );
  }
}
