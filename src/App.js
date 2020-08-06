import React, { Component } from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Artist } from "./pages/Artist"
import { NotFound } from "./pages/NotFound"
import { Song } from "./pages/Songs"
import "bulma/css/bulma.css"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultado: {},
      song: "",
      artistName: "",
    }
  }

  _handleResults = results => {
    this.setState({ artistName: results.results.name })
    this.setState({ resultado: results })
  }

  _handleSingleSong = song => {
    this.setState({ song: song })
  }

  componentDidMount(){
    fetch('/.netlify/functions/fetch')
      .then(res => {
      console.log(res)
        return res.json()
      }).then(data => {
      console.log(data)
      })
  }

  render() {
    return (
      <Router basename="/music-app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                onResults={this._handleResults}
                onCallback={this._handleSingleSong}
              />
            )}
          />
          <Route path="/artist/:artist" component={Artist} />
          <Route path="/song/:artist/:song" component={Song} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}
export default App
