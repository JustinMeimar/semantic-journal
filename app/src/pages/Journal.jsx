import React, { useState } from 'react';
import { add_journal } from '../api.js'

function Journal() {
    // State for the journal entry
    const [journalEntry, setJournalEntry] = useState('');
    // Your existing metrics state
    const [goal, setGoal] = useState({
        metrics: ["Running speed", "Heart rate", "Distance"]
    });

    // Handle the change in the text area and update the journalEntry state
    const handleTextChange = (event) => {
        setJournalEntry(event.target.value);
    }

    // Handle the Record button click
    const addJournal = (event) => {
        event.preventDefault();
        const journalData = {
            date: '2000-01-01',
            content: journalEntry
        }
        add_journal(journalData); 

        setJournalEntry('');
    }

    return (
        <div className="entryPage">
            <p className="entryHeader">
                {`Your three metrics are: ${goal.metrics.join(", ")}`}
            </p>
            <div className="entryDiv">
                <p htmlFor="otherComments" className="entryHeader">How did today go?</p>
                <textarea 
                    type="text" 
                    id="mainEntry" 
                    className="entryPrompt" 
                    value={journalEntry} 
                    onChange={handleTextChange} 
                />
            </div>
            <button className="entrySubmitButton" onClick={addJournal}>Record</button>
        </div>
    );
}

export default Journal;
