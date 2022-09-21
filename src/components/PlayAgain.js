import React from 'react';

const PlayAgain = (props) => (
	<div className="game-done">
		<div
			className="message"
			style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
		>
			{props.gameStatus === 'lost' ? 'Game Over' : 'You Won'}
		</div>
		<button className="btn" onClick={props.onClick}>Reset</button>
	</div>
);

export default PlayAgain;
