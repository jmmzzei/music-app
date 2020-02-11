import React, {Component} from 'react'
import { ButtonToHome } from "../components/ButtonToHome"

export class NotFound extends Component {
    render(){
        return(
            <div>
                <h1>404!</h1>
                <h3>Not Found</h3>
                <ButtonToHome />
            </div>
        )
    }
}