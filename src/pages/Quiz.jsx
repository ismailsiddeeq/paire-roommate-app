import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sunrise, Sparkles, Users, Volume2, Moon, Heart } from 'lucide-react';
import { quizQuestions } from '../data/mockData';
import './Quiz.css';

const iconMap = {
  sunrise: Sunrise,
  sparkles: Sparkles,
  users: Users,
  volume: Volume2,
  moon: Moon,
  heart: Heart,
};

export default function Quiz() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);

  const question = quizQuestions[current];
  const Icon = iconMap[question.icon];
  const progress = ((current + 1) / quizQuestions.length) * 100;

  const selectAnswer = (optionIdx) => {
    setAnswers({ ...answers, [question.id]: optionIdx });
    if (current < quizQuestions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(current + 1);
        setAnimating(false);
      }, 300);
    }
  };

  const finish = () => {
    navigate('/discover');
  };

  const isLast = current === quizQuestions.length - 1;
  const hasAnswer = answers[question.id] !== undefined;

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <button className="back-btn" onClick={() => current > 0 ? setCurrent(current - 1) : navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">{current + 1}/{quizQuestions.length}</span>
      </div>

      <div className={`quiz-content ${animating ? 'quiz-exit' : 'quiz-enter'}`}>
        <div className="quiz-icon-wrap">
          <Icon size={28} />
        </div>
        <h2 className="quiz-question">{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`quiz-option ${answers[question.id] === idx ? 'selected' : ''}`}
              onClick={() => selectAnswer(idx)}
            >
              <span className="option-indicator">
                {answers[question.id] === idx ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="var(--primary)" />
                    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="var(--border)" strokeWidth="2" />
                  </svg>
                )}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {isLast && hasAnswer && (
        <div className="quiz-footer animate-fade-in-up">
          <button className="cta-primary finish-btn" onClick={finish}>
            Find My Matches
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
