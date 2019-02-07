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
        userId: sessionStorage.getItem("user")
    };


    componentDidMount() {
        BoredManager.getAll()
            .then(allActivities => {
                // let filteredActivities = allActivities.filter(activity => {
                //   return activity.shared === true
                // })
                this.setState({
                    activities: allActivities
                });
                console.log("firstthing", allActivities)
            });
        BoredManager.sharedActivities().then(allActivities => {
            this.setState({
                sharedActivity: allActivities
            });
            console.log("newthing", allActivities)
        });

    }

    randomActivities = (newActivity) => BoredManager.api(newActivity)
        .then(activities =>
            this.setState({
                activities: activities
            })
        )

    addRandomActivities = (activity) => BoredManager.postApi(activity)
        .then(() => BoredManager.getAll())
        .then(activities => this.setState({
            activities: activities
        })
        )

    addActivities = (activity) => BoredManager.post(activity)
        .then(() => BoredManager.getAll())
        .then(activities => this.setState({
            activities: activities
        })
        )

    deleteActivities = id => {
        return fetch(`http://localhost:5002/activities/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => fetch(`http://localhost:5002/activities`))
            .then(response => response.json())
            .then(activity =>
                this.setState({
                    activities: activity
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
    }

    sharedActivity = () => {
        return BoredManager.sharedActivity()
            .then(activity => {
                this.setState({
                    activities: activity
                })
            })
    }

    updateActivitiesList = (activityId, existingObj) => {
        return BoredManager.getAllSharedActivities(activityId, existingObj)
            .then(() => BoredManager.getAll())
            .then(allActivities => {
                this.setState({
                    sharedActivity: allActivities,
                    activities: allActivities
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

    render() {
        return (

            <React.Fragment>

                <Route path="/login" render={(props) => {

                    return <Login {...props} component={Login}

                        verifyUser={this.verifyUser}
                        users={this.state.users} />
                }} />

                <Route exact path="/login/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <LoginForm {...props}
                            users={this.state.users}
                            addUser={this.addUser}
                            userId={this.state.userId} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/Home" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ActivityList {...props}
                            deleteActivities={this.deleteActivities}
                            activities={this.state.activities}
                            addActivities={this.addActivities}
                            randomActivities={this.randomActivities}
                            updateActivitiesList={this.updateActivitiesList}

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
                            addActivities={this.addActivities} />

                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/Activities" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SharedActivities {...props}
                            sharedActivity={this.state.sharedActivity}
                            deleteActivities={this.deleteActivities}
                            updateActivitiesList={this.updateActivitiesList}
                            addActivities={this.addActivities}
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
                        return <SearchInput {...this.props}/>
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route path="/Friends" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SearchResults {...this.props}/>
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
