import React, { Component } from "react";
import FriendsManager from "../../modules/FriendsManager"
import BoredManager from "../../modules/BoredManager"

export default class Friends extends Component {

    state = {
        followers: []
    };
    componentDidMount(){
        FriendsManager.getAll(Number(sessionStorage.getItem("user"))).then(allFollowers => {
            this.setState({
                followers: allFollowers
            })
        })
    }


    deleteFollowers = id => {
        return fetch(`http://localhost:5002/followers/${id}`, {
            method: "DELETE"
        })
            .then(() => FriendsManager.getAll(Number(sessionStorage.getItem("user"))))
            .then(allFollowers => {
                this.setState({
                    followers: allFollowers
                })
            })
            .then(() => BoredManager.sharedActivities())
            .then(allActivities => {
                this.setState({
                    sharedActivity: allActivities
                })
            })

    };
    render() {
        return (

            <div>
                <h2>Your Friends</h2>
                {this.state.followers
                    .map(follower => {
                        return <div key={follower.id} className="card">
                            <div className="card-body">
                                <h3>{follower.user.username}</h3>
                                <button type="button"
                                    id="deleteButton"
                                    onClick={
                                        () => this.deleteFollowers(follower.id)}
                                    className="btn btn-success">
                                    Unfollow</button>
                            </div>
                        </div>
                    })}</div>
        )
    }
}