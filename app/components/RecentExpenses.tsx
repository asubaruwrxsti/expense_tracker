import prisma from "@/prisma/db";
import Link from "next/link";

type ExpenseProps = {
	take?: number;
};

export default async function RecentExpenses({ take = 5 }: ExpenseProps) {
	const recentExpenses = await prisma.expense.findMany({
		take: take,
		include: {
			Categories: true, // Include the categories information
		},
	}) as any[];

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
					{recentExpenses.map((expense) => (
						<tr key={expense.id}>
							<td>{expense.name}</td>
							<td>{expense.description}</td>
							<td>{expense.amount}</td>
							<td>{expense.Categories.name || 'No category'}</td>
							<td>{new Date(expense.createdAt).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Link href={'/expenses'}>View All Expenses</Link>
		</div>
	);
}
