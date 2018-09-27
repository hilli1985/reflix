import React, { Component } from 'react';
import '../styles/Catalog.css';
import Movie from './Movie';


class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
  
    
    filterMovies = (catalog, query) => {
        if (!query) {
            return catalog;
        }
        
        return catalog.filter((movie) => movie.title.toLowerCase().includes(query));
    }
    
    getMovies = ()=> {
        let catalog = this.props.state.catalog;
        let query = this.props.state.query;
        let rentFunc = this.props.rent;

        let filteredCatalog = this.filterMovies(catalog, query);

        return (
            <div>
            {filteredCatalog.map(c => {
                return (
                    <Movie key={c.id} year={c.year} 
                    id={c.id}
                    title={c.title} 
                    img={c.img} 
                    sign='+'
                    rentFunc={rentFunc}/>
                )
            })}
            </div>)
        }
        
        getRented =()=> {
            //let catalog = this.props.state.catalog;
            let query = this.props.state.query;
            let rentFunc = this.props.unRent;
            let rented = this.props.rentedMovies
    
            let filteredCatalog = this.filterMovies(rented, query);
    
            return (
                <div>
                {filteredCatalog.map(c => {
                    return (
                        (c.isRented) && <Movie key={c.id}
                        id={c.id}
                        title={c.title} 
                        img={c.img} 
                        sign='-'
                        rentFunc={rentFunc}/>
                    )
                })}
                </div>)
            } 
            
            render() {
                let state = this.props.state;
                return (
                    <div className='catalog-main'>
                    <input id="search" type="text" onChange={this.props.handleChange} name="search" value={this.props.state.value} placeholder="search" />
                    <span id="budget">budget:${this.props.budget}</span>
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