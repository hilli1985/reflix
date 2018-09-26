import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../styles/Movie.css';



class User extends Component {
    render() {
        const name = this.props.match.params.name
        return (<h1>user:{name}</h1>)    
    }
}

export default User;