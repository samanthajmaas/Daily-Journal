export const journalEntryHTML = (entry) => {
    return `
    <article id="entry--${entry.id}" "class= "journalEntry">
        <h3 class="entry--concept"> ${entry.concept}</h3>
            <div class="entry--date"> ${entry.date}</div>
            <div class= "entry--author"> Entry By: ${entry.author}</div>
            <div class="entry--entry">${entry.entry}</div>
            <div class="entry--mood">Mood: ${entry.mood.label}</div>
            <input type="hidden" name="entryId" id="entryId">
            <button class="editEntry--${entry.id}">Edit Entry</button>
            <button id="entryDeleteButton--${ entry.id }">Delete Entry</button>
            <br></br>
            <img class="journalFlower" src="./images/Wildflower 9.png">
    </article>
    `
}