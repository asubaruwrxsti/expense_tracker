import prisma from "@/prisma/db";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import RecentExpenses from "@/app/components/RecentExpenses";
import RightSection from "@/app/components/RightSection";

export default async function Expenses() {
	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'}/>
			<main>
				<h1>Expenses</h1>
				<div className={'analyse'}>
					{await prisma.expense.findMany({take: 9}).then((expenses) => {
						return expenses.map((expense) => {
							return (
								<div className={'sales'} key={expense.id}>
									<div className={'status'}>
										<div className={'info'}>
											<Link href={`/expenses/${expense.id}`} className={'card-title'}>
												<h3 className={'card-text'}>{expense.name}</h3>
												<hr />
											</Link>
											<h1 className={'card-text'}>{expense.amount}</h1>
											<h5 className={'card-text'}>{expense.description}</h5>
										</div>
										<div className={'progresss'}>
											<svg>
												<circle cx="38" cy="38" r="36"></circle>
											</svg>
											<div className={'percentage'}>
												<p>+81%</p>
											</div>
											{/*<small className={'text-muted'}>Created at: {new Date(expense.createdAt).toLocaleString()}</small>*/}
										</div>
									</div>
								</div>
							)
						})}
					)}
				</div>
			</main>
			<RightSection />
		</div>
	)
}