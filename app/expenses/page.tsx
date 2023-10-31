import prisma from "@/prisma/db";
import Link from "next/link";

export default async function Expenses() {
	return (
		<div>
			<div>
				<Link href={'/expenses/new'}>Add Expense</Link>
				<h1>Expenses</h1>
			</div>
			<ul>
				{await prisma.expense.findMany().then((expenses) => {
					return expenses.map((expense) => {
						return (
							<li key={expense.id}>
								<Link href={`/expenses/${expense.id}`}>{expense.amount} - {expense.description}</Link>
							</li>
						)
					})
				}
				)}
			</ul>
		</div>
	)
}