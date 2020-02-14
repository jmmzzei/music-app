import React, {Component} from 'react'
import {timeConverter} from '../helpers/timeConverter'

export class Level extends Component {
    render(){
        return(
            <nav className="level">
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">ARTIST</p>
                    <p className="title">{this.props.artist}</p>
                </div>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">ALBUM</p>
                    <p className="title">{this.props.album}</p>
                </div>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">DURATION</p>
                    <p className="title">{timeConverter(this.props.duration)}min</p>
                </div>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">LISTENERS</p>
                    <p className="title">{this.props.listeners}</p>
                </div>
            </div>
        </nav>
        )
    }
}