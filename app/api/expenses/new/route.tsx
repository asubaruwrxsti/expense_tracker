import prisma from '@/prisma/db';
export async function POST(request: Request) {
	const body = await request.json();
	const expense = await prisma.expense.create({
		data: {
			name: body.name,
			amount: parseFloat(body.amount),
			createdAt: new Date(),
			description: body.description,
			userId: 1,
			categoriesId: 1
		}
	});
	return new Response(JSON.stringify(expense));
}