import React, { Component } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';

//This class gets information from Weather API and displays it as a line graph.
export default class AirInfo extends Component {
    constructor(props) {
        super(props);
        this.airVisKey = process.env.REACT_APP_AV_KEY;
        this.openWeatherKey = process.env.REACT_APP_OW_KEY;
        this.state = {
            dates: [],
            temp: [],
            windSpeed: [],
            humidity: []
        };
    }

    componentDidMount() {
        //Connect to AirVisual API and retrieve data
        //axios.get("http://api.airvisual.com/v2/city?city=Melbourne&state=Victoria&country=Australia&key=" + this.airVisKey)
        
        //Retrieving from OpenWeatherMap, as AirVisual does not have historical data.
        axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=-37.8136&lon=144.9631&exclude={current,minutely,hourly,alerts)&units={metric}&appid=" + this.openWeatherKey)
        .then(res => {
            
            res.data.daily.map(item => {                
                return this.setState({ 
                    dates: [...this.state.dates, new Date (item.dt * 1000).toLocaleDateString()], //convert from Epoch to date. 
                    windSpeed: [...this.state.windSpeed, item.wind_speed],
                    temp: [...this.state.temp, (item.temp.day/10).toFixed(1)],
                    humidity: [...this.state.humidity, item.humidity],
                }) 
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    showChart() {
        const data = { //Options for importing Data to Chart & displaying
            labels: this.state.dates,
            datasets: [
              {
                label: 'Temperature',
                fill: false,
                borderColor: 'red',
                data: this.state.temp
              },
              {

                label: 'Humidity',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'dodgerblue',
                data: this.state.humidity
              },
              {
                label: 'Wind Speed',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'green',
                data: this.state.windSpeed
              },
            ]
          };

        const options = { //Options for Axes
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 60, //max value for the chart is 60
                        scaleOverride: true,
                        stepSide: 2,
                        scaleSteps: 5
                        }
                    }]
                }
            }
        return <Line data={data} width={650} height={250} options={options}
      />
    };

    render() {
        return (
            <div id="chart">
                {/* Prime Data for parsing in chart. */}
                {this.showChart()}
            </div>
        )
    }
}