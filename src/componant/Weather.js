import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
class Weather extends React.Component{
render(){
    return (
        <div>
           <p>{this.props.date} : {this.props.description}</p>
        </div>
    )

}
}
export default Weather;