import Sidebar from "@/app/components/Sidebar";
import RightSection from "@/app/components/RightSection";
import todoist from '@/todoist/todoist';
import { Metadata } from "next";
import { calculatePercentageOfNumber, parseDescription } from "@/utils/todoistUtils";
import SyncExpenses from "@/app/components/HandleSync";
import SweetAlert from "@/app/components/SweetAlert";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Todoist'
	}
}

export default async function Todoist() {
	let hasError = {
		status: false,
		message: '',
	}

	const current_description: string = await todoist.getTask(process.env.TODOIST_TASK_ID as string).then(
		(task) => task.description
	).catch((error) => {
		hasError = {
			status: true,
			message: error.message,
		}
		return '';
	});

	const isEnabled = current_description !== '';

	return (
		<Suspense fallback={<Loading icon="info" />}>
			<div className={'container'}>
				<Sidebar active={'/todoist'} />
				<main>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: '10px',
							}}>
							<h1 className="text-center" style={{ marginRight: '10px' }}> Todoist </h1>
							<p className={'text-muted'}>Today's Date is: {new Date().toLocaleDateString()}</p>
						</span>
						<SyncExpenses enabled={isEnabled} />
					</div>
					<h3 style={{ fontSize: '16px', color: '#555', marginBottom: '15px' }}>
						Expenses today
					</h3>
					<div className={'analyse'}>
						{hasError && <SweetAlert
							title={'Error'}
							text={hasError.message}
							icon={'error'}
							confirmButtonText={'Ok'}
							cancelButtonText={'Cancel'}
							confirmButtonColor={'#d33'}
							cancelButtonColor={'#3085d6'}
							showCancelButton={false}
							showConfirmButton={true}
							reverseButtons={false}
						/>}
						{!isEnabled && !hasError.status && parseDescription(current_description).map(async (expense, index) => (
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
		</Suspense>
	)
}