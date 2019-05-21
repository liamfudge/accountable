import React, { Component } from 'react';
import './App.css';

import{ Provider } from 'react-redux';
import Store from './Store';

import HeaderControl from './Components/Header/HeaderControl';
import Main from './Components/Main/Main';

class App extends Component {
  render() {
    return (
    	<Provider store={Store}>
	      <div className="App">
	        <HeaderControl />
	        <Main />
	      </div>
      	</Provider>
    );
  }
}

export default App;
