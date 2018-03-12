import path from 'path'
import electron from 'electron'

const { app } = electron

const userDataPath = path.join(app.getPath('userData'), 'data')
console.log(userDataPath)

const hostfilesPath = path.join(userDataPath, 'hostFiles')

export { hostfilesPath, userDataPath }
