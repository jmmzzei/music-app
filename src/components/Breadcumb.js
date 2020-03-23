import React, { Component } from 'react'
import { Title } from './Title'
import { concatSeries } from 'async'

export class Breadcrumb extends Component {
    state = {inputArtist: ''}

    _handleClick = e => {
        this.setState({inputArtist: e.target.innerText})
        fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${e.target.innerText}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then(res => res.json())
        .then(res => {
            this.props.onResults(res.artist)
        })
    }
    
    render() {
        return (
            <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
                <Title>
                    Related Artists
                </Title>
                <ul>
                    {
                        this.props.artists.map(e => (
                            <li key={e.name} onClick={this._handleClick}><a href="#">{e.name}</a></li>
                        ))
                    }
                </ul>
            </nav>
        )
    }
}