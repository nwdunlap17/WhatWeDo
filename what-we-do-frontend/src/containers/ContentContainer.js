import React,{Component} from 'react'
import ContentViewer from '../components/ContentViewer'
import ContentAddBar from '../components/ContentAddBar'

export default class ContentContainer extends Component{
    
    constructor(props){
        super(props)
        this.state = { allContent: []}
    }

    componentDidMount(){
        this.getContents()
    }

    getContents = ()  => {
    console.log('url', this.props.BackendURL)
    fetch(this.props.BackendURL + "/user-content", {
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            userID: JSON.parse(sessionStorage.getItem('current_user')).id
        })
    })
    .then(response => response.json())
    .then(contents => this.setState({
        allContent: contents
    }))

    }

    render(){
        return(
            <div className='container'>
                <ContentAddBar 
                BackendURL={this.props.BackendURL} 
                onAddContent={this.getContents}
                />
                <ContentViewer 
                content={this.state.allContent} 
                BackendURL={this.props.BackendURL} 
                onRemoveContent={this.getContents}
                />
            </div>
        )
    }
}