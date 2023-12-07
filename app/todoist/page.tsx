import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import prisma from "@/prisma/db";

export default async function Todoist() {
	return (
		<div className={'container'}>
			<Sidebar active={'/todoist'} />
			<main>
				<h1>Welcome to Todoist</h1>
			</main>
			<RightSection />
		</div>
	)
}