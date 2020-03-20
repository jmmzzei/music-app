import React, { Component } from "react"
import { Switch, Route, withRouter } from "react-router-dom"

import "bulma/css/bulma.css"
import "./App.css"
import { Home } from "./pages/Home"
import { Artist } from "./pages/Artist"
import { NotFound } from "./pages/NotFound"
import { Song } from "./pages/Songs"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			resultado: {},
			song: "",
			artistName: ""
		}
	}

	_handleResults = results => {
		console.log(results)

		this.setState({ artistName: results.results.name })
		this.setState({ resultado: results })
		console.log(this.state.artistName)
	}

	_handleSingleSong = song => {
		console.log(song)
		this.setState({ song: song })
	}

	_handleCallback = artist => {
		// this.setState({})
		console.log(artist)
	}

	render() {
		console.log(this.state.artistName)
		return (
			<div className="App">
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
					<Route
						path="/artist/:artist"
						render={router => (
							<Artist router={router} {...this.state} />
						)}
					/>
					{/* <Route
						path="/song/:artist/:song"
						render={router => (
							<Song
								router={router}
								onCallback={this._handleCallback}
							/>
						)}
					/> */}
          <Route
						path="/song/:artist/:song"
						component={Song}
					/>
					<Route component={NotFound} />
				</Switch>
			</div>
		)
	}
}

export default App
