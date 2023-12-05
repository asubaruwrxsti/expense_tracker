import prisma from "@/prisma/db";
import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import { calculatePercentage } from "@/utils/dashboardUtils";
import RecentExpenses from "@/app/components/RecentExpenses";
import Link from "next/link";

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

	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			<main>
				<h1>Expenses</h1>
				<div className={'analyse'}>
					{categoryData.map(({ category, totalAmount, percentageData }) => (
						<div className={'sales'}>
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
				</div>
				<RecentExpenses take={100} /> {/* Show 100 recent expenses */}
			</main>
			<RightSection />
		</div>
	);
}
