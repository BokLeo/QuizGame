import HintModule from './HintButton';
import ReportModule from './ReportButton';

export default function ModulesLayout() {
	return (
		<div className="absolute top-0 left-full ml-2 flex flex-col gap-2">
			<HintModule />
			<ReportModule />
		</div>
	);
}