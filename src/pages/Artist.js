import React, { Component } from "react"
import PropTypes from "prop-types"
import { Hero } from "../components/Hero"
import { DetailContainer } from "../components/DetailContainer"
import { Navbar } from "../components/Navbar"
import { Tags } from "../components/Tags"
import { Loading } from '../components/Loading'

export class Artist extends Component {
	state = {
		tracks: {},
		albums: {},
		artist: {},
		success: true
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
		console.log(encodeURI(this.props.match.params.artist))
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

				} else if (res.error) {
					this.setState({ success: false })
				}
			})
	}

	componentDidMount() {
		this._fetchData("gettoptracks")
		this._fetchData("getinfo")
	}

	componentDidUpdate(previousProps) {
		const currentSearch = this.props.location.pathname
		const previousSearch = previousProps.location.pathname
		if (currentSearch !== previousSearch) {
			this._fetchData("gettoptracks")
			this._fetchData("getinfo")
		}
	}

	render() {
		return (
			<>
			<Navbar hasButton />
			{this.state.success
				?
				this.state.tracks.length && this.state.artist.name
					? (<>
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
							tracks={this.state.tracks}
						/>
					</>)
					: (<Loading/>)
				
					: (<p className="is-size-3">The artist you supplied could not be found.</p>)
					}
					</>
		)
	}
}
