let journalEntries = []
let moods =[]

const eventHub = document.querySelector(".main")

const dispatchStateChangeEvent = () => {
    const entryStateChangedEvent = new CustomEvent("entryStateChanged")

    eventHub.dispatchEvent(entryStateChangedEvent)
}

export const useMoods = () => {
    return moods.slice()
}

export const journalEntriesSorted = () => {
    const sortedByDate = journalEntries.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}


export const getEntries = () => {
    return fetch("http://localhost:3000/entries?_expand=mood") 
    .then(response => response.json())  
    .then(entries => {
        journalEntries = entries
    })
}

export const getMoods = () => {
    return fetch("http://localhost:3000/moods") 
    .then(response => response.json())  
    .then(parsedMoods => {
        moods = parsedMoods
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
    .then(dispatchStateChangeEvent)
}

export const deleteEntry = (entryId) => {
    return fetch (`http://localhost:3000/entries/${ entryId }`, {
        method: "DELETE"
    })
    .then(getEntries)
    .then(dispatchStateChangeEvent)
}

export const editEntry = (entry) => {
    return fetch(`http://localhost:3000/entries/${ entry.id }`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(entry)
    })
    .then(getEntries)
    .then(dispatchStateChangeEvent)
}