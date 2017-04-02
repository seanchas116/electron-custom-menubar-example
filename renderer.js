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
const menuElems = []

let hasCurrentMenu = false
let currentMenuIndex = 0
let currentMenu

const updateMenuStyle = () => {
  for (const [i, elem] of menuElems.entries()) {
    if (hasCurrentMenu && i == currentMenuIndex) {
      elem.className = 'menu menu-current'
    } else {
      elem.className = 'menu'
    }
  }
}

const showMenu = (index, x, y) => {
  if (currentMenu) {
    currentMenu.closePopup()
    currentMenu = undefined
  }
  const menu = Menu.buildFromTemplate(template[index].submenu)
  menu.popup(remote.getCurrentWindow(), {
    x, y,
    async: true,
    forDrop: true,
  })
  hasCurrentMenu = true
  currentMenuIndex = index
  currentMenu = menu
  updateMenuStyle()
}

const closeMenu = () => {
  if (currentMenu) {
    currentMenu.closePopup()
    currentMenu = undefined
  }
  hasCurrentMenu = false
  updateMenuStyle()
}

for (const [i, menuInfo] of template.entries()) {
  const elem = document.createElement('div')
  elem.className = 'menu'
  elem.innerText = menuInfo.label
  const show = () => {
    const rect = elem.getBoundingClientRect()
    const x = Math.round(rect.left)
    const y = Math.round(rect.bottom)
    showMenu(i, x, y)
  }
  elem.addEventListener('click', e => {
    if (hasCurrentMenu) {
      closeMenu()
    } else {
      show()
    }
    e.stopPropagation()
  })
  elem.addEventListener('mouseenter', () => {
    if (hasCurrentMenu && i != currentMenuIndex) {
      show()
    }
  })
  menusElem.appendChild(elem)
  menuElems.push(elem)
}
window.addEventListener('click', closeMenu)

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
