import React, { Component } from 'react';

//basic class component
export default class Weather extends Component {
  constructor(props){
    super(props);
  }

  render() {
    //line 13 -- pretty simple just loading data directly from props
    //line 18 -- this button calls a function that was passed down from the parent component will refresh the data when clicked
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
