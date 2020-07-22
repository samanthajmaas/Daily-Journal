const journal = [
    {
        id: 1,
        date: "07/24/2025",
        concept: "FlexBox",
        author: "Samantha Maas",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Happy"
    },
    {
        id: 2,
        date: "07/25/2025",
        concept: "HTML & CSS",
        author: "Samantha Maas",
        entry: "We had the chance to practice our skills in our own Daily Journal.",
        mood: "Confident"
    },
    {
        id: 3,
        date: "07/26/2025",
        concept: "HTML & CSS",
        author: "Samantha Maas",
        entry: "I worked with a group on a group project. We had to create a travel brochure website. We practiced using HTML and CSS. We got a lot of experience in Git and GitHub.",
        mood: "Confident"
    },
    {
        id: 4,
        date: "07/27/2025",
        concept: "Javascript",
        author: "Samantha Maas",
        entry: "First day of Javascript. It was overwhelming and scary. I kind of felt like I understood but then when I had the chance to practice, I didn't quite get it. ",
        mood: "Stressed"
    }
]

export const journalEntriesSorted = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}