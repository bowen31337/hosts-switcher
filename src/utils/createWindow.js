import electron from 'electron'
import assetsPath from './assetsPath'
import path from 'path'
import url from 'url'

import { deactivateHost } from './files'

const { BrowserWindow } = electron

const createWindow = (cb = () => {}) => {
	// Create the browser window.
	const windIcon =
		process.platform == 'win32'
			? path.join(assetsPath, 'h.ico')
			: process.platform == 'darwin'
				? path.join(assetsPath, 'png', '32x32.png')
				: path.join(assetsPath, 'png', '32x32.png')
	let mainWindow = new BrowserWindow({
		width: 300,
		height: 500,
		icon: windIcon,
		show: false,
		frame: false,
		fullscreenable: false,
		resizable: false,
		transparent: false,
		webPreferences: {
			// Prevents renderer process code from not running when window is
			// hidden
			backgroundThrottling: false,
		},
	})
	// and load the index.html of the app.
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true,
		})
	)
	mainWindow.on('blur', () => {
		if (!mainWindow.webContents.isDevToolsOpened()) {
			mainWindow.hide()
		}
	})

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		deactivateHost()

		mainWindow = null
	})

	cb(mainWindow)
}

export default createWindow
