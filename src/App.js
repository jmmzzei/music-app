import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './App.css'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'

class App extends Component {
  render() {
    const url = new URL(document.location)
    const hasID = url.searchParams.has('id')
    const Page = hasID 
                 ? <Detail id={url.searchParams.get('id')} />
                 : <Home />  

    return (
      <div className="App">
        {Page}
      </div>
    )
  }
}

export default App;
