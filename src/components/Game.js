import React, { useState, useEffect } from "react";
import utils from "../math-utils";

import StarsDisplay from "./StarsDisplay";
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";
import StartGame from "./StartGame";
import ConfettiExplosion from "react-confetti-explosion";

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [moves, setMoves] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [newGame, setNewGame] = useState(0);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0 && newGame === 1) {
      const timerId = setTimeout(
        () => setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1),
        1000
      );
      return () => clearTimeout(timerId);
    }
  }, [secondsLeft, availableNums, newGame]);

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setMoves(moves + 1);
      setCandidateNums([]);
    }
  };

  return {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    moves,
    newGame,
    setNewGame,
    setSecondsLeft,
    setGameState,
  };
};

const Game = (props) => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    moves,
    newGame,
    setNewGame,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    availableNums.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : newGame === 0
      ? "new"
      : "active";

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used";
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }

    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === "used" || secondsLeft === 0 || newGame === 0) {
      return;
    }

    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      {gameStatus === "won" && (
        <marquee className="wonMessage">
          Hurray 🎉, you made it here's a popper for you!
        </marquee>
      )}
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            secondsLeft === 10 && newGame !== 1 ? (
              <StartGame start={() => setNewGame(1)} />
            ) : (
              <>
                {gameStatus === "won" && (
                  <ConfettiExplosion
                    force={0.8}
                    duration={3000}
                    particleCount={250}
                    width={3000}
                  />
                )}
                <PlayAgain
                  onClick={props.startNewGame}
                  gameStatus={gameStatus}
                />
              </>
            )
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">
        Time Remaining: <span style={{ color: "#f00" }}>{secondsLeft}</span>
      </div>
      <div className="timer">Your Moves: {moves}</div>
    </div>
  );
};

export default Game;
