'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var electron = require('electron');
var electron__default = _interopDefault(electron);
var fs = _interopDefault(require('fs-extra'));
var os = _interopDefault(require('os'));
require('child_process');
var url = _interopDefault(require('url'));
var reloader = _interopDefault(require('electron-reloader'));

const isDev =
	process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath);

const globalObj = { mainWindow: undefined, tray: undefined };

const assetsPath = path.join(__dirname, 'images');

const { app } = electron__default;

const userDataPath = path.join(app.getPath('userData'), 'data');
console.log(userDataPath);

const hostfilesPath = path.join(userDataPath, 'hostFiles');

const getHostFiles = () => {
	fs.ensureDirSync(hostfilesPath);

	const hostFiles = fs.readdirSync(hostfilesPath);
	const hostFilesMap = hostFiles
		.filter(file => !file.includes('bak'))
		.map(file => ({
			name: file,
			path: path.join(hostfilesPath, file),
		}));

	return hostFilesMap
};

const getDefaultHostFile = () => [
	{
		name: 'defaultHosts',
		path:
			process.platform === 'win32'
				? 'C:/Windows/System32/drivers/etc/hosts'
				: '/etc/hosts',
	},
];

const OriHostsPath = getDefaultHostFile()[0].path;
const bakHostPath = path.join(hostfilesPath, 'hosts.bak.txt');

const newFile = file => fs.ensureFileSync(path.join(hostfilesPath, file));
const deleteFile = file => fs.removeSync(path.join(hostfilesPath, file));

const stat = fs.statSync(OriHostsPath);

const activateHost = file => {
	if(globalObj.tray) globalObj.tray.setTitle(file);

	const backup = backupOrigHosts();
	if (backup) {
		return backup
			.then(() => setNewHosts(getHostPathByName(file)))
			.catch(err => {
				console.error(err);
			})
	}

	return
};

const deactivateHost = () => {
	if(globalObj.tray) globalObj.tray.setTitle('default');
	const restore = restoreOrigHosts();
	if (restore) {
		return restore.then(() => fs.remove(bakHostPath)).catch(err => {
			console.error(err);
		})
	}

	return
};
// const setNewHosts = file => fs.copySync(getHostPathByName(file),OriHostsPath)
const setNewHosts = file => {
	const readString = read(file);
	return readString ? write(OriHostsPath, readString) : false
};

// const backupOrigHosts = () => fs.copy(OriHostsPath,bakHostPath)
const backupOrigHosts = () => {
	const readString = read(OriHostsPath);

	return readString ? write(bakHostPath, readString) : false
};
const restoreOrigHosts = () => {
	const readString = read(bakHostPath);
	return readString ? write(OriHostsPath, readString) : false
};

const read = from => (isFile(from) ? fs.readFileSync(from, 'utf-8') : false);

const write = (to, str) => {
	// var code = dialog.showMessageBox({
	//      message: 'Invalid configuration file\nCould not parse JSON',
	//      detail: e.stack,
	//      buttons: ['Reload Config', 'Exit app']
	//    })
	//    if (code === 0) {
	//      return loadConfig()
	//    } else {
	//      menu.app.quit()
	//      return
	//  }
	return fs.writeFile(to, str, { mode: stat.mode })
};

const isFile = filePath => {
	try {
		return fs.statSync(filePath).isFile()
	} catch (err) {
		return false
	}
};

const getHostPathByName = file => path.join(hostfilesPath, file);

const trimFileString = string => string.replace(/\s*$/, '');

const { BrowserWindow } = electron__default;

const createWindow = (cb = () => {}) => {
	// Create the browser window.
	const windIcon =
		process.platform == 'win32'
			? path.join(assetsPath, 'h.ico')
			: process.platform == 'darwin'
				? path.join(assetsPath, 'png', '32x32.png')
				: path.join(assetsPath, 'png', '32x32.png');
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
	});
	// and load the index.html of the app.
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true,
		})
	);
	mainWindow.on('blur', () => {
		if (!mainWindow.webContents.isDevToolsOpened()) {
			mainWindow.hide();
		}
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		deactivateHost();

		mainWindow = null;
	});

	cb(mainWindow);
};

const getWindowPosition = (mainWindow, tray) => {
	const windowBounds = mainWindow.getBounds();
	const trayBounds = tray.getBounds();

	// Center window horizontally below the tray icon
	const x = Math.round(
		trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
	);

	// Position window 4 pixels vertically below the tray icon
	const y = Math.round(trayBounds.y + trayBounds.height + 4);

	return { x: x, y: y }
};

const showWindow = (mainWindow, tray) => {
	const position = getWindowPosition(mainWindow, tray);
	mainWindow.setPosition(position.x, position.y, false);
	mainWindow.show();
	mainWindow.focus();
};

