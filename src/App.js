import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';
import Catalog from './components/Catalog';
import Landing from './components/Landing';
import MovieDetail from './components/MovieDetail';
import User from './components/User';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      budget:10,
      catalog: [
        { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ],
      fixedCatalog: [
        { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ], 
      hideRented:true,
      value:''
    };
  }
  
  componentDidMount = async ()=>{
    let state = await JSON.parse(localStorage.getItem('state'));
    if (state) {
      this.setState({
        budget : state.budget,
        catalog : state.catalog,
        hideRented : state.hideRented,
        fixedCatalog : state.fixedCatalog,
        value:''
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
    let budget = this.state.budget;
    let hideRented = this.state.hideRented;
    if (this.state.budget-3<0){
      alert ('Your budget is lower than expected');
      return;
    }
    if(!this.state.catalog[id].isRented){
      budget = budget -3;
      hideRented = false;
    }
    let newCatalog =[...this.state.catalog];
    newCatalog[id].isRented = true;
    let newfixedCatalog =[...this.state.fixedCatalog];
    newfixedCatalog[id].isRented = true;
    
    this.setState({
      catalog:newCatalog,
      hideRented:hideRented,
      budget:budget,
      fixedCatalog:newfixedCatalog
    });
  }
  
  unRentMovie = (id)=>{
    let hideRented = this.state.hideRented;
    let budget = this.state.budget+3;
    let rented = this.state.rentedMovies;
    let newCatalog =[...this.state.catalog];
    newCatalog[id].isRented = false;
    let newfixedCatalog =[...this.state.fixedCatalog];
    newfixedCatalog[id].isRented = false;
    if(!this.state.catalog.filter(c=>c.isRented===true).length){
      hideRented = true;
    }
    this.setState({
      catalog:newCatalog,
      hideRented:hideRented,
      budget:budget,
      fixedCatalog : newfixedCatalog
    });
  }
  
  getSuggestions= (value)=> {
    if (value===''){
      return this.state.fixedCatalog;
    }
    let array = this.state.fixedCatalog;
    return array.filter(function(movie) {
      let title = movie.title.toLowerCase();
      return (title.includes(value)===true);
    });
  }
  
  handleChange = (event)=>{
    console.log('handle change');
    let value =  event.target.value;
    let newCatalog = this.getSuggestions(value);
    this.setState({catalog:newCatalog,value:value});
  }
  
  render() {
    return (
      <Router>
      <div className="body">
      <div id="main-links">
      <span>REFLIX</span>
      <Link to="/">Home</Link>
      <Link to="/catalog">Catalog</Link>
      <br/>
      <Route path="/" exact component={Landing}/>
      <Route path="/catalog" exact render={() => 
      <Catalog 
        state={this.state} 
        unRent={this.unRentMovie} 
        rent={this.rentMovie} 
        handleChange={this.handleChange} 
      />
      }/>
      <Route path="/movieDetail/:id" exact render={({ match }) => <MovieDetail match={match} state={this.state}/>}/>
      <Route path="/user/:name" exact render={({ match }) => <User match={match} state={this.state}/>}/>
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
