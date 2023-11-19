import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { quiz } from "../reducers/quiz";
export const Summary = () => {
  const correctAnswers = useSelector(
    (state) =>
      state.quiz.answers.filter((answer) => answer.isCorrect === true).length
  );
  const dispatch = useDispatch();

  const restart = () => {
    dispatch(quiz.actions.restart());
  };

  return (
    <section className=" summary-container">
      <h1 className="summary-text">
        Well done, you have completed our super difficult quiz!
      </h1>
      <p className="score-text">{`You've got ${correctAnswers} out of 5.`}</p>
      <button className="restart-button" type="button" onClick={restart}>
        Restart
      </button>
    </section>
  );
};
