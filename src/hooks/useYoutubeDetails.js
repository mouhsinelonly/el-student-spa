// @flow
import React from 'react'

const useYoutubeDetails = () => {
    const youtubeId = getYoutubeId(youtubeLink)
    const { body: details } = await request.get(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails,statistics&key=${API_KEY}`)
    const duration = moment(moment.duration(details.items[0].contentDetails.duration).asMilliseconds()).locale('en').format('mm:ss')
    setDuration(duration)
    const { body: snippet } = await request.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=${API_KEY}`)
    setTitle(snippet.items[0].snippet.title)
}

export default useYoutubeDetails