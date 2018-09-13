import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';
import axios from 'axios';

const darkSkyInstance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9ad30d6f0346897bb150df5336fe0d0d/'
});

export default class App extends Component {
  constructor () {
    super ();
    this.state = { current: {}, daily: [] };

    this.loadData = this.loadData.bind(this);
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    this.loadData();
}

  loadData(){
    darkSkyInstance.get( '42.3601,-71.0589' )
    .then(res => {
      const zipdata = res.data;
      this.setState({
        current:res.data.currently,
        daily:res.data.daily.data,
      });
      console.log(res.data.daily.data);
    });
  }

  handler(e) {
    e.preventDefault()
    this.loadData();
    this.setState({refreshed: "we refreshed the data"});
  }

  render() {
    let i = 0;
    return (
      <div className="App">
        <p className="App-intro">
          {this.state.refreshed}
        </p>
        <h2>Current Weather</h2>
        <Weather handler={this.handler} weather={this.state.current}/>
        {this.state.daily.map((day) => {
          i++;
          return(
            <div key={i}>
              <h2>{i} days ago</h2>
              <Weather handler={this.handler} weather={day}/>
            </div>
          );
        })}
      </div>
    );
  }
}
