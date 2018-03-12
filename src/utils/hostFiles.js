import fs from 'fs-extra'
import path from 'path'

import { hostfilesPath } from './configPath'

const getHostFiles = () => {
	fs.ensureDirSync(hostfilesPath)

	const hostFiles = fs.readdirSync(hostfilesPath)
	const hostFilesMap = hostFiles
		.filter(file => !file.includes('bak'))
		.map(file => ({
			name: file,
			path: path.join(hostfilesPath, file),
		}))

	return hostFilesMap
}

const getDefaultHostFile = () => [
	{
		name: 'defaultHosts',
		path:
			process.platform === 'win32'
				? 'C:/Windows/System32/drivers/etc/hosts'
				: '/etc/hosts',
	},
]

export { getHostFiles, getDefaultHostFile }
