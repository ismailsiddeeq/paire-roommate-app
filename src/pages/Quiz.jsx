import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Logo from '../components/Logo';
import { quizQuestions } from '../data/mockData';
import './Quiz.css';

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animDir, setAnimDir] = useState('forward');

  const question = quizQuestions[step];
  const progress = ((step + 1) / quizQuestions.length) * 100;
  const isLast = step === quizQuestions.length - 1;

  const selectAnswer = (optionIdx) => {
    setAnswers({ ...answers, [step]: optionIdx });
  };

  const next = () => {
    if (isLast) {
      navigate('/discover');
      return;
    }
    setAnimDir('forward');
    setTimeout(() => setStep(step + 1), 50);
  };

  const prev = () => {
    if (step > 0) {
      setAnimDir('backward');
      setTimeout(() => setStep(step - 1), 50);
    }
  };

  return (
    <div className="quiz-page page-enter">
      <div className="quiz-header">
        <button className="quiz-back pressable" onClick={() => step > 0 ? prev() : navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <Logo size="sm" showText={false} />
        <span className="quiz-step-label">{step + 1}/{quizQuestions.length}</span>
      </div>

      <div className="quiz-progress-track">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className={`quiz-content ${animDir}`} key={step}>
        <div className="quiz-emoji">{question.emoji}</div>
        <h2 className="quiz-question">{question.question}</h2>
        <p className="quiz-helper">{question.helper || 'Select the one that fits you best'}</p>

        <div className="quiz-options">
          {question.options.map((option, i) => (
            <button
              key={i}
              className={`quiz-option pressable ${answers[step] === i ? 'selected' : ''}`}
              onClick={() => selectAnswer(i)}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="option-text">{option}</span>
              {answers[step] === i && (
                <div className="option-check">
                  <Check size={14} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button
          className={`quiz-next pressable ${answers[step] !== undefined ? 'active' : ''}`}
          onClick={next}
          disabled={answers[step] === undefined}
        >
          {isLast ? 'Find my matches' : 'Continue'}
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
