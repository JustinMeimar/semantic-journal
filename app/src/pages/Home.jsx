import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const urlBase = "http://127.0.0.1:5000"

const fetchJournals = async () => {
    try {
        const response = await fetch(`${urlBase}/get_goal`);
        const journalsJSON = await response.json();
        return journalsJSON;
    } catch (error) {
        console.log("Error:", error);
        return [];
    }
}

let global_metrics = {
    "metric-1": "metric-1",
    "metric-2": "metric-2",
    "metric-3": "metric-3",

}

const Home = () => {
    const [goal, setGoal] = useState('');
    const chartRef = useRef(null);

    const [journalContent, setJournalContent] = useState("");
    const [journals, setJournals] = useState([]);

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
                    labels: [""],
                    datasets: [{ 
                        data: [0],
                        label: global_metrics["metric-1"], 
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                        fill: false,
                    }, { 
                        data: [0],
                        label: global_metrics["metric-2"], 
                        borderColor: "#3cba9f",
                        backgroundColor: "#71d1bd",
                        fill: false,
                    }, { 
                        data: [0],
                        label: global_metrics["metric-3"], 
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

    useEffect(() => {
        const getJournals = async () => {
            const goalData = await fetchJournals();
            let global_metrics = goalData.metrics;
            let journalsData = goalData.journals;
            if (journalsData && journalsData.length > 0) {
                setJournalContent(journalsData[0].content);
            } else {
                setJournalContent("No journals available.");
            }
            setJournals(journalsData);

            let data0 = [];
            let data1 = [];
            let data2 = [];
            let labels = [];

            for (let i = 0; i < journalsData.length; i++) {
                data0.push(journalsData[i].quantities[0]);
                data1.push(journalsData[i].quantities[1]);
                data2.push(journalsData[i].quantities[2]);
                labels.push("");
            }

            if (chartRef.current) {

                const ctx = chartRef.current.getContext('2d');
                
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                chartInstanceRef.current = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [{ 
                            data: data0,
                            label: global_metrics["metric-1"], 
                            borderColor: "#3e95cd",
                            backgroundColor: "#7bb6dd",
                            fill: false,
                        }, { 
                            data: data1,
                            label: global_metrics["metric-2"], 
                            borderColor: "#3cba9f",
                            backgroundColor: "#71d1bd",
                            fill: false,
                        }, { 
                            data: data2,
                            label: global_metrics["metric-3"], 
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

        };
        getJournals();
    }, []);

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
            global_metrics = data;
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
                    Set Goal
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