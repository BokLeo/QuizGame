interface QuizQuestionProps {
  question: string;
  feedback: string;
  isCorrect: boolean;
}

export default function QuizQuestion({
  question,
  feedback,
  isCorrect,
}: QuizQuestionProps) {
  return (
    <div className="text-lg w-full h-full flex items-center justify-center flex-col">
      <div className="mb-4">{question}</div>

      {feedback && (
        <div
          className={`mt-4 p-4 rounded-md text-center transition-all duration-500 
          ${isCorrect ? "bg-green-100 text-green-600 border-green-500" : "bg-red-100 text-red-600 border-red-500"}`}
        >
          <div className="text-xl font-semibold">{feedback}</div>
        </div>
      )}
    </div>
  );
}
