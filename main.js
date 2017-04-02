const {app, BrowserWindow} = require("electron")

let win = null

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
  })
  win.on("closed", () => {
    win = null
  })
  win.loadURL("file://" + __dirname + "/index.html")
  win.openDevTools()
})
