import React, { Component } from 'react'
import BoredManager from "../../modules/BoredManager"
import FriendsManager from "../../modules/FriendsManager"

export default class SharedActivities extends Component {
    state = {
        sharedActivity: [],
        myFollowers:[]
    };

    componentDidMount () {
        BoredManager.sharedActivities()
        .then(allActivities => {
           this.setState({
            sharedActivity: allActivities
           })
        })
        FriendsManager.getAll(Number(sessionStorage.getItem("user"))).then(allFollowers => {
            this.setState({ 
                followers: allFollowers
            })
        })
        BoredManager.followersSharedActivities()
        .then(follow => 
            this.setState({
                myFollowers: follow
            })
        )
    }

    render() {
        return (
            
            <div>
           { [].concat(this.state.sharedActivity)
               .sort(function(a,b) {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
               .reverse()
               .map(activity => {
               return this.state.myFollowers.map(follower => {
                    if (follower.userId === activity.userId) {
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
    