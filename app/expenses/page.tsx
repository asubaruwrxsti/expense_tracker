import prisma from "@/prisma/db";
import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import { calculatePercentage, readEnv } from "@/utils/dashboardUtils";
import RecentExpenses from "@/app/components/RecentExpenses";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Expenses',
	}
}

export default async function Expenses() {
	const categories = await prisma.categories.findMany();
	const expenses = await prisma.expense.findMany({
		include: {
			Categories: true,
		},
		where: {
			createdAt: {
				gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
			},
		},
	});

	// Calculate total and percentage for each category
	const categoryData = await Promise.all(categories.map(async (category) => {
		const categoryExpenses = expenses.filter((expense) => expense.categoriesId === category.id);
		const totalAmount = categoryExpenses.reduce((acc, expense) => acc + expense.amount, 0);
		const percentageData = await calculatePercentage(category.id);

		return {
			category,
			totalAmount,
			percentageData,
		};
	}));

	const normalExpenses = readEnv('EXPENSE') || [];

	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			<main>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
					<h1>Expenses</h1>
					<Link href={'/expenses/new'}>
						{/* TODO: Add dedicated class to this */}
						<button className={'notification add-reminder'}
							style={{
								padding: '1rem',
								border: 'none',
							}}>
							<i className={'material-icons-sharp'}>add</i>
							<span>Add Expense</span>
						</button>
					</Link>
				</div>
				<div className={'analyse'}>
					{categoryData.map(({ category, totalAmount, percentageData }, index) => (
						<div className={'sales'} key={index}>
							<Link href={`/expenses/categories/${category.id}`}>
								<div className={'status'}>
									<div className={'info'}>
										<h1 className={'card-text'}>{category.name}</h1>
										<h2 className={'card-text px-2'}>{totalAmount} ALL</h2>
									</div>
									<div className={'progresss'}>
										<svg>
											<circle cx="38" cy="38" r="36" style={{
												strokeDasharray: percentageData.dashArrayLength,
												strokeDashoffset: percentageData.dashOffset,
											}}></circle>
										</svg>
										<div className={'percentage'}>
											<p>{percentageData.completeness}</p>
										</div>
									</div>
								</div>
								<p className={'text-muted'}>% based off total income</p>
							</Link>
						</div>
					))}
					<div className={'sales'} key={'normal'}>
						<Link href={`/expenses/normal`}>
							<div className={'status'}>
								<div className={'info'}>
									<h1 className={'card-text'}>Normal Expenses</h1>
									<h2 className={'card-text px-2'}> {normalExpenses.reduce((acc, expense) => acc + parseInt(expense[1] || '0'), 0)} ALL</h2>
								</div>
							</div>
						</Link>
						<p className={'text-muted'}>* Based on env variables</p>
					</div>
				</div>
				<div style={{ marginBottom: '2rem' }}>
					<RecentExpenses take={100} enableLink={false} title="All Expenses" /> {/* Show 100 recent expenses */}
				</div>
			</main>
			<RightSection />
		</div>
	);
}
