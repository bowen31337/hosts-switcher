import getWindowPosition from './getWindowPosition'

const showWindow = (mainWindow, tray) => {
	const position = getWindowPosition(mainWindow, tray)
	mainWindow.setPosition(position.x, position.y, false)
	mainWindow.show()
	mainWindow.focus()
}

export default showWindow
