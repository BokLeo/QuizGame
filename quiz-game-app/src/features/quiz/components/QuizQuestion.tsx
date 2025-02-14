interface QuizQuestionProps {
  question: string;
  image?: string;
}

export default function QuizQuestion({ question, image }: QuizQuestionProps) {
  return (
    <div className="text-lg w-full h-full flex items-center justify-center">
      {image ? <img src={image} alt="퀴즈 이미지" className="rounded-md" /> : question}
    </div>
  );
}
