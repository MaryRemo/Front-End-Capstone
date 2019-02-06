import React, { Component } from 'react'

export default class SharedActivities extends Component {
    // state = {
    //     activity:[],
    //     timeStamp:[],
    //     shared:false,
    //     userId: 1
    //   }
    // componentDidMount() {
    //     BoredManager.sharedActivities().then(allActivities => {
    //         this.setState({
    //             activity: allActivities.activity
    //         });
    //     });
    //     console.log(this.state.activity)
    // }
    render(){
        console.log(this.props.sharedActivity)
        return(
            <div>Hello</div>
        )
           
    }
} 

