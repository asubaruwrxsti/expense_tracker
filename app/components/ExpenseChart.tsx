import Chart from 'chart.js/auto';
import prisma from "@/prisma/db";

export default async function ExpenseChart() {
	const data = await prisma.expense.findMany({
		select: {
			amount: true,
			createdAt: true,
		}
	}).then((expenses) => {
		return expenses.map((expense) => {
			return {
				x: expense.createdAt,
				y: expense.amount,
			}
		})
	});
	
	const lineChart = () => {
		return new Chart('lineChart', {
			type: 'line',
			data: {
				datasets: [{
					label: 'Expenses',
					data: data,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgb(255, 99, 132)',
					tension: 0.1,
				}]
			}
		});
	}
}