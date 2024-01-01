import prisma from "@/prisma/db";
// TODO: Error handling for prisma queries
// TODO: apply the calculations for this month only
// TODO: migrate readEnv to reading from the database
// TODO: Fix the percentage calculation

export function readEnv(keyString: string) {
	const envEntries = Object.entries(process.env);
	return envEntries.filter(([key, value]) => key.startsWith(keyString));
}

export const normalExpenses = () => {
	const expenses = readEnv('EXPENSE_');
	let total = 0;
	expenses.forEach(([key, value]) => {
		total += parseInt(value as string);
	});
	return total;
};

export async function calculateExpenses() {
	const expense = await prisma.expense.aggregate({
		_sum: {
			amount: true,
		},
		where: {
			createdAt: {
				gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
			},
		},
	});
	return `${expense!._sum.amount} ALL`;
}

export async function calculateBudget() {
	// TODO: Dont hardcode the id, get the id from the session
	let totalBudget: any = await prisma.user.findUnique({
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

export async function calculateIncome() {
	const income = readEnv('INCOME_');
	let total = 0;
	income.forEach(([key, value]) => {
		total += parseInt(value as string);
	});
	return `${total} ALL`;
}

export async function compareLastMonth() {
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

export async function calculatePercentage(categoryId: number = 0) {
	if (categoryId === 0) {

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
	} else {
		// Calculate percentage based on expenses of a specific category
		// Calculate percentage based on normal expenses
		const expenses = await prisma.expense.findMany({
			where: {
				categoriesId: categoryId,
			},
		});

		const totalIncome = parseInt(await calculateIncome().then((income) => income.split(' ')[0]));
		const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
		const completeness = Math.round((totalAmount / totalIncome) * 100);
		const circumference = 2 * Math.PI * 36; // Replace 36 with the actual radius value
		const dashArrayLength = (completeness / 100) * circumference;

		return {
			completeness: `${completeness}%`,
			dashArrayLength: `${dashArrayLength} ${circumference}`,
			dashOffset: `${circumference - dashArrayLength}`,
		};
	}
}
