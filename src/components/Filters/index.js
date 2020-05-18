import React from 'react';

import FindInput from './FindInput'
import FilterButton from './FilterButton'

import './style.css'

function Filters(props) {

	const { sort, sortedBy, handlerOnchange } = props
	return (<div className="container" data-testid="filters">
		<section className="filters">
			<FindInput handlerOnchange={handlerOnchange} placeholder="Pesquisar Cargo" />
			{/* <FilterButton btnText="Cargo" btnAttribute="cargo" onClickHandler={sort} sortedBy={sortedBy} />
			<FilterButton btnText="Cidade" btnAttribute="cidade" onClickHandler={sort} sortedBy={sortedBy} /> */}
		</section>
	</div>
	);

}

export default Filters;
