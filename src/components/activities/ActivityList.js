import React, { Component } from 'react'
import { Link } from "react-router-dom";
import BoredManager from "../../modules/BoredManager";
// import $ from 'jquery'

export default class ActivityList extends Component {
    state = {
        shared: false
    }

    handleFieldChange = evt => {
        evt.preventDefault()
        this.setState({
            shared: !this.state.shared
        })
    }

    render() {
console.log(this.props.activities)
        const sortedActivitiesItems = 
        [].concat(this.props.activities)
        .sort(function(a,b) {return new Date(a.date) - new Date(b.date)})
        .reverse()
        .map(activity => 
      <React.Fragment key={activity.id}>
                    <div key={activity.id} className="card">
                        <div className="card-body">
                            <p>{activity.user.username}</p>
                            <h3 id="{activity.activity}"
                                className="card-title" onChange={this.handleFieldChange}>{activity.activity}
                            </h3>

                        <h2 id="{activity.timeStamp}"
                        className="card-title"> {activity.timeStamp}</h2>

                            {activity.shared === false &&
                                <p>Share <input className="checkbox"
                                    id={activity.id}
                                    type="checkbox"
                                    // on click of checkbox - we are keeping the task value and the expected completion date but changes the default
                                    //value of complete to true and removing the entrty from the DOM 
                                    onClick={() => {
                                        const sharedActivity = {
                                            activity: activity.activity,
                                            shared: !this.state.shared,
                                            timeStamp: activity.timeStamp,
                                            userId: Number(sessionStorage.getItem("user"))
                                        }
                                        console.log(sharedActivity)
                                        this.props.updateActivitiesList(activity.id, sharedActivity)
                                            .then(() => this.props.history.push("/Home"))

                                    }
                                    }
                                /> </p>}
                            <button type="button"
                                id="deleteButton"
                                onClick={() => this.props.deleteActivities(activity.id)}
                                className="btn btn-success">
                                Delete
                            </button>
                            <Link className="nav-link" to={`/Home/${activity.id}/edit`}>Edit</Link>
                        </div>
                    </div>
                </React.Fragment>
            )


        return (
            <React.Fragment>
                <div className="activityButton">
                    <button type="button"
                        onClick={() => this.props.history.push("/Home/new")}
                        className="btn btn-success">
                        Create Activity
                    </button>
                </div>
                <br></br>
                <div className="activityButton">
                    <button type="button"
                        onClick={() => this.props.history.push("/Home/generate")}
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

