const { ipcRenderer } = require('electron')
const { createVideoFile } = require('./handlers')

async function exportVideo(ext) {
  const { filePath } =
    await ipcRenderer.invoke('dialog', 'showSaveDialog', {
      buttonLabel: 'Save video',
      defaultPath: `vid-${Date.now()}.${ext}`
    })

  if (filePath)
    await createVideoFile(filePath)
}

module.exports = async function selectSource({ id }) {
  await exportVideo(id)
}