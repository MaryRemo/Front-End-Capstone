import React, { Component } from "react";
import {withRouter} from "react-router-dom"

class SearchInput extends Component{
    state = {
        searchQuery: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleSearch = evt => {
        evt.preventDefault()
        this.props.searchAllData(this.state.searchQuery)
        .then(() => this.props.history.push("/Friends"))
    }
    render() {
        return(
            <React.Fragment>
                <form className="searchForm" onSubmit={this.handleSearch}>
                <label>Search Friends</label>
                <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="searchQuery"
                />
                </form>
            </React.Fragment>
        )
    }
}



export default withRouter(SearchInput)