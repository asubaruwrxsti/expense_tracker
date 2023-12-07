import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import todoist from '@/todoist/todoist';
import { Metadata } from "next";
import { readEnv } from "@/utils/dashboardUtils";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Todoist'
	}
}

type Expense = {
	name: string;
	description: string;
	category: string;
	amount: number;
}

export default async function Todoist() {
	const current_description: string = await todoist.getTask(process.env.TODOIST_TASK_ID as string).then(
		(task) => task.description
	).catch((error) => {
		console.error(error);
		return '';
	});

	function parseDescription(description: string) {
		if (description === '') { return []; }

		const lines = description.split('\n');
		const filtered = lines.filter((line) => line !== '');
		const expenses: Expense[] = [];
		for (let i = 0; i < filtered.length; i += 4) {
			const expense: Expense = {
				name: filtered[i] ? filtered[i].split(':')[1].trim() : '',
				description: filtered[i + 1] ? filtered[i + 1].split(':')[1].trim() : '',
				category: filtered[i + 2] ? filtered[i + 2].split(':')[1].trim() : '',
				amount: filtered[i + 3] ? parseFloat(filtered[i + 3].split(':')[1].trim()) : 0,
			}
			expenses.push(expense);
		}
		return expenses;
	}


	async function calculatePercentageOfNumber(total: number) {
		const normalExpenses = () => {
			const expenses = readEnv('EXPENSE_');
			let total = 0;
			expenses.forEach(([key, value]) => {
				total += parseInt(value as string);
			});
			return total;
		};

		const completeness = Math.round((total / normalExpenses()) * 100);
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
			<Sidebar active={'/todoist'} />
			<main style={{ flex: '1', padding: '20px' }}>
				<span
					style={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '10px',
					}}>
					<h1 className="text-center" style={{ marginRight: '10px' }}> Todoist </h1>
					<p className={'text-muted'}>Today's Date is: {new Date().toLocaleDateString()}</p>
				</span>
				<h3 style={{ fontSize: '16px', color: '#555', marginBottom: '15px' }}>
					Expenses today
				</h3>
				<div className={'analyse'}>
					{parseDescription(current_description).map(async (expense, index) => (
						<div className={'sales'} key={index}>
							<div className={'status'}>
								<div className={'info'}>
									<h1 className={'card-text'}>{expense.name}</h1>
									<p className={'card-text px-2'}>{expense.description}</p>
									<p className={'card-text px-2'}>{expense.category}</p>
									<p className={'card-text px-2'}>{expense.amount} ALL</p>
								</div>
								<div className={'progresss'}>
									<svg>
										<circle cx="38" cy="38" r="36" style={{
											strokeDasharray: (await calculatePercentageOfNumber(expense.amount)).dashArrayLength,
											strokeDashoffset: (await calculatePercentageOfNumber(expense.amount)).dashOffset,
										}}></circle>
									</svg>
									<div className={'percentage'}>
										<p>{(await calculatePercentageOfNumber(expense.amount)).completeness}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
			<RightSection />
		</div>
	)
}