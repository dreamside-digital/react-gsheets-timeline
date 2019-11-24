"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require("lodash");

require("@fortawesome/fontawesome-free/css/all.css");

require("../assets/scss/timeline.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultConfig = {
  defaults: {
    icons: [_react2.default.createElement("i", { className: "fas fa-circle" }), _react2.default.createElement("i", { className: "fas fa-square" }), _react2.default.createElement("i", { className: "fas fa-star" })],
    colors: ["darkcyan", "darkslateblue", "firebrick", "steelblue", "chocolate"]
  }
};

var Counter = function Counter(_ref) {
  var event = _ref.event,
      index = _ref.index;

  return _react2.default.createElement(
    "li",
    { key: "event-" + index, className: "interval-marker" },
    _react2.default.createElement(
      "div",
      { className: "counter-icon" },
      _react2.default.createElement("i", { className: "fas fa-minus" })
    )
  );
};

var Event = function Event(_ref2) {
  var event = _ref2.event,
      index = _ref2.index,
      color = _ref2.color,
      icon = _ref2.icon;

  if (!event['Year']) {
    return null;
  }

  var year = event['Year'];
  var month = Boolean(event['Month']) ? parseInt(event['Month']) - 1 : null;
  var day = Boolean(event['Day']) ? parseInt(event['Day']) : null;

  var endYear = Boolean(event['End Year']) ? parseInt(event['End Year']) : null;
  var endMonth = Boolean(event['End Month']) ? parseInt(event['End Month']) + 1 : null;
  var endDay = Boolean(event['End Day']) ? parseInt(event['End Day']) : null;

  var startDate = new Date(year, month, day);
  var endDate = endYear ? new Date(endYear, endMonth, endDay) : null;

  var highlight = event["Highlight"] == "TRUE" ? "highlight" : "";
  var styleProperties = _defineProperty({}, '--timeline-color', color);

  var linkText = Boolean(event['Link text']) ? event['Link text'] : "More information";

  return _react2.default.createElement(
    "li",
    { key: "event-" + index, className: "event", tabIndex: 0, style: styleProperties },
    _react2.default.createElement(
      "div",
      { className: "bullet-icon" },
      icon
    ),
    _react2.default.createElement(
      "div",
      { className: "tl-item " + highlight },
      _react2.default.createElement(
        "div",
        { className: "dates" },
        _react2.default.createElement(
          "div",
          { className: "year" },
          startDate.getFullYear()
        ),
        _react2.default.createElement(
          "div",
          { className: "month" },
          _react2.default.createElement(
            "span",
            null,
            Boolean(event['Month']) && Boolean(event["Day"]) && "" + startDate.toLocaleDateString('default', { month: 'short', day: 'numeric' }) || Boolean(event['Month']) && "" + startDate.toLocaleDateString('default', { month: 'short' }) || null
          )
        ),
        endDate && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "hyphen" },
            _react2.default.createElement("i", { className: "fas fa-minus" })
          ),
          _react2.default.createElement(
            "div",
            { className: "year" },
            endDate.getFullYear()
          ),
          _react2.default.createElement(
            "div",
            { className: "month" },
            _react2.default.createElement(
              "span",
              null,
              Boolean(event['End Month']) && Boolean(event["End Day"]) && "" + endDate.toLocaleDateString('default', { month: 'short', day: 'numeric' }) || Boolean(event['End Month']) && "" + endDate.toLocaleDateString('default', { month: 'short' }) || null
            )
          )
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "info" },
        _react2.default.createElement(
          "div",
          { className: "headline" },
          _react2.default.createElement(
            "h4",
            null,
            event['Headline']
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "description" },
          event['Text']
        ),
        event["Link"] && _react2.default.createElement(
          "div",
          { className: "description" },
          _react2.default.createElement(
            "a",
            { href: event["Link"], target: "_blank", rel: "noopener" },
            _react2.default.createElement("i", { className: "fas fa-external-link-alt" }),
            _react2.default.createElement(
              "span",
              { className: "link-text" },
              linkText,
              _react2.default.createElement("span", { className: "underline" })
            )
          )
        )
      ),
      event["Image URL"] && _react2.default.createElement(
        "div",
        { className: "image-container hide-on-mobile" },
        _react2.default.createElement("img", { src: event["Image URL"], alt: event["Image description"], className: "image" })
      )
    )
  );
};

