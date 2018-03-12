const renderHostList = host =>
	`
	<li class="mdl-list__item">
			<span class="mdl-list__item-primary-content">
				<a href="#" class="start material-icons" action="start" host-name="${
					host.name
				}" title="Active this hosts">
					<svg fill="#000000" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
					    <path d="M0 0h24v24H0z" fill="none"/>
					    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
					</svg>
				</a>
				<a href="#" class="pause material-icons" action="pause" host-name="${
					host.name
				}" title="Deactivate this hosts">
					<svg fill="#000000" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
					    <path d="M0 0h24v24H0z" fill="none"/>
					    <path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/>
					</svg>
				</a>
				<span>${host.name}</span>
			</span>
			<span class="mdl-list__item-secondary-content">
				<a class="mdl-list__item-secondary-action delete" action="delete" href="#" host-name="${
					host.name
				}" title="Delete this hosts">
				<svg fill="#000000" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
				    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
				    <path d="M0 0h24v24H0z" fill="none"/>
				</svg>
				</a>
				<a class="mdl-list__item-secondary-action edit" action="edit" href="${
					host.path
				}" title="Edit this hosts">
						<svg fill="#000000" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
					    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>
					</a>
			</span>
	</li>
`
export default renderHostList
