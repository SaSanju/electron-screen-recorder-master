const { handleDataAvailable, handleStop } = require('./handlers')

const videoSelectBtn = document.getElementById('videoSelectBtn')
const videoElement = document.querySelector('video')

module.exports = async function selectSource(source) {
  const startBtn = document.getElementById('startBtn')

  videoSelectBtn.textContent = source.name

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id
      }
    }
  }

  const videostream = await navigator.mediaDevices.getUserMedia(constraints);

  const devices = await navigator.mediaDevices.enumerateDevices();
  const audioInputDevices = devices.filter((device) => device.kind === 'audioinput');

  let stream;
  if (audioInputDevices && audioInputDevices.length > 0) {
    const audiostream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    [videoTrack] = videostream.getVideoTracks();
    [audioTrack] = audiostream.getAudioTracks();

    //combining them into one stream
    stream = new MediaStream([audioTrack, videoTrack]);

  } else {
    stream = videostream;
  }

  videoElement.srcObject = stream
  videoElement.play()
  videoElement.muted = true;
  startBtn.removeAttribute('disabled')

  const options = { mimeType: 'video/webm;codecs=vp9' }

  window.mediaRecorder = new MediaRecorder(stream, options)
  window.mediaRecorder.ondataavailable = handleDataAvailable
  window.mediaRecorder.onstop = handleStop
}