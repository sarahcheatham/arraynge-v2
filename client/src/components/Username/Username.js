import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadUsername, setUsername } from '../../store/actions';
import "./Username.css";

class Username extends Component{
    
    componentDidMount(){
        if(this.props.username !== ""){
            this.props.loadUsername();
        }
        this.props.setUsername("Sign In");
        
    }
    render(){
        return (
            <span className="username-component">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path opacity=".3" d="M12 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z"/><circle opacity=".3" cx="12" cy="8" r="2"/><path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H6zm6-6c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>
                <span className="username-text">{this.props.username}</span>
            </span>
        )
    }
    
}

const mapStateToProps = state => {
    return{
        username: state.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUsername: () => dispatch(loadUsername()),
        setUsername: username => dispatch(setUsername(username))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Username);