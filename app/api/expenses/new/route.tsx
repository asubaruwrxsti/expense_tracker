import prisma from '@/prisma/db';
import {TodoistApi} from "@doist/todoist-api-typescript"

const api = new TodoistApi(
	process.env.TODOIST_API_TOKEN as string
);

export async function POST(request: Request) {
	const body = await request.json();
	await prisma.expense.create({
		data: {
			name: body.name,
			amount: parseFloat(body.amount),
			createdAt: new Date(),
			description: body.description,
			userId: 1,
			categoriesId: 1,
		}
	}).then(async (expense) => {
		const current_description = await api.getTask(process.env.TODOIST_TASK_ID as string).then(
			(task) => task.description
		)

		const today = new Date();
		const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;

		let new_description = `Name: ${expense.name}\nDescription: ${expense.description}\nAmount: ${expense.amount}`;
		new_description += `\n\n${current_description}`;

		const response = await api.updateTask(
			process.env.TODOIST_TASK_ID as string,
			{
				content: `${date}`,
				description: `${new_description}`,
			}
		);
		return new Response(JSON.stringify(response));
	}).catch((error) => {
		return new Response(JSON.stringify(error));
	});
}

export async function GET() {
	let today = new Date();
	const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;
	
	await prisma.expense.findMany({
		where: {
			createdAt: {
				gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
			}
		}
	}).then(async (expenses) => {
		if (expenses.length === 0) {
			await api.updateTask(
				process.env.TODOIST_TASK_ID as string,
				{
					content: `${date}`,
				}
			)
			return new Response(JSON.stringify([]));
		}
		return new Response(JSON.stringify(expenses));
	});
}