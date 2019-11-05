import React, {Component} from 'react' 
import GroupViewer from '../components/GroupViewer'
import GroupSelector from '../components/GroupSelector'



class GroupContainer extends Component{
    constructor(props){
        super(props)
        this.state = {currentGroup: null, allGroups: []}
    }

    getGroups = async () =>{
        let url = this.props.BackendURL + "/user-groups"
        
        return fetch(url,{
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
        .then(groups => this.setState({
            allGroups: groups
        }))
    }


    componentDidMount = () => {
        this.getGroups()
    }

    onAddGroup = async () => {
        let waiting = await this.getGroups()
        this.setCurrentGroup(this.state.allGroups[this.state.allGroups.length-1]) 
    }

    setCurrentGroup = (selectedGroup) => {
        let index = this.state.selectedGroup
        
        for(let i = 0; i < this.state.allGroups.length; i++){
            if (this.state.allGroups[i].id === selectedGroup.id){
                index = i;
            }
        }

        
        this.setState({
            currentGroup: index
        })
        console.log(selectedGroup)
        console.log("current group", this.state.currentGroup)
    }



    render() {
        return(
            <div id="groupContainer" className='container'>
                <GroupSelector currentGroup={this.state.allGroups[this.state.currentGroup]} onSelectGroup={this.setCurrentGroup} groups={this.state.allGroups} onAddGroup={this.onAddGroup} BackendURL={this.props.BackendURL}/>
                {this.state.currentGroup !== null? <GroupViewer BackendURL={this.props.BackendURL} currentGroup={this.state.allGroups[this.state.currentGroup]} refreshGroups={this.getGroups}/> : <h2 id="initSelect">Select a Group</h2>}
            </div>
        )
    }

}

export default GroupContainer