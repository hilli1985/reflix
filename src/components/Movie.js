import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../styles/Movie.css';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isHidden:false
        }
    }
    
    clickHandle = ()=>{
        if (this.props.sign==='+'){
            this.props.rentFunc(this.props.id);
        }
        else { 
            this.props.rentFunc(this.props.id);
        }
    }
    
    render(){
        if (this.props.sign==='+'){
            return (
                <div className="movie-card" key={this.props.id}>
                <span className="i-circle" onClick={this.clickHandle}>{this.props.sign}</span>
                <Link to={`/movieDetail/${this.props.id}`}>
                <img className="movie-img" src={this.props.img} alt="img" />
                </Link>
                </div>
            )
        }
        else {
            return (
                <div className="movie-card" key={this.props.id}>
                <span className="i-circle" onClick={this.clickHandle}>{this.props.sign}</span>
                <img className="movie-img" src={this.props.img} alt="img" />    
                </div>
            ) 
        }
    }
}

export default Movie;


