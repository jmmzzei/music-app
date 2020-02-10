import React, { Component } from 'react'

export class TopSongs extends Component {
    state = {
        fetchedData: '',
        tab: 'songs'
    }

    componentDidMount() {
        let reqParam = this.state.tab === 'songs' ? 'gettoptracks' : 'gettopalbums'
        this._fetchData(reqParam).then(res => 
            sessionStorage.setItem('songsData', JSON.stringify(res)))
    }

    _fetchData = async (reqParam) => {
        let responseAPI = {}
        await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.${reqParam}&artist=${this.props.artist}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                if (res.toptracks) {
                    responseAPI = res.toptracks.track
                    this.setState({ fetchedData: res.toptracks.track })
                } else {
                    responseAPI = res.topalbums.album
                    this.setState({ fetchedData: res.topalbums.album })
                } 
            })

        return await new Promise((resolve, reject) => resolve(responseAPI));
    }


    _handleClick = (e) => {
        console.log(e.target)
        this.setState({ tab: this.state.tab === 'songs' ? 'albums' : 'songs' })
        let reqParam = this.state.tab === 'songs' ? 'gettoptracks' : 'gettopalbums'
        console.log('sety: ' + this.state.tab)

        if (this.state.tab === 'songs') {
            this.setState({ fetchedData: JSON.parse(sessionStorage.songsData) })
        } else {
            if (!sessionStorage.albumsData) {
                this._fetchData(reqParam).then( res => 
                    sessionStorage.setItem('albumsData', JSON.stringify(res))
                )
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