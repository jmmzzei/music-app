export const fetchArtistData = async (reqParam, urlParam, quantity = 10) => {
  let state = {
    success: true,
  }
  await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.${reqParam}&artist=${urlParam}&api_key=${process.env.REACT_APP_API_KEY}&format=json`,
  )
    .then(res => res.json())
    .then(res => {
      if (res.toptracks)
        state.tracks = res.toptracks.track.filter((e, i) => i < quantity)
      else if (res.artist) state.artist = res.artist
      else if (res.topalbums)
        state.albums = res.topalbums.album.filter((e, i) => i < quantity)
      else if (res.error) state.success = false
    })
  return state
}
