import React, { Component } from "react";
import { Route } from "react-router-dom";
import BoredManager from "../modules/BoredManager";
import ActivityList from './activities/ActivityList'
import ActivityForm from "./activities/ActivityForm";
import ActivityEditForm from "./activities/ActivityEditForm";
import GenerateActivityList from "./generate/GenerateActivityList"
import GenerateActivityForm from "./generate/GenerateActivityForm"

export default class ApplicationViews extends Component {

    state = {
        users: [],
        followers: [],
        activities: [],
        comments: [],
        messages: []
    };


    componentDidMount() {
        BoredManager.getAll().then(allActivities => {
            this.setState({
                activities: allActivities
            });
        });
    }

    randomActivities = (activity) => BoredManager.api(activity)
        .then(activities => this.setState({
            activities: activities
        })
        )

    addRandomActivities = (activity) => BoredManager.post(activity)
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

    render() {
        return (

            <React.Fragment>

                <Route exact path="/Home" render={(props) => {
                    return <ActivityList {...props}
                        deleteActivities={this.deleteActivities}
                        activities={this.state.activities}
                        randomActivities={this.randomActivities}
                        // single={this.single} 
                    />

                }} />

                <Route path="/Home/new" render={(props) => {
                    return <ActivityForm {...props}
                        addActivities={this.addActivities}
                    />
                }} />

                {/* <Route path="/Home/new" render={(props) => {
                    return <GenerateActivityForm {...props}
                        addRandomActivities={this.addRandomActivities}
                        randomActivities={this.randomActivities}
                    />
                }} />

                <Route path="/Home" render={(props) => {
                    return <GenerateActivityList {...props}
                    randomActivities={this.randomActivities}
                    />
                }} /> */}


                <Route exact path="/Home/:activityId(\d+)/edit" render={props => {
                    return <ActivityEditForm {...props}
                        updateActivity={this.updateActivity} />
                }} />


            </React.Fragment >
        )
    }
}
