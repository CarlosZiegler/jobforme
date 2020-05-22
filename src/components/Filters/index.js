import React from 'react';
import { MdPersonAdd, MdWork } from 'react-icons/md';

import FindInput from './FindInput'

import './style.css'

function Filters(props) {

	const { handlerOnchange, urlButton, textButton } = props
	let icon;

	if (textButton === 'Adicionar Perfil') {
		icon = <MdPersonAdd color="#fff" />
	}
	else {
		icon = <MdWork color="#fff" />
	}

	return (

		<div className="container" data-testid="filters">
			<section className="filters">
				<FindInput handlerOnchange={handlerOnchange} placeholder="Pesquisar" />
				<a href={urlButton} target="_blank" rel="noopener noreferrer" className="btn-add">{icon}</a>
			</section>
		</div>
	);

}


export default Filters;
