let moods =[]

export const useMoods = () => {
    return moods.slice()
}

export const getMoods = () => {
    return fetch("http://localhost:3000/moods") 
    .then(response => response.json())  
    .then(parsedMoods => {
        moods = parsedMoods
    })
}