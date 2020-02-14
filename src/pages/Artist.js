import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Hero } from '../components/Hero'
import { DetailContainer } from '../components/DetailContainer'
import { Navbar } from '../components/Navbar'
import { Tags } from '../components/Tags'
import { List } from '../components/List'

export class Artist extends Component {
    state = {
        tracks: {},
        albums: {}
    }
    
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string,
        }),
    }

    _fetchData = async (reqParam) => {
        let responseAPI = {}
        await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.${reqParam}&artist=${this.props.router.match.params.artist.toLowerCase()}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.toptracks) {
                    responseAPI = res.toptracks.track.filter((e, i) => i < 10)
                    this.setState({tracks: responseAPI})
                } else {
                    responseAPI = res.topalbums.album.filter((e, i) => i < 10)
                    this.setState({albums: responseAPI})
                }
            })
    }

    componentDidMount() {
        this._fetchData('gettopalbums')
        this._fetchData('gettoptracks')
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({resultado: nextProps})
    }

    render() {
        return (
            <>
                <Navbar hasButton/>
                {Object.keys(this.props.resultado).length === 0 && this.props.resultado.constructor === Object 
                ? null
                : <>
                    <Hero small>
                        <div className="SearchForm-wrapper">
                            {this.props.resultado.results.name.toUpperCase()}
                        </div>
                        <Tags elements={this.props.resultado.results.tags.tag}/>
                    </Hero>
                    <DetailContainer 
                        bio={this.props.resultado.results.bio.content}
                        listeners={this.props.resultado.results.stats.listeners}
                        img={this.props.resultado.results.image[4]['#text']}
                        tags={this.props.resultado.results.tags.tag}
                        similar={this.props.resultado.results.similar.artist}
                    >
                        {Object.keys(this.state.tracks).length === 0 && this.state.tracks.constructor === Object
                        ? null
                        : <List 
                            iterable={this.state.tracks}
                            title="TOP SONGS"
                            />
                        }
                        {Object.keys(this.state.albums).length === 0 && this.state.albums.constructor === Object
                        ? null
                        : <List 
                            iterable={this.state.albums}
                            title="TOP ALBUMS"
                            />
                        }

                    </DetailContainer>
                </>
                }
            </>
        )
    }
}