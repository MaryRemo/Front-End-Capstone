import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class SharedActivities extends Component {
    // state = {
    //     activity:[],
    //     timeStamp:[],
    //     shared:false,
    //     userId: 1
    //   }
      handleFieldChange = evt => {
        // const stateToChange = {}
        // stateToChange[evt.target.id] = evt.target.value
        // this.setState(stateToChange)
    }
    render(){
        console.log("sharedActivity", this.props.activities)
        return(
           
                    this.props.sharedActivity.map(activity =>
                        // eslint-disable-next-line jsx-a11y/heading-has-content
                      
                            <div className="card">
                            <div className="card-body">
                            <h3 className="card-title" key={activity.id} id="{activity.activity}">{activity.activity}</h3>
                                
                                <button type="button"
                                        id="deleteButton"
                                        onClick = {() => this.props.deleteActivities(activity.id)}
                                        className="btn btn-success">
                                    Delete
                                </button>
                                <Link className="nav-link" to={`/Home/${activity.id}/edit`}>Edit</Link>
                            </div>
                            </div>
                    )
                    
        
        )
           
    }
} 

// this.props.sharedActivity.map(activity =>
//     // eslint-disable-next-line jsx-a11y/heading-has-content
//     <h3  key={activity.id} id="{activity.activity}">{activity.activity}</h3>