export const fetchSongData = async (reqParam, artistParam, songParam) => {
  let state = {}
  await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.${reqParam}&artist=${artistParam}&track=${songParam}&api_key=${process.env.REACT_APP_API_KEY}&format=json`,
  )
    .then(res => res.json())
    .then(res => {
      if (res.track) state.info = res.track
      else state.similar = res.similartracks.track.filter((e, i) => i < 10)
    })
  return state
}