const toggleWindow = (mainWindow, tray) => {
	if (mainWindow.isVisible()) {
		mainWindow.hide();
	} else {
		showWindow(mainWindow, tray);
	}
};

const { Tray } = electron__default;

const createTray = (mainWindow, cb = () => {}) => {
	let trayIconPath = path.join(assetsPath, 'png', '16x16.png');
	if (process.platform === 'win32') {
		trayIconPath = path.join(assetsPath, 'h.ico');
	}
	let tray = new Tray(trayIconPath);

	// tray.setToolTip('switch your hosts entry files')
	tray.on('right-click', () => toggleWindow(mainWindow, tray));
	tray.on('double-click', () => toggleWindow(mainWindow, tray));
	tray.on('click', function(event) {
		toggleWindow(mainWindow, tray);
		// Show devtools when command clicked
		if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
			mainWindow.openDevTools({ mode: 'detach' });
		}
	});
	tray.setTitle('default');
	// showWindow(mainWindow, tray)

	cb(tray);
};

const OriHostsPath$1 = getDefaultHostFile()[0].path;

const stat$1 = fs.statSync(OriHostsPath$1);

const { uid, gid } = os.userInfo();

const permissionNotice = () => {
	const solution =
		process.platform === 'win32'
			? `Navigate to ${OriHostsPath$1}.\r\n
		Locate hosts file, right click it and choose Properties.\r\n
		Navigate to the Security tab and click Edit button.\r\n
		You should see the list of users and groups on your PC that have access to hosts file. If your user name or group is on the list, click it and make sure that it has Permissions set to Full control. If your user name isn’t on the list, click the Add button. \r\n
		Enter the user name or the group name in the Enter the object names to select field and click Check Names and OK\r\n
		New user or group will be added to the list. Now you need to select the newly added group or user and check the Full control option below.\r\n
		Click Apply and OK to save changes.`
			: `sudo chown ${process.env.USER} ${OriHostsPath$1}`;
	electron.dialog.showErrorBox(
		`Hi, ${
			process.env.USER
		}\n\rPlease gain write permission to your hosts file "${OriHostsPath$1}". Please follow the instructions bellow`,
		`${solution}`
	);
};

const hasPermssionOnHosts = () => stat$1.uid === uid || stat$1.gid === gid;

const lastStateConfFile = path.join(userDataPath, 'lastState.conf');

const getLastHostName = () => {
	fs.ensureFileSync(lastStateConfFile);
	return trimFileString(read(lastStateConfFile))
};

const setLastHostName = hostName => write(lastStateConfFile, hostName);

isDev && reloader(module, { debug: true,ignore:['./src','./images','./out','yarn-error.log',
     'yarn.lock','package.json','*.md']});

const { app: app$1, ipcMain: ipc, dialog } = electron__default;

const createApp = () => {
	deactivateHost();
	if (!hasPermssionOnHosts()) {
		permissionNotice();
		app$1.quit();
	}
	createWindow(mainWindow => {
		globalObj.mainWindow = mainWindow;
		createTray(mainWindow, tray => {
			globalObj.tray = tray;
		});
	});
};

const renderHostsUI = event =>
	event.sender.send('sendHostsUI', {
		hosts: getHostFiles(),
		state: getLastHostName(),
	});

process.on('uncaughtException', function(err) {
	dialog.showErrorBox('Uncaught Exception: ' + err.message, err.stack || '');
	deactivateHost();
	app$1.quit();
});

// app.dock.hide()
app$1.on('ready', createApp);
// Quit when all windows are closed.
app$1.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	deactivateHost();

	if (process.platform !== 'darwin') {
		app$1.quit();
	}
});
app$1.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (globalObj.mainWindow === null) {
		createApp();
	}
});

app$1.on('gpu-process-crashed', deactivateHost);

ipc.on('renderHostsUI', evt => renderHostsUI(evt));

ipc.on('quit', evt => {
	deactivateHost();
	app$1.quit();
});

ipc.on('start', (evt, host) => {
	const activate = activateHost(host);
	if (activate) {
		activate
			.then(() => setLastHostName(host))
			.then(() => evt.sender.send('hostActivated', host));
	}
});

ipc.on('pause', (evt, host) => {
	const deactive = deactivateHost();
	if (deactive) {
		deactive
			.then(() => setLastHostName(''))
			.then(() => evt.sender.send('hostDeactivated', host));
	}
});

ipc.on('saveFile', (evt, file) => {
	newFile(file);
	renderHostsUI(evt);
});

ipc.on('deleteFile', (evt, file) => {
	const code = dialog.showMessageBox({
		message: `Are you sure to delete this hosts : ${file}?`,
		buttons: ['Yes', 'No'],
	});
	if (code === 0) {
		deleteFile(file);
	}
	renderHostsUI(evt);
});
