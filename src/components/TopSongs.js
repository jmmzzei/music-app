import React, { Component } from 'react'

export class TopSongs extends Component {
    state = {
        fetchedData: '',
        tab: 'songs'
    }

    componentDidMount() {
        let required = this.state.tab === 'songs' ? 'gettoptracks' : 'gettopalbums'
        this._incialFetchData(required)
    }

    _incialFetchData = async (required) => {
        await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.${required}&artist=${this.props.artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.state.tab === 'songs'
                    ? this.setState({ fetchedData: res.toptracks.track })
                    : this.setState({ fetchedData: res.topalbums.album })
            })

        sessionStorage.setItem('songsData', JSON.stringify(this.state.fetchedData))
    }

    componentWillUpdate(){
        console.log('will: '+ this.state.tab);
    }

    _handleClick = (e) => {
        console.log(e.target)
        this.setState({ tab: this.state.tab === 'songs' ? 'albums' : 'songs' })
        let required = this.state.tab === 'songs' ? 'gettoptracks' : 'gettopalbums'
        console.log('sety: ' + this.state.tab)

        if (this.state.tab === 'songs') {
            this.setState({ fetchedData: JSON.parse(sessionStorage.songsData) })
        } else {
            if (!sessionStorage.albumsData) {
                (async ()=> {
                    await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.${required}&artist=${this.props.artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
                        .then(res => res.json())
                        .then(res => {
    
                            this.state.tab === 'songs'
                                ? this.setState({ fetchedData: res.topalbums.album })
                                : this.setState({ fetchedData: res.toptracks.track })
    
                        })
                        sessionStorage.setItem('albumsData', JSON.stringify(this.state.fetchedData))
                })()

            } else {
                this.setState({ fetchedData: JSON.parse(sessionStorage.albumsData) })
            }
        }
    }

    render() {
        console.log('render: '+this.state.tab)

        return (
            <nav className="panel">
                <p className="panel-heading">
                    {this.state.tab === 'songs' ? 'Top Songs' : 'Top Albums'}
                </p>
                <p className="panel-tabs">
                    <a onClick={this._handleClick}>
                        {this.state.tab === 'songs' ? 'Top Albums' : 'Top Songs'}
                    </a>
                </p>

                {
                    typeof this.state.fetchedData === "string"
                        ? null
                        : this.state.fetchedData.map((e, i) => {
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