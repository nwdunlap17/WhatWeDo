import React, { Component } from "react";

export default class InviteBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", foundUsers: [] };
  }

  upDateSearch = e => {
    this.setState({ search: e.target.value });

    if (e.target.value.length > 0) {
      fetch(this.props.BackendURL + "/usersearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          search: e.target.value
        })
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ foundUsers: json });
        });
    }
  };

  makeUserList = json => {
    if (!!json.users && this.state.search.length > 0) {
      let list = json.users.filter(element => {
        let keep = true;
        this.props.currentGroup.users.forEach(user => {
          if (user.id === element.id) {
            keep = false;
          }
        });
        return keep;
      });

      list = list.map(element => {
        return (
          <li>
            <button
              id="button-new"
              value={JSON.stringify(element)}
              onClick={this.handleButton}
              key={element.username}
            >
              {element.username}
            </button>
          </li>
        );
      });
      let renderList = <ul>{list}</ul>;
      return renderList;
    }
  };

  handleButton = e => {
    e.preventDefault();
    console.log("e.target.value", e.target.value); // this.props.returnUser(e.target.value)
    // debugger
    fetch(
      this.props.BackendURL + `/groups/${this.props.currentGroup.id}/invite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          userID: JSON.parse(sessionStorage.getItem("current_user")).id,
          inviteeID: JSON.parse(e.target.value).id
        })
      }
    ).then(async () => {
      this.props.refreshGroups();
    });
    this.setState({ search: "", foundUsers: [] });
  };

  render() {
    return (
      <form>
        <h2>Invite Bar</h2>
        <label>Search Users:</label>
        <input
          type="text"
          value={this.state.search}
          onChange={e => this.upDateSearch(e)}
        />

        {this.makeUserList(this.state.foundUsers)}
      </form>
    );
  }
}
