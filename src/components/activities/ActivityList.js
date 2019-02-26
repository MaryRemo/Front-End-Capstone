import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {Button} from "reactstrap"

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
                .sort(function (a, b) { return new Date(a.date) - new Date(b.date) })
                .reverse()
                .map(activity =>
                    <React.Fragment key={activity.id}>


                        <div className="card mx-auto w-75">
                            <div className="card-head">
                                <div className="card-header">
                                    <h2> <img src="https://us.123rf.com/450wm/imagevectors/imagevectors1606/imagevectors160600227/58872995-white-profile-icon-on-blue-button-isolated-on-white.jpg?ver=6" alt="Smiley face" height="42" width="42"></img> {activity.user.username}</h2>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="product-desc">
                                    <div className="product-title">Activity:</div>
                                    {/* <hr></hr> */}
                                    <h3 id="{activity.activity}"
                                onChange={this.handleFieldChange}>{activity.activity}
                            </h3>
                                    <hr></hr>
                                    <p className="timestamp">
                                        {activity.timeStamp}
                                    </p>
                                    <hr></hr>
                                </div>
                                <div className="product-properties">
                                    <div className="btn-group">


                                        {activity.shared === false &&

                                            <button className="btn btn-outline-primary"
                                                id={activity.id}
                                                type="button"
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
                                            >Share</button>}

                                        <button type="button"
                                            id="deleteButton"
                                            onClick={() => this.props.deleteActivities(activity.id)}
                                            className="btn btn-outline-primary">
                                            Delete
</button>

                                        <Button tag={Link} color="link" id="editbutton" to={`/Home/${activity.id}/edit`} className="btn btn-outline-primary">Edit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                                <div>
                                <br></br>
                                </div>

                    </React.Fragment>
                )


        return (
            <React.Fragment>
                <div className="homePage">
                <br></br>
                    <h2 className="title">The Bored App</h2>
                    <br></br>
                   <div className="text-center">
                        <div className="createButton">
                            <button type="button"
                                onClick={() => this.props.history.push("/Home/new")}
                                className="btn btn-outline-primary">
                                Create Activity
                    </button>
                        </div>
                        <br></br>
                        <div className="generateButton">
                            <button type="button"
                                onClick={() => this.props.history.push("/Home/generate")}
                                className="btn btn-outline-primary">
                                Generate Activity
                    </button>
                        </div>
                        </div>
                       
                    <section className="activities">
                        <br></br>
                        <article className="cardHolder">

                            {sortedActivitiesItems}

                        </article>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

