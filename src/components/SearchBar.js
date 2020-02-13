import React, { Component } from 'react'

export class SearchBar extends Component {
    state = {
        inputArtist: '',
        loading: false
    }

    _handleChange = e => {
        this.setState({inputArtist: e.target.value.toUpperCase()})
    }

    _handleSubmit = async e => {
        e.preventDefault()
        if (this.state.inputArtist) {
            sessionStorage && sessionStorage.clear()
            
            sessionStorage.setItem('input', this.state.inputArtist)
            this.setState({loading: true})
            
            if (this.state.inputArtist.length !== 0) {
                await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.state.inputArtist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
                .then(res => res.json())
                .then(res => {
                    this.props.onResults(res.artist)
                })
                await this.setState({ inputArtist: '', loading: false })
            }
        }
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
            <div className="field has-addons">
                <div className={this.state.loading ? "control is-loading" : "control"} >
                    <input
                    onChange={this._handleChange}
                    className="input is-radiusless" 
                    type="text" 
                    placeholder="Search for an Artist"
                    value={this.state.inputArtist}
                    autoFocus
                    />
                </div>
                <div className="control">
                    <button className={`button is-warning is-radiusless ${this.state.inputArtist.length > 0 ? '' : 'is-hidden'}`}>
                        <p className="has-text-weight-bold">SEARCH</p>
                    </button>
                </div>
            </div>
        </form>
        )
    }
}