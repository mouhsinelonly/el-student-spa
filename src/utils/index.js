export const AppPublicPath = __PROD__ ? 'https://el-css.edu.om/admin/public/' : 'http://localhost/DARES/public/'

// export const APIBASE = __PROD__ ? 'https://el-css.edu.om:6600' : 'https://api.el-cdn.net'

// export const APIBASE = __PROD__ ? 'https://el-css.edu.om:6600' : 'https://el-css.edu.om:6600'

export function copyStringToClipboard (str) {
  // Create new element
  const el = document.createElement('textarea')
  // Set value (string to be copied)
  el.value = str
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '')
  el.style = { position: 'absolute', left: '-9999px', visibility: 'hidden' }
  document.body.appendChild(el)
  // Select text inside element
  el.select()
  // Copy text to clipboard
  document.execCommand('copy')
  // Remove temporary element
  document.body.removeChild(el)
}

export const APIBASE = process.env.APIBASE || (!__PROD__ ? 'https://api.el-css.edu.om' : 'http://192.168.1.178:3001')

export const LESSONS_SERVER = __PROD__ ? 'https://el-css2.com/downloadlessons/' : 'http://localhost:3009'

export const isEvent = (events: Array<Object>, slug: string = '', checkType: string = 'isFuture'): * => {
  const event = events.find((e: Object): boolean => e.category === slug)

  if (!event) return false

  return event[checkType] ? event : false
}

export function getBookPageImageUrl ({ bookId, pageNumber }) {
  return `https://el-css.com/cdn/bookspng/book_${bookId}_${pageNumber}.png`
}

export const CONSTANTS = {
  'AFFILIATE_CODE_LOCAL_STORAGE_KEY': 'affiliate_code',
  'AUTH_AFFILIATE_LOCAL_STORAGE_KEY': 'affiliatetoken'
}

export const version = 26

export const TILAWA_SUCCESS_GRADE = 15

export function uniqueArray (arr) {
  return arr.filter((elem, pos, arr) => arr.indexOf(elem) === pos)
}

export const SpecialtiesOptions = [
{ text: 'الماجستير', id: 1, key: 'maj' },
{ text: 'الدبلوم و البكالوريوس', id: 2, key: 'bac' }
]

export function scrollToPosition (x, y) {
  window.scrollTo(x, y)
}

const studentStates = {
  'active': 'طالب منتظم',
  'delayed': 'طالب مؤجل',
  'withdrawn': 'طالب منسحب',
  'discontinuous': 'طالب منقطع',
  'fired': 'طالب مفصول',
  'graduate': 'طالب متخرج',
  'hold': 'طالب معلق'
}

export const STATUS_STRINGS = {
  waiting: 'جاري المراجعة',
  accepted: 'تم قبوله',
  refused: 'تم الرفض'
}

export function getStudentStateString (state) {
  if (typeof studentStates[state] !== 'undefined') {
    return studentStates[state]
  }

  return 'غير محدد'
}

const LRUCache = require('lrucache')

export function inArray(invar = 0, target = []) {
  return target.findIndex(e => e === invar) >= 0
}

export function getPosition (el) {
  if (el === null) return
  var xPos = 0
  var yPos = 0

  xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
  yPos += (el.offsetTop - el.scrollTop + el.clientTop)

  return {
    x: xPos,
    y: yPos
  }
}

export function youtubeRegex () {
  var regex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g

  return regex
};

export function searchString (text = '', match = '') {
  return text.indexOf(match) !== -1
}

export function doesFileExist (urlToFile) {
  try {
    const xhr = new XMLHttpRequest()
    xhr.open('HEAD', urlToFile, false)
    xhr.send()
    console.log(xhr.status)
    if (xhr.status === '404') {
      return false
    } else {
      return true
    }
  } catch (e) {

  }
}

export const cache = LRUCache()

export function changeThemeColor (color = '#fff') {
  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  metaThemeColor.setAttribute('content', color)
}

export function getSelectedParagraphText () {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString()
  } else if (document.selection && document.selection.type !== 'Control') {
    text = document.selection.createRange().text
  }
  return text
}

const div = document.createElement('div')
div.innerHTML = '<!--[if lt IE 9]><i></i><![endif]-->'
export const isIeLessThan9 = div.getElementsByTagName('i').length === 1

