import React, {Component} from 'react'

export default class FriendBar extends Component{

    constructor(props){
        super(props)
    }

    upDateSearch = (e) => { 
        this.setState({search: e.target.value})

        if (e.target.value.length > 0){
            fetch(this.props.BackendURL+'/usersearch',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify({
                    search: e.target.value
                })
            })
            .then(response => response.json())
            .then(json => {
                this.setState({foundUsers: json})
            })
        }
    }
}