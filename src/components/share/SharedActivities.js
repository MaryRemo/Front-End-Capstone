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
            <br></br>
           { [].concat(this.state.sharedActivity)
               .sort(function(a,b) {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
               .reverse()
               .map(activity => {
               return this.state.myFollowers.map(follower => {
                    if (follower.userId === activity.userId) {
                        return <div key={activity.id}className="card mx-auto w-75">
                        <div className="card-head">
                            <div className="card-header">
                            <img src="https://us.123rf.com/450wm/imagevectors/imagevectors1606/imagevectors160600227/58872995-white-profile-icon-on-blue-button-isolated-on-white.jpg?ver=6" alt="Smiley face" height="42" width="42"></img>
                                <h2> {activity.user.username}</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="product-desc">
                                <div className="product-title">Activity:</div>
                                <h3 className="card-title" key={activity.id} id="{activity.activity}">{activity.activity}</h3>
                                <hr></hr>
                                <p className="timestamp">
                                    {activity.timeStamp}
                                </p>
                                <hr></hr>
                            </div>
                        </div>
                        </div>
                        
                    }

                })
                
            })}
            </div>
           
            )
        } 
    }
    