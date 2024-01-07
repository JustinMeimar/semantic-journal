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