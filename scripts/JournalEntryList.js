import {journalEntriesSorted} from "./JournalDataProvider.js"
import {journalEntryHTML} from "./JournalEntryHTMLConverter.js"

const contentElement = document.querySelector(".entries")

export const entryList = () => {
    
    const entries = journalEntriesSorted()

    contentElement.innerHTML += `
        ${entries.map(entry => (journalEntryHTML(entry)))}`
}