import React, { Component } from "react";

export default class ContentViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { showRemoveButtons: false };
  }

  toggleRemoveButtons = () => {
    this.setState(prevState => {
      return { showRemoveButtons: !prevState.showRemoveButtons };
    });
  };

  handleRemove = event => {
    console.log("event target", event.target);
    fetch(this.props.BackendURL + "/remove-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        userID: JSON.parse(sessionStorage.getItem("current_user")).id,
        contentID: event.target.id //event.target.getAttribute('id')
      })
    }).then(response => {
      this.props.onRemoveContent();
    });
  };

  listContents = () => {
    return this.props.content.map(con => {
      console.log("con", con);
      if (this.state.showRemoveButtons) {
        return (
          <li key={`${con.title} list`}>
            {con.title} ({con.category})
            <button
              id="button-new"
              key={`${con.title} button`}
              id={con.id}
              onClick={this.handleRemove}
            >
              X
            </button>
          </li>
        );
      } else {
        return (
          <li key={`${con.title} list`}>
            {con.title} ({con.category})
          </li>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <h2>My Liked Media</h2>
        <div>{this.listContents()}</div>
        <button id="unlockBtn" onClick={this.toggleRemoveButtons}>
          {this.state.showRemoveButtons ? "Lock Content" : "Unlock Content"}
        </button>
      </div>
    );
  }
}
