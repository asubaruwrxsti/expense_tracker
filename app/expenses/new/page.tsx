import NewExpenseForm from "@/app/components/NewExpenseForm";
import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import prisma from "@/prisma/db";

export default async function NewExpense() {
	const categories = await prisma.categories.findMany();
	const selectData = categories.map(category => ({ ...category, id: String(category.id) }));
	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			<main>
				<h1>New Expense Form</h1>
				<NewExpenseForm selectData={selectData} />
			</main>
			<RightSection />
		</div>
	)
}