export function URLToArray (url) {
  let request = {}
  let pairs = url.substring(url.indexOf('?') + 1).split('&')
  for (let i = 0; i < pairs.length; i++) {
    if (!pairs[i]) {
      continue
    }
    let pair = pairs[i].split('=')
    request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
  }
  return request
}

export function bytesToSize (bytes, precision) {
  let kilobyte = 1024
  let megabyte = kilobyte * 1024
  let gigabyte = megabyte * 1024
  let terabyte = gigabyte * 1024

  if (bytes >= 0 && bytes < kilobyte) {
    return bytes + ' بايت'
  } else if (bytes >= kilobyte && bytes < megabyte) {
    return (bytes / kilobyte).toFixed(precision) + ' كيلوبايت'
  } else if (bytes >= megabyte && bytes < gigabyte) {
    return (bytes / megabyte).toFixed(precision) + ' ميغابايت'
  } else if (bytes >= gigabyte && bytes < terabyte) {
    return (bytes / gigabyte).toFixed(precision) + ' جيغابايت'
  } else if (bytes >= terabyte) {
    return (bytes / terabyte).toFixed(precision) + ' تيرابايت'
  } else {
    return bytes + ' بايت'
  }
}

export function getPageVisibility () {
  let hidden, state, visibilityChange
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
    state = 'visibilityState'
  } else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden'
    visibilityChange = 'mozvisibilitychange'
    state = 'mozVisibilityState'
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
    state = 'msVisibilityState'
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden'
    visibilityChange = 'webkitvisibilitychange'
    state = 'webkitVisibilityState'
  }

  return { state, visibilityChange, hidden }
}

export function hasFlash (a, b) {
  try {
    const a = new ActiveXObject(a + b + '.' + a + b)
  } catch (e) {
    const a = navigator.plugins[a + ' ' + b]
  }
  return !!a
}
'Shockwave', 'Flash'

