import prisma from "@/prisma/db";
import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import RecentExpenses from "@/app/components/RecentExpenses";

export default async function Dashboard() {
	// TODO: Move the helper functions to a separate file
	// TODO: Error handling for prisma queries
	
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
	
	async function calculateBudget() {
		// TODO: Dont hardcode the id, get the id from the session
		let totalBudget = await prisma.user.findUnique({
			where: {
				id: 1,
			},
		}).then((user) => {
			if (user) {
				return user.totalBudget;
			}
		});
		return `${totalBudget} ALL`;
	}
	
	async function calculateIncome() {
		const income = readEnv('INCOME_');
		let total = 0;
		income.forEach(([key, value]) => {
			total += parseInt(value as string);
		});
		return `${total} ALL`;
	}
	
	async function compareLastMonth() {
		function getDates(month: number, year: number) {
			if (month) {
				const firstDay = new Date(year, month, 1);
				const lastDay = new Date(year, month + 1, 0);
				return [firstDay, lastDay];
			}
			
			const firstDay = new Date(year, 0, 1);
			const lastDay = new Date(year, 12, 0);
			return [firstDay, lastDay];
		}
		const currentMonthExpenses = await prisma.expense.aggregate({
			_sum: {
				amount: true,
			},
			where: {
				createdAt: {
					gte: getDates(new Date().getMonth(), new Date().getFullYear())[0],
					lte: getDates(new Date().getMonth(), new Date().getFullYear())[1],
				},
			},
		}) as any;
		
		const lastMonthExpenses = await prisma.expense.aggregate({
			_sum: {
				amount: true,
			},
			where: {
				createdAt: {
					gte: getDates(new Date().getMonth() - 1, new Date().getFullYear())[0],
					lte: getDates(new Date().getMonth() - 1, new Date().getFullYear())[1],
				},
			},
		}) as any;
		const percentage = Math.round(((currentMonthExpenses._sum.amount - lastMonthExpenses._sum.amount) / lastMonthExpenses._sum.amount) * 100);
		let iconClass, textClass;
		
		// TODO: Fix the coloring
		if (percentage > 0) {
			iconClass = 'material-icons-sharp text-success';
			textClass = 'text-success';
		} else if (percentage < 0) {
			iconClass = 'material-icons-sharp text-danger';
			textClass = 'text-danger';
		} else {
			iconClass = 'material-icons-sharp text-warning';
			textClass = 'text-warning';
		}
		
		return (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span className={iconClass}>
					{percentage > 0 ? 'arrow_upward' : (percentage < 0 ? 'arrow_downward' : 'arrow_right_alt')}
				</span>
				<p className={textClass}>{percentage}%</p>
			</div>
		);
	}
	
	async function calculatePercentage() {
		const normalExpenses = () => {
			const expenses = readEnv('EXPENSE_');
			let total = 0;
			expenses.forEach(([key, value]) => {
				total += parseInt(value as string);
			});
			return total;
		}
		
		const currentExpenses = parseInt((await calculateExpenses()).split(' ')[0]);
		const completeness = Math.round((currentExpenses / normalExpenses()) * 100);
		const circumference = 2 * Math.PI * 36; // Replace 36 with the actual radius value
		
		const dashArrayLength = (completeness / 100) * circumference;
		
		return {
			normalExpenses: normalExpenses(),
			completeness: `${completeness}%`,
			dashArrayLength: `${dashArrayLength} ${circumference}`,
			dashOffset: `${circumference - dashArrayLength}`,
		};
	}
	
	return (
		<div className={'container'}>
			<Sidebar active={'/'}/>
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
					<div className={'sales'}>
						<div className={'status'}>
							<div className={'info'}>
								<h1 className={'card-text'}>Normal Expenses</h1>
								<h2 className={'card-text px-2'}>{(await calculatePercentage()).normalExpenses} ALL</h2>
							</div>
						</div>
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
				<RecentExpenses/>
			</main>
			<RightSection/>
		</div>
	);
}
