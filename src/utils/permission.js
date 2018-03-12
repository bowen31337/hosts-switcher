import fs from 'fs-extra'
import path from 'path'
import { hostfilesPath } from './configPath'
import { getDefaultHostFile } from './hostFiles'
import { dialog } from 'electron'
import os from 'os'

import { execSync } from 'child_process'

const OriHostsPath = getDefaultHostFile()[0].path

const stat = fs.statSync(OriHostsPath)

const { uid, gid } = os.userInfo()

const givePermissionToHosts = pw => {
	// try{
	// 	fs.chownSync(OriHostsPath, uid, 0)
	// 	console.log("set permission")
	// } catch (err){
	// 	console.log('permission',err)
	// }
	// fs.chown(OriHostsPath, uid, 0, function(err){
	// 	console.log("error message",err)
	//  if(err) throw err;
	// })
	try {
		execSync(`echo ${pw} | sudo -S chown ${process.env.USER} ${OriHostsPath}`)
	} catch (e) {
		throw e
	}
}

const permissionNotice = () => {
	const solution =
		process.platform === 'win32'
			? `Navigate to ${OriHostsPath}.\r\n
		Locate hosts file, right click it and choose Properties.\r\n
		Navigate to the Security tab and click Edit button.\r\n
		You should see the list of users and groups on your PC that have access to hosts file. If your user name or group is on the list, click it and make sure that it has Permissions set to Full control. If your user name isn’t on the list, click the Add button. \r\n
		Enter the user name or the group name in the Enter the object names to select field and click Check Names and OK\r\n
		New user or group will be added to the list. Now you need to select the newly added group or user and check the Full control option below.\r\n
		Click Apply and OK to save changes.`
			: `sudo chown ${process.env.USER} ${OriHostsPath}`
	dialog.showErrorBox(
		`Hi, ${
			process.env.USER
		}\n\rPlease gain write permission to your hosts file "${OriHostsPath}". Please follow the instructions bellow`,
		`${solution}`
	)
}

const hasPermssionOnHosts = () => stat.uid === uid || stat.gid === gid

export { hasPermssionOnHosts, givePermissionToHosts, permissionNotice }