export const isIE = /* @cc_on!@ */ false || !!document.documentMode
export const isFirefox = typeof InstallTrigger !== 'undefined'

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function dataURItoBlob (dataURI) {
  if (!dataURI) return ''
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

export function toHHMMSS (s = 0) {
  const secNum = parseInt(s, 10)
  let hours = Math.floor(secNum / 3600)
  let minutes = Math.floor((secNum - hours * 3600) / 60)
  let seconds = secNum - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return hours + ':' + minutes + ':' + seconds
}

export function scrollToTop (scrollDuration) {
  // console.log('scrolling')
  let cosParameter = window.scrollY / 2
  let scrollCount = 0
  let oldTimestamp = performance.now()
  function step (newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
    if (scrollCount >= Math.PI) window.scrollTo(0, 0)
    if (window.scrollY === 0) return
    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))
    oldTimestamp = newTimestamp
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

export function subjectStateToString (state = '') {
  switch (state) {
    case 'success':
      return 'ناجح'
    case 'fail':
      return 'لم يجتز'
    case 'equal':
      return 'معادلة'
    case 'study':
      return 'تحت الدراسة'
    case 'coming':
      return 'قادم'
    case 'uncomplete':
      return 'غير مكتملة'
  }
}
/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {float} a random floating point number
 */
export function getRandom (min, max) {
  return Math.random() * (max - min) + min
}

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {int} a random integer
 */
export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const domOnlyProps = ({
  initialValue,
  autofill,
  onUpdate,
  valid,
  error,
  invalid,
  dirty,
  pristine,
  active,
  touched,
  visited,
  autofilled,
  ...domProps
}) => domProps

export function getYoutubeId (url = '') {
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}
export function parseJSON (response) {
  return response.json()
}

export function getDayString (index = 0) {
  switch (index) {
    case 0:
      return 'الأحد'
    case 1:
      return 'الإثنين'
    case 2:
      return 'الثلاثاء'
    case 3:
      return 'الأربعاء'
    case 4:
      return 'الخميس'
    case 5:
      return 'الجمعة'
    case 6:
      return 'السبت'
  }
}

const numberPositionsLocales = {
  ar: ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التساع', 'العاشر'],
  en: ['First', 'Second', 'Third', 'Fourth', 'Five', 'Fifth', 'Sixth', 'Eighth', 'Ninth', 'Tenth'],
  fr: ['Premier', 'Deuxième', 'Troisième', 'Quatrième', 'Cinquième', 'Sixième', 'Septième', 'Huitième',
    'neuvième', 'dixième']
}
export function arabicNumberToPosition (number = 1, locale = 'ar') {
  switch (number) {
    case 1:
      return numberPositionsLocales[locale][number - 1]
    case 2:
      return numberPositionsLocales[locale][number - 1]
    case 3:
      return numberPositionsLocales[locale][number - 1]
    case 4:
      return numberPositionsLocales[locale][number - 1]
    case 5:
      return numberPositionsLocales[locale][number - 1]
    case 6:
      return numberPositionsLocales[locale][number - 1]
    case 7:
      return numberPositionsLocales[locale][number - 1]
    case 8:
      return numberPositionsLocales[locale][number - 1]
    case 9:
      return numberPositionsLocales[locale][number - 1]
    case 10:
      return numberPositionsLocales[locale][number - 1]
  }
}

export function dayNumberToString (number = 0) {
  if (number === 1) {
    return 'يوم'
  } else if (number === 2) {
    return 'يومان'
  } else if (number < 11) {
    return `${number} أيام`
  } else if (number >= 11) {
    return `${number} يوم`
  }
}

export function answerNumberToStringWithout (number = 0) {
  if (number <= 1) {
    return 'إجابة'
  } else if (number === 2) {
    return 'إجابتان'
  } else if (number < 11) {
    return `إجابات`
  } else if (number >= 11) {
    return `إجابة`
  }
}

export function participantNumberToStringWithout (number = 0) {
  if (number <= 1) {
    return 'مشارك'
  } else if (number === 2) {
    return 'مشاركان'
  } else if (number < 11) {
    return `مشاركين`
  } else if (number >= 11) {
    return `مشارك`
  }
}

export function teacherNumberToString (number = 0) {
  if (number <= 1) {
    return 'محاضر واحد'
  } else if (number === 2) {
    return 'محاضرين اثنين'
  } else if (number < 11) {
    return `${number} محاضرين`
  } else if (number >= 11) {
    return `${number} محاضر`
  }
}
export function noteNumberToString (number = 0) {
  if (number <= 1) {
    return 'ملاحظة واحدة'
  } else if (number === 2) {
    return 'ملاحظتين'
  } else if (number < 11) {
    return `${number} ملاحظات`
  } else if (number >= 11) {
    return `${number} ملاحظة`
  }
}

export function timesNumberToString (number = 0) {
  if (number === 1) {
    return 'مرة واحدة'
  } else if (number === 2) {
    return 'مرتين'
  } else if (number < 11) {
    return `${number} مرات`
  } else if (number >= 11) {
    return `${number} مرة`
  }
}

export function lessonNumberToString (number = 0) {
  if (number === 1) {
    return 'درس واحد'
  } else if (number === 2) {
    return 'درسان'
  } else if (number < 11) {
    return `${number} دروس`
  } else if (number >= 11) {
    return `${number} درسًا`
  }
}

export function sessionNumberToString (number = 0) {
  if (number <= 1) {
    return `${number} لقاء مباشر`
  } else if (number === 2) {
    return 'لقاءان مباشران'
  } else if (number < 11) {
    return `${number} لقاءات مباشرة`
  } else if (number >= 11) {
    return `${number} لقاء مباشر`
  }
}

export function theSessionNumberToString (number = 0) {
  return `اللقاء المباشر ${numberPositionsLocales['ar'][number - 1]}`
}

export function monthNumberToString (number = 0) {
  if (number === 1) {
    return 'شهر'
  } else if (number < 3) {
    return 'شهران'
  } else if (number > 10) {
    return `${number} شهر`
  } else if (number < 11) {
    return `${number} شهور`
  }
}

export function resultNumberToString (number = 0) {
  if (number === 1) {
    return 'نتيجة واحدة'
  } else if (number === 2) {
    return 'نتيجتان'
  } else if (number > 10) {
    return `${number} نتيجة`
  } else if (number < 11 && number > 0) {
    return `${number} نتائج`
  } else {
    return 'لا يوجد أي نتائج'
  }
}

export function hourNumberToString (number = 0) {
  if (number === 1) {
    return 'ساعة'
  } else if (number === 2) {
    return 'ساعتان'
  } else if (number < 11) {
    return `${number} ساعات`
  } else {
    return `${number} ساعة`
  }
}
export function degreeNumberToString (number = 0) {
  if (number < 1) {
    return `${number} درجة`
  } else if (number === 1) {
    return `درجة واحدة`
  } else if (number === 2) {
    return `درجتان`
  } else if (number < 11) {
    return `${number} درجات`
  } else if (number > 10) {
    return `${number} درجة`
  }
}
export function likeNumberToString (number = 0) {
  if (number <= 1 || number > 10) {
    return 'إعجاب'
  } else if (number < 3) {
    return 'إعجابين'
  } else if (number < 11) {
    return 'إعجابات'
  }
}
export function minuteNumberToString (number = 0) {
  if (+number <= 1 || +number > 10) {
    return `${number} دقيقة`
  } else if (+number === 2) {
    return `دقيقتان`
  } else if (+number < 11) {
    return `${number} دقائق`
  }
}
export function subjectNumberToString (number = 0) {
  if (number <= 1) {
    return 'مادة'
  } else if (number < 3) {
    return 'مادتين'
  } else if (number < 11) {
    return `${number} مواد`
  } else if (number > 10) {
    return `${number} مادة`
  }
}
export function secondNumberToString (number = 0) {
  if (number <= 1 || number > 10) {
    return 'ثانية'
  } else if (number < 3) {
    return 'ثانيتان'
  } else if (number < 11) {
    return 'ثواني'
  }
}
export function triesNumberToString (number = 0) {
  if (number === 1) {
    return 'محاولة واحدة'
  } else if (number === 2) {
    return 'محاولتان'
  } else if (number < 11 && number > 2) {
    return `${number} محاولات`
  } else {
    return `${number} محاولة`
  }
}

export const defaultColors = [
  'rgb(  0,   0,   0)',
  'rgb(230,   0,   0)',
  'rgb(255, 153,   0)',
  'rgb(255, 255,   0)',
  'rgb(  0, 138,   0)',
  'rgb(  0, 102, 204)',
  'rgb(153,  51, 255)',
  'rgb(255, 255, 255)',
  'rgb(250, 204, 204)',
  'rgb(255, 235, 204)',
  'rgb(255, 255, 204)',
  'rgb(204, 232, 204)',
  'rgb(204, 224, 245)',
  'rgb(235, 214, 255)',
  'rgb(187, 187, 187)',
  'rgb(240, 102, 102)',
  'rgb(255, 194, 102)',
  'rgb(255, 255, 102)',
  'rgb(102, 185, 102)',
  'rgb(102, 163, 224)',
  'rgb(194, 133, 255)',
  'rgb(136, 136, 136)',
  'rgb(161,   0,   0)',
  'rgb(178, 107,   0)',
  'rgb(178, 178,   0)',
  'rgb(  0,  97,   0)',
  'rgb(  0,  71, 178)',
  'rgb(107,  36, 178)',
  'rgb( 68,  68,  68)',
  'rgb( 92,   0,   0)',
  'rgb(102,  61,   0)',
  'rgb(102, 102,   0)',
  'rgb(  0,  55,   0)',
  'rgb(  0,  41, 102)',
  'rgb( 61,  20,  10)'
].map(function (color) {
  return { value: color }
})
export const defaultItems = {
  formats: [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ],
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      [{ direction: 'rtl' }], // text direction
      ['clean']
    ]
  }
}

