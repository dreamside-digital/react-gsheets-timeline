import React from 'react';
import { render } from 'react-dom';

import Timeline from '../../src/components/Timeline';


import "./index.scss"

const config = {
  "Toy Story Movies": {
    icon: <i className="fas fa-hat-cowboy-side"></i>,
    color: "#129bd3",
  },
  "Jurassic Park Movies": {
    icon: <i className="fas fa-dragon"></i>,
    color: "darkgreen"
  },
  "Spiderman Movies": {
    icon: <i className="fas fa-spider"></i>,
    color: "darkred"
  },
}


const App = props => (
  <div>
    <div className="wrapper">
      <div className="flex-container">
        <div className="flex-item desc">
          <h1>Timeline Demo</h1>
          <p>Source spreadsheet: <a href="https://docs.google.com/spreadsheets/d/1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ/edit?usp=sharing">https://docs.google.com/spreadsheets/d/1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ/edit?usp=sharing</a></p>
        </div>
      </div>

      <div className="flex-container">
        <div className="flex-item desc">
          <h2>Default Configuration</h2>
          <pre>
            <code>
              {`
render() {
  return(
    <Timeline
      spreadsheetId={"1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ"}
      sheets={["Toy Story Movies", "Jurassic Park Movies", "Spiderman Movies"]}
      apiKey={"YOUR_API_KEY"}
    />
  )
}
              `}
            </code>
          </pre>

          <Timeline
            spreadsheetId={"1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ"}
            sheets={["Toy Story Movies", "Jurassic Park Movies", "Spiderman Movies"]}
            apiKey={"AIzaSyBT0ozOMS-9tV6HqqMUHsUxqovZ-Jp7UZ8"}
          />
        </div>
      </div>

      <div className="flex-container">
        <div className="flex-item desc">
          <h2>Custom Configuration</h2>

          <pre>
            <code>
              {`
render() {

  const config = {
    "Toy Story Movies": {
      icon: <i className="fas fa-hat-cowboy-side"></i>,
      color: "#129bd3",
    },
    "Jurassic Park Movies": {
      icon: <i className="fas fa-dragon"></i>,
      color: "darkgreen"
    },
    "Spiderman Movies": {
      icon: <i className="fas fa-spider"></i>,
      color: "darkred"
    }
  }

  return(
    <Timeline
      spreadsheetId={"1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ"}
      sheets={["Toy Story Movies", "Jurassic Park Movies", "Spiderman Movies"]}
      apiKey={"YOUR_API_KEY"}
      config={config}
    />
  )
}
              `}
            </code>
          </pre>


          <Timeline
            spreadsheetId={"1PtqsSJq3wl09Q_IW-pgxSiXSLMYxDcrOeda7AMCM5Js"}
            sheets={["Colonial Timeline", "Company Timeline", "Land Cessation Treaties"]}
            apiKey={"AIzaSyBT0ozOMS-9tV6HqqMUHsUxqovZ-Jp7UZ8"}
            interval={5}
            startYear={1760}
            alignRight={true}
            config={config}
          />
        </div>
      </div>
    </div>

    <footer>
      <small>Created by <a href="https://www.nomadiclabs.ca">Nomadic Labs</a></small>
    </footer>
  </div>
)

render(<App />, document.getElementById("root"));