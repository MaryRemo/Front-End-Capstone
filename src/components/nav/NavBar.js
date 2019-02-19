import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Friends">Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Activities">Activities</Link>
                    </li>
                    <li  onClick={this.props.logout} className="nav-item">
                        <Link className="nav-link"to="/Login">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
