import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
class Weather extends React.Component{
render(){
    return (
        <ul>
           <li>{this.props.date} {this.props.description}</li>
        </ul>
    )

}
}
export default Weather;