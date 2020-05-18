import React from 'react';

import './style.css'

function FindInput(props) {
	const { placeholder, handlerOnchange } = props
	return (
		<div className="filters__search">
			<input type="text" className="filters__search__input" onChange={handlerOnchange} placeholder={placeholder} />
		</div>
	);

}

export default FindInput;
