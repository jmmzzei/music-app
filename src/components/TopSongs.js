import React, { Component } from 'react'

export class TopSongs extends Component {
<<<<<<< HEAD
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

=======
>>>>>>> 6f8c3ddc268e1f393f120c9fb8f446eeff00d6e0
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
<<<<<<< HEAD

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
=======
                <a className="panel-block is-active">
                    <span className="panel-icon">
                        <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    Song n°1
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    Song n°2
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    Song n°3
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    Song n°4
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fas fa-code-branch" aria-hidden="true"></i>
                    </span>
                    Song n°5
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fas fa-code-branch" aria-hidden="true"></i>
                    </span>
                    Song n°6
                </a>
>>>>>>> 6f8c3ddc268e1f393f120c9fb8f446eeff00d6e0
            </nav>
        )
    }
}