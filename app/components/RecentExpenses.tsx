import prisma from "@/prisma/db";
import Link from "next/link";

export default async function RecentExpenses() {
	return (
		<div className="recent-orders">
			<h2>Recent Expenses</h2>
			<table>
				<thead>
				<tr>
					<td>Expense</td>
					<td>Description</td>
					<td>Amount</td>
					<td>Category</td>
					<td>Created At</td>
				</tr>
				</thead>
				<tbody>
				{await prisma.expense.findMany({take: 5}).then((expenses) => {
					return expenses.map((expense) => {
						return (
							<tr key={expense.id}>
								<td>{expense.name}</td>
								<td>{expense.description}</td>
								<td>{expense.amount}</td>
								<td>{expense.categoriesId}</td>
								<td>{new Date(expense.createdAt).toLocaleString()}</td>
							</tr>
						)
					})
				})}
				</tbody>
			</table>
			<Link href={'/expenses'}>View All Expenses</Link>
		</div>
	)
}