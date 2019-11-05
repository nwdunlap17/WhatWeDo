import React, { Component } from "react";
import { Card, Embed, Image } from "semantic-ui-react";

class SuggestionCard extends Component {
  constructor() {
    super();

    this.state = {
      isClicked: false
    };
  }

  generateImage = () => {
    let yID = this.props.itemData.yID;
    return yID !== null ? (
      <Embed
        aspectRatio="4:3"
        id={yID}
        placeholder="https://cdn.saultonline.com/wp-content/uploads/2017/04/FILM-REELS.jpg"
        source="youtube"
      />
    ) : (
      <Image
        src="https://us.123rf.com/450wm/sabelskaya/sabelskaya1805/sabelskaya180500549/101969224-stock-vector-two-human-hands-giving-fist-bump-gesture-in-sketch-style-isolated-on-white-background-hand-drawn-vec.jpg?ver=6"
        wrapped
        ui={false}
      />
    );
  };

  handleClick = () => {
    this.setState(prevState => {
      return { isClicked: !prevState.isClicked };
    });
  };

  generateDescription = () => {
    return this.state.isClicked === true ? (
      <Card.Description>
        <span id="scroll">{this.props.itemData.wTeaser}</span>
        <br></br>
        <button id="button-new" onClick={() => this.handleClick()}>
          Hide
        </button>
      </Card.Description>
    ) : (
      <Card.Description>
        <button
          id="button-new"
          className="moreInfoBtn"
          onClick={() => this.handleClick()}
        >
          <span>Description</span>
        </button>
      </Card.Description>
    );
  };

  render() {
    let { Name, Type } = this.props.itemData;
    return (
      <div>
        <br></br>
        <div>
          <Card>
            {this.generateImage()}
            <Card.Content>
              <Card.Header>{Name}</Card.Header>
              <Card.Meta>
                <span className="date">{Type}</span>
              </Card.Meta>
              {this.generateDescription()}
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default SuggestionCard;
