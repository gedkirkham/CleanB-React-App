import React, { Component } from 'react'

class LoginOrCreateAccount extends Component {
    render() {
    return (
        <div className="LoginOrCreateAccount">
            <form>
                Login:
                <input type="submit"/>
            </form>

            <form>
                Create account:
                <input type="submit"/>
            </form>
        </div>
        )
    }
}

export default LoginOrCreateAccount