import { deleteEntry, journalEntriesSorted, getEntries, useMoods, getTags, getEntriesTags, useTags, useEntriesTags } from "./JournalDataProvider.js"
import { journalEntryHTML } from "./JournalEntryHTMLConverter.js"

const eventHub = document.querySelector(".main")
const contentElement = document.querySelector(".entries")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("entryDeleteButton--")) {
        const [prompt, entryId] = clickEvent.target.id.split("--")

        deleteEntry(entryId)
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("entryEditButton----")) {
        const [prompt, entryId] = clickEvent.target.id.split("--")

        const message = new CustomEvent("entryEdited")
    }
})

eventHub.addEventListener("entryStateChanged", customEvent => {
    const allEntries = journalEntriesSorted()
    render(allEntries)
})

export const entryList = () => {
    getEntries()
        .then(() => {
            const entries = journalEntriesSorted()
            render(entries)
        })
}

const render = (entryArray) => {
    getTags()
        .then(getEntriesTags)
        .then(() => {
            const moods = useMoods()
            const tags = useTags()
            const entriesTagsRelationships = useEntriesTags()

            const allEntriesIntoStrings = entryArray.reverse().map(
                (currentEntry) => {
                    const mood = moods.find(
                        (mood) => {
                            return mood.id === currentEntry.moodId
                        }
                    )
                    const relationships = entriesTagsRelationships.filter(et => et.entryId === currentEntry.id)
                    const findTags = relationships.map(te => {
                        return tags.find(tag => tag.id === te.tagId)
                    })

                    return journalEntryHTML(currentEntry, findTags)
                }).join("")

            contentElement.innerHTML = `
            <h2>Entries</h2>
                ${allEntriesIntoStrings}
            `
        })
}

eventHub.addEventListener("entryStateChanged", entryList)