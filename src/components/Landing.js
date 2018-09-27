import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import '../styles/Landing.css';

class Landing extends Component {
    click = (user) => {
        this.props.handleClick(user);
    }
    render() {
        let users = this.props.users;
        return (
            <div className="main">
            <h1>Who's watching</h1>
            <div>
            {Object.entries(users).map((c,i) => {
                return (
                    <div className="user-container">
                    <span id="user-headline">{c[0]}</span>
                    <Link to="/catalog">
                    <div name={c[0]} id={`user-${i+1}`} 
                    className="user-box" 
                    onClick={(i)=>this.click(c[0])}></div>
                    </Link>
                    </div>
                )
            })}
            </div>
            </div>
        );
    }
    
}

export default Landing;