import React, { Component } from "react";

export default class SearchFriends extends Component {

  constructFollower = (userId) => {
          const friendObj = {
              currentUserId: Number(sessionStorage.getItem("user")),
              userId: userId
          }
    this.props.addFriend(friendObj)
  }

  render() {
    console.log(this.props.users)
    return (
      <React.Fragment>
        <section className="searchResults">
          <h2>{Object.keys(this.props)[0]}</h2>
          {this.props.users.map(result => (
            <p>{result.username}
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