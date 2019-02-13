import React, { Component } from "react"
import BoredManager from "../../modules/BoredManager"

export default class ActivityEditForm extends Component {

    state = {
        "activity": "",
        "timeStamp": "",
        "shared": false,
        "userId": 0,
        "id": 0
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }


    updateExistingActivity = evt => {
      evt.preventDefault()


      const existingActivity = {
        activity: this.state.activity,
        shared:this.state.shared,
        timeStamp:this.state.timeStamp,
        userId: Number(sessionStorage.getItem("user"))
      }
console.log(this.props.match.params.activityId, existingActivity)
      this.props.updateActivity(this.props.match.params.activityId, existingActivity)
      .then(() => this.props.history.push("/Home"))
    }

    componentDidMount() {
      BoredManager.get(this.props.match.params.activityId)
      .then(active => {
        this.setState({
            activity: active.activity,
            timeStamp: active.timeStamp,
            shared: active.shared,
            userId: Number(sessionStorage.getItem("user")),
            id: active.id
        })
      })
    }

    render() {
      return (
        <React.Fragment>
          <form className="activity">
            <div className="activity">
              <label htmlFor="ActivityName">Activity</label>
              <input type="text" required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="activity"
                    value={this.state.activity} />
            </div>
            <button type="submit" onClick={this.updateExistingActivity} className="btn btn-primary">Update</button>
          </form>
        </React.Fragment>
      )
    }
}