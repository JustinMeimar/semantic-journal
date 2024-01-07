import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Home = () => {
    const [goal, setGoal] = useState('');
    const chartRef = useRef(null);
    const [metrics, setMetrics] = useState({
        "metric-1": "metric-1",
        "metric-2": "metric-2",
        "metric-3": "metric-3",
    });
    const chartInstanceRef = useRef(null); // Ref to store the chart instance

    useEffect(() => {
        if (chartRef.current) {

            const ctx = chartRef.current.getContext('2d');
            
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["", "", "", "", "", "", ""],
                    datasets: [{ 
                        data: [86,114,106,106,107,111,133],
                        label: metrics["metric-1"], 
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                        fill: false,
                    }, { 
                        data: [70,90,44,60,83,90,100],
                        label: metrics["metric-2"], 
                        borderColor: "#3cba9f",
                        backgroundColor: "#71d1bd",
                        fill: false,
                    }, { 
                        data: [10,21,60,44,17,21,17],
                        label: metrics["metric-3"], 
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
                    },
                    maintainAspectRatio: true,
                }
            });
        }
    }, [metrics]);

    const getMetrics = (event) => {
        event.preventDefault();
        const apiUrl = 'http://localhost:5000';

        fetch(`${apiUrl}/gen_metrics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goal }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(data => {
            console.log('Metrics:', data);
            setMetrics(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Enter Your Goal</h2>
            <form onSubmit={getMetrics}>
                <input 
                    type="text"
                    style={{ width: '60%', padding: '10px', fontSize: '16px' }}
                    placeholder="Type your goal here..."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="goalPrompt"
                />
                <br />
                <button 
                    type="submit"
                    style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}
                    className="goalSubmit"
                >
                    Submit Goal
                </button>
            </form>
            <br /><br />
            <div className="chartContainer">
                <canvas id="myChart" ref={chartRef} />
            </div>
        </div>
    );
};

export default Home;



// 

// new Chart(ctx, {
// 			type: "line",
// 			data: {
// 				labels: ["", "", "", "", "", "", ""],
// 				datasets: [{ 
// 					data: [86,114,106,106,107,111,133],
// 					label: "Running Speed",
// 					borderColor: "#3e95cd",
// 					backgroundColor: "#7bb6dd",
// 					fill: false,
// 				}, { 
// 					data: [70,90,44,60,83,90,100],
// 					label: "Heart Rate",
// 					borderColor: "#3cba9f",
// 					backgroundColor: "#71d1bd",
// 					fill: false,
// 				}, { 
// 					data: [10,21,60,44,17,21,17],
// 					label: "Level of Intensity",
// 					borderColor: "#ffa500",
// 					backgroundColor:"#ffc04d",
// 					fill: false,
// 				},
// 				]
// 			},
//             options: {
//                 plugins: {
//                     legend: {
//                         labels: {
//                             color: '#ffffff'
//                         }
//                     }
//                 },
//                 scales: {
//                     x: {
//                         ticks: {
//                             color: '#ffffff'
//                         },
//                         grid: {
//                             color: '#666'
//                         }
//                     },
//                     y: {
//                         ticks: {
//                             color: '#ffffff'
//                         },
//                         grid: {
//                             color: '#666'
//                         }
//                     }
//                 }
//             }
// 		});