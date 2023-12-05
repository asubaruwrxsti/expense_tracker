import prisma from '@/prisma/db';
import Sidebar from '@/app/components/Sidebar';
import RightSection from '@/app/components/RightSection';

type CategoryProps = {
	params: { id: string };
};

// TODO: Add category CRUD
export default async function IDCategory({ params }: CategoryProps) {
	const categoryExpenses = await prisma.expense.findMany({
		where: {
			categoriesId: parseInt(params.id),
		},
		include: {
			Categories: true,
		},
	}) as any[];

	return (
		<div className={'container'}>
			<Sidebar active={'/expenses'} />
			{categoryExpenses.length === 0 && (
				<>
					<main>
						<div className={'recent-orders'}>
							<h1 className={'text-center'}>No expenses found</h1>
						</div>
					</main>
					<RightSection />
				</>
			)}
			{categoryExpenses.length > 0 && (
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
								{categoryExpenses[0].Categories.name}
							</h1>
							<p className={'text-muted'}>Category Expenses</p>
						</span>
						<table>
							<thead>
								<tr>
									<td>Expense</td>
									<td>Description</td>
									<td>Amount</td>
									<td>Category</td>
									<td>Created At</td>
								</tr>
							</thead>
							<tbody>
								{categoryExpenses.map((expense) => (
									<tr key={expense.id}>
										<td>{expense.name}</td>
										<td>{expense.description}</td>
										<td>{expense.amount}</td>
										<td>{expense.Categories.name || 'No category'}</td>
										<td>{new Date(expense.createdAt).toLocaleString()}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</main>
			)}
			<RightSection />
		</div>
	);
}