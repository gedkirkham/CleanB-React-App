import React, { Component } from 'react'
import {LOGIN_CONST, CREATE_ACCOUNT_CONST} from '../Constants'

class LoginOrCreateAccount extends Component {
    render() {
    return (
        <div className="LoginOrCreateAccount container hide">
            <form>
                {LOGIN_CONST}
                <input type="submit"/>
            </form>

            <form>
                {CREATE_ACCOUNT_CONST}
                <input type="submit"/>
            </form>
        </div>
        )
    }
}

export default LoginOrCreateAccount