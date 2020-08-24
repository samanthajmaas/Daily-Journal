let entriesTags = []

export const useEntriesTags = () => {
    return entriesTags.slice()
}

export const getEntriesTags = () => {
    return fetch("http://localhost:3000/entriestags")
        .then(response => response.json())
        .then(data => {
            entriesTags = data
        })
}

export const saveEntriesTags = tag => {
    const jsonNote = JSON.stringify(tag)

    return fetch("http://localhost:3000/entriestags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNote
    })
}