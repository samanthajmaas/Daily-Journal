let tags = []

export const useTags = () => {
    return tags.slice()
}

export const getTags = () => {
    return fetch("http://localhost:3000/tags")
        .then(response => response.json())
        .then(data => {
            tags = data
        })
}

export const saveTags = tag => {
    const jsonNote = JSON.stringify(tag)

    return fetch("http://localhost:3000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNote
    }).then(response => response.json())
}
