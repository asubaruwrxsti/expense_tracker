import prisma from '@/prisma/db';
import todoist from '@/todoist/todoist';

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
		const current_description = await todoist.getTask(process.env.TODOIST_TASK_ID as string).then(
			(task) => task.description
		)

		const today = new Date();
		const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;

		let new_description = `Name: ${expense.name}\nDescription: ${expense.description}\nAmount: ${expense.amount}`;
		new_description += `\n\n${current_description}`;

		const response = await todoist.updateTask(
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