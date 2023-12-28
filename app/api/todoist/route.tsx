import prisma from '@/prisma/db';
import todoist from '@/todoist/todoist';
import { NextResponse } from 'next/server';
import { parseDescription } from '@/utils/todoistUtils';

export async function GET(request: Request) {
	try {
		const current_description = await todoist.getTask(process.env.TODOIST_TASK_ID as string).then(
			(task) => task.description
		).catch((error) => {
			return '';
		});

		const expenses = parseDescription(current_description);
		for (const expense of expenses) {
			await prisma.expense.create({
				data: {
					name: expense.name,
					amount: expense.amount,
					createdAt: new Date(),
					description: expense.description,
					userId: 1,
					categoriesId: 1,
				},
			}).catch((error) => {
				return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
					status: 500,
				});
			});
		}

		// TODO: Find solution to either set default description
		// or to implement a form
		// TODO: Parse description so no invalid data is sent to the db
		const task = await todoist.updateTask(
			process.env.TODOIST_TASK_ID as string,
			{
				description: '',
			}
		).catch((error) => {
			return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
				status: 500,
			});
		});

		return new NextResponse(JSON.stringify(task));

	} catch (error) {
		return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
		});
	}
}