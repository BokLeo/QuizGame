import React, { useState } from "react";

interface QuizSettingsProps {
  onStart: (questionCount: number) => void;
  defaultCount?: number;
}

const QuizSettings: React.FC<QuizSettingsProps> = ({
  onStart,
  defaultCount = 5,
}) => {
  const [questionCount, setQuestionCount] = useState<number>(defaultCount);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>퀴즈 설정</h2>
      <label>
        문항 수:
        <input
          type="number"
          value={questionCount}
          min={1}
          max={20}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          style={{ marginLeft: "10px", width: "50px" }}
        />
      </label>
      <br />
      <button onClick={() => onStart(questionCount)} style={{ marginTop: "20px" }}>
        시작
      </button>
    </div>
  );
};

export default QuizSettings;
