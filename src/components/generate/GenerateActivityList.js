import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class GenerateActivityList extends Component {

    render() {


        return (
            <React.Fragment>
                <br></br>
                <div className="activityButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/Home/generate")}
                            className="btn btn-success">
                       Generate Activity
                    </button>
                </div>
            <section className="activities">
            <br></br>
            <article className="cardHolder">
            </article>
            
            </section>
            </React.Fragment>
        );
    }
}

