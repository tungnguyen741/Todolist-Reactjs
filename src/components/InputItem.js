import React, { Component } from 'react';
import './InputItem.css'
import down_arrow from '../Img/down-arrow.svg'

export default class InputItem extends Component{
    constructor(){
        super();
        this.state = {
            value: "",
            vitri: 0
        }
        this.inputValue = React.createRef();
    }
    getValueInput = (e) => {
        this.setState({value: e.target.value});
    }

    render(){
        return(
        <div className="InputItem">
            {this.props.isShowCounter && <img onClick={this.props.setAllDone} className="down_arrow" src={down_arrow} alt="down_arrow"/>}
            <input onKeyDown={(e) => {
                if (e.key === 'Enter'){
                    if(!this.state.value){
                        alert("invalid value");
                        return;
                    }
                    this.props.addNewItem({name: this.state.value, isDone: false});
                    this.inputValue.current.value = "";
                }
             }}
              ref={this.inputValue} 
              onChange={this.getValueInput}
              type="text"
              placeholder="What needs to be done?"
            />
        </div>
        );
    }  
}

 