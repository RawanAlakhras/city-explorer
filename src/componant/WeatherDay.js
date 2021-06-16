import React from 'react';

class WeatherDay extends  React.Component{
    render(){
        return(
            <li>{this.props.date} {this.props.description}</li>
        )
    }
}
export default WeatherDay;