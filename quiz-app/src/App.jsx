import "./app1.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/start";
import Timer from "./components/timer";
import Quiz from "./components/quiz";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  
  
  const data = [
    {
      id: 1,
      question: "Which planet is known as the Red Planet?",
      answers: [
        {
          text: "Mercury",
          correct: false,
        },
        {
          text: "Mars",
          correct: true,
        },
        {
          text: "Jupiter",
          correct: false,
        },
        {
          text: "Saturn",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "Who wrote the play 'Romeo and Juliet'?",
      answers: [
        {
          text: "William Wordsworth",
          correct: false,
        },
        {
          text: "William Shakespeare",
          correct: true,
        },
        {
          text: "John Milton",
          correct: false,
        },
        {
          text: "Jane Austen",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "What is the capital city of Australia?",
      answers: [
        {
          text: "Sydney",
          correct: false,
        },
        {
          text: "Canberra",
          correct: true,
        },
        {
          text: "Melbourne",
          correct: false,
        },
        {
          text: "Brisbane",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      question: "In which year did World War II end?",
      answers: [
        {
          text: "1943",
          correct: false,
        },
        {
          text: "1944",
          correct: false,
        },
        {
          text: "1945",
          correct: true,
        },
        {
          text: "1946",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "Which famous artist painted the Mona Lisa?",
      answers: [
        {
          text: "Vincent van Gogh",
          correct: false,
        },
        {
          text: "Leonardo da Vinci",
          correct: true,
        },
        {
          text: "Pablo Picasso",
          correct: false,
        },
        {
          text: "Michelangelo",
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: "What is the largest organ in the human body?",
      answers: [
        {
          text: "Liver",
          correct: false,
        },
        {
          text: "Heart",
          correct: false,
        },
        {
          text: "Lungs",
          correct: false,
        },
        {
          text: "Skin",
          correct: true,
        },
      ],
    },
    {
      id: 7,
      question: "Who was the first person to step on the Moon?",
      answers: [
        {
          text: "Neil Armstrong",
          correct: true,
        },
        {
          text: "Buzz Aldrin",
          correct: false,
        },
        {
          text: "Michael Collins",
          correct: false,
        },
        {
          text: "Yuri Gagarin",
          correct: false,
        },
      ],
    },
    {
      id: 8,
      question: "What is the chemical symbol for gold?",
      answers: [
        {
          text: "Au",
          correct: true,
        },
        {
          text: "Ag",
          correct: false,
        },
        {
          text: "Pt",
          correct: false,
        },
        {
          text: "Hg",
          correct: false,
        },
      ],
    },
    {
      id: 9,
      question: "Which ocean is the largest on Earth?",
      answers: [
        {
          text: "Atlantic Ocean",
          correct: false,
        },
        {
          text: "Indian Ocean",
          correct: false,
        },
        {
          text: "Arctic Ocean",
          correct: false,
        },
        {
          text: "Pacific Ocean",
          correct: true,
        },
      ],
    },
    {
      id: 10,
      question: "Who is the author of the Harry Potter book series?",
      answers: [
        {
          text: "J.K. Rowling",
          correct: true,
        },
        {
          text: "Stephen King",
          correct: false,
        },
        {
          text: "George R.R. Martin",
          correct: false,
        },
        {
          text: "J.R.R. Tolkien",
          correct: false,
        },
      ],
    },
  ];
  

  

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1000" },
        { id: 6, amount: "$ 2000" },
        { id: 7, amount: "$ 4000" },
        { id: 8, amount: "$ 8000" },
        { id: 9, amount: "$ 16000" },
        { id: 10, amount: "$ 32000" },
        { id: 11, amount: "$ 64000" },
        { id: 12, amount: "$ 125000" },
        { id: 13, amount: "$ 250000" },
        { id: 14, amount: "$ 500000" },
        { id: 15, amount: "$ 1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
