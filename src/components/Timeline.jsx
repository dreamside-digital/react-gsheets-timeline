import React from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { map } from 'lodash';

import "@fortawesome/fontawesome-free/css/all.css"
import "../assets/scss/timeline.scss"

const defaultConfig = {
  defaults: {
    icons: [<i className="fas fa-circle" />, <i className="fas fa-square" />, <i className="fas fa-star" />],
    colors: ["darkcyan", "darkslateblue", "firebrick", "steelblue", "chocolate"]
  }
}

const Counter = ({ event, index }) => {
  return(
    <li key={`event-${index}`} className="interval-marker">
      <div className="counter-icon"><i className="fas fa-minus" /></div>
    </li>
  )
}

const Event = ({ event, index, color, icon }) => {
  if (!event['Year']) {
    return null
  }

  const year = event['Year']
  const month = Boolean(event['Month']) ? parseInt(event['Month']) - 1 : null
  const day = Boolean(event['Day']) ? parseInt(event['Day']) : null

  const endYear = Boolean(event['End Year']) ? parseInt(event['End Year']) : null
  const endMonth = Boolean(event['End Month']) ? parseInt(event['End Month']) + 1 : null
  const endDay = Boolean(event['End Day']) ? parseInt(event['End Day']) : null

  const startDate = new Date(year, month, day)
  const endDate = endYear ? new Date(endYear, endMonth, endDay) : null

  const highlight = event["Highlight"] == "TRUE" ? "highlight" : ""
  const styleProperties = {['--timeline-color']: color }

  const linkText = Boolean(event['Link text']) ? event['Link text'] : "More information"

  return(
    <li key={`event-${index}`} className="event" tabIndex={0} style={ styleProperties }>
      <div className="bullet-icon">{icon}</div>
      <div className={`tl-item ${highlight}`}>
        <div className="dates">
          <div className="year">{startDate.getFullYear()}</div>
          <div className="month">
            <span>{(Boolean(event['Month']) && Boolean(event["Day"])) && `${startDate.toLocaleDateString('default', {month: 'short', day: 'numeric'})}` || Boolean(event['Month']) && `${startDate.toLocaleDateString('default', {month: 'short'})}` || null}</span>
          </div>
          {
            endDate &&
            <div>
              <div className="hyphen"><i className="fas fa-minus" /></div>
              <div className="year">{endDate.getFullYear()}</div>
              <div className="month">
                <span>{(Boolean(event['End Month']) && Boolean(event["End Day"])) && `${endDate.toLocaleDateString('default', {month: 'short', day: 'numeric'})}` || Boolean(event['End Month']) && `${endDate.toLocaleDateString('default', {month: 'short'})}` || null}</span>
              </div>
            </div>
          }
        </div>


        <div className="info">
          <div className="headline">
            <h4>{event['Headline']}</h4>
          </div>
          <div className="description">
            {event['Text']}
          </div>

          {
            event["Link"] &&
            <div className="description">
              <a href={event["Link"]} target="_blank" rel="noopener"><i className="fas fa-external-link-alt"></i><span className="link-text">{linkText}<span className="underline" /></span></a>
            </div>
          }
        </div>

        {
          event["Image URL"] &&
          <div className="image-container hide-on-mobile">
            <img src={event["Image URL"]} alt={event["Image description"]} className="image" />
          </div>
        }
      </div>
    </li>
  )
}


