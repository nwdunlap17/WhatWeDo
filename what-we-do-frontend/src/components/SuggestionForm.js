import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import SuggestionCard from "./SuggestionCard";

export default class SuggestionForm extends Component {
  state = {
    type: null,
    allSuggestions: [],
    suggestion: [],
    sliceCounter: 0
  };

  handleChange = (e, { value }) => {
    this.setState({ type: value, sliceCounter: 0 });
  };

  getGroupSuggestion = () => {
    console.log("suggestion types", this.state.type);
    fetch(
      this.props.BackendURL + `/groups/${this.props.currentGroup.id}/suggest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          types: `${this.state.type}`,
          userID: JSON.parse(sessionStorage.getItem("current_user")).id
        })
      }
    )
      .then(res => res.json())
      .then(async data => {
        console.log("data", data);
        this.setState({
          allSuggestions: data,
          suggestion: data.slice(
            this.state.sliceCounter,
            this.state.sliceCounter + 3
          )
        });
      })
      .then(response =>
        this.setState({
          sliceCounter: 1
        })
      );
  };

  generateSuggestionCards = () => {
    if (this.state.suggestion.length !== 0) {
      return this.state.allSuggestions
        .slice(this.state.sliceCounter - 1, this.state.sliceCounter + 2)
        .map((item, index) => (
          <div key={index}>
            <SuggestionCard itemData={item} />
          </div>
        ));
    }
  };

  generateSuggestionButton = () => {
    if (this.state.sliceCounter <= 17) {
      return this.state.sliceCounter === 0 ? (
        <Form.Button id="buttonSuggest" onClick={() => this.getGroupSuggestion()}>
          Get Group Suggestion!
        </Form.Button>
      ) : (
        <Form.Button id="buttonSuggest" onClick={() => this.incrementSliceCounter()}>
          Get More Suggestions!
        </Form.Button>
      );
    } else {
      this.setState({
        sliceCounter: 1
      });
    }
  };

  incrementSliceCounter = () => {
    this.setState(prevState => {
      return { sliceCounter: prevState.sliceCounter + 3 };
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <label>Media type:</label>

        <Form>
          <Form.Group inline widths="equal">
            <Form.Checkbox
              label="Movies"
              value="movies"
              checked={this.state.type === "movies"}
              onChange={this.handleChange}
            />
            <Form.Checkbox
              label="TV Shows"
              value="shows"
              checked={this.state.type === "shows"}
              onChange={this.handleChange}
            />
            <Form.Checkbox
              label="Books"
              value="books"
              checked={this.state.type === "books"}
              onChange={this.handleChange}
            />
            <Form.Checkbox
              label="Authors"
              value="authors"
              checked={this.state.type === "authors"}
              onChange={this.handleChange}
            />
            <Form.Checkbox
              label="Music"
              value="music"
              checked={this.state.type === "music"}
              onChange={this.handleChange}
            />
            <Form.Checkbox
              label="Games"
              value="games"
              checked={this.state.type === "games"}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.generateSuggestionButton()}
        </Form>

        <div className="suggestionContainer">
          {this.generateSuggestionCards()}
        </div>
      </div>
    );
  }
}
