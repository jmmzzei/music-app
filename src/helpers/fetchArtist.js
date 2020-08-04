export const fetchArtist = target => {
    let response = 'asd'
    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${target}&api_key=${process.env.REACT_APP_API_KEY}&format=json`)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        response = res.artist
        return response
    })
}