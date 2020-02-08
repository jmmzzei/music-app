import React, { Component } from 'react'

export class Hero extends Component {
    render() {
        return (
            <section className="hero is-dark is-medium">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-1">
                            Artist Finder
                        </h1>
                        <h1 className="title">
                            {this.props.children}
                        </h1>
                    </div>
                </div>
            </section>
        )
    }
}