import React, { Component } from 'react';
import '../styles/Catalog.css';
import Movie from './Movie';


class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        let catalog =[...this.props.state.catalog];
        this.setState({filteredCatalog:catalog}); 
    }
    
    getMovies = ()=> {
        let catalog = this.props.state.catalog;
        let rentFunc = this.props.rent;
        return (
            <div>
            {catalog.map(c => {
                return (
                    <Movie key={c.id} year={c.year} 
                    id={c.id}
                    title={c.title} 
                    img={c.img} 
                    sign='+'
                    rentFunc = {rentFunc}/>
                )
            })}
            </div>)
        }
        
    getRented =()=> {
        let catalog = this.props.state.catalog;
        let rentFunc = this.props.unRent;
        return (
            <div>
            {catalog.map(c => {
                return (
                    (c.isRented) && <Movie key={c.id}
                    id={c.id}
                    title={c.title} 
                    img={c.img} 
                    sign='-'
                    rentFunc = {rentFunc}/>
                )
            })}
            </div>)
    } 

    render() {
        let state = this.props.state; 
        return (
            <div className='catalog-main'>
            <input id="search" type="text" onChange={this.props.handleChange} name="search" value={this.props.state.value} placeholder="search" />
            <span id="budget">budget:${state.budget}</span>
            <br/>
            <div id="catalog">
                <h1>Catalog:</h1>
                <div>{this.getMovies()}</div>
            <br/><hr/>
            </div>
            {!this.props.state.hideRented && <div id="rented">
                <h1>Rented:</h1>
                <div>{this.getRented()}</div>
                </div>}
                </div>
            );
            
        }
        
    }
            
    export default Catalog;