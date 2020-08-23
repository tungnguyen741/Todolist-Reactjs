import React, {Component} from 'react';
export default class ModalEdit extends Component {
    constructor(){
      super();
      this.state={
        value: "",
        showEdit: false
      }
      this.inputValue = React.createRef();
    }

    getValueInput = (e) => {
      this.setState({value: e.target.value})
    }
  
    render(){
      return(
        <div className="ModalEdit">
            <div className="vitri">
            vi tri {this.props.indexItem}
            </div>
            <input ref={this.inputValue} onChange={this.getValueInput} type="text"/>
            <button onClick={()=>{
              this.props.changeNewItem({name: this.state.value});
              this.inputValue.current.value = "";
            }}>submit</button>
        </div>
      );
    }
  }
  