import React, { Component } from 'react'
import { Link } from "react-router-dom";
import BoredManager from '../../modules/BoredManager';

export default class ActivityList extends Component {
    // state = {
    //     activity: ""
    // }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    

    // constructNewActivity = evt => {
    //     evt.preventDefault()
    //         const activities = {
    //             activity: this.state.activity
    //         }
    //           this.props.randomActivities(activities)
    //           .then(() => this.props.history.push("/Home"))
    //           console.log(this.props.activities)
    //     }


    render() {
        console.log(this.props.activities)
        const sortedActivitiesItems =
        //     [].concat(this.props.activities)
        //         .sort((a,b) => {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
        //         .reverse()
                this.props.activities.map(activity =>
                        <div key={activity.id} className="card">
                        <div className="card-body">
                            <h3 id="{activity.activity}"
                            className="card-title" onChange={this.handleFieldChange}>{activity.activity}
                            </h3>
                            <p>Share <input 
                id = {activity.id}
                type = "checkbox"
                // on click of checkbox - we are keeping the task value and the expected completion date but changes the default
                //value of complete to true and removing the entrty from the DOM 
                onClick={() => {
                  const sharedActivity = {
                    activity: activity.activity,
                    shared: !this.state.shared,
                    userId: 1
                  }
                  console.log(sharedActivity)
                  this.props.updateActivitiesList(activity.id , sharedActivity)
                  .then(() => this.props.history.push("/Activities"))
                  }
                }
                /> </p>
                            <button type="button"
                                    id="deleteButton"
                                    onClick = {() => this.props.deleteActivities(activity.id)}
                                    className="btn btn-success">
                                Delete
                            </button>
                            <Link className="nav-link" to={`/Home/${activity.id}/edit`}>Edit</Link>
                            <button type="button"
                            id="shareButton"
                            onClick = {() => this.props.shareActivities(activity.id)}
                            className="btn btn-success">
                            Share
                            </button>
                        </div>
                        </div>
                )


        return (
            <React.Fragment>
                <div className="activityButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/Home/new")}
                            className="btn btn-success">
                        Create Activity
                    </button>
                </div>
                <br></br>
                <div className="activityButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/Home/generate")}
                            className="btn btn-success">
                       Generate Activity
                    </button>
                </div>
            <section className="activities">
            <br></br>
            <article className="cardHolder">
                {sortedActivitiesItems}
            </article>
            
            </section>
            </React.Fragment>
        );
    }
}

