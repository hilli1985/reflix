import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';
import Catalog from './components/Catalog';
import Landing from './components/Landing';
import MovieDetail from './components/MovieDetail';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      budget:0,
      catalog: [
      { id: 0, isRented:false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." }],
      users:   { 
        Dummy:{rentedMovies:[0],budget:4},
        Tina:{rentedMovies:[348350,400155,447200],budget:20},
        Loui:{rentedMovies:[507569,299536],budget:4},
        Nadia:{rentedMovies:[284054],budget:10},
        Puff:{rentedMovies:[284054,507569,348350],budget:10}
      },
      currentUser:'Dummy',
      query:'',
      page:1
    };
  }

  chooseUser = (user) =>{
    this.setState({currentUser : user});
  }

  componentDidMount = async ()=>{
    let results = await this.getMoviesFromAPI();
    let state = await JSON.parse(localStorage.getItem('state'));
    if (state) {
      this.setState({
        budget : (state.budget||20),
        catalog :  this.createCatalogFromResults(results),
        query:'',
        currentUser:(state.currentUser||'Tina'),
        users : (state.users||this.users)
      })
    }
  }

  componentDidUpdate = async ()=> {
    await localStorage.setItem('state',JSON.stringify(this.state));
  }
  
  componentWillUnmount = async ()=> {
    await localStorage.setItem('state',JSON.stringify(this.state));
  }

  createCatalogFromResults = (results)=>{
    return results.map(r=>({
      id:r.id,
      isRented:false,
      title:r.title,
      year:r.release_date,
      img:`https://image.tmdb.org/t/p/w500/${r.poster_path}`,
      descrShort:r.overview
    }))
  }

  getMoviesFromAPI = async ()=>{
    var data;
    let api_key = '877ee9cfc049b2212145ecb01fb2a031';
    let language = 'en-US';
    let page = this.state.page;
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=${language}&page=${page}`;
    await axios.get(url)
      .then(response => { 
        data = response.data.results;
      });
      return data;
  }
  
  rentMovie = (id)=>{
    let budget = this.state.users[this.state.currentUser].budget;
    let userRentedMovies = [...this.state.users[this.state.currentUser].rentedMovies];
    if (budget-3<0){
      alert ('Your budget is lower than expected,\n you have to un-rent as first step.');
      return;
    }
    if(!userRentedMovies.filter(r=>r===id).length){
      budget = budget -3;
      userRentedMovies.push(id);
    }
    let newUsers = {...this.state.users};
    newUsers[this.state.currentUser] = { 
      rentedMovies : userRentedMovies, 
      budget : budget , 
    }
    this.setState({
      users : newUsers
    });
  }
  
  unRentMovie = (id)=>{
    let budget = this.state.users[this.state.currentUser].budget;
    let userRentedMovies = [...this.state.users[this.state.currentUser].rentedMovies];
    if(userRentedMovies.filter(r=>r===id).length){
      budget = budget+3;
      userRentedMovies.forEach((mID, index)=> {
        if (mID === id) {
          userRentedMovies.splice(index,1)  
        }
      })
    };
    let newUsers = {...this.state.users};
    newUsers[this.state.currentUser] = 
    { 
      ...newUsers[this.state.currentUser],
      rentedMovies : userRentedMovies, 
      budget : budget
    }
    this.setState({
      users : newUsers
    });
  }
  
  handleChange = (event)=>{
    this.setState({query: event.target.value});
  }

  filterCatalogPerUser (user){
    if (user==='Dummy'){
      return;
    }
    let rentedMovies = [...this.state.users[user].rentedMovies]; 
    let newCatalog = [...this.state.catalog];
    console.log(newCatalog);
    newCatalog.forEach((movie, index) => {
      newCatalog[index] = {...newCatalog[index]}
    });
    console.log(rentedMovies);
    rentedMovies.forEach(rentedMovie => {
      newCatalog.filter(catalogMovie => catalogMovie.id === rentedMovie)[0].isRented = true
    })
    return newCatalog;
  }
  changePage = async (p)=>{
    //alert('page');
    let page = this.state.page;
    let results = await this.getMoviesFromAPI();
      this.setState({
        catalog :  this.createCatalogFromResults(results),
        page:page+p
      })
  }
  render() {
    const filteredPerUserMovies = this.filterCatalogPerUser(this.state.currentUser);
    return (
      <Router>
      <div className="body">
      <div id="main-links">
      <span ><Link id='reflix' to="/">REFLIX</Link></span>
      <Link to="/">Home</Link>
      <br/>
      <Route path="/" exact render = {() => 
      <Landing 
        users = {this.state.users} 
        handleClick = {this.chooseUser}/>}
      />
      <Route path="/catalog" exact render={() => 
      <Catalog 
        changePage = {this.changePage}
        rentedMovies={filteredPerUserMovies}
        budget = {this.state.users[this.state.currentUser].budget}
        state={this.state} 
        unRent={this.unRentMovie} 
        rent={this.rentMovie} 
        handleChange={this.handleChange} 
      />
      }/>
      <Route path="/movieDetail/:id" exact render={({ match }) => <MovieDetail match={match} state={this.state}/>}/>
      </div>
      </div>
      </Router>
    );
  }
}
export default App;
