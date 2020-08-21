const eventHub = document.querySelector(".main")

export const journalEntryHTML = (entry, tagsArray) => {
    return `
    <article id="entry--${entry.id}" "class= "journalEntry">
        <h3 class="entry--concept"> ${entry.concept}</h3>
            <div class="entry--date"> ${entry.date}</div>
            <div class= "entry--author"> Entry By: ${entry.author}</div>
            <div class="entry--entry">${entry.entry}</div>
            <div class="entry--mood">Mood: ${entry.mood.label}</div>
            <div class="entry--tags"> Tags: 
            ${
                tagsArray.map(tag => `<div>${tag.subject}</div>`).join("")
            }
            </div>
            <button id="entryEditButton--${entry.id}">Edit Entry</button>
            <button id="entryDeleteButton--${ entry.id }">Delete Entry</button>
            <br></br>
    </article>
    `
}

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("entryEditButton--")){
        const[prompt, entryId] = event.target.id.split("--")
        
        const customEvent = new CustomEvent("editEntryClicked", {
            detail: {
                entryId: parseInt(entryId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})