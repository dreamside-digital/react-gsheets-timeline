# React Google Sheets Timeline

**Simple configurable timeline that displays data from a Google Sheet**

Demo: [https://nomadic-labs.github.io/react-gsheets-timeline/](https://nomadic-labs.github.io/react-gsheets-timeline/)

**Features:**
- Fetches data from a Google spreadsheet and generates a simple timeline that displays a timeline item for each row in the sheet
- Timeline events can include year, month, day, title, description, link, and thumbnail image
- Display multiple categories on the timeline, each sheet from the workbook is a separate category
- The colors and icons representing the categories are configurable
- Toggle the visibility of each category on the timeline
- Option to add time interval markers markers to show the spacing of the events in the timeline
- Timeline can be aligned to left, right, or center 
- Center alignment displays the y-axis in the center of the timeline, and alternates timeline categories on either side of the timeline
- Categories can be configured individually to be on the left or right of the y-axis when the timeline is center-aligned
- No inline styles - easy to override CSS to customize the appearance of the timeline

**Known issues:**
- Currently optimized for multi-year timelines. Events show up in chronological order down to the day, but time markers have a minimum interval of one year.
- Mobile formatting is limited. Images are hidden on mobile (at <768px) and center-aligned timeline goes back to left-aligned (at <992px).

# How to Use

### Step 1: Make a copy of our [spreadsheet template](https://docs.google.com/spreadsheets/d/1ws0ZWbWak21dIp3kDer41L5Sz1cMLo2ps1JIfGTpBFI/edit?usp=sharing) and add your data for the timeline.


- Year, month, and day should be given as numbers (ie. 2019, 11, 11 for November 11, 2019).
- The link and link text will be used to generate a link that opens in a new tab.
- If the "Highlight" column is checked, the resulting timeline item will have a colored background.

### Step 2: Make the spreadsheet public on the web

Update the sharing settings to that anyone can find and view the spreadsheet

### Step 3: Get a google API key

- You must have a google account
- On the [Google developers console](https://console.developers.google.com), create a project for your website if you haven't already
- On the Google APIs dashboard, go to the [Credentials](https://console.developers.google.com/apis/credentials) tab and click on "Create credentials", then select "API key" to create an API key for your project.

### Step 4: Install and import the React component in your project

Install the package:
```yarn add react-gsheets-timeline```
or
```npm install react-gsheets-timeline```

Import into your app:

```
import React from 'react';

import Timeline from 'react-gsheets-timeline';


const config = {
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
}


const App = props => (
  <div className="wrapper">
    <h1>Timeline Demo</h1>
    <Timeline
      spreadsheetId={"1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ"}
      sheets={["Toy Story Movies", "Jurassic Park Movies", "Spiderman Movies"]}
      apiKey={"YOUR API KEY"}
      config={config}
    />
  </div>
)
```

## Props

| Prop | Type | Description
| ---- | ---- | -----------
| `spreadsheetId` | String (required) | The ID of the google spreadsheet, found in the URL after `https://docs.google.com/spreadsheets/d/` and before the next `/` |
| `sheets` | Array of Strings (required) | An array of the sheet titles. The sheet title is on the tab at the bottom of the sheet. Each sheet will be a different category in the timeline. |
| `apiKey` | String (required) | The API key for your google project |
| `config` | Object (optional) | Configuration object for timeline icons and colors |
| `alignment` | String (optional) | Must be one of "left", "right", or "center". Default is "left". |
| `interval` | Number (optional) | Use to display interval markers at the configured year interval. |
| `startYear` | Number (optional) | This prop can only used when the `interval` prop is set, to specify a start year different than the year of the first event. |


## Configuration

The config prop accepts an object in which you can configure the icon and color for each timeline category. The config object should have a key for each sheet that you want to customize. The configuration for each sheet should have the following shape:

```
{
  "Sheet1": {
    color: String (any valid CSS value),
    icon: Node (React component or JSX),
    alignment: String ("left" or "right", only used when the overall timeline alignment is "center" to determine which side of the y-axis the evetns for this sheet will apppear on.)
  }
}
```

[Font Awesome 5.0 Free](https://fontawesome.com/icons?d=gallery&m=free) icons are already included in the package.

### Defaults

The default icons are the square, circle and star from Font Awesome. The timeline categories will rotate through those three if no custom icon is provided. The default colors are "darkcyan", "darkslateblue", and "firebrick". The timeline categories will rotate through them if no custom color is provided.

