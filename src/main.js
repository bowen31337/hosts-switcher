import electron from 'electron'
import isDev from './utils/isDev'
import reloader from 'electron-reloader'
import globals from './utils/globals'
import createWindow from './utils/createWindow'
import createTray from './utils/createTray'
import {
	newFile,
	deleteFile,
	activateHost,
	deactivateHost,
} from './utils/files'

import { getDefaultHostFile } from './utils/hostFiles'

import { hasPermssionOnHosts, permissionNotice } from './utils/permission'

import { getLastHostName, setLastHostName } from './utils/restoreState'

import { getHostFiles } from './utils/hostFiles'

isDev &&
	reloader(module, {
		debug: true,
		ignore: [
			'./src',
			'./images',
			'./out',
			'yarn-error.log',
			'yarn.lock',
			'package.json',
			'*.md',
		],
	})

const { app, ipcMain: ipc, dialog } = electron

const createApp = () => {
	deactivateHost()
	if (!hasPermssionOnHosts()) {
		permissionNotice()
		app.quit()
	}
	createWindow(mainWindow => {
		globals.mainWindow = mainWindow
		createTray(mainWindow, tray => {
			globals.tray = tray
		})
	})
}

const renderHostsUI = event =>
	event.sender.send('sendHostsUI', {
		hosts: getHostFiles(),
		state: getLastHostName(),
	})

process.on('uncaughtException', function(err) {
	dialog.showErrorBox('Uncaught Exception: ' + err.message, err.stack || '')
	deactivateHost()
	app.quit()
})

// app.dock.hide()
app.on('ready', createApp)
// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	deactivateHost()

	if (process.platform !== 'darwin') {
		app.quit()
	}
})
app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (globals.mainWindow === null) {
		createApp()
	}
})

app.on('gpu-process-crashed', deactivateHost)

ipc.on('renderHostsUI', evt => renderHostsUI(evt))

ipc.on('quit', evt => {
	deactivateHost()
	app.quit()
})

ipc.on('start', (evt, host) => {
	const activate = activateHost(host)
	if (activate) {
		activate
			.then(() => setLastHostName(host))
			.then(() => evt.sender.send('hostActivated', host))
	}
})

ipc.on('pause', (evt, host) => {
	const deactive = deactivateHost()
	if (deactive) {
		deactive
			.then(() => setLastHostName(''))
			.then(() => evt.sender.send('hostDeactivated', host))
	}
})

ipc.on('saveFile', (evt, file) => {
	newFile(file)
	renderHostsUI(evt)
})

ipc.on('deleteFile', (evt, file) => {
	const code = dialog.showMessageBox({
		message: `Are you sure to delete this hosts : ${file}?`,
		buttons: ['Yes', 'No'],
	})
	if (code === 0) {
		deleteFile(file)
	}
	renderHostsUI(evt)
})
