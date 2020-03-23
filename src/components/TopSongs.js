import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class TopSongs extends Component {
    state = {
        fetchedData: '',
        tab: 'songs',
        prevArtist: '',
        selectedItem: ''
    }

    _fetchData = async (reqParam) => {
        let responseAPI = {}
        await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.${reqParam}&artist=${this.props.artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                if (res.toptracks) {
                    responseAPI = res.toptracks.track.filter((e, i) => i < this.props.quantity)
                    this.setState({ fetchedData: responseAPI })
                    this.props.onResults({tracks: responseAPI, ...this.props})
                } else {
                    responseAPI = res.topalbums.album.filter((e, i) => i < this.props.quantity)
                    this.setState({ fetchedData: responseAPI })
                    this.props.onResults({albums: responseAPI, ...this.props})
                }
            })

        return await new Promise((resolve, reject) => resolve(responseAPI));
    }

    _sessionStoreOrFetch = (sessionStoreField, reqParam) => {
        if (!sessionStorage[sessionStoreField]) {
            this._fetchData(reqParam).then(res =>
                sessionStorage.setItem(sessionStoreField, JSON.stringify(res)))
        } else {
            this.setState({ fetchedData: JSON.parse(sessionStorage[sessionStoreField]) })
        }
    }

    _rePopulateState = reqParam => {
        if (this.state.tab === 'songs'){
            this._sessionStoreOrFetch('songsData', reqParam)
        } else {
            this._sessionStoreOrFetch('albumsData', reqParam)
        }
    }

    componentDidMount() {
        let reqParam = this.state.tab === 'songs' ? 'gettoptracks' : 'gettopalbums'
        this._fetchData(reqParam).then(res =>
            sessionStorage.setItem('songsData', JSON.stringify(res)))
    }

    _handleClick = (e) => {
        this.setState({ tab: this.state.tab === 'songs' ? 'albums' : 'songs' })
        let reqParam = this.state.tab === 'songs' ? 'gettoptracks' : 'gettopalbums'
        this._rePopulateState(reqParam)
    }

    _handleSingleSongClick = (e) => {
        this.props.onCallback(e)
        console.log(e.target.innerText)
    }

    render() {
        return (
            <nav className="panel">
                <p className="panel-heading">
                    {this.state.tab === 'songs' ? 'TOP SONGS' : 'TOP ALBUMS'}
                </p>
                <p className="panel-tabs">
                    <a onClick={this._handleClick}>
                        {this.state.tab === 'songs' ? 'TOP ALBUMS' : 'TOP SONGS'}
                    </a>
                </p>
                {
                    typeof this.state.fetchedData === "string"
                    ? null
                    : this.state.fetchedData.map((e, i) => 
                        <Link 
                        to={`/song/${e.artist.name}/${e.name}`} 
                        key={e.mbid} 
                        className="panel-block is-active"
                        onClick={this._handleSingleSongClick}>
                            {e.name.toUpperCase()}
                        </Link>
                    )
                }
            </nav>
        )
    }
}