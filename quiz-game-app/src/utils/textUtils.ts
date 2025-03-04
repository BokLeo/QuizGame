export function getChosung(text: string): string {
  const chosung = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];

  return text.split('').map(char => {
    const code = char.charCodeAt(0);

    // 한글 음절 범위(가 ~ 힣)에 속하는지 확인
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const syllableIndex = code - 0xAC00;
      const choIndex = Math.floor(syllableIndex / (21 * 28));  // 초성 인덱스
      return chosung[choIndex];  // 초성 반환
    }
    return '';  // 한글 음절이 아니면 빈 문자열
  }).join('');
}
