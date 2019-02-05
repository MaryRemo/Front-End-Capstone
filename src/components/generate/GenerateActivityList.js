import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class GenerateActivityList extends Component {
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

    render() {
        const sortedNewsItems =
            [].concat(this.props.activities)
                .sort((a,b) => {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
                .map(activity =>
                        <div key={activity.id} className="card">
                        <div className="card-body">
                            <h3 className="card-title">{activity.activity}</h3>
                            <button type="button"
                                    id="saveButton"
                                    onClick = {() => this.props.addRandomActivities(activity.id)}
                                    className="btn btn-success">
                                Save
                            </button>
                        </div>
                        </div>
                )


        return (
            <React.Fragment>
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
