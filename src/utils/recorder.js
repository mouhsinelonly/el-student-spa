// var selfEasyrtcid = "";
let recordedBlob
let easyrtcRecorded = 0
let easyrtcInterval
const easyrtcMaxSeconds = 5
// var request = new superagent();
export function connect () {
  if (!easyrtc.supportsRecording()) {
    window.alert('This browser does not support recording. Try chrome or firefox.')
    return
  }

  if (easyrtc.isRecordingTypeSupported('h264')) {
    easyrtc.setRecordingVideoCodec('h264')
  } else if (easyrtc.isRecordingTypeSupported('vp9')) {
    easyrtc.setRecordingVideoCodec('vp9')
  } else if (easyrtc.isRecordingTypeSupported('vp8')) {
    easyrtc.setRecordingVideoCodec('vp8')
  }
  easyrtc.setVideoDims(640, 480)
  easyrtc.setSocketUrl('https://el-css.edu.om:6001')
  easyrtc.easyApp('easyrtc.audioVideo', 'selfVideo', [], onSuccess, loginFailure)
  // console.log(easyrtc.getLocalStream())
}

function onSuccess (easyrtcid) {
  // selfEasyrtcid = easyrtcid;
  // document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
  // document.getElementById("startRecording").disabled = false;
}

function loginFailure (errorCode, message) {
  console.log('login failure')
  easyrtc.showError(errorCode, message)
}

var selfRecorder = null

function startRecording () {
  document.getElementById('startRecording').disabled = true
  document.getElementById('startRecording').style.display = 'none'
  document.getElementById('stopRecording').style.display = 'inline-block'
  document.getElementById('stopRecording').disabled = false
  easyrtcInterval = setInterval(function () {
    easyrtcRecorded++
    var progress = easyrtcRecorded / easyrtcMaxSeconds * 100
    document.getElementById('easyrtcProgressSeek').style.width = progress + '%'
    if (easyrtcRecorded >= easyrtcMaxSeconds) {
      endRecording()
    }
    // console.log(easyrtcRecorded)
  }, 1000)
  selfRecorder = easyrtc.recordToBlob(easyrtc.getLocalStream(), giveMeThatBlob)
}

function giveMeThatBlob (blob) {
  recordedBlob = blob
  document.getElementById('easyrtcRecorded').src = window.URL.createObjectURL(blob)
  // console.log(blob)
  superagent
    .post('http://localhost:8089/upload')
    .field('id', 10001)
    .field('subject_id', 26)
    .attach('stream_name', recordedBlob)
    .on('progress', function (event) {
      console.log(event.percent)
    })
    .end(function (err, res) {
      console.log(err, res)
    })
}
function endRecording () {
  if (selfRecorder) {
    selfRecorder.stop()
  }
  if (easyrtcInterval) {
    clearInterval(easyrtcInterval)
  }
  document.getElementById('easyrtcRecorder').style.display = 'none'
  document.getElementById('easyrtcRecorded').style.display = 'inline-block'
  document.getElementById('stopRecording').style.display = 'none'
  document.getElementById('startRecording').style.display = 'inline-block'

  document.getElementById('startRecording').disabled = false
  document.getElementById('stopRecording').disabled = true
}
