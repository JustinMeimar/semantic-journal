import React from "react";
import Chart from "chart.js/auto";

export default class Home extends React.Component {
    chartRef = React.createRef();

    componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		
		new Chart(ctx, {
			type: "line",
			data: {
				labels: ["", "", "", "", "", "", ""],
				datasets: [{ 
					data: [86,114,106,106,107,111,133],
					label: "Running Speed",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false,
				}, { 
					data: [70,90,44,60,83,90,100],
					label: "Heart Rate",
					borderColor: "#3cba9f",
					backgroundColor: "#71d1bd",
					fill: false,
				}, { 
					data: [10,21,60,44,17,21,17],
					label: "Level of Intensity",
					borderColor: "#ffa500",
					backgroundColor:"#ffc04d",
					fill: false,
				},
				]
			},
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: '#666'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: '#666'
                        }
                    }
                }
            }
		});
	}

    render() {
        return (
            <div>
                <canvas id="myChart" ref={this.chartRef} />
            </div>
        );
    }
}