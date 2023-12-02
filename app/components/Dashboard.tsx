import prisma from "@/prisma/db";
import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import RecentExpenses from "@/app/components/RecentExpenses";

export default async function Dashboard() {
	function readEnv(keyString: string) {
		const envEntries = Object.entries(process.env);
		return envEntries.filter(([key, value]) => key.startsWith(keyString));
	}
	
	async function calculateExpenses() {
		const expense = await prisma.expense.aggregate({
			_sum: {
				amount: true,
			},
		});
		return `${expense._sum.amount} ALL`;
	}
	
	async function calculatePercentage() {
		const calculatedExpenses = () => {
			const expenses = readEnv('EXPENSE_');
			let totalExpenses = 0;
			expenses.forEach(([key, value]) => {
				totalExpenses += parseInt(value);
			});
			return totalExpenses;
		}
		const currentExpenses = parseInt(await calculateExpenses());
		const completeness = Math.round((currentExpenses / calculatedExpenses) * 100);
		const circumference = 2 * Math.PI * 36; // Replace 36 with the actual radius value
		
		const dashArrayLength = (completeness / 100) * circumference;
		
		return {
			completeness: `${completeness}%`,
			dashArrayLength: `${dashArrayLength} ${circumference}`,
			dashOffset: `${circumference - dashArrayLength}`,
		};
	}
	
	return (
		<div className={'container'}>
			<Sidebar/>
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
					</div>
				</div>
				<RecentExpenses/>
			</main>
			<RightSection/>
		</div>
	);
}
