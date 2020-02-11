import React, {Component} from 'react'
import { Link } from "react-router-dom";

export class ButtonToHome extends Component {
    render(){
        return(
            <Link to="/" className="button is-danger">
                TO HOME
            </Link>
        )
    }
}