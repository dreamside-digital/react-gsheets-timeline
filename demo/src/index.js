import React, { Component } from 'react';
import { render } from 'react-dom';

import Timeline from '../../src/components/Timeline';


import "./index.scss"


class App extends Component {
  state = {}

  render() {

    return(
      <div>
        <div className="wrapper">
          <div className="flex-container">
            <div className="flex-item desc">
              <h1>Timeline Demo</h1>
              <Timeline
                spreadsheetId={"1PtqsSJq3wl09Q_IW-pgxSiXSLMYxDcrOeda7AMCM5Js"}
                sheets={["Colonial Timeline", "Company Timeline", "Land Cessation Treaties"]}
                apiKey={"AIzaSyBT0ozOMS-9tV6HqqMUHsUxqovZ-Jp7UZ8"}
              />
            </div>
          </div>
        </div>

        <footer>
          <small>Created by <a href="https://www.nomadiclabs.ca">Nomadic Labs</a></small>
        </footer>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));