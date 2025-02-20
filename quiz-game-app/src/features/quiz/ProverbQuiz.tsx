"use client";
import { useEffect, useState } from "react";
import QuizLayout from "@/features/quiz/components/QuizLayout";
import QuizQuestion from "@/features/quiz/components/QuizQuestion";

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

  // API를 호출하여 필요한 문제(예: 10개)를 받아옵니다.
  useEffect(() => {
    fetch("/api/proverb-quiz?count=3")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error("퀴즈 데이터를 가져오는데 실패:", error));
  }, []);

  // 데이터 로드 전 로딩 상태 처리
  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  // 모든 문제를 다 풀었으면 완료 메시지 출력
  if (currentIndex >= quizzes.length) {
    return (
      <QuizLayout title="속담 맞추기" answerLength={0} onSubmit={() => {}}>
        <div>퀴즈 완료!</div>
      </QuizLayout>
    );
  }

  const currentQuiz = quizzes[currentIndex];

  // 정답 제출 시 검증 및 상태 업데이트
  const handleAnswerSubmit = (userAnswer: string) => {
    // 정답 제출 전 로그 출력
    console.log("Before Submission - Question:", currentQuiz.문제, "Expected Answer:", currentQuiz.정답);
    console.log("User Answer:", userAnswer);

    if (userAnswer === currentQuiz.정답) {
      setIsCorrect(true);
      setFeedback("정답입니다!");
      // 정답 제출 후 로그 (정답인 경우)
      console.log("After Submission - Correct. Question:", currentQuiz.문제, "Expected Answer:", currentQuiz.정답);
      setTimeout(() => {
        setIsCorrect(false);
        setFeedback("");
        setCurrentIndex((prev) => {
          const newIndex = prev + 1;
          // 다음 문제가 있다면 로그 출력
          if (newIndex < quizzes.length) {
            const nextQuiz = quizzes[newIndex];
            console.log("Next Question - Question:", nextQuiz.문제, "Expected Answer:", nextQuiz.정답);
          }
          return newIndex;
        });
      }, 1000);
    } else {
      setFeedback("틀렸습니다. 다시 시도하세요!");
      // 정답 제출 후 로그 (오답인 경우)
      console.log("After Submission - Incorrect. Question:", currentQuiz.문제, "Expected Answer:", currentQuiz.정답);
    }
  };

  return (
    <QuizLayout
      title="속담 맞추기"
      answerLength={currentQuiz.정답.length}
      onSubmit={handleAnswerSubmit}
    >
      <QuizQuestion question={currentQuiz.문제} />
      {isCorrect && <div style={{ fontSize: "2rem", color: "green" }}>O</div>}
      {feedback && !isCorrect && (
        <div style={{ marginTop: "1rem", color: "red" }}>{feedback}</div>
      )}
    </QuizLayout>
  );
}
