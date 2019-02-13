import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class SharedActivities extends Component {
    state = {
        sharedActivity: []
    };

    render() {
        return (
            
            <div>
           { this.props.sharedActivity.map(activity => {
                return this.props.myFollowers.map(follower => {
                    if (follower.userId === activity.userId || Number(sessionStorage.getItem("user")) === activity.userId) {
                        return <div key={activity.id} className="card">
                            <div className="card-body">
                                <p>{activity.user.username}</p>
                                <h3 className="card-title" key={activity.id} id="{activity.activity}">{activity.activity}</h3>
                                <h2 id="{activity.timeStamp}"
                        className="card-title"> {activity.timeStamp}</h2>
                            </div>
                        </div>
                    }
                })
        
            })}</div>
            )
        } 
    }
    