import React, { Component } from "react"
import BoredManager from "../../modules/BoredManager"

export default class ActivityEditForm extends Component {

    state = {
        "activity": "",
        "timeStamp": "",
        "userId": 1,
        "id": 2
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
        timeStamp: this.state.timeStamp,
        userId: this.state.userId,
        id: this.state.id
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
            userId: active.userId,
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