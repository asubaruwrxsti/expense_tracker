import RightSection from "@/app/components/RightSection";
import Sidebar from "@/app/components/LeftSection";
import { readEnv } from "@/utils/dashboardUtils";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Normal Expenses',
	}
}

export default async function NormalExpenses() {
	const normalExpenses = readEnv('EXPENSE') || [];

	return (
		<Suspense fallback={<Loading icon="info" />}>
			<div className={'container'}>
				<Sidebar active={'/expenses'} />
				{normalExpenses.length === 0 && (
					<>
						<main>
							<div className={'recent-orders'}>
								<h1 className={'text-center'}>No expenses found</h1>
							</div>
						</main>
						<RightSection />
					</>
				)}
				{normalExpenses.length > 0 && (
					<main>
						<div className={'recent-orders'}>
							<span
								style={{
									display: 'flex',
									alignItems: 'center',
									marginBottom: '10px',
								}}
							>
								<h1 className={'text-center'} style={{ marginRight: '10px' }}>
									{'Normal Expenses'}
								</h1>
								<p className={'text-muted'}>* Based on .env file</p>
							</span>
							<table>
								<thead>
									<tr>
										<td>Description</td>
										<td>Amount</td>
									</tr>
								</thead>
								<tbody>
									{normalExpenses.map((expense, index) => (
										<tr key={index}>
											<td>{expense[0]}</td>
											<td>{expense[1]} ALL</td>
										</tr>
									))}
									<tr key={'total'}>
										<td>TOTAL: {normalExpenses.reduce((acc, expense) => acc + parseInt(expense[1] || '0'), 0)} ALL</td>
									</tr>
								</tbody>
							</table>
						</div>
					</main>
				)}
				<RightSection />
			</div>
		</Suspense>
	);
}
