import React from 'react';

const StartGame = (props) => (
	<div className="game-done">
		<div
			className="message"
			style={{ color: 'orange' }}
		>
			Start Game
		</div>
		<button className="btn" onClick={props.start}>Play</button>
	</div>
);

export default StartGame;