import React, { Component } from 'react'

export class TopSongs extends Component {
    state = {
        inputArtist: 'cher',
        topSongs: ''
    }

    componentDidMount(){
        fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${this.props.artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({topSongs: res.toptracks.track})
        })
    }

    render() {
        return (
            <nav className="panel">
                <p className="panel-heading">
                    Top Songs
                </p>
                <p className="panel-tabs">
                    <a className="is-active">Top Songs</a>
                    <a>Top Albums</a>
                </p>

                {
                    typeof this.state.topSongs === "string"
                    ? null
                    : this.state.topSongs.map((e,i) => {
                        return i < 5 
                        ?
                        <a key={e.name} className="panel-block is-active" href={`/${e.name}`}>
                            <span className="panel-icon">
                                <i className="fas fa-book" aria-hidden="true"></i>
                            </span>
                            {e.name}
                        </a>
                        : null
                    })
                }
            </nav>
        )
    }
}