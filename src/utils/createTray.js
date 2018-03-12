import electron from 'electron'
import assetsPath from './assetsPath'
import toggleWindow from './toggleWindow'
import showWindow from './showWindow'
import path from 'path'

const { Tray } = electron

const createTray = (mainWindow, cb = () => {}) => {
	let trayIconPath = path.join(assetsPath, 'png', '16x16.png')
	if (process.platform === 'win32') {
		trayIconPath = path.join(assetsPath, 'h.ico')
	}
	let tray = new Tray(trayIconPath)

	// tray.setToolTip('switch your hosts entry files')
	tray.on('right-click', () => toggleWindow(mainWindow, tray))
	tray.on('double-click', () => toggleWindow(mainWindow, tray))
	tray.on('click', function(event) {
		toggleWindow(mainWindow, tray)
		// Show devtools when command clicked
		if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
			mainWindow.openDevTools({ mode: 'detach' })
		}
	})
	tray.setTitle('default')
	// showWindow(mainWindow, tray)

	cb(tray)
}

export default createTray
