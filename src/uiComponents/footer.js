const renderFooter = () => `
<ul class="mdl-list footer">
	<li class="mdl-list__item">
		<span class="mdl-list__item-primary-content">
		 <a href="#" class="add" action="add" title="Add New Hosts">
			<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
		    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
		    <path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</a>
		</span>
		<span class="mdl-list__item-secondary-content">
		<a href="#" class="quit" action="quit" title="Exit App">
			<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			    <path d="M0 0h24v24H0z" fill="none"/>
			    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
			</svg>
		</a>
		</span>
	</li>
</ul>
`

export default renderFooter
