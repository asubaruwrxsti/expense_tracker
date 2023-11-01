import prisma from "@/prisma/db";

export default async function Expenses() {
	return (
		<div className={'expenses mt-5'}>
			<h5>Expenses</h5>
			{await prisma.expense.findMany().then((expenses) => {
				return expenses.map((expense) => {
					return (
						<>
							<div className={'card mt-1'} key={expense.id}>
								<div className={'card-body'}>
									<h6 className={'card-title'}>{expense.name}</h6>
									<p className={'card-text'}>{expense.description}</p>
									<p className={'card-text'}>{expense.amount}</p>
								</div>
							</div>
						</>
					)
				})}
			)}
		</div>
	)
}