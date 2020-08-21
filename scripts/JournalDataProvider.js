let journalEntries = []
let moods =[]
let tags = []
let entriesTags = []

const eventHub = document.querySelector(".main")

//dispatches an event that other modules can listen for that lets the event hub know that the database has been updated. 
const dispatchStateChangeEvent = () => {
    const entryStateChangedEvent = new CustomEvent("entryStateChanged")

    eventHub.dispatchEvent(entryStateChangedEvent)
}


export const useTags = () => {
    return tags.slice()
}

export const useEntriesTags = () => {
    return entriesTags.slice()
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

export const getTags = () => {
    return fetch("http://localhost:3000/tags")
        .then(response => response.json())
        .then(data => {
            tags = data
        })
}

export const saveTags = tag => {
    const jsonNote = JSON.stringify(tag)

    return fetch("http://localhost:3000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNote
    }).then(response => response.json())
    .then(newTag => {
        
    })
}


export const getEntriesTags = () => {
    return fetch("http://localhost:3000/entriestags")
        .then(response => response.json())
        .then(data => {
            entriesTags = data
        })
}

export const saveEntriesTags = tag => {
    const jsonNote = JSON.stringify(tag)

    return fetch("http://localhost:3000/entriestags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNote
    })
}