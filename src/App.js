import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';
import axios from 'axios';

//axios base instance in order to get around the cors problem i normally add 'https://cors-anywhere.herokuapp.com/' to the from of the url so i dont have to build out a backend
const darkSkyInstance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9ad30d6f0346897bb150df5336fe0d0d/'
});

//again basic class component
export default class App extends Component {
  constructor () {
    super ();
    //initializing the state
    this.state = { current: {}, daily: [] };

    //binding 'this' to the two functions ive added to this class
    this.loadData = this.loadData.bind(this);
    this.handler = this.handler.bind(this);
  }

  //when the component loads load the data fro the api
  componentDidMount() {
    this.loadData();
  }

  //this is the load funciton that makes a request to my darkskyaxios instance
  loadData(){
    darkSkyInstance.get( '42.3601,-71.0589' )
    .then(res => {
      const zipdata = res.data;
      //i set the state to the data sets i plan on using in the child components
      this.setState({
        current:res.data.currently,
        daily:res.data.daily.data,
      });
      //just making sure im getting the right data
      console.log(res.data);
    });
  }

  //added this so that i can prove that i refresh the parent function
  componentDidUpdate(){
    console.log("this app was refreshed");
  }

  //this is a handler funciton that i pass as a prop to the child function that can be called and will refresh the weather info
  handler(e) {
    e.preventDefault()
    this.loadData();
    this.setState({refreshed: "we refreshed the data"});
  }

  render() {
    //iterator variable to keep track of the number of days
    let i = 0;

    //line 66simple map over the daily weather information using the same weather component as i used for the current weather
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
