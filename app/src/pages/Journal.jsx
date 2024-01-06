import React, { useState, useEffect } from "react";

const apiUrl = 'http://localhost:5000';

const create_goal = (goalTitle, metrics) => {
    const requestData = {
        goal: goalTitle,
        metrics: metrics
    };

    fetch(`${apiUrl}/create_goal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const add_journal = (journalData) => {
    fetch(`${apiUrl}/add_journal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(journalData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Journal added:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const get_journals = () => {
    fetch(`${apiUrl}/get_journals`)
    .then(response => response.json())
    .then(data => {
        console.log('Journals:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function Journal() {
    const [journalEntries, setJournalEntries] = useState([]);
    const [goalTitle, setGoalTitle] = useState('');
    const [metrics, setMetrics] = useState('');

    const handleGoalSubmit = (event) => {
        event.preventDefault();
        const metricsArray = metrics.split(',').map(metric => metric.trim()); // Splitting by comma and trimming spaces
        create_goal(goalTitle, metricsArray);
    }

    useEffect(() => {
        create_goal("Marathon Training", ["Speed", "Distance", "Calories Burned"]);
 
        const newJournal = {
            date: "2024-01-10",
            content: "Today's training was tough, but feeling good!"
        };
        add_journal(newJournal);
    }, []);

    return (
        <div>
            <h1>This is the Journal</h1>
            <form onSubmit={handleGoalSubmit}>
                <div>
                    <label>Goal Title:</label>
                    <input 
                        type="text" 
                        value={goalTitle} 
                        onChange={(e) => setGoalTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Metrics (comma-separated):</label>
                    <input 
                        type="text" 
                        value={metrics} 
                        onChange={(e) => setMetrics(e.target.value)} 
                    />
                </div>
                <button type="submit">Create Goal</button>
                <button onClick={ get_journals() }>Get</button>
            </form>
        </div>
    );
}

export default Journal;

