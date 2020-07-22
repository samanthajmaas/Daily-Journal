import {journalEntriesSorted} from "./JournalDataProvider.js"
import {journalEntryHTML} from "./JournalEntryHTMLConverter.js"

const contentElement = document.querySelector(".entries")

export const entryList = () => {
    
    const entries = journalEntriesSorted()
    let entryHTMLRepresentation =""

    for (const entry of entries) {
        entryHTMLRepresentation += journalEntryHTML(entry)

    }
    contentElement.innerHTML += `
        ${entryHTMLRepresentation}`
}