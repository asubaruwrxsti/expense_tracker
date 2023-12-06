import prisma from "@/prisma/db";
import todoist from '@/todoist/todoist';
import { NextResponse } from 'next/server';

export async function GET() {
	let today = new Date();
	const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;

	return await prisma.expense.findMany({
		where: {
			createdAt: {
				gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
			}
		}
	}).then(async (expenses) => {
		if (expenses.length === 0) {
			await todoist.updateTask(
				process.env.TODOIST_TASK_ID as string,
				{
					content: `${date}`,
				}
			)
			return new NextResponse(JSON.stringify([]));
		}
		return new NextResponse(JSON.stringify(expenses));
	});
}