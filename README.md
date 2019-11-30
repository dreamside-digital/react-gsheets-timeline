# React Google Sheets Timeline

**Simple timeline pulling data from a Google Sheet**

Demo: [https://nomadic-labs.github.io/react-gsheets-timeline/](https://nomadic-labs.github.io/react-gsheets-timeline/)

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
`yarn add react-gsheets-timeline`
or
`npm install react-gsheets-timeline`

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
| `spreadsheetId` (required) | String | The ID of the google spreadsheet, found in the URL after `https://docs.google.com/spreadsheets/d/` and before the next `/` |
| `sheets`  (required) | Array of Strings | An array of the sheet titles. The sheet title is on the tab at the bottom of the sheet. Each sheet will be a different category in the timeline. |
| `apiKey`  (required) | String | The API key for your google project |
| `config`  (optional) | Object | Configuration object for timeline icons and colors |
| `alignment`  (optional) | String | Must be one of "left", "right", or "center". Default is "left". |
| `interval`  (optional) | Number | Use to display interval markers at the configured year interval. |
| `startYear`  (optional) | Number | This prop can only used when the `interval` prop is set, to specify a start year different than the year of the first event. |


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

