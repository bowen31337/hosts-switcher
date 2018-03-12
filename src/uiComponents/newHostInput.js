const addHostFileInput = () => {
	const $hostList = document.querySelector('.hostslist')
	const inputString = `
 <li class="mdl-list__item">
		<input type="text" name="hostfileName" class="mdl-textfield__input" placeholder="Give your hosts a name">
		<a href="#" class="save" action="save" title="save">
			<svg fill="#000000" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
			    <path d="M0 0h24v24H0z" fill="none"/>
			    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
			</svg>
		</a>
		<a href="#" class="clear" action="clear" title="clear">
			<svg fill="#000000" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
			    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			    <path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</a>
	</li>
	`
	$hostList.insertAdjacentHTML('beforeend', inputString)
	document.querySelector('.hostslist input').focus()
}

export default addHostFileInput
