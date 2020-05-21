import React from 'react';
import { MdPersonAdd } from 'react-icons/md';

import FindInput from './FindInput'

import './style.css'

function Filters(props) {

	const { handlerOnchange } = props
	return (<div className="container" data-testid="filters">
		<section className="filters">
			<FindInput handlerOnchange={handlerOnchange} placeholder="Pesquisar Cargo" />
			<a href="https://forms.gle/fxWpig6SHWVhBPj26" target="_blank" rel="noopener noreferrer" className="btn-add"><MdPersonAdd color="#FFF" /></a>
		</section>
	</div>
	);

}

export default Filters;
