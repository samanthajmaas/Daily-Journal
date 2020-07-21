const journal = [
    {
        id: 1,
        date: "07/24/2025",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "happy"
    },
    {
        id: 2,
        date: "07/25/2025",
        concept: "HTML & CSS",
        entry: "We had the chance to practice our skills in our own Daily Journal.",
        mood: "confident"
    },
    {
        id: 3,
        date: "07/26/2025",
        concept: "HTML & CSS",
        entry: "I worked with a group on a group project. We had to create a travel brochure website. We practiced using HTML and CSS. We got a lot of experience in Git and GitHub.",
        mood: "confident"
    }
]

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}