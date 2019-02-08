import React, { Component } from 'react'
import { Link } from "react-router-dom";
// import BoredManager from "../../modules/BoredManager"

export default class SharedActivities extends Component {
// componentDidUpdate() {
//     BoredManager.sharedActivities().then(allActivities => {
//         this.setState({
//             sharedActivity: allActivities
//         });
//         console.log("newthing", this.state.sharedActivity)
//     });
// }
    render(){
        console.log("sharedActivity", this.props.activities)
        let userId = sessionStorage.getItem("user")
        return(
          
                    this.props.sharedActivity.map(activity =>
                        // eslint-disable-next-line jsx-a11y/heading-has-content
                      
                            <div className="card">
                            <div className="card-body">
                            <p>{userId}</p>
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

