import electron from 'electron'
import renderFooter from './uiComponents/footer'
import addHostFileInput from './uiComponents/newHostInput'
import hostsListItem from './uiComponents/hostList'

const { ipcRenderer: ipc, shell } = electron

import './index.css'

const App = document.querySelector('#app')

ipc.send('renderHostsUI')

ipc.on('sendHostsUI', (event, data) => {
	App.classList.remove('adding')
	App.classList.remove('hosting')
	renderAppUI(data.hosts)
	if (data.state && data.state != '') {
		ipc.send('start', data.state)
	}
})

ipc.on('hostActivated', (event, host) => {
	renderActiveUI(host)
})

ipc.on('hostDeactivated', (event, host) => {
	const $hostAnchor = document.querySelector(`[host-name="${host}"]`)
	$hostAnchor.closest('li').classList.remove('activated')

	$hostAnchor
		.closest('li')
		.parentNode.querySelectorAll('li:not(.activated)')
		.forEach(el => el.classList.remove('disabled'))

	App.classList.remove('hosting')
})
document.addEventListener('keypress', event => {
	if (13 === event.keyCode) {
		const fileName = event.target.value
		ipc.send('saveFile', fileName)
	}
})

document.addEventListener('click', event => {
	event.preventDefault()
	const $anchor = event.target.closest('a[action]')
	if (!$anchor) return

	if ('add' === $anchor.getAttribute('action')) {
		App.classList.add('adding')
		addHostFileInput()
		return
	}

	if ('save' === $anchor.getAttribute('action')) {
		const fileName = $anchor.closest('li').children[0].value
		ipc.send('saveFile', fileName)
		return
	}

	if ('edit' === $anchor.getAttribute('action'))
		return shell.openExternal($anchor.href)

	if ('delete' === $anchor.getAttribute('action')) {
		const host = $anchor.getAttribute('host-name')
		return ipc.send('deleteFile', host)
	}

	if ('clear' === $anchor.getAttribute('action')) {
		$anchor.closest('li').remove()
		App.classList.remove('adding')
		return
	}
	if ('start' === $anchor.getAttribute('action')) {
		const host = $anchor.getAttribute('host-name')
		return ipc.send('start', host)
	}

	if ('pause' === $anchor.getAttribute('action')) {
		const host = $anchor.getAttribute('host-name')
		return ipc.send('pause', host)
	}

	if ('quit' === $anchor.getAttribute('action')) {
		return ipc.send('quit')
	}
})

const renderAppUI = hosts => {
	App.innerHTML = `
	 <ul class="mdl-list hostslist">
	 ${hosts.map(host => hostsListItem(host)).join('')}
	 </ul>
		${renderFooter()}
	 `
}

const renderActiveUI = host => {
	const $hostAnchor = document.querySelector(`[host-name="${host}"]`)
	if ($hostAnchor) {
		$hostAnchor.closest('li').classList.add('activated')
		$hostAnchor
			.closest('li')
			.parentNode.querySelectorAll('li:not(.activated)')
			.forEach(el => el.classList.add('disabled'))

		App.classList.add('hosting')
	}
}
