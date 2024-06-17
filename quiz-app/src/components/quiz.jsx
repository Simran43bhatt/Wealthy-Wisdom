import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

export default function Quiz({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const playSound = new Howl({ src: [play] });
  const correctSound = new Howl({ src: [correct] });
  const wrongSound = new Howl({ src: [wrong] });

  useEffect(() => {
    playSound.play();
  }, []);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(callback, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
      delay(3000, () => {
        if (a.correct) {
          correctSound.play();
          delay(1000, () => {
            setQuestionNumber((prev) => prev + 1);
            setSelectedAnswer(null);
          });
        } else {
          wrongSound.play();
          delay(1000, () => {
            setTimeOut(true);
          });
        }
      });
    });
  };

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            key={a.text}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}