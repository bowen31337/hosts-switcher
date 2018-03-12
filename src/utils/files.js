import fs from 'fs-extra'
import path from 'path'
import { hostfilesPath } from './configPath'
import { getDefaultHostFile } from './hostFiles'
import os from 'os'
import globals from './globals'


import { execSync } from 'child_process'

const OriHostsPath = getDefaultHostFile()[0].path
const bakHostPath = path.join(hostfilesPath, 'hosts.bak.txt')

const newFile = file => fs.ensureFileSync(path.join(hostfilesPath, file))
const deleteFile = file => fs.removeSync(path.join(hostfilesPath, file))

const stat = fs.statSync(OriHostsPath)

const MODE_0755 = parseInt('0755', 8)

const MODE_0666 = parseInt('0666', 8)

const activateHost = file => {
	if(globals.tray) globals.tray.setTitle(file)

	const backup = backupOrigHosts()
	if (backup) {
		return backup
			.then(() => setNewHosts(getHostPathByName(file)))
			.catch(err => {
				console.error(err)
			})
	}

	return
}

const deactivateHost = () => {
	if(globals.tray) globals.tray.setTitle('default')
	const restore = restoreOrigHosts()
	if (restore) {
		return restore.then(() => fs.remove(bakHostPath)).catch(err => {
			console.error(err)
		})
	}

	return
}
// const setNewHosts = file => fs.copySync(getHostPathByName(file),OriHostsPath)
const setNewHosts = file => {
	const readString = read(file)
	return readString ? write(OriHostsPath, readString) : false
}

// const backupOrigHosts = () => fs.copy(OriHostsPath,bakHostPath)
const backupOrigHosts = () => {
	const readString = read(OriHostsPath)

	return readString ? write(bakHostPath, readString) : false
}
const restoreOrigHosts = () => {
	const readString = read(bakHostPath)
	return readString ? write(OriHostsPath, readString) : false
}

const read = from => (isFile(from) ? fs.readFileSync(from, 'utf-8') : false)

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
}

const isFile = filePath => {
	try {
		return fs.statSync(filePath).isFile()
	} catch (err) {
		return false
	}
}

const getHostPathByName = file => path.join(hostfilesPath, file)

const trimFileString = string => string.replace(/\s*$/, '')

export {
	newFile,
	deleteFile,
	activateHost,
	deactivateHost,
	read,
	write,
	trimFileString,
	givePermissionToHosts,
}
