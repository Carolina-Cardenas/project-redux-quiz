import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import { Summary } from "./Summary"; 
import './CurrentQuestion.css';

export const CurrentQuestion = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const answer = useSelector((state) => state.quiz.answers.find((a) => a.questionId === question.id))
  const isQuizOver = useSelector((state) => state.quiz.quizOver)
  const questionTotal = useSelector((store) => store.quiz.questions);
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
    setButtonClicked(true);
  };

  const handleNext = () => {
    dispatch(quiz.actions.goToNextQuestion(
    ));
    setButtonClicked(false);
  };


  
  
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
    <section className="main-container">
    <div 
    >
      <h1>Mandalorian Quiz </h1>
      <h2> {question.questionText}</h2>
      <div className="container-button">
      {question.options.map((option, index) => (
       <button 
       className={`answer-button ${isAnswerCorrect ? 'correct' : ''} ${!isAnswerCorrect && answer ? 'wrong' : ''}`}
       key={index} onClick={() =>handleClick(index)} disabled={buttonClicked}>
          <span className="option-text">{option}</span> 
        </button>
      ))}
      </div>
      <div className="counter-container">
       
      <p className="answer-text">Question: {question.id} / {questionTotal.length} </p  ></div>
      {answer &&
       <div className="next-question-container">
       
      <p className="answer-text">{`The answer is ${statusAnswer()}, please go to the next question`}</p>
      <button className="next-button" type="submit" onClick={handleNext}> <span className="option-text">Next</span> </button> 
    </div>}
   </div>
   </section>
  );
};
