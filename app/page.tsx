import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import RecentExpenses from "@/app/components/RecentExpenses";
import { calculateExpenses, calculatePercentage, calculateBudget, compareLastMonth, calculateIncome, readEnv } from "@/utils/dashboardUtils";
import Link from "next/link";

export default async function Home() {
	const normalExpenses = readEnv('EXPENSE') || [];

	return (
		<div className={'container'}>
			<Sidebar active={'/'} />
			<main>
				<h1>Dashboard</h1>
				<div className={'analyse'}>
					<div className={'sales'}>
						<div className={'status'}>
							<div className={'info'}>
								<h1 className={'card-text'}>Total Expenses</h1>
								<h2 className={'card-text px-2'}>{await calculateExpenses()}</h2>
							</div>
							<div className={'progresss'}>
								<svg>
									<circle cx="38" cy="38" r="36" style={{
										strokeDasharray: (await calculatePercentage()).dashArrayLength,
										strokeDashoffset: (await calculatePercentage()).dashOffset,
									}}></circle>
								</svg>
								<div className={'percentage'}>
									<p>{(await calculatePercentage()).completeness}</p>
								</div>
							</div>
						</div>
						<p className={'text-muted'}>% based off normal expenses</p>
					</div>
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
					<div className={'sales'}>
						<div className={'status'}>
							<div className={'info'}>
								<h1 className={'card-text'}>Estimated Budget</h1>
								<h2 className={'card-text px-2'}>{await calculateBudget()}</h2>
							</div>
						</div>
					</div>
					<div className={'sales'}>
						<div className={'status'}>
							<div className={'info'}>
								<h1 className={'card-text'}>Compared to {new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'short' })}</h1>
								<h2 className={'card-text px-2'}>
									{await compareLastMonth()}
								</h2>
							</div>
						</div>
					</div>
					<div className={'sales'}>
						<div className={'status'}>
							<div className={'info'}>
								<h1 className={'card-text'}>Total Income</h1>
								<h2 className={'card-text px-2'}>{await calculateIncome()}</h2>
							</div>
						</div>
					</div>
				</div>
				<RecentExpenses take={3} />
			</main>
			<RightSection />
		</div>
	);
}
