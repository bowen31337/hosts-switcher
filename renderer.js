'use strict'

function _interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var electron = _interopDefault(require('electron'))

var renderFooter = function renderFooter() {
	return '\n<ul class="mdl-list footer">\n\t<li class="mdl-list__item">\n\t\t<span class="mdl-list__item-primary-content">\n\t\t <a href="#" class="add" action="add" title="Add New Hosts">\n\t\t\t<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n\t\t    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>\n\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t</svg>\n\t\t</a>\n\t\t</span>\n\t\t<span class="mdl-list__item-secondary-content">\n\t\t<a href="#" class="quit" action="quit" title="Exit App">\n\t\t\t<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n\t\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>\n\t\t\t</svg>\n\t\t</a>\n\t\t</span>\n\t</li>\n</ul>\n'
}

var addHostFileInput = function addHostFileInput() {
	var $hostList = document.querySelector('.hostslist')
	var inputString =
		'\n <li class="mdl-list__item">\n\t\t<input type="text" name="hostfileName" class="mdl-textfield__input" placeholder="Give your hosts a name">\n\t\t<a href="#" class="save" action="save" title="save">\n\t\t\t<svg fill="#000000" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">\n\t\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>\n\t\t\t</svg>\n\t\t</a>\n\t\t<a href="#" class="clear" action="clear" title="clear">\n\t\t\t<svg fill="#000000" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">\n\t\t\t    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\n\t\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t</svg>\n\t\t</a>\n\t</li>\n\t'
	$hostList.insertAdjacentHTML('beforeend', inputString)
	document.querySelector('.hostslist input').focus()
}

var renderHostList = function renderHostList(host) {
	return (
		'\n\t<li class="mdl-list__item">\n\t\t\t<span class="mdl-list__item-primary-content">\n\t\t\t\t<a href="#" class="start material-icons" action="start" host-name="' +
		host.name +
		'" title="Active this hosts">\n\t\t\t\t\t<svg fill="#000000" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t\t\t    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</a>\n\t\t\t\t<a href="#" class="pause material-icons" action="pause" host-name="' +
		host.name +
		'" title="Deactivate this hosts">\n\t\t\t\t\t<svg fill="#000000" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t\t\t    <path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</a>\n\t\t\t\t<span>' +
		host.name +
		'</span>\n\t\t\t</span>\n\t\t\t<span class="mdl-list__item-secondary-content">\n\t\t\t\t<a class="mdl-list__item-secondary-action delete" action="delete" href="#" host-name="' +
		host.name +
		'" title="Delete this hosts">\n\t\t\t\t<svg fill="#000000" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>\n\t\t\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t\t</svg>\n\t\t\t\t</a>\n\t\t\t\t<a class="mdl-list__item-secondary-action edit" action="edit" href="' +
		host.path +
		'" title="Edit this hosts">\n\t\t\t\t\t\t<svg fill="#000000" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>\n\t\t\t\t\t    <path d="M0 0h24v24H0z" fill="none"/>\n\t\t\t\t\t</svg>\n\t\t\t\t\t</a>\n\t\t\t</span>\n\t</li>\n'
	)
}

var ipc = electron.ipcRenderer,
	shell = electron.shell

var App = document.querySelector('#app')

ipc.send('renderHostsUI')

ipc.on('sendHostsUI', function(event, data) {
	App.classList.remove('adding')
	App.classList.remove('hosting')
	renderAppUI(data.hosts)
	if (data.state && data.state != '') {
		ipc.send('start', data.state)
	}
})

ipc.on('hostActivated', function(event, host) {
	renderActiveUI(host)
})

ipc.on('hostDeactivated', function(event, host) {
	var $hostAnchor = document.querySelector('[host-name="' + host + '"]')
	$hostAnchor.closest('li').classList.remove('activated')

	$hostAnchor
		.closest('li')
		.parentNode.querySelectorAll('li:not(.activated)')
		.forEach(function(el) {
			return el.classList.remove('disabled')
		})

	App.classList.remove('hosting')
})
document.addEventListener('keypress', function(event) {
	if (13 === event.keyCode) {
		var fileName = event.target.value
		ipc.send('saveFile', fileName)
	}
})

document.addEventListener('click', function(event) {
	event.preventDefault()
	var $anchor = event.target.closest('a[action]')
	if (!$anchor) return

	if ('add' === $anchor.getAttribute('action')) {
		App.classList.add('adding')
		addHostFileInput()
		return
	}

	if ('save' === $anchor.getAttribute('action')) {
		var fileName = $anchor.closest('li').children[0].value
		ipc.send('saveFile', fileName)
		return
	}

	if ('edit' === $anchor.getAttribute('action'))
		return shell.openExternal($anchor.href)

	if ('delete' === $anchor.getAttribute('action')) {
		var host = $anchor.getAttribute('host-name')
		return ipc.send('deleteFile', host)
	}

	if ('clear' === $anchor.getAttribute('action')) {
		$anchor.closest('li').remove()
		App.classList.remove('adding')
		return
	}
	if ('start' === $anchor.getAttribute('action')) {
		var _host = $anchor.getAttribute('host-name')
		return ipc.send('start', _host)
	}

	if ('pause' === $anchor.getAttribute('action')) {
		var _host2 = $anchor.getAttribute('host-name')
		return ipc.send('pause', _host2)
	}

	if ('quit' === $anchor.getAttribute('action')) {
		return ipc.send('quit')
	}
})

var renderAppUI = function renderAppUI(hosts) {
	App.innerHTML =
		'\n\t <ul class="mdl-list hostslist">\n\t ' +
		hosts
			.map(function(host) {
				return renderHostList(host)
			})
			.join('') +
		'\n\t </ul>\n\t\t' +
		renderFooter() +
		'\n\t '
}

var renderActiveUI = function renderActiveUI(host) {
	var $hostAnchor = document.querySelector('[host-name="' + host + '"]')
	if ($hostAnchor) {
		$hostAnchor.closest('li').classList.add('activated')
		$hostAnchor
			.closest('li')
			.parentNode.querySelectorAll('li:not(.activated)')
			.forEach(function(el) {
				return el.classList.add('disabled')
			})

		App.classList.add('hosting')
	}
}
