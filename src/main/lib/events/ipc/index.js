const { ipcMain, Menu, desktopCapturer, dialog } = require('electron')

ipcMain.handle('context-menu', async (event, sources) => {
  const source = JSON.parse(sources)

  const contextMenu =
    Menu.buildFromTemplate(
      source.data.map(item => ({
        label: item.name,
        click: () =>
          source.type === 'input'
            ? event.sender.send('select-source', item)
            : event.sender.send('select-output', item)
      }))
    )
  contextMenu.popup()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle("DESKTOP_CAPTURER_GET_SOURCES", (_event, opts) =>
  desktopCapturer.getSources(opts)
)

ipcMain.handle('dialog', (_event, method, params) => {       
  return dialog[method](params);
});