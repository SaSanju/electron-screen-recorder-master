const { start, end } = require('../../events/export')
const loadFfmpeg = require('./load-ffmpeg')
const createReadableVideoBuffer = require('./create-readable-video-buffer')

exports.createVideoFile = async function (filePath) {
  const ffmpeg = loadFfmpeg()
  const readableVideoBuffer = createReadableVideoBuffer()

  if(window.withOutAudio) {
    await ffmpeg
    .input(readableVideoBuffer)
    .output(filePath)
    .withNoAudio()
    .on('start', start)
    .on('end', end)
    .run()   
  } else {
    await ffmpeg
    .input(readableVideoBuffer)
    .output(filePath)
    .on('start', start)
    .on('end', end)
    .run()  
  }  
}