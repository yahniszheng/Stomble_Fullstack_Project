import ScriptTag from "react-script-tag";
import React, { Component } from "react";


export default class GoogleTrendsChart extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h3>Cov-19 Search Interest For Search Keyword</h3>
        <div id="google-trend-container">

          <ScriptTag type="text/javascript">
          {`
            const root = document.getElementById('google-trend-container');
            trends.embed.renderExploreWidgetTo(
            root,
            'TIMESERIES', 
            {"comparisonItem":[{"keyword":"coronavirus","geo":"AU","time":"today 12-m"}],"category":0,"property":""}, 
            {"exploreQuery":"geo=AU&q=coronavirus&date=today 12-m",
            "guestPath":"https://trends.google.com:443/trends/embed/"}
          )`}
          </ScriptTag> 
        </div>
      </div>
    );
  }
}
