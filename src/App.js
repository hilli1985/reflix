import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';
import Catalog from './components/Catalog';
import Landing from './components/Landing';
import MovieDetail from './components/MovieDetail';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      budget:0,
      catalog: [
        { id: 0, isRented:false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, isRented:false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, isRented:false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, isRented:false, title: "The Sword in the Stone", year: 1963, img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, isRented:false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ],
      users: { 
        Tina:{rentedMovies:[0,1,2],budget:4},
        Loui:{rentedMovies:[3,4],budget:4},
        Nadia:{rentedMovies:[2],budget:10},
        Puff:{rentedMovies:[0,1,2,3],budget:10}
      },
      currentUser:'Tina',
      query:''
    };
  }

  chooseUser = (user) =>{
    this.setState({currentUser : user});
  }

  componentDidMount = async ()=>{
    let state = await JSON.parse(localStorage.getItem('state'));
    if (state) {
      this.setState({
        budget : state.budget,
        catalog : state.catalog,
        query:'',
        currentUser:state.currentUser,
        users : state.users
      })
    }
  }
  
  componentDidUpdate = async ()=> {
    await localStorage.setItem('state',JSON.stringify(this.state));
  }
  
  componentWillUnmount = async ()=> {
    await localStorage.setItem('state',JSON.stringify(this.state));
  }
  
  rentMovie = (id)=>{
    let budget = this.state.users[this.state.currentUser].budget;
    let userRentedMovies = [...this.state.users[this.state.currentUser].rentedMovies];
    if (budget-3<0){
      alert ('Your budget is lower than expected');
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
    let rentedMovies = this.state.users[user].rentedMovies; 
    let newCatalog = [...this.state.catalog];
    newCatalog.forEach((movie, index) => {
      newCatalog[index] = {...newCatalog[index]}
    })
    rentedMovies.forEach(rentedMovie => {
      newCatalog.filter(catalogMovie => catalogMovie.id === rentedMovie)[0].isRented = true;
    })
    return newCatalog;
  }
  render() {
    const filteredPerUserMovies = this.filterCatalogPerUser(this.state.currentUser);
    //console.log(filteredPerUserMovies);
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
