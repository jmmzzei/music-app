import React, { Component } from 'react'

export class Hero extends Component {
    render() {
        return (
            <section className="hero is-black is-medium">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-1">
                            FINDER
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