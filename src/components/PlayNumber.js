import React from 'react';

const PlayNumber = (props) => (
	<button
		className="number"
		style={{ backgroundColor: colors[props.status] }}
		onClick={() => props.onClick(props.number, props.status)}
	>
		{props.number}
	</button>
);

// Color Theme
const colors = {
	available: '#fff2b4',
	used: 'lightgreen',
	wrong: 'lightcoral',
	candidate: 'deepskyblue',
};

export default PlayNumber;
