import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class List extends Component {

    render() {
        console.log(this.props)
        return (
            <nav className="panel">
                <p className="panel-heading">{this.props.title}</p>
                {
                    this.props.iterable.map((e, i) =>
                    <Link
                            to={ this.props.songList 
                                ? `/song/${e.artist.name}/${e.name}` 
                                : `/artist/${e.name}` 
                                }
                            key={e.name}
                            className="panel-block is-active"
                        >
                            <strong>{e.name.toUpperCase()} </strong>
                        </Link>
                    )
                }
            </nav>
        )
    }
}