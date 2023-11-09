import prisma from '@/prisma/db';
import { TodoistApi } from "@doist/todoist-api-typescript"

export async function POST(request: Request) {
	const body = await request.json();
	const expense = await prisma.expense.create({
		data: {
			name: body.name,
			amount: parseFloat(body.amount),
			createdAt: new Date(),
			description: body.description,
			userId: 1,
			categoriesId: 1,
		}
	}).then(async (expense) => {
		// const api = new TodoistApi(
		// 	process.env.TODOIST_API_TOKEN as string
		// );
		//
		// const today = new Date();
		// const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;
		//
		// const description = `Name: ${expense.name}\nDescription: ${expense.description}\nAmount: ${expense.amount}`;
		//
		// const response = await api.updateTask(
		// 	process.env.TODOIST_TASK_ID as string,
		// 	{
		// 		content: `${date}`,
		// 		description: ``,
		// 	}
		// );
	}).catch((error) => {
		console.error(error);
	});
	return new Response(JSON.stringify(expense));
}