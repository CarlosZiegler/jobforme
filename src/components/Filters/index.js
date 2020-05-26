import React from 'react';

import FindInput from './FindInput';


function Filters(props) {
	const { handlerOnchange, urlButton, textButton } = props;
	return (

		<div className="container" data-testid="filters">
			<section className="filters">
				<FindInput handlerOnchange={handlerOnchange} placeholder="Pesquisar" />
				<a href={urlButton} target="_blank" rel="noopener noreferrer" className="btn-add">{textButton}</a>
			</section>
		</div>
	);
}

export default Filters;
