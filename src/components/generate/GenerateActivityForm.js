import React, { Component } from "react"
import BoredManager from "../../modules/BoredManager"


export default class GenerateActivityForm extends Component {
    // Set initial state
    state = {
        activity:"",
        timeStamp:"",
        shared:false,
        userId: "",
        id: ""
      }
    componentDidMount() {
        BoredManager.api().then(allActivities => {
            console.log(allActivities)
            this.setState({
                activity: allActivities.activity
            });
        });
    }

    constructNewActivities = evt => {
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
        this.props.addActivities(activities)
        .then(() => console.log(activities))
        .then(() => this.props.history.push("/Home"))
        
    }
              

    render() {
        console.log(this.state.activity)
        return (
            <React.Fragment>
                <form className="activityForm">
                    <div className="form-group">
                        <label htmlFor="activityName">Activity</label>
                        <input type="text" required
                               className="form-control"
                               id="activity" 
                               value={this.state.activity}
                               />
                    </div>
                    <button type="submit" onClick={this.constructNewActivities} className="btn btn-primary">Save</button>

                    <button type="submit" onClick={()=> this.props.history.push("/Home")} className="btn btn-primary">Back</button>
                </form>
            </React.Fragment>
        )
    }
} 