import React, { Component } from 'react';
import '../styles/Catalog.css';
import Movie from './Movie';
import Paging from './Paging';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstIndex : 0,
            lastIndex : 7
        }
    }
    
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    
    filterMovies = (catalog, query) => {
        if (!query) {
            return catalog;
        }
        
        return catalog.filter((movie) => movie.title.toLowerCase().includes(query));
    }
    
    getMovies =  () => {
        let catalog = this.props.rentedMovies;
        let query = this.props.state.query;
        let rentFunc = this.props.rent;
        let first = this.state.firstIndex;
        let last = this.state.lastIndex;
        let filteredCatalogShort = this.filterMovies(catalog.slice(first,last), query); 
        return (
            <div>
            {filteredCatalogShort.map(c => {
                return (
                    <Movie key={c.id} year={c.year} 
                    isRented={c.isRented}
                    id={c.id}
                    title={c.title} 
                    img={c.img} 
                    sign='+'
                    rentFunc={rentFunc}/>          
                )
            })}
              <Paging changePage={this.props.changePage} start={this.state.firstIndex} end={this.state.lastIndex} 
              updatePositions={this.updatePositions} total={catalog.length}/>
            </div>)
    }

    getRented =()=> {
        let query = this.props.state.query;
        let rentFunc = this.props.unRent;
        let rented = this.props.rentedMovies;
        let filteredCatalog = this.filterMovies(rented, query);
        if(!filteredCatalog){
            return;
        }
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
    
    isHide = (rented) =>{
        if (!rented) {
            return;
        }
        return ((rented.filter(r => r.isRented).length)===0);
    }
    
    updatePositions = (start,end) => {
        this.setState({
            firstIndex : start,
            lastIndex : end
            } 
        )
        //alert (`start:${start} end:${end}`);
    }        
    render() {
        let rented = this.props.rentedMovies;
        let hideRented = this.isHide(rented);
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
            {!hideRented && <div id="rented">
            <h1>Rented:</h1>
            <div>{this.getRented()}</div>
            </div>}
            </div>
        );
        
    }
    
}
        
export default Catalog;