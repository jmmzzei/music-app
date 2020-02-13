import React, {Component} from 'react'
import { Navbar } from '../components/Navbar'
import { List } from '../components/List'
import { Level } from '../components/Level'

export class Song extends Component {
    constructor(props){
        super(props)
        this.state= {
            info: {},
            similar: {},
        }
    }

    _fetchData = async (reqParam) => {
        let responseAPI = {}
        await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.${reqParam}&artist=${this.props.router.match.params.artist.toLowerCase()}&track=${this.props.router.match.params.song.toLowerCase()}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                if (res.track) {
                    this.setState({info: res.track})
                    console.log(this.state.info)
                    
                    this.props.onCallback(this.props.artist)

                } else {
                    responseAPI = res.similartracks.track.filter((e, i) => i < 10)
                    this.setState({similar: responseAPI})
                    console.log(this.state.similar)

                    this.props.onCallback(this.props.artist)

                }
            })
    }

    componentDidMount() {
        console.log(this.props);
        this._fetchData('getsimilar')
        this._fetchData('getinfo')
    }

    componentWillUpdate(pp){
        console.log(pp.router.match.params);
    }

    componentWillReceiveProps(pp, ps){
        console.log(pp.router.match.params);
    }

    render(){
        
        return (
            <>
                <Navbar hasButton/>
                { 
                Object.keys(this.state.similar).length === 0 && this.state.similar.constructor === Object 
                ? null
                : <div>
                    <h1 className="title">{this.state.info.name}</h1>
                    <Level 
                    artist={this.state.info.artist.name}
                    album={this.state.info.album.title}
                    duration={this.state.info.duration}
                    listeners={this.state.info.listeners}
                    /> 
                </div> 
                }
                { 
                Object.keys(this.state.similar).length === 0 && this.state.similar.constructor === Object 
                ? null
                : <List 
                title="SIMILAR TRACKS"
                iterable={this.state.similar}
                song
                />
                }
            </>
        )
    }
}