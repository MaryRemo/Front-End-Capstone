import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ActivityList extends Component {
    state = {
        activity: ""
    }

    
    constructNewActivity = evt => {
        evt.preventDefault()
            const activities = {
                activity: this.state.activity
            }
              this.props.randomActivities(activities)
              .then(() => this.props.history.push("/Home"))
        }

        handleFieldChange = evt => {
            const stateToChange = {}
            stateToChange[evt.target.id] = evt.target.value
            this.setState(stateToChange)
        }
    

    render() {
        const sortedNewsItems =
            [].concat(this.props.activities)
                .sort((a,b) => {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
                .reverse()
                .map(activity =>
                        <div key={activity.id} className="card">
                        <div className="card-body">
                            <h3 id={activity.activity}
                            className="card-title" onChange={this.handleFieldChange}>{activity.activity}
                            </h3>
                            <button type="button"
                                    id="deleteButton"
                                    onClick = {() => this.props.deleteActivities(activity.id)}
                                    className="btn btn-success">
                                Delete
                            </button>
                            <Link className="nav-link" to={`/Home/${activity.id}/edit`}>Edit</Link>
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
                            onClick={this.constructNewActivity}
                            className="btn btn-success">
                       Generate Activity
                    </button>
                </div>
            <section className="activities">
            <br></br>
            <article className="cardHolder">
                {sortedNewsItems}
            </article>
            
            </section>
            </React.Fragment>
        );
    }
}

