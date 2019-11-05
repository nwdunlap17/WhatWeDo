import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

    responseCheck = response => {
        if (!!response.alert){
            alert(response.alert)
        } else {
            this.props.login(this.state.input)
            
        }
    }

    handleSignUp = () => {
        let username = this.state.input
        fetch(this.props.BackendURL+'/users',{
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                username: username
            })
        })
        //make another function call it from .then 
        .then(response => response.json())
        .then(response => this.responseCheck(response))
        
    }
          
    handleOnChange = (e) => {
        this.setState({
            input: e.target.value
        })
    } 

  render() {
    return (
      <div id="signUp">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleOnChange}
        />
        <button id="button-new" onClick={this.handleSignUp}>
          Sign Up
        </button>
      </div>
    );
  }
}
