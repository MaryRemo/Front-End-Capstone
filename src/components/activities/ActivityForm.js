import React, { Component } from "react"


export default class ActivityForm extends Component {
    // Set initial state
    state = {
        activity:"",
        timeStamp:"",
        shared:false,
        userId: ""
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
        let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        let d = new Date();
        let month = d.getMonth();
        let date = d.getDate();
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = ("0" + d.getMinutes()).slice(-2);
        let suffix = "AM";
	    if (hours > 12) {
		    suffix = "PM";
		    hours = hours - 12;
        }
        else if (hours === 12) {
		    suffix = "PM";
        }
        let dateDisplay = months[month] + "/" + date + "/" + year + " at " + hours + ":" + minutes + " " + suffix;
        evt.preventDefault()
            const activities = {
                activity: this.state.activity,
                shared:this.state.shared,
                timeStamp:dateDisplay,
                userId: Number(sessionStorage.getItem("user"))
            }
            console.log(activities)
              this.props.addActivities(activities)
              .then(() => this.props.history.push("/Home"))
            //   this.props.randomActivities(activities)
            //   .then(() => this.props.history.push("/Home"))
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