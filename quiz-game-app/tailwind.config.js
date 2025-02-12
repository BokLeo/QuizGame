module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/globals.css", // ✅ Tailwind가 글로벌 CSS 파일을 감지할 수 있도록 추가!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
