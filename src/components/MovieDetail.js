import React, { Component } from 'react';
import '../styles/MovieDetail.css'



class MovieDetail extends Component {
    render() {
        const match = this.props.match
        console.log(match.params);
        const state = this.props.state
        const id = match.params.id

        //Missing radix parameter - 
        //https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter-what-should-i-do

        const movie = state.catalog.filter(m => 
            (parseInt(m.id) === parseInt(id)))[0];
        return (
            <div className="movie-container-1">
            <h1>{movie.title} ({movie.year})</h1>
            <img className="movie-img-1" src={movie.img} alt="img" />
            <p><h2>Description</h2>{movie.descrShort}</p>
            </div>
        )
        
    }
}

export default MovieDetail;