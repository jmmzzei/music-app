import React, { Component } from 'react'

export class Container extends Component {
    render() {
        return (
            <div className="container">
                <div className="column is-offset-one-quarter is-half">
                    {this.props.children}
                </div>
            </div>
        )
    }
}