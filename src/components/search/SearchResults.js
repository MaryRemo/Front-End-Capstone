import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SearchResults extends Component {


  constructFollower = (userId) => {
    const friendObj = {
      currentUserId: Number(sessionStorage.getItem("user")),
      userId: userId
    }
    this.props.addFriend(friendObj)
    this.props.addActivities(friendObj)
    .then(() => this.props.history.push("/Friends"))
  }

  render() {
    console.log(this.props.myFollowers)
    return (
      <React.Fragment>
        <div>
        {this.props.users.map(result => {
          console.log("whattt", result)
          return <div id={result.id} key={result.id}>{result.username}        
            <Link type="button"
              id="addButton"
              onClick={
                () => this.constructFollower(result.id)}
                to = "/Friends"
                className="btn btn-success">
              Follow</Link>
                </div>
                
                
             
      })
    }
    </div>
        </React.Fragment>
    )
  }
}