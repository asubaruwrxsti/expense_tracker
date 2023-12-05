import prisma from "@/prisma/db";
import Link from "next/link";

type ExpenseProps = {
	take?: number;
	enableLink?: boolean;
	title?: string;
};

export default async function RecentExpenses({ take = 5, enableLink = true, title = "Recent Expenses" }: ExpenseProps) {
	const recentExpenses = await prisma.expense.findMany({
		take: take,
		include: {
			Categories: true, // Include the categories information
		},
	}) as any[];

	return (
		<div className="recent-orders">
			{title ? <h1>{title}</h1> : null}
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
			{enableLink ? (
				<Link href="/expenses">View all expenses</Link>
			) : null}
		</div>
	);
}
