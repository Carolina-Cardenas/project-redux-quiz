import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quiz } from '../reducers/quiz'

export const Summary = () => { 
const correctAnswers = useSelector((state) => state.quiz.answers.filter((answer) => answer.isCorrect === true).length)
const dispatch = useDispatch()

const restart = () => {
  dispatch(quiz.actions.restart())
}


      return (
        <section className="main-container summary-container">
          <h1 className="summary-text">Well done, you have completed our super difficult quiz!</h1>
          <img className='question-img'src='./mando.jpg' alt='mando'/>
          <p className="scoretext">{`You've got ${correctAnswers} out of 5.`}</p>
      <button className="next-button" type="button" onClick={restart}>RESTART</button>
          </section>
  )
      }