import React, { Component } from "react";

export default class SearchResults extends Component {

  constructFollower = (userId) => {
          const friendObj = {
              userId: Number(sessionStorage.getItem("user")),
              followerId: userId
          }
    this.props.addFriend(friendObj)
  }
//   conditionalRendering = (userId) => {
// let currentUser = sessionStorage.getItem("user")
// let followerId = userId
// console.log("currentUser", currentUser)

// if (currentUser && followerId) {

// }
// else {
  
// }

  // }

  render() {
    console.log(this.props.users)
    return (
      <React.Fragment>
        <section className="searchResults">
          <h2>{Object.keys(this.props)[0]}</h2>
          {this.props.users.map(result => (
            <p>{result.username}
            <button type="button"
                                id="addButton"
                                onClick={
                                    () => this.constructFollower(result.id)}
                                className="btn btn-success">
                                Follow</button>
                                <button type="button"
                                id="deleteButton"
                                onClick={() => this.props.deleteFollowers(result.id)}
                                className="btn btn-success">
                                UnFollow
                            </button></p>
          ))}
        </section>
      </React.Fragment>
    );
  }
}