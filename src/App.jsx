import { useState, useEffect } from "react";
import data from "./assets/question.json";
import "./app.css"

function App() {
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleNextQuestion = () => {
    if (question < data.length - 1) {
      setQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === data[question].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const restartQuiz = () => {
    setQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  return (
    <div className="container center-container justify-content-center align-items-center mt-5 text-center bg-info p-4 rounded" style={{ maxWidth: '500px' }}>
      {showScore ? (
        <div>
          <h2>Your score: {score}/{data.length}</h2>
          <button className="btn btn-success" onClick={restartQuiz}>Restart</button>
        </div>
      ) : (
        <div>
          <h2>Question {question + 1}</h2>
          <p>{data[question].question}</p>
          <div className="justify-content-between">
            {data[question].options.map((option, index) => (
              <button key={index} className="btn btn-success" onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
          <p>Time left: <span>{timer}s</span></p>
        </div>
      )}
    </div>
  );
}

export default App;
