import React, { useState, useRef } from 'react';

interface QuizInputProps {
  answerLength: number;
  onSubmit: (answer: string) => void;
}

const QuizInput: React.FC<QuizInputProps> = ({ answerLength, onSubmit }) => {
  const [letters, setLetters] = useState<string[]>(Array(answerLength).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 특정 인덱스의 값을 업데이트하는 헬퍼 함수
  const updateLetter = (index: number, newLetter: string) => {
    setLetters(prev => {
      const updated = [...prev];
      updated[index] = newLetter;
      return updated;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // composition 과정 중이거나 종료 후, 별도 처리는 onCompositionEnd에서 진행하므로
    // 여기서는 그대로 상태를 업데이트합니다.
    updateLetter(index, e.target.value);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>, index: number) => {
		// debugger;
    let value = e.currentTarget.value;
    // 정규화(NFC)하여 가능한 한 완성된 음절로 변환
    let normalized = value.normalize("NFC");
    console.log(normalized, index);

    if (normalized.length > 1) {
      // 현재 입력창에 여러 글자가 입력된 경우,
      // 첫 번째 글자는 현재 칸에, 나머지 글자들은 뒤 칸들로 전달합니다.
      const firstSyllable = normalized[0];
      updateLetter(index, firstSyllable);

      // 남은 문자들을 다음 칸부터 채워 넣음
      let remaining = normalized.slice(1);
      let currentIndex = index + 1;
      while (remaining.length && currentIndex < answerLength) {
        // 만약 남은 값이 여러 글자라면, 첫 글자가 완성된 음절인지 확인
        const char = remaining[0].normalize("NFC");
        updateLetter(currentIndex, char);
        remaining = remaining.slice(1);
        currentIndex++;
      }
      // 다음 입력창에 포커스를 맞춤
      if (index + 1 < answerLength) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // 한 글자인 경우: 완성 음절이면 그대로 적용하고, 아니면 그대로 둡니다.
      updateLetter(index, normalized);
      // 완성된 한글 음절이면 다음 칸으로 포커스 이동
      if (/^[가-힣]$/.test(normalized) && index < answerLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && letters[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(letters.join(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '8px' }}>
        {letters.map((letter, index) => (
          <input
            key={index}
            type="text"
            value={letter}
            onChange={(e) => handleChange(e, index)}
            onCompositionEnd={(e) => handleCompositionEnd(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '24px',
            }}
            // IME 조합에 방해되지 않도록 maxLength 제거
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default QuizInput;
