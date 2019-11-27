import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { apiResponse: "" };
  // }
  // callAPI() {
  //   fetch("http://localhost:9000/home")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err);

  // }
  // componentDidMount() {
  //   this.callAPI();
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="logo" />
          <p>
           {this.state.apiResponse}
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
  
}


export default App;
