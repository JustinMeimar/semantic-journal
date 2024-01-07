// import React from "react";
// import Chart from "chart.js/auto";

// export default class Home extends React.Component {
//     chartRef = React.createRef();

    // componentDidMount() {
	// 	const ctx = this.chartRef.current.getContext("2d");
		
	// 	new Chart(ctx, {
	// 		type: "line",
	// 		data: {
	// 			labels: ["", "", "", "", "", "", ""],
	// 			datasets: [{ 
	// 				data: [86,114,106,106,107,111,133],
	// 				label: "Running Speed",
	// 				borderColor: "#3e95cd",
	// 				backgroundColor: "#7bb6dd",
	// 				fill: false,
	// 			}, { 
	// 				data: [70,90,44,60,83,90,100],
	// 				label: "Heart Rate",
	// 				borderColor: "#3cba9f",
	// 				backgroundColor: "#71d1bd",
	// 				fill: false,
	// 			}, { 
	// 				data: [10,21,60,44,17,21,17],
	// 				label: "Level of Intensity",
	// 				borderColor: "#ffa500",
	// 				backgroundColor:"#ffc04d",
	// 				fill: false,
	// 			},
	// 			]
	// 		},
    //         options: {
    //             plugins: {
    //                 legend: {
    //                     labels: {
    //                         color: '#ffffff'
    //                     }
    //                 }
    //             },
    //             scales: {
    //                 x: {
    //                     ticks: {
    //                         color: '#ffffff'
    //                     },
    //                     grid: {
    //                         color: '#666'
    //                     }
    //                 },
    //                 y: {
    //                     ticks: {
    //                         color: '#ffffff'
    //                     },
    //                     grid: {
    //                         color: '#666'
    //                     }
    //                 }
    //             }
    //         }
	// 	});
	// }

//     getMetrics = (event) => {
//         event.preventDefault();
//         const apiUrl = 'http://localhost:5000';

//         fetch(`${apiUrl}/gen_metrics`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ goal: this.state.goal }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Metrics:', data);
//             // Handle your data here
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     }

//     handleGoalChange = (event) => {
//         this.setState({ goal: event.target.value });
//     }

//     render() {
//         return (
//             <div style={{ textAlign: 'center' }}>
//                 <h2>Enter Your Goal</h2>
//                 <form onSubmit={this.getMetrics}>
//                     <input 
//                         type="text" 
//                         style={{ width: '60%', padding: '10px', fontSize: '16px' }} 
//                         placeholder="Type your goal here..." 
//                         value={this.state.goal}
//                         onChange={this.handleGoalChange}
//                     />
//                     <br />
//                     <button 
//                         type="submit"
//                         style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}
//                     >
//                         Submit Goal
//                     </button>
//                 </form>
//                 <br /><br />
//                 <canvas id="myChart" ref={this.chartRef} />
//             </div>
//         );
//     }
// }

import React from "react";
import Chart from "chart.js/auto";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { goal: "" };
        this.chartRef = React.createRef();

        // Binding 'this' to the class methods
        this.getMetrics = this.getMetrics.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
    }

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

    getMetrics(event) {
        console.log("testing")

        event.preventDefault();
        const apiUrl = 'http://localhost:5000/create_goal';

        fetch(`${apiUrl}/gen_metrics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goal: this.state.goal }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(data => {
            console.log('Metrics:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    handleGoalChange(event) {
        this.setState({ goal: event.target.value });
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>Enter Your Goal</h2>
                <form onSubmit={this.getMetrics}>
                    <input 
                        type="text"
                        style={{ width: '60%', padding: '10px', fontSize: '16px' }}
                        placeholder="Type your goal here..."
                        value={this.state.goal}
                        onChange={this.handleGoalChange}
                    />
                    <br />
                    <button 
                        type="submit"
                        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}
                    >
                        Submit Goal
                    </button>
                </form>
                <br /><br />
                <canvas id="myChart" ref={this.chartRef} />
            </div>
        );
    }
}