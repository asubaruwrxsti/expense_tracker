import NewExpenseForm from "@/app/components/NewExpenseForm";
import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
export default function NewExpense() {
	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			<main>
				<h1>New Expense Form</h1>
				<NewExpenseForm />
			</main>
			<RightSection />
		</div>
	)
}