import React, { Component } from 'react';
import './App.css';

import InputItem from './components/InputItem';
import TodoItem from './components/TodoItem';
import ModalEdit from './components/ModalEdit'
import Counter from './components/Counter'
import './components/Responsive.css'
import cross from './Img/cross.svg'
import tick from './Img/tick.svg'
import untick from './Img/untick.svg'
import logoTodo from './Img/test.svg'

class App extends Component {
  constructor(){
    super();
    let data = [];
    data = JSON.parse( localStorage.getItem("data") );
    if(!data){
      localStorage.setItem("data","[]");
    }
    this.state = {
      data,
      btn_controll: 1
    }
  }
  
  addNewItem = (item) => {
    let dataStore = JSON.parse(localStorage.getItem("data"));
    if(this.state.data){
      localStorage.setItem("data", JSON.stringify(dataStore.concat(item)));
      this.setState({data: this.state.data.concat(item) });
    }else{
      localStorage.setItem("data", JSON.stringify([item]));
      this.setState({data: [item]})
    }
  }
    
  removeItem = (item) => {
    let dataStore = JSON.parse(localStorage.getItem("data"));
    const { data } = this.state;
    let i = data.indexOf(item);
    let dataIsRemoved = data.slice(0,i).concat(data.slice(i+1));
    let dataStoreNew = dataStore.slice(0,i).concat(dataStore.slice(i+1));
    localStorage.setItem("data", JSON.stringify(dataStoreNew));
    this.setState({data: dataIsRemoved });
  }
  
  
  
  editItem = (item) => {
    const { data } = this.state;
    let i = data.indexOf(item);
    this.setState({showEdit: !this.state.showEdit, vitri: i });
  }
  
  changeNewItem = (newItem) => {
    const { vitri } = this.state;
    let dataStore = JSON.parse(localStorage.getItem("data"));
    let dataStoreNew = dataStore.slice(0, vitri).concat(newItem, dataStore.slice(vitri + 1));
    localStorage.setItem("data", JSON.stringify(dataStoreNew));
    this.setState({
       data: this.state.data.slice(0, vitri).concat(newItem, this.state.data.slice(vitri + 1))
      })
    } 

    handleIsDone=(item) => {
      let dataStore = JSON.parse(localStorage.getItem("data"));
      let i = this.state.data.indexOf(item);
      let dataStoreNew = dataStore.slice(0, i).concat({...item, isDone: !item.isDone}, dataStore.slice(i+1));
      console.log(dataStoreNew);
      localStorage.setItem("data", JSON.stringify(dataStoreNew));
      this.setState({data: this.state.data.slice(0, i).concat( {...item, isDone: !item.isDone}, this.state.data.slice(i+1))});
    }
    getAll = () => {
      let dataStore = JSON.parse(localStorage.getItem("data"));
      this.setState({data: dataStore, btn_controll: 1});
    }
    getActive = () => {
       let dataStore = JSON.parse(localStorage.getItem("data"));
       let dataActive = dataStore.filter(item => item.isDone === false);
       if(dataActive.length){
         this.setState({data: dataActive, btn_controll: 2});
       }
      }

    getDone = () => {
      let dataStore = JSON.parse(localStorage.getItem("data"));
      let dataDone = dataStore.filter(item => item.isDone === true);
      if(dataDone.length){
          this.setState({data: dataDone, btn_controll: 3});
      };
    }

    setAllDone = () => {
      let dataStore = JSON.parse(localStorage.getItem("data"));
      let dataFalse = dataStore.filter(item => !item.isDone  );
      console.log(dataFalse);
      let dataNew = dataStore.map(item => {
          return ({...item, isDone: dataFalse.length ? true : false }); 
      })
      localStorage.setItem("data", JSON.stringify(dataNew));
      this.setState({data: dataNew});
    }
    render(){
      let isShowCounter = true;
      if(this.state.data){
        if( !this.state.data.length){
          isShowCounter = false; 
        }
      }

      return (
        <div className="App">
       <div className="title_logo">
          <h1>todos</h1>
          <img className="logoTodo" src={logoTodo} alt="logoTodo"/>
       </div>
        <div className="wrapper_content">
          <InputItem isShowCounter={isShowCounter} setAllDone={this.setAllDone} addNewItem={this.addNewItem} ></InputItem>
          <TodoItem data = {this.state.data} showEdit = {this.state.showEdit} render={ item => <div
                 className={item.isDone ? "Item isDone" : "Item"} >
                    <img  onClick={() => this.handleIsDone(item)}  className="tick" src={item.isDone ? tick : untick} alt="tick"/>
                    <span className="item_content" onClick={() => this.handleIsDone(item)} >{item.name} </span>
                    <button className="btn_remove" onClick={() => this.removeItem(item)} > 
                      <img src={cross} alt="cross"/>
                    </button>
                {/* <button className="btn_edit" onClick={() => this.editItem(item)} > sua </button> */}
              </div>
            } 
          />
         
          {this.state.showEdit && <ModalEdit changeNewItem={this.changeNewItem} indexItem={this.state.vitri + 1} />}
          
          { isShowCounter && <Counter btn_controll={this.state.btn_controll} getAll={this.getAll} getActive={this.getActive} getDone={this.getDone} data={this.state.data} /> }
         
        </div>
      </div>
    );
    

  }
}

export default App;
