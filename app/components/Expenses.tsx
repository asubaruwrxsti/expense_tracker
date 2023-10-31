import prisma from "@/prisma/db";

export default async function Expenses() {
	return (
		<div className={'expenses mt-5'}>
			<h5>Expenses</h5>
			<ul>
				{await prisma.expense.findMany().then((expenses) => {
					return expenses.map((expense) => {
						return (
							<li key={expense.id}>
								{expense.amount} - {expense.name} - {expense.description}
							</li>
						)
					})}
				)}
			</ul>
		</div>
	)
}