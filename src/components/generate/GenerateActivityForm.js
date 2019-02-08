import React, { Component } from "react"
import BoredManager from "../../modules/BoredManager"


export default class GenerateActivityForm extends Component {
    // Set initial state
    state = {
        activity:"",
        timeStamp:"",
        shared:false,
        userId: ""
      }
    componentDidMount() {
        BoredManager.api().then(allActivities => {
            console.log(allActivities)
            this.setState({
                activity: allActivities.activity
            });
        });
    }
    // getRandomActivities(){
    //     BoredManager.api()
    //     .then(response => {
    //         console.log(response)
    //     })
    // }

    constructNewActivities = evt => {
        evt.preventDefault()
        const activities = {
            activity: this.state.activity,
            shared:this.state.shared,
            timeStamp:this.state.timeStamp,
            userId: sessionStorage.getItem("user")
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
                            //    onChange={this.handleFieldChange}
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