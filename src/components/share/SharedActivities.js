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
                        return    <div class="card mx-auto w-50">
                        <div class="card-head">
                            <div class="card-header">
                            <img src="https://us.123rf.com/450wm/imagevectors/imagevectors1606/imagevectors160600227/58872995-white-profile-icon-on-blue-button-isolated-on-white.jpg?ver=6" alt="Smiley face" height="42" width="42"></img>
                                <h2>{activity.user.username}</h2>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="product-desc">
                                <div class="product-title">Activity:</div>
                                {/* <hr></hr> */}
                                <h3 id="{activity.activity}"
                                onChange={this.handleFieldChange}>{activity.activity}
                            </h3>
                                <hr></hr>
                                <p class="timestamp">
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
    