import { readEnv, normalExpenses } from "@/utils/dashboardUtils";

type Expense = {
	name: string;
	description: string;
	category: string;
	amount: number;
}

export  function parseDescription(description: string) {
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

export async function calculatePercentageOfNumber(total: number) {

	const completeness = Math.round((total / normalExpenses()) * 100);
	const circumference = 2 * Math.PI * 36; // Replace 36 with the actual radius value
	const dashArrayLength = (completeness / 100) * circumference;

	return {
		completeness: `${completeness}%`,
		dashArrayLength: `${dashArrayLength} ${circumference}`,
		dashOffset: `${circumference - dashArrayLength}`,
	};
}