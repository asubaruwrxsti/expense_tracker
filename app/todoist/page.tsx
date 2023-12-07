import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import todoist from '@/todoist/todoist';
import { Metadata } from "next";
import { calculatePercentageOfNumber, parseDescription } from "@/utils/todoistUtils";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Todoist'
	}
}

export default async function Todoist() {
	const current_description: string = await todoist.getTask(process.env.TODOIST_TASK_ID as string).then(
		(task) => task.description
	).catch((error) => {
		console.error(error);
		return '';
	});

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