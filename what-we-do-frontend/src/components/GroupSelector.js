import React, { Component } from "react";

class GroupSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { groupName: "" };
  }

  listGroups = () => {
    return this.props.groups.map((group, index) => {
      return <div key={index}>
        <button id="button-two"onClick={this.handleClick} key={group.title} className="groups" value={JSON.stringify(group)}> {group.title} </button>
        </div>
    })
  }

  handleClick = e => {
    this.props.onSelectGroup(JSON.parse(e.target.value));
  };

  onAddGroup = event => {
    event.preventDefault();
    if (this.state.groupName === "") {
      alert("Group must have a name!");
      return;
    }

    fetch(this.props.BackendURL + "/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        userID: [JSON.parse(sessionStorage.getItem("current_user")).id],
        group: {
          title: this.state.groupName
        }
      })
    })
      .then(() => {
        this.props.onAddGroup();
      })
      .then(() => {
        this.setState({ groupName: "" });
      });
  };

  render() {
    return (
      <div id='groupSelector'>
        <div id='groups'>{this.listGroups()}</div>
        <form onSubmit={this.onAddGroup}>
          <label>Create New Group</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ groupName: e.target.value });
            }}
            value={this.state.groupName}
          />
          <input id="button-new"type="submit" />
        </form>
      </div>
    );
  }
}

export default GroupSelector;
