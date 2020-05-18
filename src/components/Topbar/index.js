import React from 'react';

import './style.css'



function Topbar() {

	return (<header data-testid="topbar" className="topbar">
		<div className="container">
			<a href="/" className="topbar__logo">
				<h1>Job for me</h1>
			</a>
		</div>
	</header>);
}

export default Topbar;
