import {journalEntriesSorted, getEntries} from "./JournalDataProvider.js"
import {journalEntryHTML} from "./JournalEntryHTMLConverter.js"

const eventHub =document.querySelector(".main")
const contentElement = document.querySelector(".entries")


//eventHub.addEventListener("showJournalSubmited", customEvent => {
    //entryList()
//})

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

    contentElement.innerHTML = `
    <h2>Entries</h2>
    ${allEntriesIntoStrings}
    `
}

eventHub.addEventListener("entryStateChanged", entryList)