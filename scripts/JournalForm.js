import {saveEntry, getMoods, useMoods, journalEntriesSorted, editEntry} from "./JournalDataProvider.js"


const eventHub = document.querySelector(".main")
const contentTarget = document.querySelector(".formAndEntry")

eventHub.addEventListener("editEntryClicked", customEvent => {
    const allEntries = journalEntriesSorted()
    const entryId = event.detail.entryId
    const entryObj = allEntries.find(entry => entry.id === entryId)

        const entryDate = document.querySelector("#entry--date")
        const entryConcept = document.querySelector("#entry--concept")
        const entryAuthor = document.querySelector("#entry--author")
        const entryText = document.querySelector("#entry--text")
        const entryMood = document.querySelector("#entry--mood")
        const id = document.querySelector("#entryId")

        entryDate.value = entryObj.date
        entryConcept.value = entryObj.concept
        entryAuthor.value = entryObj.author
        entryText.value = entryObj.entry 
        entryMood.value = entryObj.mood.id 
        id.value = entryId
})



eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submit") {

        const entryDate = document.querySelector("#entry--date")
        const entryConcept = document.querySelector("#entry--concept")
        const entryAuthor = document.querySelector("#entry--author")
        const entryText = document.querySelector("#entry--text")
        const entryMood = document.querySelector("#entry--mood")
        const id = document.querySelector("#entryId")
        
        if(entryConcept.value && entryDate.value && entryMood.value && entryText.value && entryAuthor.value){
            const id = document.querySelector("#entryId")
            if(id.value === ""){
                const newEntry = {
                    date: entryDate.value,
                    concept: entryConcept.value,
                    author: entryAuthor.value,
                    entry: entryText.value,
                    moodId: parseInt(entryMood.value),
                }
                saveEntry(newEntry)
            }else{
                const updatedEntry = {
                    date: entryDate.value,
                    concept: entryConcept.value,
                    author: entryAuthor.value,
                    entry: entryText.value,
                    moodId: parseInt(entryMood.value),
                    id: parseInt(id.value)
                }
                editEntry(updatedEntry)
            }
        } 
    }
})

const render = (moods) => {
    contentTarget.innerHTML = `
    <article class="form">
    <form>
        <h2> New Entry </h2>

        <input type="date" name="journalDate" id="entry--date"/>
        <input type="text" id="entry--concept" placeholder= "Concept Learned"/>
        <input type="text" id="entry--author" placeholder= "Your Name"/>
        <textarea type="text" id="entry--text" placeholder="Entry text here"></textarea>
        <label for="mood">Mood of the Day</label>
        <select id="entry--mood">
            ${
                moods.map(
                    (moodsObj) => {
                        return `<option value="${moodsObj.id}">
                            ${moodsObj.label}
                            </option>`
                    }
                )
            }
        </select>
    
        <button id="submit">Submit</button>
        <input type="hidden" name="entryId" id="entryId" value="">
    </form>
    `
}

export const NoteForm = () => {
    getMoods()
        .then(() =>{
            const moods = useMoods()
            render(moods)
        }
        )
}