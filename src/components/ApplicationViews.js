import React, { Component } from "react";
import { Route } from "react-router-dom";
import BoredManager from "../modules/BoredManager";
import ActivityList from './activities/ActivityList';
import ActivityForm from "./activities/ActivityForm";
import ActivityEditForm from "./activities/ActivityEditForm";
import SharedActivities from "./share/SharedActivities";
import GenerateActivityForm from "./generate/GenerateActivityForm"

export default class ApplicationViews extends Component {

    state = {
        users: [],
        followers: [],
        activities: [],
        sharedActivity:[],
        comments: [],
        messages: []
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
            console.log("firstthing", this.state.activities)
        });
        BoredManager.sharedActivities().then(allActivities => {
            this.setState({
                sharedActivity: allActivities
            });
            console.log("newthing",this.state.sharedActivity)
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
                // let filteredActivities = allActivities.filter(activity => {
                //     return activity.shared === false
                // })
                this.setState({
                    activities: allActivities
                })
            })
    }

    render() {
        return (

            <React.Fragment>

                <Route exact path="/Home" render={(props) => {
                    return <ActivityList {...props}
                        deleteActivities={this.deleteActivities}
                        activities={this.state.activities}
                        addActivities={this.addActivities}
                        randomActivities={this.randomActivities}
                        updateActivitiesList={this.updateActivitiesList}
                        
                        />
                        
                    }} />

                <Route path="/Home/new" render={(props) => {
                    return <ActivityForm {...props}
                    addActivities={this.addActivities}
                    />
                }} />
                <Route exact path="/Home/generate" render={(props) => {
                    return <GenerateActivityForm {...props}
                    randomActivities={this.randomActivities}
                    addRandomActivities={this.addRandomActivities}
                    activities={this.state.activities}
                    addActivities={this.addActivities} />
                }} />

                <Route exact path="/Activities" render={(props) => { 
                    return <SharedActivities {...props}
                    sharedActivity={this.state.sharedActivity} 
                    deleteActivities={this.deleteActivities}
                    updateActivitiesList={this.updateActivitiesList}
                    addActivities={this.addActivities}
                    />
                }} />


                <Route exact path="/Home/:activityId(\d+)/edit" render={props => {
                    return <ActivityEditForm {...props}
                        updateActivity={this.updateActivity} />
                }} />


            </React.Fragment >
        )
    }
}
