import React from "react";
import CanvasJSReact from './canvasjs.react';
import { object } from "prop-types";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PieChart extends React.Component {
  constructor(){
    super()
    this.state = {
      ranking: [{y:108, label:'Covid-19'},
       {y:42, label:'Flu'},
       {y:12, label:'Dengue'},
       {y:10, label:'Measles'},
       {y:28, label:'Sars'},
       {y:22, label:'Pneumonia'},
      ]
    }
  }

	render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: ""
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y} articles",
				dataPoints: this.state.ranking
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
