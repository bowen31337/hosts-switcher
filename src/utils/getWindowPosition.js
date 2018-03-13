const getWindowPosition = (mainWindow, tray) => {
	const windowBounds = mainWindow.getBounds()
	const trayBounds = tray.getBounds()

	// Center window horizontally below the tray icon
	let x = Math.round(
		trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
	)

	// Position window 4 pixels vertically below the tray icon
	let y = Math.round(trayBounds.y + trayBounds.height + 4)

	if (process.platform === 'win32') {
		y = Math.round(-trayBounds.y - trayBounds.height + 4)
	}

	return { x: x, y: y }
}

export default getWindowPosition
