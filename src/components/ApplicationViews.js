import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import BoredManager from "../modules/BoredManager";
import ActivityList from './activities/ActivityList';
import ActivityForm from "./activities/ActivityForm";
import ActivityEditForm from "./activities/ActivityEditForm";
import SharedActivities from "./share/SharedActivities";
import GenerateActivityForm from "./generate/GenerateActivityForm";
import LoginManager from "../modules/LoginManager"
import Login from "./authentication/Login"
import LoginForm from "./authentication/LoginForm"
import SearchResults from './search/SearchResults'
import SearchInput from './search/Search'
import FriendsManager from "../modules/FriendsManager"

const remoteURL = "http://localhost:5002"
export default class ApplicationViews extends Component {

    // isAuthenticated = () => sessionStorage.getItem("credentials") !== null
    isAuthenticated = () => sessionStorage.getItem("user") !== null
    state = {
        users: [],
        followers: [],
        activities: [],
        sharedActivity: [],
        comments: [],
        messages: [],
        userId: sessionStorage.getItem("user"),
        myFollowers: []
    };


    componentDidMount() {
        let newState = {}
        LoginManager.getAll().then(allUsers =>
            newState.users = allUsers
        ).then(() =>

            BoredManager.getAll()
                .then(allActivities => {
                    // allActivities.sort(function(a,b) {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
                    newState.activities = allActivities
                }
                )).then(() =>

                    BoredManager.sharedActivities().then(allActivities => {
                        // allActivities.sort(function(a,b) {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
                        newState.sharedActivity = allActivities
                    }
                    )).then(() =>

                        BoredManager.followersSharedActivities().then(follow => {
                            newState.myFollowers = follow
                        }
                        )).then(() =>


                            FriendsManager.getAll().then(allFollowers =>
                                newState.followers = allFollowers
                            )).then(() => this.setState(newState))

    }

    updateComponent = () => {

        LoginManager.getAll().then(allUsers => {
            this.setState({ users: allUsers });
        })


        BoredManager.getAll()
            .then(allActivities => {
                // allActivities.sort(function(a,b) {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
                this.setState({
                    activities: allActivities
                })
            })

    }

    randomActivities = (newActivity) => BoredManager.api(newActivity)
        .then(randomActivity =>
            this.setState({
                activities: randomActivity
            })
        )

    addRandomActivities = (activity) => BoredManager.postApi(activity)
        .then(() => BoredManager.getAll())
        .then(activity => this.setState({
            activities: activity
        })
        )

    addActivities = (activity) => BoredManager.post(activity)
        .then(() => BoredManager.getAll())
        .then(activity => this.setState({
            activities: activity
        })
        )


    deleteActivities = id => {
        let sessionUser = sessionStorage.getItem("user")
        let sessionUserNumber = Number(sessionUser)
        return fetch(`http://localhost:5002/activities/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => fetch(`${remoteURL}/activities?_expand=user&userId=${sessionUserNumber}`))
            .then(response => response.json())
            .then(activity => {
                // activity.sort(function (a, b) { return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime() })
                //     .reverse()
                this.setState({
                    activities: activity
                })
            })
            .then(() => BoredManager.sharedActivities())
            .then(allActivities => {
                this.setState({
                    sharedActivity: allActivities
                })
            })

    };

    deleteFollowers = id => {
        return fetch(`${remoteURL}/followers/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(activity =>
                this.setState({
                    followers: activity
                })
            );
    };

    updateActivity = (activityId, editedActivityObj) => {
        return BoredManager.put(activityId, editedActivityObj)
            .then(() => BoredManager.getAll())
            .then(activity => {
                this.setState({
                    activities: activity
                })
            })
            .then(() => BoredManager.sharedActivities())
            .then(activity => {
                this.setState({
                    sharedActivity: activity
                })
            })


    }


    updateActivitiesList = (activityId, existingObj) => {
        console.log("this is working")
        return BoredManager.putSharedActivities(activityId, existingObj)
            .then(() => BoredManager.getAll()).then(activities => {
                this.setState({
                    activities: activities
                })
            })
            .then(() => BoredManager.sharedActivities())
            .then(allActivities => {
                this.setState({
                    sharedActivity: allActivities
                })
            })

    }

    verifyUser = (username, password) => {
        LoginManager.getUsernameAndPassword(username, password)
            .then(allUsers => this.setState({
                users: allUsers
            }))
    }

    addUser = newUser =>
        LoginManager.post(newUser)
            .then(() => LoginManager.getAll())
            .then(user =>
                this.setState({
                    users: user
                })
            );
    addFriend = friendObj =>
        FriendsManager.postNewFollower(friendObj)

    followersActivities = () => {
        BoredManager.followersSharedActivities().then(allFollowers => console.log(allFollowers))
    }

    mySharedActivities = () => {
        BoredManager.mySharedActivities().then(shared => console.log(shared))
    }


    render() {
        console.log("SHARED", this.state.sharedActivity)
        console.log("ALL", this.state.activities)
        return (

            <React.Fragment>

                <Route exact path="/login" render={(props) => {

                    return <Login {...props} component={Login}

                        verifyUser={this.verifyUser}
                        users={this.state.users}
                        updateComponent={this.updateComponent} />
                }} />

                <Route exact path="/login/new" render={(props) => {
                        return <LoginForm {...props}
                            users={this.state.users}
                            addUser={this.addUser}
                            userId={this.state.userId}
                            updateComponent={this.updateComponent} />
                   
                }} />

                <Route exact path="/Home" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ActivityList {...props}
                            deleteActivities={this.deleteActivities}
                            activities={this.state.activities}
                            addActivities={this.addActivities}
                            randomActivities={this.randomActivities}
                            updateActivitiesList={this.updateActivitiesList}
                            users={this.users}
                            updateComponent={this.updateComponent}

                        />
                    } else {
                        return <Redirect to="/login" />
                    }

                }} />

                <Route path="/Home/new" render={(props) => {
                    return <ActivityForm {...props}
                        addActivities={this.addActivities}
                    />
                }} />
                <Route exact path="/Home/generate" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <GenerateActivityForm {...props}
                            randomActivities={this.randomActivities}
                            addRandomActivities={this.addRandomActivities}
                            activities={this.state.activities}
                            addActivities={this.addActivities}
                            activiti />

                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/Activities" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SharedActivities {...props}
                            sharedActivity={this.state.sharedActivity}
                            deleteActivities={this.deleteActivities}
                            activities={this.state.activities}
                            addActivities={this.addActivities}
                            randomActivities={this.randomActivities}
                            updateActivitiesList={this.updateActivitiesList}
                            users={this.users}
                            updateComponent={this.updateComponent}
                            myFollowers={this.state.myFollowers}
                            mySharedActivities={this.state.mySharedActivities}
                        />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />


                <Route exact path="/Home/:activityId(\d+)/edit" render={props => {
                    if (this.isAuthenticated()) {
                        return <ActivityEditForm {...props}
                            updateActivity={this.updateActivity} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route path="/Friends" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SearchInput {...this.props} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route path="/Friends" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SearchResults {...this.props}
                            addFriend={this.addFriend}
                            deleteFollowers={this.deleteFollowers}
                            myFollowers={this.state.myFollowers}
                        />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}

                />

            </React.Fragment >
        )
    }
}
