import React from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHatCowboySide, faDragon, faSpider } from '@fortawesome/free-solid-svg-icons'

import Timeline from '../../src/Timeline';

import "./index.scss"

const config = {
  "Toy Story Movies": {
    icon: <FontAwesomeIcon icon={faHatCowboySide} />,
    color: "#129bd3",
    alignment: "left",
  },
  "Jurassic Park Movies": {
    icon: <FontAwesomeIcon icon={faDragon} />,
    color: "#42620C",
    alignment: "left",
  },
  "Spiderman Movies": {
    icon: <FontAwesomeIcon icon={faSpider} />,
    color: "#AF0000",
    alignment: "right",
  },
}

const displayConfig = `{
        "Toy Story Movies": {
          icon: <i className="fas fa-hat-cowboy-side"></i>,
          color: "#129bd3",
          alignment: "left",
        },
        "Jurassic Park Movies": {
          icon: <i className="fas fa-dragon"></i>,
          color: "#42620C",
          alignment: "left",
        },
        "Spiderman Movies": {
          icon: <i className="fas fa-spider"></i>,
          color: "#AF0000",
          alignment: "right",
        },
      }`


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alignment: "left",
      showLegend: true,
      showTimeMarkers: false,
      interval: 1,
      startYear: 1990,
      useConfig: false,
    }
  }

  handleChange = (property, value) => () => {
    this.setState({ [property]: value })
  }

  render() {
    const interval = this.state.showTimeMarkers ? this.state.interval : null
    const startYear = this.state.showTimeMarkers ? this.state.startYear : null
    return (
      <div>
        <div className="wrapper">
          <div className="flex-container">
            <div className="flex-item desc">
              <h1>Timeline Demo</h1>
              <p>Source spreadsheet: <a href="https://docs.google.com/spreadsheets/d/1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ/edit?usp=sharing">https://docs.google.com/spreadsheets/d/1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ/edit?usp=sharing</a></p>
            </div>
          </div>

          <div className="flex-container">
            <div className="flex-item">
              <h2>Configuration</h2>

              <fieldset>
                <legend>Legend</legend>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.showLegend}
                    className="form-check-input"
                    onClick={this.handleChange("showLegend", !this.state.showLegend)}
                  />
                  Show legend
                </label>
              </fieldset>

              <fieldset>
                <legend>Alignment</legend>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="left"
                      checked={this.state.alignment === "left"}
                      className="form-check-input"
                      onClick={this.handleChange("alignment", "left")}
                    />
                    Left
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="radio"
                      value="right"
                      checked={this.state.alignment === "right"}
                      className="form-check-input"
                      onClick={this.handleChange("alignment", "right")}
                    />
                    Right
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="radio"
                      value="center"
                      checked={this.state.alignment === "center"}
                      className="form-check-input"
                      onClick={this.handleChange("alignment", "center")}
                    />
                    Center
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Time markers</legend>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.showTimeMarkers}
                      className="form-check-input"
                      onClick={this.handleChange("showTimeMarkers", !this.state.showTimeMarkers)}
                    />
                    Show time markers
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Customization</legend>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.useConfig}
                      className="form-check-input"
                      onClick={this.handleChange("useConfig", !this.state.useConfig)}
                    />
                    Use custom configuration
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="flex-item">
              <h2>Code</h2>

              <pre>
                <code>
                  {
`render() {
  return(
    <Timeline
      spreadsheetId={"1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ"}
      sheets={["Toy Story Movies", "Jurassic Park Movies", "Spiderman Movies"]}
      apiKey={"YOUR_API_KEY"}
      alignment={"${this.state.alignment}"}
      showLegend={${this.state.showLegend}}
      interval={${interval}}
      startYear={${startYear}}
      config={${this.state.useConfig ? displayConfig : null}}
    />
  )
}`}
                </code>
              </pre>
            </div>

            <div className="flex-item">

              <h2>Timeline</h2>

              <Timeline
                spreadsheetId={"1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ"}
                sheets={["Toy Story Movies", "Jurassic Park Movies", "Spiderman Movies"]}
                apiKey={"AIzaSyBT0ozOMS-9tV6HqqMUHsUxqovZ-Jp7UZ8"}
                alignment={this.state.alignment}
                showLegend={this.state.showLegend}
                interval={interval}
                startYear={startYear}
                config={this.state.useConfig ? config : null}
              />
            </div>
          </div>
        </div>

        <footer>
          <small>Created by <a href="https://www.nomadiclabs.ca">Nomadic Labs</a></small>
        </footer>

      </div>
    )
  }

}

render(<App />, document.getElementById("root"));