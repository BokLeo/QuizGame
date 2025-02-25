// pages/api/proverb-quiz.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { proverbQuizzes, Quiz } from '@/entities/quiz/proverbQuizData';

// Fisher-Yates 알고리즘으로 배열 섞기
const shuffleArray = (array: Quiz[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 쿼리 파라미터로 가져올 문제 개수를 지정 (기본값 10)
  const count = parseInt(req.query.count as string, 10) || 10;
  const randomQuizzes = shuffleArray(proverbQuizzes).slice(0, count);
  res.status(200).json(randomQuizzes);
}
