import ScriptTag from "react-script-tag";
import React, { Component } from "react";

export default class CovSearchTrend extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (


      <div>
        <h3>Cov-19 Search frequency By Different States</h3>
        <div id="google-trend-container-2">
          <ScriptTag type="text/javascript">
            {`
            const root2 = document.getElementById('google-trend-container-2');
            trends.embed.renderExploreWidgetTo(root2 ,"GEO_MAP", 
            {"comparisonItem":[{"keyword":"coronavirus","geo":"AU","time":"today 12-m"}],"category":0,"property":""}, 
            {"exploreQuery":"geo=AU&q=coronavirus&date=today 12-m",
            "guestPath":"https://trends.google.com:443/trends/embed/"});
          `}
          </ScriptTag>
        </div>
      </div>
    );
  }
}

