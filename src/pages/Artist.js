import React, { Component } from "react"
import PropTypes from "prop-types"
import { Hero } from "../components/Hero"
import { DetailContainer } from "../components/DetailContainer"
import { Navbar } from "../components/Navbar"
import { Tags } from "../components/Tags"
import { List } from "../components/List"

export class Artist extends Component {
	state = {
		tracks: {},
		albums: {},
		artist: {}
	}

	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.object,
			isExact: PropTypes.bool,
			path: PropTypes.string,
			url: PropTypes.string
		})
	}

	_fetchData = async reqParam => {
		let responseAPI = {}
		await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=artist.${reqParam}&artist=${this.props.match.params.artist.toLowerCase()}&api_key=${
			process.env.REACT_APP_API_KEY
			}&format=json`
		)
			.then(res => res.json())
			.then(res => {
				if (res.toptracks) {
					responseAPI = res.toptracks.track.filter((e, i) => i < 10)
					this.setState({ tracks: responseAPI })
					console.log(this.state.tracks)
				} else if (res.artist) {
					this.setState({ artist: res.artist })
					console.log(this.state.artist)

				} else if (res.topalbums) {
					responseAPI = res.topalbums.album.filter((e, i) => i < 10)
					this.setState({ albums: responseAPI })
					console.log(this.state.albums)

				}
			})
	}

	componentDidMount() {
		this._fetchData("getinfo")
		this._fetchData("gettopalbums")
		this._fetchData("gettoptracks")
	}

	componentDidUpdate(previousProps) {
		const currentSearch = this.props.location.pathname
		const previousSearch = previousProps.location.pathname
		if (currentSearch !== previousSearch) {
			this._fetchData("getinfo")
			this._fetchData("getsimilar")
			this._fetchData("getinfo")

		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ resultado: nextProps })
	}

	render() {
		return (
			this.state.tracks.length && this.state.albums.length
				? (<>
					<Navbar hasButton/>
					<Hero small>
						<div className="SearchForm-wrapper">
							{this.state.artist.name.toUpperCase()}
						</div>
						<Tags
							elements={this.state.artist.tags.tag}
						/>
					</Hero>
					<DetailContainer
						bio={this.state.artist.bio.content}
						listeners={this.state.artist.stats.listeners}
						img={this.state.artist.image[4]["#text"]}
						tags={this.state.artist.tags.tag}
						similar={this.state.artist.similar.artist}
					>
						<List
							iterable={this.state.tracks}
							title="TOP SONGS"
						/>
					</DetailContainer>
				</>)
				: null
		)
	}
}
