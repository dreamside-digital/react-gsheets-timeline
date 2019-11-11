import React from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { map } from 'lodash';

import "../assets/scss/timeline.scss"

const defaultConfig = {

}



class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timelines: {},
      orderedEvents: [],
      ready: false
    }
  }

  componentDidMount() {
    this.loadTimelineData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timelines !== this.state.timelines) {
      this.orderEvents()
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
          let item = { sheetId: sheetId, sheetOrder: index + 1 }
          headings.map((heading, index) => {
            item[heading] = row[index]
          })
          return item
        })

        this.setState({
          timelines: {
            ...this.state.timelines,
            [sheetId]: { ...this.state.timelines[sheetId], show: true, events: events, sheetOrder: index + 1 }
          },
          ready: true
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  orderEvents() {
    let allEvents = []
    map(this.state.timelines, (timeline, sheetId) => {
      if (timeline.show) {
        allEvents = allEvents.concat(timeline.events)
      }
    })

    const orderedEvents = allEvents.sort((a,b) => (parseInt(a["Year"]) - parseInt(b["Year"])))
    this.setState({ orderedEvents })
  }

  handleSave = newContent => {
    this.props.onSave(newContent);
  };

  render() {
    const { orderedEvents, ready } = this.state;

    if (!ready) {
      return <div />
    }

    return (
        <div className="nl-timeline">
          <div className="legend">
            <h3>Legend</h3>
            {
              map(this.state.timelines, (timeline, sheetId) => {
                return (
                  <p className={`timeline${timeline.sheetOrder}`} key={sheetId}>
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

          <div className="timeline">
            <h3>Events</h3>
            <ul>
            {orderedEvents.map((event, index) => {
              if (!event['Year']) {
                return null
              }

              const year = parseInt(event['Year'])
              const month = Boolean(event['Month']) ? parseInt(event['Month']) + 1 : null
              const day = Boolean(event['Day']) ? parseInt(event['Day']) : null

              const endYear = Boolean(event['End Year']) ? parseInt(event['End Year']) : null
              const endMonth = Boolean(event['End Month']) ? parseInt(event['End Month']) + 1 : null
              const endDay = Boolean(event['End Day']) ? parseInt(event['End Day']) : null

              const startDate = new Date(year, month, day)
              const endDate = endYear ? new Date(endYear, endMonth, endDay) : null
              const highlight = event["Highlight"] == "TRUE" ? "highlight" : ""


              return(
                <li key={`event-${index}`} className={`timeline${event.sheetOrder}`}>
                  <div className={`event ${highlight}`}>
                    <div className="dates">
                      <div className="year">{startDate.getFullYear()}</div>
                      <div className="month">
                        <span>{(Boolean(event['Month']) && Boolean(event["Day"])) && `${startDate.toLocaleDateString('default', {month: 'short', day: 'numeric'})}` || Boolean(event['Month']) && `${startDate.toLocaleDateString('default', {month: 'short'})}` || null}</span>
                      </div>
                      {
                        endDate &&
                        <div>
                          <div className="hyphen"><i className="fas fa-caret-down"></i></div>
                          <div className="year">{endDate.getFullYear()}</div>
                          <div className="month">
                            <span>{(Boolean(event['End Month']) && Boolean(event["End Day"])) && `${endDate.toLocaleDateString('default', {month: 'short', day: 'numeric'})}` || Boolean(event['End Month']) && `${endDate.toLocaleDateString('default', {month: 'short'})}` || null}</span>
                          </div>
                        </div>
                      }
                    </div>

                    <div className="info">
                      <div className="headline">
                        <strong>{event['Headline']}</strong>
                      </div>
                      <div className="description">
                        {event['Text']}
                      </div>

                      {
                        event["Link"] &&
                        <div className="description">
                          <a href={event["Link"]} target="_blank" rel="noopener"><i className="fas fa-external-link-alt"></i>{Boolean(event['Link text']) ? event['Link text'] : "More information"}</a>
                        </div>
                      }
                    </div>
                  </div>
                </li>
              )
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

}

Timeline.defaultProps = {
  spreadsheetId: '1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ',
  sheets: ["Toy Story Movies"],
  apiKey: ""
}

export default Timeline;

