interface HintButtonProps {
	onClick: () => void;
	hintClicked: boolean;
}
export default function HintButton({ onClick, hintClicked }: HintButtonProps) {
	return (
		<>
			<button className={`sub-button ${hintClicked ? 'clicked' : ''}`} onClick={onClick}>Hint</button>
		</>
	);
}