import { click } from "@testing-library/user-event/dist/click";
import React, { useState } from "react";
import { data } from "./quiz-data";
import "./quiz.css";
export default function Quiz(){
    const elements = data;
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [myAnswer,setMyAnswer] = useState("");
    const [score,setScore] = useState(0);
    const [finish,setFinish] = useState(false);
    const [show,setShow] = useState(false);
    const [clickAnswer,setClickAnswer] = useState(false);

    const startAgain = () => {
        setCurrentQuestion(0)
        setFinish(false)
        setMyAnswer("")
        setScore(0)
    }
    const checkAnswer = (variant) => {
       setMyAnswer(variant);
       setClickAnswer(true);
    }
    const showAnswer = () => {
       
        setShow(!show);
    }
    const checkCorrect = () => {
        if (myAnswer === elements[currentQuestion].answer){
            setScore(score + 1)
        }
    }
    const reset = () => {
        setShow(false)
        setClickAnswer(false)
    }
    const finishBtn = () => {
        if(currentQuestion === elements.length - 1){
            setFinish(true);
        }
    }
    if(finish){
      return (
          <div className="container">
            <h3 className="score">
            {`Game Over! Your Final Score is 
                ${score} / ${elements.length-1}
            `}
            </h3>
            <button className="start" onClick={() => startAgain()}>
               Start Over
            </button>
          </div>
      )
    }else {
        return (
      
            <>
            <div className="question">
            <h2>
            {elements[currentQuestion].question}
              </h2>
            </div>
            {elements[currentQuestion].variants.map((variant) => (
                <div className="choice">
                 <p key={variant.id} className={`answer ${myAnswer === variant ? myAnswer === elements[currentQuestion].answer ? "correctAnswer" : "incorrectAnswer" : null}`}
                 onClick={() => checkAnswer(variant)}
                 >
                 {variant}
                 </p>
              
            </div>
            ))}
            <div className="button">
          {clickAnswer && (
              <button className="btn1" onClick={() => showAnswer()}>
                Show answer
              </button>
          )}
          {show && (
              <p className="ans">
                 Correct Answer : {elements[currentQuestion].answer}
              </p>
          )}
          {currentQuestion < elements.length - 1 && (
            <button className="btn2"
            onClick={() => {
                setCurrentQuestion(currentQuestion + 1)
                checkCorrect()
                reset()
                
            }}
            >NEXT</button>
          )}
            
            {currentQuestion === elements.length - 1 && (
                <button className="finish" onClick={() => finishBtn()}>
                 FINISH
                </button>
            )}
            </div>
            </>
        )
    }
    
}