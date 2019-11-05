import React,{Component} from 'react'

export default class ContentAddBar extends Component{
    
    constructor(props) {
        super(props);
        this.state = {content: '', contentType: ''};
    }
    
    handleChange = (event) => {
        this.setState({content: event.target.value});
    }

    handleAddContent = async (event) => {
        console.log('handle Add content')
        event.preventDefault();
        
        fetch(this.props.BackendURL+'/add-content', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                userID: JSON.parse(sessionStorage.getItem('current_user')).id,
                title: this.state.content,
                category: this.state.contentType
            })
        })
        .then(response => {this.props.onAddContent()})
        this.setState({content: ''})
    }

    render(){
        return ( 
        <div>
            <h2>Add Media</h2>
            <form onSubmit={this.handleAddContent}>
            <select id="button-new"onChange={e=>{this.setState({contentType: e.target.value})}}>
                <label>Media Type:</label>
                <option value=''>(Auto)</option>
                <option value='movie'>Movie</option>
                <option value='show'>Show</option>
                <option value='game'>Game</option>
                <option value='band'>Band</option>
                <option value='book'>Book</option>
                <option value='author'>Author</option>
            </select>
            <input type="text" value={this.state.content} onChange={this.handleChange} />
            <input id="button-new"type="submit" value="Submit" />
            </form>
        </div>
        )
    }
}