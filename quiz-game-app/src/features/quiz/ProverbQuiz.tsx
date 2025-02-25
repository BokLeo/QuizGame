import { useState } from "react";
import QuizLayout from "@/features/quiz/components/QuizLayout";

interface Quiz {
  타입: string;
  번호: number;
  문제: string;
  정답: string;
  설명: string;
}

export default function ProverbQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // 퀴즈 완료 여부 상태 추가

  // 퀴즈 시작 핸들러
  const handleStartQuiz = (questionCount: number) => {
    fetch(`/api/proverb-quiz?count=${questionCount}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setIsQuizStarted(true);  // 퀴즈 시작 상태 업데이트
      })
      .catch((error) => console.error("퀴즈 데이터를 가져오는데 실패:", error));
  };

  const currentQuiz = quizzes[currentIndex];

  // 정답 제출 시 검증
  const handleAnswerSubmit = (userAnswer: string) => {
    if (userAnswer === currentQuiz.정답) {
      setIsCorrect(true);
      setFeedback("정답입니다!");

      setTimeout(() => {
        setIsCorrect(false);
        setFeedback("");
        if (currentIndex + 1 < quizzes.length) {
          setCurrentIndex((prev) => prev + 1); // 다음 문제로 넘어감
        } else {
          setIsQuizCompleted(true);  // 모든 문제를 푼 후 퀴즈 완료 상태로 변경
        }
      }, 1000);
    } else {
      setFeedback("틀렸습니다. 다시 시도하세요!");
    }
  };

  return (
    <QuizLayout
      title="속담 맞추기"
      answerLength={currentQuiz?.정답?.length || 0}
      onSubmit={handleAnswerSubmit}
      currentQuiz={currentQuiz}
      feedback={feedback}
      handleStartQuiz={handleStartQuiz}
      isQuizCompleted={isQuizCompleted}  // QuizLayout에 퀴즈 완료 여부 전달
      isQuizStarted={isQuizStarted}  // isQuizStarted를 QuizLayout에 전달
      isCorrect={isCorrect}  // isCorrect를 QuizLayout에 전달
    />
  );
}
