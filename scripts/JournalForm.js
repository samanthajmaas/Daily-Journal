import {saveEntry} from "./JournalDataProvider.js"

const eventHub = document.querySelector(".main")
const contentTarget = document.querySelector(".formAndEntry")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submit") {
        const entryDate = document.querySelector("#entry--date")
        const entryConcept = document.querySelector("#entry--concept")
        const entryAuthor = document.querySelector("#entry--author")
        const entryText = document.querySelector("#entry--text")
        const entryMood = document.querySelector("#entry--mood")

        const newEntry = {
            date: entryDate.value,
            concept: entryConcept.value,
            author: entryAuthor.value,
            entry: entryText.value,
            mood: entryMood.value,
        }

        saveEntry(newEntry)
    }
})

const render = () => {
    contentTarget.innerHTML = `
    <article class="form">
        <h2> New Entry </h2>
        <input type="date" name="journalDate" id="entry--date"/>
        <input type="text" id="entry--concept" placeholder= "Concept Learned"/>
        <input type="text" id="entry--author" placeholder= "Your Name"/>
        <textarea type="text" id="entry--text" placeholder="Entry text here"></textarea>
        <label for="mood">Mood of the Day</label>
        <select id="entry--mood">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="stressed">Stressed</option>
            <option value="confident">Confident</option>
        </select>
        
        <button id="submit">Submit</button>

    `
}

export const NoteForm = () => {
    render()
}