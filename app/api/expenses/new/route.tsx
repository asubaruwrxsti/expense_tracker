import prisma from '@/prisma/db';
import todoist from '@/todoist/todoist';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const expense = await prisma.expense.create({
			data: {
				name: body.name,
				amount: parseFloat(body.amount),
				createdAt: new Date(),
				description: body.description,
				userId: 1,
				categoriesId: 1,
			},
		});

		const current_description = await todoist.getTask(process.env.TODOIST_TASK_ID as string).then(
			(task) => task.description
		);

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

		return new NextResponse(JSON.stringify(response));
	} catch (error) {
		console.error('Error processing form:', error);
		return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
		});
	}
}
