import React from 'react';

import './style.css'

function FilterButton(props) {


	const { btnText, onClickHandler, btnAttribute, sortedBy } = props

	return (<>
		<button className={`filters__item ${sortedBy === btnAttribute ? "is-selected" : ""}`} onClick={() => onClickHandler(btnAttribute)}>
			{btnText}<i className="fas fa-sort-down" />
		</button>
	</>
	);

}

export default FilterButton;
