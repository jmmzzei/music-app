import React, {Component} from 'react'

export class Title extends Component {
    render(){
        return(
        <div className="title">{this.props.children}</div>
        )
    }
}