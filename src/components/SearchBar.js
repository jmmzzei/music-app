import React, { Component } from 'react'

export class SearchBar extends Component {
    state = {
        inputArtist: ''
    }

    _handleChange = e => {
        this.setState({inputArtist: e.target.value})
    }

    _handleSubmit = e => {
        e.preventDefault()
        fetch(`https://api.spotify.com/v1/search?q=${this.state.inputArtist}&type=artist`, {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " +  process.env.REACT_APP_SPOTIFY_API
        })
        .then(res => res.json())
        .then(res => {
            this.props.onResults(res.artists)
        })
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
            <div className="field has-addons">
                <div className="control">
                    <input
                    onChange={this._handleChange} 
                    className="input" 
                    type="text" 
                    placeholder="Search for an Artist"/>
                </div>
                <div className="control">
                    <button className="button is-info">
                    Search
                    </button>
                </div>
            </div>
                <p className="has-text-grey">
                    {this.state.inputArtist && 'Search for: ' + this.state.inputArtist}
                </p>
        </form>
        )
    }
}
            
