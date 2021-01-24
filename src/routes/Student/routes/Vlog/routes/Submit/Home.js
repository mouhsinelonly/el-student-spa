// @flow
import * as React from 'react'
import './style.scss'
import Trophy from 'components/Svg/Trophy'
import Youtube from 'components/Svg/Youtube'
import { Link } from 'react-router'
import request from 'superagent'
import moment from 'moment'
import { getYoutubeId } from 'utils'
const API_KEY = 'AIzaSyA04eUTmTP3skSMcRXWeXlBNI0luJ2146c'
type PropsType = {
  storeVlog: Function,
  period: Object,
  loading: boolean
};

const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i

const Home = ({ period, storeVlog, loading }: PropsType): Array<React.Element<'div'>> => {
  const textInput = React.createRef()
  const [ link, setLink ] = React.useState('')
  const [ title, setTitle ] = React.useState('')
  const [ duration, setDuration ] = React.useState('')
  const [ videoId, setVideoId ] = React.useState('')

  const getDetails = async (youtubeLink: string) => {
    const youtubeId = getYoutubeId(youtubeLink)
    const { body: details } = await request.get(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails,statistics&key=${API_KEY}`)
    const duration = moment(moment.duration(details.items[0].contentDetails.duration).asMilliseconds()).locale('en').format('mm:ss')
    setDuration(duration)
    const { body: snippet } = await request.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=${API_KEY}`)
    setTitle(snippet.items[0].snippet.title)
  }

  const hasVlog = period !== null && typeof period !== 'undefined' &&
  typeof period.id !== 'undefined' && period.vlog !== null

  return [<div className='c-vlog-Submit' key='home'>
    <div className='container c-vlog-Submit__content'>
      <div className='row p-t-3'>
        <div className='col-xs-12 col-md-8 col-md-pull-2 p-t-3 text-xs-center'>
          <Trophy width={90} height={90} />
          <h1 className='c-vlog-Submit__title p-y-2'>المشاركة في المسابقة</h1>
          <Youtube className='c-vlog-Submit__yt-logo' />
          <input type='text' placeholder='أدخل رابط الفيديو هنا'
            ref={textInput}
            onChange={(e: Object) => {
              setLink(e.target.value)
              if (e.target.value.match(youtubeRegex)) {
                setVideoId(getYoutubeId(e.target.value))
                getDetails(e.target.value)
              }
            }}
            className='form-control c-vlog-Submit__yt' />
        </div>
        <div className='clearfix p-y-3' />
        <div className='col-xs-12 col-md-4 col-md-pull-2 text-xs-center'>
          { !videoId ? <div className='c-vlog-Submit__yt-box' />
          : <img src={`//img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            className='img-fluid c-vlog-Submit__yt-thumb' /> }
        </div>
        <div className='col-xs-12 col-md-4 col-md-pull-2'>
          <h5 className='m-t-2'>{title || <div className='c-vlog-Submit__yt-holder' /> }</h5>
          <div className='m-t-1'>{duration || <div className='c-vlog-Submit__yt-holder is-small' /> }</div>
        </div>
      </div>
    </div>
  </div>,
    <div className='c-vlog-Submit__action text-xs-center' key='action'>
      <Link to='/student/vlog/edit' className={`btn btn-lg p-x-3 btn-purple-outline m-l-2 c-vlog-Submit__btn-outline c-vlog-Submit__btn ${!hasVlog ? 'hidden-xs-up' : ''}`} >
          تراجع عن التغيير
      </Link>
      <button className={`btn btn-lg p-x-3 btn-purple c-vlog-Submit__btn
        ${!hasVlog ? 'is-block' : ''}`}
        disabled={!link.match(youtubeRegex) || loading}
        onClick={(): Function => storeVlog({ link })} >
        {hasVlog ? 'اعتماد التغيير' : 'اعتماد مشاركتك'}
      </button>
    </div>]
}

export default Home
