import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";

export default function Loading() {
	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			<main>
				<h1>Loading...</h1>
			</main>
			<RightSection />
		</div>
	)
}