class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timelines: {},
      eventList: [],
      intervalMarkers: [],
      ready: false
    }
    this.config = { ...defaultConfig, ...this.props.config }
  }

  componentDidMount() {
    this.loadTimelineData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timelines !== this.state.timelines) {
      this.orderEvents(this.generateEventList())
    }
  }

  handleShowTimeline(sheetId) {
    return () => this.setState({ timelines: {
      ...this.state.timelines,
      [sheetId]: { ...this.state.timelines[sheetId], show: true }
    }})
  }

  handleHideTimeline(sheetId) {
    return () => this.setState({ timelines: {
      ...this.state.timelines,
      [sheetId]: { ...this.state.timelines[sheetId], show: false }
    }})
  }

  loadTimelineData() {
    const { spreadsheetId, apiKey } = this.props

    this.props.sheets.forEach((sheetId, index) => {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetId}?key=${apiKey}`

      axios.get(url)
      .then(res => {
        console.log(res)
        const headings = res.data.values[0]
        let rows = [...res.data.values]
        rows.shift()
        const events = rows.map(row => {
          let item = { sheetId: sheetId, sheetOrder: index, type: "event" }
          headings.map((heading, index) => {
            if (heading === "Year") {
              item[heading] = parseInt(row[index])
            } else {
              item[heading] = row[index]
            }
          })
          return item
        })

        this.setState({
          timelines: {
            ...this.state.timelines,
            [sheetId]: { ...this.state.timelines[sheetId], show: true, events: events, sheetOrder: index }
          },
          ready: true
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  generateEventList() {
    let allEvents = []
    map(this.state.timelines, (timeline, sheetId) => {
      if (timeline.show) {
        allEvents = allEvents.concat(timeline.events)
      }
    })

    if (allEvents.length > 0 && this.props.interval) {
      const interval = parseInt(this.props.interval);
      const endYear = allEvents[allEvents.length - 1]["Year"]
      let year = parseInt(this.props.startYear)
      while (year < endYear) {
        const eventThisYear = allEvents.find(e => e["Year"] === year)
        if (!eventThisYear) {
          allEvents = allEvents.concat({ type: "counter", Year: year})
        }
        year = year + interval
      }
    }

    return allEvents
  }

  orderEvents(events) {
    const eventList = events.sort((a,b) => (a["Year"] - b["Year"]))
    this.setState({ eventList })
  }

  handleSave = newContent => {
    this.props.onSave(newContent);
  };

  render() {
    const { eventList, ready } = this.state;

    if (!ready) {
      return <div />
    }

    return (
        <div className="nl-timeline">
          <div className="legend">
            <h3>Legend</h3>
            {
              map(this.state.timelines, (timeline, sheetId) => {
                const color = this.config[sheetId] && this.config[sheetId].color ? this.config[sheetId].color : this.config.defaults.colors[timeline.sheetOrder % this.config.defaults.colors.length]
                const icon = this.config[sheetId] && this.config[sheetId].icon ? this.config[sheetId].icon : this.config.defaults.icons[timeline.sheetOrder % this.config.defaults.icons.length]
                const styleProperties = {['--timeline-color']: color }

                return (
                  <p className={`timeline${timeline.sheetOrder}`} key={sheetId} style={styleProperties}>
                    <span className="bullet-icon">{icon}</span>
                    <span className={`${timeline.show ? "" : "text-muted"}`}>{sheetId}</span>
                    {timeline.show ?
                      <span className={`toggle-timeline text-muted`} onClick={this.handleHideTimeline(sheetId)}>(hide)</span>:
                      <span className="toggle-timeline" onClick={this.handleShowTimeline(sheetId)}>(show)</span>
                    }
                  </p>
                )
              })
            }
          </div>

          <div className={`timeline ${this.props.alignment === "right" ? "align-right" : ""}`}>
            <h3>Events</h3>
            <ul>
            {eventList.map((event, index) => {
              if (event.type === "counter") {
                return <Counter event={event} index={index} key={`event-${index}`} />
              }

              const color = this.config[event.sheetId] && this.config[event.sheetId].color ? this.config[event.sheetId].color : this.config.defaults.colors[event.sheetOrder % this.config.defaults.colors.length]
              const icon = this.config[event.sheetId] && this.config[event.sheetId].icon ? this.config[event.sheetId].icon : this.config.defaults.icons[event.sheetOrder % this.config.defaults.icons.length]

              return <Event key={`event-${index}`} event={event} index={index} color={color} icon={icon} />
            })}
            </ul>
          </div>
        </div>
    );
  }
};

Timeline.propTypes = {
  spreadsheetId: PropTypes.string.isRequired,
  sheets: PropTypes.array.isRequired,
  apiKey: PropTypes.string.isRequired,
  config: PropTypes.object,
  alignment: PropTypes.string,
  interval: PropTypes.number,
  startYear: PropTypes.number,
}

Timeline.defaultProps = {
  spreadsheetId: '1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ',
  sheets: ["Toy Story Movies"],
  apiKey: "",
  config: {},
  alignment: "left",
}

export default Timeline;
