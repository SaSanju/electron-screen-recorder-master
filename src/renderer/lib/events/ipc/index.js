const { ipcRenderer } = require('electron')
const selectSource = require('../../select-source')
const selectOutput = require('../../select-output')

ipcRenderer.on('select-source', (_event, source) =>
  selectSource(source)
)

ipcRenderer.on('select-output', (_event, source) =>
  selectOutput(source)
)

exports.invokeContextMenu = (data, type) => {
  ipcRenderer.invoke('context-menu', JSON.stringify({ data, type }))
}

exports.invokeDesktopCapture = (data) => {
  return ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', data)
}
