import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ActivityList extends Component {

    render() {
        const sortedNewsItems =
            [].concat(this.props.activities)
                .sort((a,b) => {return new Date(b.newsDate).getTime() - new Date(a.newsDate).getTime()})
                .reverse()
                .map(activity =>
                        <div className="newsCards" key={activity.id}>
                            <h3 className="title">{activity.activity}</h3>
                            <button type="button"
                                    id="deleteButton"
                                    onClick = {() => this.props.deleteActivities(activity.id)}
                                    className="btn btn-success">
                                Delete
                            </button>
                            <Link className="nav-link" to={`/Home/${activity.id}/edit`}>Edit</Link>
                        </div>
                )
        return (
            <React.Fragment>
                <div className="activityButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/Home/new")}
                            className="btn btn-success">
                        New Activity
                    </button>
                </div>
            <section className="activities">
            <h1 className="heading">Your Saved Activities</h1>
            <article className="cardHolder">
                {sortedNewsItems}
            </article>
            
            </section>
            </React.Fragment>
        );
    }
}

