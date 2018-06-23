import React, { Component } from 'react';
import Layout from "./components/Layout/Layout"
import {BrowserRouter} from "react-router-dom"
import './App.css';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Layout></Layout>
    </BrowserRouter>  

    );
  }
}

export default App;
