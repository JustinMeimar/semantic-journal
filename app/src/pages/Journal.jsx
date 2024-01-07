import React, { useEffect, useState } from "react";
import "../App.css";

const urlBase = "http://127.0.0.1:5000"

const fetchJournals = async () => {
    try {
        const response = await fetch(`${urlBase}/get_journals`);
        const journalsJSON = await response.json();
        return journalsJSON;
    } catch (error) {
        console.log("Error:", error);
        return [];
    }
}

const Journal = () => {
    
    const [journalContent, setJournalContent] = useState("");
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const getJournals = async () => {
            const journalsData = await fetchJournals();
            setJournals(journalsData);
        };
        getJournals(); 
    }, [journalContent])
    
    const getTodaysDate = () => {
        const today = new Date();
        return today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    const recordJournal = () => {
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
        setJournalContent("");
    }
   
    const handleJournalChange = (event) => {
        setJournalContent(event.target.value);
    };

    const handleJournalSelect = (content) => {
        setJournalContent(content);
    };

    return (
        <div>
            <div className="mainContainer">
                <div className="journalsBrowser">
                    <h2>Old Journals:</h2>
                    {journals.map((journal, index) => (
                        <div key={index} 
                            className="journalBrowserEntry"
                            onClick={() => handleJournalSelect(journal.content)} 
                            style={{ cursor: 'pointer'}}>
                            <p><strong>Date:</strong> {journal.date}</p>
                        </div>
                    ))}                    
                </div>
                <div className="rightContainer">
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
                            <button className="entrySubmitButton" 
                                onClick={recordJournal}>Save
                            </button>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Journal;