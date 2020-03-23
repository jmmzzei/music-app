import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { Tags } from '../components/Tags'

export class Card extends Component {
    static propTypes = {
        name: PropTypes.string,
    }

    render() {
        return (
            <Link
            to={`/artist/${this.props.name}`} 
            className="card" 
            >
                <div className="card card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={this.props.image[1]['#text']} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p target="_blank" rel="noopener noreferrer" className="title is-3 has-text-weight-medium">{this.props.name}</p>
                        </div>
                    </div>
                        <Tags elements={this.props.tags.tag}/>
                    <hr />

                    <div className="content">
                        {this.props.bio.summary}
                    </div>
                </div>
            </Link>
        )
    }
}
