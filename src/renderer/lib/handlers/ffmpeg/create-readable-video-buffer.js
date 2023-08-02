const { Readable } = require('stream');

module.exports = function createReadableVideoBuffer () {
  const readableVideoBuffer = new Readable()
  
  // readableVideoBuffer.write(window.videoBuffer)
  // readableVideoBuffer.end()
  // readableVideoBuffer.destroy()
  readableVideoBuffer.push(window.videoBuffer)
  readableVideoBuffer.push(null);

  return readableVideoBuffer
}