export const hdfvrFlashVars = {
  userId: 0,
  qualityurl: 'audio_video_quality_profiles/320x240x30x90.xml',
  recorderId: '123',
  sscode: 'php',
  lstext: 'جاري التحميل...',
  mrt: '120',
  authenticity_token: ''
}
export const hdfvrParams = {
  base: AppPublicPath + 'assets/hdfvr/',
  quality: 'high',
  bgcolor: '#dfdfdf',
  play: 'true',
  scale: 'exactFit',
  loop: 'false',
  allowscriptaccess: 'sameDomain',
  wmode: 'transparent'
}

export const hdfvrAttributes = {
  name: 'VideoRecorder',
  id: 'VideoRecorder',
  align: 'middle'
}

export function padZero (string = '', pad = '00') {
  string = '' + string
  return pad.substring(0, pad.length - string.length) + string
}

export function isMobile () {
  let mobile = false
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    mobile = true
  }

  return mobile
}

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function unserialize (data) {
  var $global = typeof window !== 'undefined' ? window : global
  try {
    const notesArray = JSON.parse(data)
    return notesArray
  } catch (e) {}
  var utf8Overhead = function (str) {
    var s = str.length
    for (var i = str.length - 1; i >= 0; i--) {
      var code = str.charCodeAt(i)
      if (code > 0x7f && code <= 0x7ff) {
        s++
      } else if (code > 0x7ff && code <= 0xffff) {
        s += 2
      }
      // trail surrogate
      if (code >= 0xdc00 && code <= 0xdfff) {
        i--
      }
    }
    return s - 1
  }
  var error = function (type, msg, filename, line) {
    throw new $global[type](msg, filename, line)
  }
  var readUntil = function (data, offset, stopchr) {
    var i = 2
    var buf = []
    var chr = data.slice(offset, offset + 1)

    while (chr !== stopchr) {
      if (i + offset > data.length) {
        error('Error', 'Invalid')
      }
      buf.push(chr)
      chr = data.slice(offset + (i - 1), offset + i)
      i += 1
    }
    return [buf.length, buf.join('')]
  }
  var readChrs = function (data, offset, length) {
    var i, chr, buf

    buf = []
    for (i = 0; i < length; i++) {
      chr = data.slice(offset + (i - 1), offset + i)
      buf.push(chr)
      length -= utf8Overhead(chr)
    }
    return [buf.length, buf.join('')]
  }
  function _unserialize (data, offset) {
    var dtype
    var dataoffset
    var keyandchrs
    var keys
    var contig
    var length
    var array
    var readdata
    var readData
    var ccount
    var stringlength
    var i
    var key
    var kprops
    var kchrs
    var vprops
    var vchrs
    var value
    var chrs = 0
    var typeconvert = function (x) {
      return x
    }

    if (!offset) {
      offset = 0
    }
    dtype = data.slice(offset, offset + 1).toLowerCase()

    dataoffset = offset + 2

    switch (dtype) {
      case 'i':
        typeconvert = function (x) {
          return parseInt(x, 10)
        }
        readData = readUntil(data, dataoffset, ';')
        chrs = readData[0]
        readdata = readData[1]
        dataoffset += chrs + 1
        break
      case 'b':
        typeconvert = function (x) {
          return parseInt(x, 10) !== 0
        }
        readData = readUntil(data, dataoffset, ';')
        chrs = readData[0]
        readdata = readData[1]
        dataoffset += chrs + 1
        break
      case 'd':
        typeconvert = function (x) {
          return parseFloat(x)
        }
        readData = readUntil(data, dataoffset, ';')
        chrs = readData[0]
        readdata = readData[1]
        dataoffset += chrs + 1
        break
      case 'n':
        readdata = null
        break
      case 's':
        ccount = readUntil(data, dataoffset, ':')
        chrs = ccount[0]
        stringlength = ccount[1]
        dataoffset += chrs + 2

        readData = readChrs(data, dataoffset + 1, parseInt(stringlength, 10))
        chrs = readData[0]
        readdata = readData[1]
        dataoffset += chrs + 2
        if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
          error('SyntaxError', 'String length mismatch')
        }
        break
      case 'a':
        readdata = {}

        keyandchrs = readUntil(data, dataoffset, ':')
        chrs = keyandchrs[0]
        keys = keyandchrs[1]
        dataoffset += chrs + 2

        length = parseInt(keys, 10)
        contig = true

        for (i = 0; i < length; i++) {
          kprops = _unserialize(data, dataoffset)
          kchrs = kprops[1]
          key = kprops[2]
          dataoffset += kchrs

          vprops = _unserialize(data, dataoffset)
          vchrs = vprops[1]
          value = vprops[2]
          dataoffset += vchrs

          if (key !== i) {
            contig = false
          }

          readdata[key] = value
        }

        if (contig) {
          array = new Array(length)
          for (i = 0; i < length; i++) {
            array[i] = readdata[i]
          }
          readdata = array
        }

        dataoffset += 1
        break
      default:
        error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype)
        break
    }
    return [dtype, dataoffset - offset, typeconvert(readdata)]
  }
  try {
    return _unserialize(data + '', 0)[2]
  } catch (err) {
    return []
  }
}
