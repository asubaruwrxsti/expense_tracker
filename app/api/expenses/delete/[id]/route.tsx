import prisma from '@/prisma/db';
export async function DELETE(request: Request) {
	const body = await request.json();
	const expense = await prisma.expense.delete({
		where: {
			id: parseInt(body.id)
		}
	});
	return new Response(JSON.stringify(expense));
}