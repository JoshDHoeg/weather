import React, { Component } from 'react';

class Weather extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if(this.key){
      console.log(this.key)
    }
    return (
      <section id="current-weather" >
        <p>{this.props.weather.summary}</p>
        <p><strong>Temperature:</strong> {this.props.weather.temperature}</p>
        <p><strong>Humidity:</strong> {this.props.weather.humidity}</p>
        <p><strong>Wind Speed:</strong> {this.props.weather.windSpeed}</p>
        <button className="input-submit" type="submit" onClick={this.props.handler}>Refresh</button>
      </section>
    );
  }
}

export default Weather;
