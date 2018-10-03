import React, { Component } from "react";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';


//http://vayser.github.io/react-js-pagination/
//https://www.npmjs.com/package/react-js-pagination

class Paging extends Component {
  state = {
    current: 1,

  };
  onChange = (page) => {
    console.log("page:"+page, "cur:"+this.state.current);
    if (page>this.state.current){
      this.updatePositions('up');
    }
    else if (page<this.state.current) {
      this.updatePositions('down');
    }
    console.log(page);
    this.setState({
      current: page,
    });
  }
  updatePositions = (direction) => {
    if (direction==='up'){
      if (this.props.end+7-(this.props.total%7)>=this.props.total) {
        return;
      }
      this.props.updatePositions(this.props.start+7,this.props.end+7)
    }
    else if (direction==='down'){
        this.props.updatePositions(this.props.start-7,this.props.end-7)
      }
  }

  render() {
    let total = this.props.total;
    return <Pagination start={this.props.startIndex} 
    end={this.props.endIndex} onChange={this.onChange} 
    defaultPageSize={7} current={this.state.current} 
    total={total} />;
  }
}

export default Paging;