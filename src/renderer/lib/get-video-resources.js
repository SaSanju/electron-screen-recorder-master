const { invokeContextMenu, invokeDesktopCapture } = require('./events/ipc')

module.exports = async function getVideoSources() {
  // get the desktopCapturer.getSources from the main process
  const desktopCapturer = {
    getSources: (opts) =>
      invokeDesktopCapture(opts),
  };
  const inputSources =
    await desktopCapturer.getSources({
      types: ['screen', 'window']
    })

  invokeContextMenu(inputSources, 'input')
}