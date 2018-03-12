import path from 'path'
import fs from 'fs-extra'
import { read, write, trimFileString } from './files'

import { userDataPath, hostfilesPath } from './configPath'

const lastStateConfFile = path.join(userDataPath, 'lastState.conf')

const getLastHostName = () => {
	fs.ensureFileSync(lastStateConfFile)
	return trimFileString(read(lastStateConfFile))
}

const setLastHostName = hostName => write(lastStateConfFile, hostName)

export { getLastHostName, setLastHostName }
