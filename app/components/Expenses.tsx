import prisma from "@/prisma/db";
import Link from "next/link";
import ExpenseChart from "@/app/components/ExpenseChart";

export default async function Expenses() {
	return (
		<>
			<ExpenseChart />
			<h5>Expenses</h5>
			<div className={'expenses d-flex flex-wrap justify-content-left'}>
				{await prisma.expense.findMany().then((expenses) => {
					return expenses.map((expense) => {
						return (
							<div className={'card mt-1 ml-1 col-lg-5'} key={expense.id}>
								<div className={'card-body'}>
									<Link href={`/expenses/${expense.id}`} className={'card-title'}>
										<h6> {expense.name} </h6>
									</Link>
									<p className={'card-text'}>{expense.description}</p>
									<p className={'card-text'}>{expense.amount}</p>
								</div>
								<div className={'card-footer'}>
									<small className={'text-muted'}>Created at: {new Date(expense.createdAt).toLocaleString()}</small>
									<div className={'float-right'}>
										<button className={'btn btn-sm btn-outline-primary mr-1'}>Edit</button>
										<button className={'btn btn-sm btn-outline-danger'}>Delete</button>
									</div>
								</div>
							</div>
						)
					})}
				)}
			</div>
		</>
	)
}
