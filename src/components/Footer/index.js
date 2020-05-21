import React from 'react';

import './style.css'

function Footer() {

	return (<footer data-testid="footer" className="footer">
		<div className="container">
			<a href="/" className="footer__logo">
				<h1>#Jobforme</h1>
			</a>
			<span>Banco de Dados de Profissionais</span>
		</div>
	</footer>);
}

export default Footer;
