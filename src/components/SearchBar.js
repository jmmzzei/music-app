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
        if (this.state.inputArtist.length !== 0) {
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.state.inputArtist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                this.props.onResults(res.artist)
            })
            this.setState({inputArtist: ''})
        }
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
                    placeholder="Search for an Artist"
                    value={this.state.inputArtist}
                    />
                </div>
                <div className="control">
                    <button className="button is-primary">
                    Search
                    </button>
                </div>
            </div>
        </form>
        )
    }
}
            
