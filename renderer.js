const {remote} = require("electron")
const {Menu} = remote

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    label: 'Window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

const menusElem = document.querySelector('.menus')

for (const menuInfo of template) {
  const elem = document.createElement('div')
  elem.className = 'menu'
  elem.innerText = menuInfo.label
  elem.addEventListener('click', () => {
    const rect = elem.getBoundingClientRect()
    const x = Math.round(rect.left)
    const y = Math.round(rect.bottom)
    const menu = Menu.buildFromTemplate(menuInfo.submenu)
    menu.popup(remote.getCurrentWindow(), {
      x, y,
      async: true,
    })
  })
  menusElem.appendChild(elem)
}
document.querySelector('.button-minimize').addEventListener('click', () => {
  remote.getCurrentWindow().minimize()
})
document.querySelector('.button-maximize').addEventListener('click', () => {
  const win = remote.getCurrentWindow()
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
})
document.querySelector('.button-close').addEventListener('click', () => {
  remote.getCurrentWindow().close()
})
