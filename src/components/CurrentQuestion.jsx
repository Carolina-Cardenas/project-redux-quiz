import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import { Summary } from "./Summary"; 
import mando from './../assets/mando.jpg';
import './CurrentQuestion.css';

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const answer = useSelector((state) => state.quiz.answers.find((a) => a.questionId === question.id))
  const isQuizOver = useSelector((state) => state.quiz.quizOver)
console.log(answer)
  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const handleClick = (answerIndex) => {
    console.log(answerIndex)
    dispatch(quiz.actions.submitAnswer({
      questionId: question.id,
      answerIndex
    }));
 
  };

  const handleNext = () => {
    dispatch(quiz.actions.goToNextQuestion(
    ));
 
  };

  // console.log(JSON.stringify(answers, null, 2))
  
  
  const statusAnswer = () => {
    if (answer.isCorrect) {
      return 'right'
    } else {
      return 'wrong'
    }
  }

  if (isQuizOver) {
    return <Summary />
  }

  return (
    <article className="detailPage">
    <div 
    className="background"
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%), url(${mando})`,
    }}
    >
      <h1>Question: {question.questionText}</h1>
      <div className="container-button">
      {question.options.map((option, index) => (
        <button className="answer-button" key={index} onClick={() =>handleClick(index)}>
          {option}
        </button>
      ))}
      </div>
  {/* <p>Last answer: {lastAnswer.answer}</p>

      <p>Is correct: {lastAnswer.isCorrect}</p> */} 
      {answer &&
       <div className="next-question-container">
      <p className="answer-text">{`The answer is ${statusAnswer()}, please go to the next question`}</p>
      <button className="next-button" type="submit" onClick={handleNext}>NEXT</button> 
    </div>}
   </div>
   </article>
  );
};
