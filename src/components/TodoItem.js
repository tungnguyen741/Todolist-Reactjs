import React, {Component} from 'react';
import './TodoItem.css'
export default class TodoItem extends Component{
    render(){
        const { data, render } = this.props;
      return(
        <div className="TodoItem">
          {data ? data.map(render) : ''}
        </div>
      );
    }
  }