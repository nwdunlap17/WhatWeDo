import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component{
    render(){
        return (
        <div id="navBar">
            <Link to='/user/groups' className='NavBarLink'>Groups </Link>
            |
            <Link to='/user/content' className='NavBarLink'> My Media</Link>
            |
            <Link to='/signin' className='NavBarLink'> Log Out</Link>
        </div>
        )
    }
}