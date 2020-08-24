import { saveEntry, journalEntriesSorted, editEntry} from "./EntriesDataProvider.js"
import {getMoods, useMoods, } from "../moods/MoodsDataProvider.js"
import {getTags, useTags, saveTags} from "../tags/TagsDataProvider.js"
import {getEntriesTags, useEntriesTags, saveEntriesTags} from "../tags/EntriesTagsDataProvider.js"


const eventHub = document.querySelector(".main")
const contentTarget = document.querySelector(".formAndEntry")

//Shows the NoteForm on the page where user can input a new Journal Entry
export const NoteForm = () => {
    getMoods()
        .then(() => {
            const moods = useMoods()
            render(moods)
        }
        )
}

//This is the function that actually adds the HTML 
const render = (moods) => {
    contentTarget.innerHTML = `
    <article class="form">
    <div>
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
        <input type ="text" id="entry--tags" placeholder="List tags i.e API, components, ect."/>
        <button id="submit">Submit</button>
        <input type="hidden" name="entryId" id="entryId" value="">
    </div>
    `
}

//This is listening for the Submit button after the user fills out the form.
//This stores the information from a new entry into the entries database
//This also updates the information in the entries database if the user edits an exsisting entry
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submit") {
        getEntriesTags()
            .then(() => {
                const entryTags = document.querySelector("#entry--tags") //What tags did the user input?
                getTagObjectsArray(entryTags.value)
                    .then(arrayOfTagObj => {
                        console.log("arrayOfTagObj", arrayOfTagObj)

                        //code that needs the tag objects for the journal entry
                    })

                const entryDate = document.querySelector("#entry--date")
                const entryConcept = document.querySelector("#entry--concept")
                const entryAuthor = document.querySelector("#entry--author")
                const entryText = document.querySelector("#entry--text")
                const entryMood = document.querySelector("#entry--mood")



                if (entryConcept.value && entryDate.value && entryMood.value && entryText.value && entryAuthor.value) {
                    const id = document.querySelector("#entryId")
                    if (id.value === "") {
                        const newEntry = {
                            date: entryDate.value,
                            concept: entryConcept.value,
                            author: entryAuthor.value,
                            entry: entryText.value,
                            moodId: parseInt(entryMood.value),
                        }
                        saveEntry(newEntry)
                    } else {
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
            })
    }
})

//This is listening for a user to click the edit entry button. 
//This updates the form component with the information from the previous entry which can then be changed. 
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

export const getTagObjectsArray = (tagString) => {
    return getTags()
        .then(() => {
            const tags = useTags()

            //I have an array of Tags ["API", "component", "fetch"] *HOW DO I use this now?!
            const arrayOfTagStrings = tagString.split(", ")

            //Promise.all forces code to wait until all requests are completed before moving on
            //return the array of tag objects so you can sue it later
            return Promise.all(arrayOfTagStrings.map(inputTag => {
                const existingTag = tags.find(tag => tag.subject.toLowerCase() === inputTag.toLowerCase())
                if (existingTag === undefined) {
                    const newTag = {
                        subject: inputTag
                    }
                    return saveTags(newTag)
                } else {
                    return existingTag
                }
            }))
        })
}


