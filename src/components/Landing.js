import React, { Component } from 'react';
import '../styles/Landing.css';
import {Link} from 'react-router-dom'


class Landing extends Component {
    render() {
        let users = [];
        return (
            <div className="main">
                <h1>Who's watching</h1>
                <br/>
                <Link to="/user/Tina"><div id="user-1" className="user-box">Tina</div></Link>
                <Link to="/user/Loui"><div id="user-2" className="user-box">Loui</div></Link>
                <Link to="/user/Nadia"><div id="user-3" className="user-box">Nadia</div></Link>
                <Link to="/user/Puff"><div id="user-4" className="user-box">Puff</div></Link>
            </div>
        );
 
    }

}

export default Landing;