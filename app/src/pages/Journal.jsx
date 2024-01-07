import React, { useState } from "react";
import "../App.css";

const Journal = () => {
    // Use useState to manage the goal and journal content states
    const [journalContent, setJournalContent] = useState("");

    // Function to handle changes in the textarea
    const handleJournalChange = (event) => {
        setJournalContent(event.target.value);
    };

    const recordJournal = () => {
        console.log("record journal: ", journalContent);
        
        const apiUrl = "http://127.0.0.1:5000/add_journal" 
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

        const journalData = {
            date: formattedDate,
            content: journalContent
        };
        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(journalData),
        })
        .then(response => {
            console.log("response:", response)
            response.json() 
        })
        .then(data => {
            console.log('Journal added:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        }); 
    }

    const getTodaysDate = () => {
        const today = new Date();
        return today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    return (
        <div>
            <div className="journalsBrowser">
                List old journals here                                
            </div>
            <div className="journalTitleContainer">
                📝{getTodaysDate()}
            </div>
            <div className="journalContainer">
                <div className="entryPage">
                    <div className="entryDiv">
                        <textarea 
                            type="text"
                            id="mainEntry" 
                            className="entryPrompt"
                            placeholder="Write your entry here:"
                            value={journalContent}
                            onChange={handleJournalChange}
                        />
                    </div>
                    <button className="entrySubmitButton" onClick={recordJournal}>Record</button>
                </div>
            </div>
        </div>
    );
}

export default Journal;