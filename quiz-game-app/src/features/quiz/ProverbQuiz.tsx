import { useEffect, useState } from "react";
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
  const [isCorrect, setIsCorrect] = useState<boolean[]>(new Array(quizzes.length).fill(false));
  const [feedback, setFeedback] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

	useEffect(() => {
    // quizzes 데이터가 로드되었을 때 isCorrect 초기화
    if (quizzes.length > 0) {
      setIsCorrect(new Array(quizzes.length).fill(false)); // quizzes의 길이에 맞게 isCorrect 초기화
    }
  }, [quizzes]); // quizzes가 변경될 때마다 실행

	useEffect(() => {
		console.log("isCorrect:", isCorrect);
	}, [isCorrect]);

  // 퀴즈 시작 핸들러
  const handleStartQuiz = (questionCount: number) => {
    fetch(`/api/proverb-quiz?count=${questionCount}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setCurrentIndex(0); // 퀴즈를 첫 문제로 초기화
        setIsQuizStarted(true);
        setIsQuizCompleted(false); // 퀴즈 완료 상태 초기화
      })
      .catch((error) => console.error("퀴즈 데이터를 가져오는데 실패:", error));
  };

  // 정답 제출 시 핸들러
  const handleAnswerSubmit = (userAnswer: string) => {
		const currentQuiz = quizzes[currentIndex];
		
		// 현재 문제의 정답 여부를 기록
		const newIsCorrect = [...isCorrect];
		newIsCorrect[currentIndex] = userAnswer === currentQuiz.정답; // 정답이면 true, 아니면 false
		setIsCorrect(newIsCorrect); // 배열을 업데이트
		
		let delay = 0;
		if (newIsCorrect[currentIndex]) {
			setFeedback("정답입니다 😽");
			delay = 1000;
		} else {
			setFeedback("틀렸습니다 😿");
			delay = 2000;
		}
		
		// 다음 문제로 넘어가기
		setTimeout(() => {
			setFeedback(""); // 피드백 초기화
			if (currentIndex + 1 < quizzes.length) {
				setCurrentIndex((prev) => prev + 1); // 다음 문제로
			} else {
				setIsQuizCompleted(true); // 퀴즈 완료 상태
			}
		}, delay);
	};
	

  // 퀴즈 다시 시작 핸들러
  const handleRetry = () => {
    setIsQuizStarted(false); // 퀴즈 시작 상태 초기화
    setIsQuizCompleted(false); // 퀴즈 완료 상태 초기화
    setCurrentIndex(0); // 첫 문제로 돌아가기
    setFeedback(""); // 피드백 초기화
  };

  return (
    <QuizLayout
      title="속담 맞추기"
      answerLength={quizzes[currentIndex]?.정답?.length || 0}
      onSubmit={handleAnswerSubmit}
      currentQuiz={quizzes[currentIndex] || ""}
      feedback={feedback}
      handleStartQuiz={handleStartQuiz}
      isQuizCompleted={isQuizCompleted}
      isQuizStarted={isQuizStarted}
      isCorrect={isCorrect}
			currentIndex={currentIndex}
      onRetry={handleRetry} // QuizComplete에 onRetry 함수 전달
    />
  );
}
