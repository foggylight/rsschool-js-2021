import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IState, Routes } from '../models/app';
import { resetGame } from '../redux/actions';
import { playAudio } from '../utils';

function EndGame({ isSuccessful }: { isSuccessful: boolean }): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    playAudio(`../../audio/${isSuccessful ? 'success' : 'failure'}.mp3`);
    setTimeout(() => {
      dispatch(resetGame());
      history.push(Routes.main);
    }, 3000);
  }, []);

  const mistakes = useSelector((state: IState) => state.game.game.mistakes);

  return (
    <main className="main-container end-game">
      {isSuccessful ? <h2>You did it!</h2> : <h2>Oh no...</h2>}
      {isSuccessful ? null : (
        <p>
          You have made {mistakes} mistake{mistakes > 1 ? 's' : ''}
        </p>
      )}
      <img src={`./${isSuccessful ? 'happy' : 'angry'}.png`} alt="Game end" />
    </main>
  );
}

export default EndGame;
