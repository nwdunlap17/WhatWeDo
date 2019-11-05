//sign in and sign up component
import React,{Component} from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import SignOut from '../components/SignOut'
import Title from '../components/Title'

export default class SigninSignup extends Component {
    
   userCheck = () => {
       if (this.props.currentUser === null){
            return (
                <div>
                    <SignIn login={this.props.onLogIn}/>
                    <SignUp login={this.props.onLogIn} BackendURL={this.props.BackendURL}/>
                </div>
            )
       } else {
           return <div><SignOut currentUser={this.props.currentUser} handleSignOut={this.props.handleSignOut}/></div>
       }
   }

    render(){
        return(
            <div id='logInForm' className='container'>
                {this.userCheck()}
            </div>
        )
    }


}