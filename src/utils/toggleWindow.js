import electron from 'electron'
import showWindow from './showWindow'

const toggleWindow = (mainWindow, tray) => {
	if (mainWindow.isVisible()) {
		mainWindow.hide()
	} else {
		showWindow(mainWindow, tray)
	}
}
export default toggleWindow
