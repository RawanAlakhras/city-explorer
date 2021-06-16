import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherDay from './WeatherDay';
class Weather extends React.Component {
    render() {
        return (
            <>
                {this.props.weatherArr.map((item, inx) => {
                    return (
                        <WeatherDay date={item.date} description={item.description} key={inx.toString()} />
                    )
                }
                )
                }
            </>
        )

    }
}
export default Weather;