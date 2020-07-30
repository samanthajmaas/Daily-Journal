let journalEntries = []

export const journalEntriesSorted = () => {
    const sortedByDate = journalEntries.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}


export const getEntries = () => {
    return fetch("http://localhost:3000/entries") 
    .then(response => response.json())  
    .then(entries => {
        journalEntries = entries
    })
}

export const saveEntry = entry => {
    const jsonNote = JSON.stringify(entry)

    return fetch("http://localhost:3000/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNote
    })
    .then(getEntries)
    .then(journalEntriesSorted)
}