import React, { Component } from "react"


export default class ActivityForm extends Component {
    // Set initial state
    state = {
        activity: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    constructNewActivity = evt => {
        evt.preventDefault()
            const activities = {
                activity: this.state.activity
            }
              this.props.addActivities(activities)
              .then(() => this.props.history.push("/Home"))
              // .then(() => TaskManager.getAll());
        }

    render() {
        return (
            <React.Fragment>
                <form className="activityForm">
                    <div className="form-group">
                        <label htmlFor="activityName">Activity</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="activity"
                               placeholder="Activity" />
                    </div>
                    <button type="submit" onClick={this.constructNewActivity} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
} 