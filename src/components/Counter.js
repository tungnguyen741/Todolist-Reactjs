import React, { Component } from 'react';
import './Counter.css'
export default class Counter extends Component {
    
    render(){
        const {data, getAll, getActive, getDone}= this.props;
            return(
                <div className="Counter">
                    <div className="amount_item">
                        {/* { data.length !==0 ? data.length : ""  } item left */}
                        {data.filter(item => item.isDone === false).length } item left
                    </div>
                    <div className="btn_controll">
                        <button className={this.props.btn_controll===1 ? "btn btn_getAll active1" : "btn btn_getAll"} onClick={getAll} >All</button>
                        <button className={this.props.btn_controll===2 ? "btn btn_getActive active2" : "btn btn_getActive"} onClick={getActive} >Active</button>
                        <button className={this.props.btn_controll===3 ? "btn btn_getDone active3" : "btn btn_getDone"} onClick={getDone} >Complete</button>
                    </div>
                   
                </div>
            );
    }
}