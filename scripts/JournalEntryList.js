import {journalEntriesSorted, getEntries, useMoods} from "./JournalDataProvider.js"
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
    const moods = useMoods()

    const allEntriesIntoStrings = entryArray.reverse().map (
        (currentEntry) => {
            const mood = moods.find(
                (mood) => {
                    return mood.id === currentEntry.moodId
                }
            )

            return journalEntryHTML(currentEntry, mood)
        }
    ).join("")

    contentElement.innerHTML = `
    <h2>Entries</h2>
    ${allEntriesIntoStrings}
    `
}

eventHub.addEventListener("entryStateChanged", entryList)