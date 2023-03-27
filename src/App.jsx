import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import Start from './components/Start';

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState('0 F');

  const data = [
    {
      id: 1,
      question: "Qui es l'homme le plus riche d'Afrique ?",
      answers: [
        {
          text: 'Prince Akim',
          correct: false,
        },
        {
          text: 'Aliko Dankoté',
          correct: true,
        },
        {
          text: 'Claudel Noubissie',
          correct: false,
        },
        {
          text: 'Alex Ouedraogo',
          correct: false,
        },
      ],
    },
    {
      id: 1,
      question: 'En quelle Année Facebook a été lancé ?',
      answers: [
        {
          text: '2004',
          correct: true,
        },
        {
          text: '2005',
          correct: false,
        },
        {
          text: '2006',
          correct: false,
        },
        {
          text: '2007',
          correct: false,
        },
      ],
    },

    {
      id: 3,
      question: 'Quel acteur a joué dans Harry Potter ?',
      answers: [
        {
          text: 'Johnny Deep',
          correct: false,
        },
        {
          text: 'Leonardo Di Caprio',
          correct: false,
        },
        {
          text: 'Denzel Washington',
          correct: false,
        },
        {
          text: 'Daniel Red Cliff',
          correct: true,
        },
      ],
    },
  ];
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: 'FCFA 100' },
        { id: 2, amount: 'FCFA 200' },
        { id: 3, amount: 'FCFA 300' },
        { id: 4, amount: 'FCFA 500' },
        { id: 5, amount: 'FCFA 1000' },
        { id: 6, amount: 'FCFA 2000' },
        { id: 7, amount: 'FCFA 4000' },
        { id: 8, amount: 'FCFA 8000' },
        { id: 9, amount: 'FCFA 16000' },
        { id: 10, amount: 'FCFA 32000' },
        { id: 11, amount: 'FCFA 64000' },
        { id: 12, amount: 'FCFA 125000' },
        { id: 13, amount: 'FCFA 250000' },
        { id: 14, amount: 'FCFA 500000' },
        { id: 15, amount: 'FCFA 1000000' },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">Vous avez gagnez : {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    {' '}
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />{' '}
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setTimeOut={setTimeOut}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>

          <div className="money">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? 'moneyListItem active '
                      : 'moneyListItem'
                  }
                >
                  <span className="moneyListItemNumber"> {m.id}</span>
                  <span className="moneyListItemAmount"> {m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
