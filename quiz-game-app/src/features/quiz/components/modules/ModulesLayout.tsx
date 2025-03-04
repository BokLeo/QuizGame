import { useState } from 'react';
import HintModule from './HintButton';
import ReportModule from './ReportButton';

interface ModulesLayoutProps {
	onHintClicked: (clicked: boolean) => void;
}

export default function ModulesLayout({onHintClicked}: ModulesLayoutProps) {
	const [hintClicked, setHintClicked] = useState(false);

	const handleHintClick = () => {
		setHintClicked(!hintClicked);
		onHintClicked(hintClicked);
	}
	return (
		<div className="absolute top-0 left-full ml-2 flex flex-col gap-2">
			<HintModule onClick={handleHintClick} hintClicked={hintClicked} />
			<ReportModule />
		</div>
	);
}