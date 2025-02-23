"use client";
import { useState } from "react";
import QuizLayout from "@/features/quiz/components/QuizLayout";
import QuizQuestion from "@/features/quiz/components/QuizQuestion";
import QuizSettings from "@/features/quiz/components/QuizSettings";

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
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  // 퀴즈 시작 핸들러 (QuizSettings에서 호출)
  const handleStartQuiz = (questionCount: number) => {
    fetch(`/api/proverb-quiz?count=${questionCount}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setIsQuizStarted(true);
      })
      .catch((error) => console.error("퀴즈 데이터를 가져오는데 실패:", error));
  };

  // // 설정 화면 (QuizLayout 없이)
  // if (!isQuizStarted) {
  //   return <QuizSettings onStart={handleStartQuiz} />;
  // }

  // // 로딩 상태
  // if (quizzes.length === 0) {
  //   return <div>Loading...</div>;
  // }

  // 모든 문제를 다 풀었으면 완료 메시지 출력
  if (isQuizStarted && currentIndex >= quizzes.length) {
    return (
      <QuizLayout title="속담 맞추기" answerLength={0} onSubmit={() => {}}>
        <div>퀴즈 완료!</div>
      </QuizLayout>
    );
  }

  const currentQuiz = quizzes[currentIndex];

  // 정답 제출 시 검증
  const handleAnswerSubmit = (userAnswer: string) => {
    if (userAnswer === currentQuiz.정답) {
      setIsCorrect(true);
      setFeedback("정답입니다!");

      setTimeout(() => {
        setIsCorrect(false);
        setFeedback("");
        setCurrentIndex((prev) => prev + 1);
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
      showQuizControls={isQuizStarted} // 퀴즈가 시작된 경우에만 하단 컨트롤 표시
    >
      {!isQuizStarted ? (
        <QuizSettings onStart={handleStartQuiz} />
      ) : (
        <>
          <QuizQuestion question={currentQuiz.문제} />
          {isCorrect && (
            <div style={{ fontSize: "2rem", color: "green" }}>O</div>
          )}
          {feedback && !isCorrect && (
            <div style={{ marginTop: "1rem", color: "red" }}>{feedback}</div>
          )}
        </>
      )}
    </QuizLayout>
  );
	
}