var Timeline = function (_React$Component) {
  _inherits(Timeline, _React$Component);

  function Timeline(props) {
    _classCallCheck(this, Timeline);

    var _this = _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this, props));

    _this.handleSave = function (newContent) {
      _this.props.onSave(newContent);
    };

    _this.state = {
      timelines: {},
      eventList: [],
      intervalMarkers: [],
      ready: false
    };
    _this.config = _extends({}, defaultConfig, _this.props.config);
    return _this;
  }

  _createClass(Timeline, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadTimelineData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.timelines !== this.state.timelines) {
        this.orderEvents(this.generateEventList());
      }
    }
  }, {
    key: "handleShowTimeline",
    value: function handleShowTimeline(sheetId) {
      var _this2 = this;

      return function () {
        return _this2.setState({ timelines: _extends({}, _this2.state.timelines, _defineProperty({}, sheetId, _extends({}, _this2.state.timelines[sheetId], { show: true }))) });
      };
    }
  }, {
    key: "handleHideTimeline",
    value: function handleHideTimeline(sheetId) {
      var _this3 = this;

      return function () {
        return _this3.setState({ timelines: _extends({}, _this3.state.timelines, _defineProperty({}, sheetId, _extends({}, _this3.state.timelines[sheetId], { show: false }))) });
      };
    }
  }, {
    key: "loadTimelineData",
    value: function loadTimelineData() {
      var _this4 = this;

      var _props = this.props,
          spreadsheetId = _props.spreadsheetId,
          apiKey = _props.apiKey;


      this.props.sheets.forEach(function (sheetId, index) {
        var url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetId + "/values/" + sheetId + "?key=" + apiKey;

        _axios2.default.get(url).then(function (res) {
          console.log(res);
          var headings = res.data.values[0];
          var rows = [].concat(_toConsumableArray(res.data.values));
          rows.shift();
          var events = rows.map(function (row) {
            var item = { sheetId: sheetId, sheetOrder: index, type: "event" };
            headings.map(function (heading, index) {
              if (heading === "Year") {
                item[heading] = parseInt(row[index]);
              } else {
                item[heading] = row[index];
              }
            });
            return item;
          });

          _this4.setState({
            timelines: _extends({}, _this4.state.timelines, _defineProperty({}, sheetId, _extends({}, _this4.state.timelines[sheetId], { show: true, events: events, sheetOrder: index }))),
            ready: true
          });
        }).catch(function (err) {
          console.log(err);
        });
      });
    }
  }, {
    key: "generateEventList",
    value: function generateEventList() {
      var _this5 = this;

      var allEvents = [];
      (0, _lodash.map)(this.state.timelines, function (timeline, sheetId) {
        if (timeline.show) {
          allEvents = allEvents.concat(timeline.events);
        }
      });

      if (allEvents.length > 0 && this.props.interval) {
        (function () {
          var interval = parseInt(_this5.props.interval);
          var endYear = allEvents[allEvents.length - 1]["Year"];
          var year = parseInt(_this5.props.startYear);
          while (year < endYear) {
            var eventThisYear = allEvents.find(function (e) {
              return e["Year"] === year;
            });
            if (!eventThisYear) {
              allEvents = allEvents.concat({ type: "counter", Year: year });
            }
            year = year + interval;
          }
        })();
      }

      return allEvents;
    }
  }, {
    key: "orderEvents",
    value: function orderEvents(events) {
      var eventList = events.sort(function (a, b) {
        return a["Year"] - b["Year"];
      });
      this.setState({ eventList: eventList });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _state = this.state,
          eventList = _state.eventList,
          ready = _state.ready;


      if (!ready) {
        return _react2.default.createElement("div", null);
      }

      return _react2.default.createElement(
        "div",
        { className: "nl-timeline" },
        _react2.default.createElement(
          "div",
          { className: "legend" },
          _react2.default.createElement(
            "h3",
            null,
            "Legend"
          ),
          (0, _lodash.map)(this.state.timelines, function (timeline, sheetId) {
            var color = _this6.config[sheetId] && _this6.config[sheetId].color ? _this6.config[sheetId].color : _this6.config.defaults.colors[timeline.sheetOrder % _this6.config.defaults.colors.length];
            var icon = _this6.config[sheetId] && _this6.config[sheetId].icon ? _this6.config[sheetId].icon : _this6.config.defaults.icons[timeline.sheetOrder % _this6.config.defaults.icons.length];
            var styleProperties = _defineProperty({}, '--timeline-color', color);

            return _react2.default.createElement(
              "p",
              { className: "timeline" + timeline.sheetOrder, key: sheetId, style: styleProperties },
              _react2.default.createElement(
                "span",
                { className: "bullet-icon" },
                icon
              ),
              _react2.default.createElement(
                "span",
                { className: "" + (timeline.show ? "" : "text-muted") },
                sheetId
              ),
              timeline.show ? _react2.default.createElement(
                "span",
                { className: "toggle-timeline text-muted", onClick: _this6.handleHideTimeline(sheetId) },
                "(hide)"
              ) : _react2.default.createElement(
                "span",
                { className: "toggle-timeline", onClick: _this6.handleShowTimeline(sheetId) },
                "(show)"
              )
            );
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "timeline " + (this.props.alignment === "right" ? "align-right" : "") },
          _react2.default.createElement(
            "h3",
            null,
            "Events"
          ),
          _react2.default.createElement(
            "ul",
            null,
            eventList.map(function (event, index) {
              if (event.type === "counter") {
                return _react2.default.createElement(Counter, { event: event, index: index, key: "event-" + index });
              }

              var color = _this6.config[event.sheetId] && _this6.config[event.sheetId].color ? _this6.config[event.sheetId].color : _this6.config.defaults.colors[event.sheetOrder % _this6.config.defaults.colors.length];
              var icon = _this6.config[event.sheetId] && _this6.config[event.sheetId].icon ? _this6.config[event.sheetId].icon : _this6.config.defaults.icons[event.sheetOrder % _this6.config.defaults.icons.length];

              return _react2.default.createElement(Event, { key: "event-" + index, event: event, index: index, color: color, icon: icon });
            })
          )
        )
      );
    }
  }]);

  return Timeline;
}(_react2.default.Component);

;

Timeline.propTypes = {
  spreadsheetId: _propTypes2.default.string.isRequired,
  sheets: _propTypes2.default.array.isRequired,
  apiKey: _propTypes2.default.string.isRequired,
  config: _propTypes2.default.object,
  alignment: _propTypes2.default.string,
  interval: _propTypes2.default.number,
  startYear: _propTypes2.default.number
};

Timeline.defaultProps = {
  spreadsheetId: '1vieT0gVrDOHAvAUW8uUWQZj2heeJr8Xg6bZbvKkFFbQ',
  sheets: ["Toy Story Movies"],
  apiKey: "",
  config: {},
  alignment: "left"
};

exports.default = Timeline;