import {journalEntriesSorted, getEntries} from "./JournalDataProvider.js"
import {journalEntryHTML} from "./JournalEntryHTMLConverter.js"

const contentElement = document.querySelector(".entries")
const eventHub =document.querySelector(".main")

eventHub.addEventListener("showJournalSubmited", customEvent => {
    entryList()
})

export const entryList = () => {
    getEntries()
    .then(() => {
        const entries = journalEntriesSorted()
        render(entries)
    })
}

const render = (entryArray) => {
    const allEntriesIntoStrings = entryArray.map (
        (currentEntry) => {
            return journalEntryHTML(currentEntry)
        }
    ).join("")

    contentElement.innerHTML = allEntriesIntoStrings
}