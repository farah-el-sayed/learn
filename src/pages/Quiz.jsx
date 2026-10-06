import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { SectionHead } from '../components/Cards.jsx';
import Button from '../components/Button.jsx';
import { useToast } from '../components/Toast.jsx';

export default function Quiz() {useTranslation();
  const { quizId } = useParams();
  const { quizzes, quizResults, setQuizResults } = useApp();
  const { success, error } = useToast();
  const quiz = quizzes.find((q) => q.id === quizId) || quizzes[0];
  const savedScore = quizResults[quiz.id];
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Switching quizzes (or retaking) starts with a clean sheet.
  useEffect(() => {
    setAnswers({});
    setDone(false);
    setSubmitError('');
    setLoading(false);
  }, [quiz.id]);

  const answeredCount = quiz.questions.filter((q) => answers[q.id] != null).length;
  const allAnswered = answeredCount === quiz.questions.length;
  const score = quiz.questions.filter((q) => answers[q.id] === q.answer).length;

  const choose = (questionId, optionIndex) => {
    if (done || loading) return;
    setSubmitError('');
    setAnswers((a) => ({ ...a, [questionId]: optionIndex }));
  };

  const retake = () => {
    setAnswers({});
    setDone(false);
    setSubmitError('');
  };
  const submit = () => {
    // Validation: all questions must be answered
    if (!allAnswered) {
      setSubmitError(`Please answer all questions before submitting (${answeredCount}/${quiz.questions.length} answered).`);
      return;
    }

    setSubmitError('');
    setLoading(true);
    setTimeout(() => {
      setQuizResults((p) => ({ ...p, [quiz.id]: score }));
      setDone(true);
      setLoading(false);
      if (score === quiz.questions.length) {
        success('Perfect score! Great job!');
      } else if (score >= quiz.questions.length * 0.7) {
        success(`Quiz completed! Score: ${score}/${quiz.questions.length}`);
      } else {
        error(`Quiz completed. Score: ${score}/${quiz.questions.length}. Review the lesson and try again.`);
      }
    }, 500);
  };
  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <Link to="/dashboard" className="text-[13px] text-ink-muted underline">{localizeText("Back to learning")}</Link>
      <div className="mt-4 max-w-2xl">
        <SectionHead kicker="Quiz" title={quiz.title} lede="No pressure. Three questions, then a note from your tutor." />
        <div className="space-y-6">
          {localizeText(quiz.questions.map((q, qi) => {
            const picked = answers[q.id];
            return (
              <div key={`${quiz.id}-${q.id}`} className="border border-line bg-white p-6">
              <p className="font-serif text-[18px]">{localizeText(qi + 1)}{localizeText(".")}{localizeText(" ")}{localizeText(q.q)}</p>
              <div className="mt-4 space-y-2" role="radiogroup" aria-label={q.q}>
                {localizeText(q.options.map((o, oi) => {
                    const selected = picked === oi;
                    const showRight = done && oi === q.answer;
                    const showWrong = done && selected && oi !== q.answer;
                    return (
                      <button
                        key={oi}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        disabled={done || loading}
                        onClick={() => choose(q.id, oi)}
                        className={`flex w-full items-center gap-3 border px-4 py-3 text-left text-[13.5px] transition ${
                        showRight ?
                        'border-pine bg-pine-soft font-medium' :
                        showWrong ?
                        'border-clay bg-clay-soft' :
                        selected ?
                        'border-pine bg-pine-soft' :
                        'border-line hover:border-ink/30 hover:bg-paper'} disabled:cursor-default`
                        }>
                        
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${showRight || selected ? 'border-pine bg-pine text-paper' : showWrong ? 'border-clay bg-clay text-paper' : 'border-line'}`}>
                      {localizeText((selected || showRight) && <Check size={12} />)}
                    </span>
                    <span className="flex-1">{localizeText(o)}</span>
                    {localizeText(done && showRight && <span className="text-[12px] font-medium text-pine">{localizeText("Correct")}</span>)}
                    {localizeText(done && showWrong && <span className="text-[12px] font-medium text-clay-deep">{localizeText("Yours")}</span>)}
                  </button>);

                  }))}
              </div>
              {localizeText(!done && picked == null &&
                <p className="mt-2 text-[12px] text-ink-faint">{localizeText("Pick one to continue (")}{localizeText(answeredCount)}{localizeText("/")}{localizeText(quiz.questions.length)}{localizeText(" ")}{localizeText("answered).")}</p>)
                }
            </div>);

          }))}
        </div>
        {localizeText(!done ?
        <>
            <p className="mt-4 text-[13px] text-ink-muted" aria-live="polite">
              {localizeText(allAnswered ? 'All answered — ready to submit.' : `${answeredCount}/${quiz.questions.length} answered.`)}
            </p>
            {submitError && <p className="mt-2 text-[13px] text-clay-deep">{localizeText(submitError)}</p>}
            <Button variant="primary" size="xl" onClick={submit} disabled={!allAnswered || loading} loading={loading} className="mt-4">{localizeText("Submit answers")}</Button>
          </> :

        <div className="mt-6 border border-line bg-white p-6">
            <p className="font-serif text-[22px]">{localizeText("You scored")}{localizeText(" ")}{localizeText(quizResults[quiz.id] ?? score)}{localizeText(" ")}{localizeText("/")}{localizeText(" ")}{localizeText(quiz.questions.length)}</p>
            <p className="mt-2 text-[13.5px] text-ink-muted">{localizeText("Kindly marked. Review the lesson, then try the next exercise — spacing beats cramming.")}</p>
            {localizeText(savedScore != null && savedScore < quiz.questions.length &&
          <p className="mt-1 text-[12.5px] text-ink-faint">{localizeText("Best so far:")}{localizeText(" ")}{localizeText(savedScore)}{localizeText(" ")}{localizeText("/")}{localizeText(" ")}{localizeText(quiz.questions.length)}{localizeText(".")}</p>)
          }
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="md" icon={RotateCcw} onClick={retake}>{localizeText("Retake quiz")}</Button>
              <Button variant="ghost" size="md" to="/quizzes">{localizeText("Back to quizzes")}</Button>
            </div>
          </div>)
        }
      </div>
    </div>);

}
