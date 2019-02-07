import React, { Component } from "react";

export default class SearchResults extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="searchResults">
          <h2>{Object.keys(this.props)[0]}</h2>
          {this.props.users.map(result => (
            <p>{result.username}</p>
          ))}
        </section>
      </React.Fragment>
    );
  }
}