import React, { Component } from 'react'
import { Link } from "react-router-dom";
// import BoredManager from "../../modules/BoredManager"

export default class SharedActivities extends Component {

    render(){
        console.log("sharedActivity", this.props.activities)
        return(
          
                    this.props.sharedActivity.map(activity =>
                      
                            <div className="card">
                            <div className="card-body">
                            <p>{activity.user.username}</p>
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

