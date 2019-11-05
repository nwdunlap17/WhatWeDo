import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component{
    render(){
        return (
        <div id="navBar">
            <Link to='/user/groups'>Groups </Link>
            |
            <Link to='/user/content'> My Media</Link>
        </div>
        )
    }
}