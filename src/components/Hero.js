import React, { Component } from 'react'

export class Hero extends Component {
    render() {
        return (
            <section className={`hero is-black ${this.props.small ? 'is-small' : 'is-medium' }`}>
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-1">
                            {this.props.header || ''}
                        </h1>
                        <h1 className="title is-1 has-text-weight-bold">
                            {this.props.children}
                        </h1>
                    </div>
                </div>
            </section>
        )
    }
}