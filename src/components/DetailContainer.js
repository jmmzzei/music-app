import React, { Component } from 'react'
import { List } from '../components/List'

export class DetailContainer extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column">
                    <img
                        src={this.props.img}
                        className="is-block is-centered image"
                        alt="artist"
                    />
                    <div className="box">
                        <p className="title">{this.props.listeners} LISTENERS</p>
                    </div>
                    <List 
                        iterable={this.props.similar}
                        title="RELATED ARTISTS"
                    />
                </div>

                <div className="column is-half">
                    <div className="box">
                        <p className="title">BIO</p>
                        <p className="has-text-left">{this.props.bio}</p>
                    </div>
                </div>
                
                <div className="column">
                    {this.props.children}
                </div>
            </div>
        )
    }
}