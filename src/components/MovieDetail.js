import React, { Component } from 'react';
import '../styles/MovieDetail.css';
import axios from 'axios';
import { Link} from 'react-router-dom'



class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie:{},
            loading:true
         }
    }

componentDidMount(){
    const match = this.props.match
    const id = match.params.id
    this.getMovieFromAPI(id);
}    
getMovieFromAPI = async (id) => {
    let movie;
    let api_key = '877ee9cfc049b2212145ecb01fb2a031';
    let language = 'en-US';
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=${language}`;
    await axios.get(url)
    .then(response => { 
        movie = response.data;
        movie = {
            id : movie.id,
            title : movie.title,
            year: movie.release_date.split('-')[0],
            descrShort : movie.overview,
            img : `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
        }
    });
    this.setState({movie: movie, loading:false});
}
render() {
    //Missing radix parameter - 
    //https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter-what-should-i-do
    // let movie = state.catalog.filter(m => 
    //     (parseInt(m.id) === parseInt(id)))[0];
    let movie = this.state.movie;
        if (this.state.loading===true){
            return (<div className='pending' ></div>)
        }
        return (
            <div className="movie-container-1">
            <h1>{movie.title} ({movie.year})</h1>
            <img className="movie-img-1" src={movie.img} alt="img" />
            <p><h2>Description</h2>{movie.descrShort}</p>
            <Link to={`/catalog`}>
            <div className='back' onClick={this.goBack}></div></Link>
            </div>
        )
        
    }
}
export default MovieDetail;