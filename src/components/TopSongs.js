import React, { Component } from 'react'

export class TopSongs extends Component {
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
            </nav>
        )
    }
}