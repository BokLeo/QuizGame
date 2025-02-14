import QuizLayout from "@/features/quiz/components/QuizLayout";
import QuizQuestion from "@/features/quiz/components/QuizQuestion";

export default function FourwordQuiz() {
	return (
		<QuizLayout title="사자성어 맞추기">
			{/* 퀴즈 내용 (텍스트 기반 속담 퀴즈) */}
			<QuizQuestion question="하늘에서 ...이/가 떨어진다." />
		</QuizLayout>
	);
}
