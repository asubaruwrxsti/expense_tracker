import React, { Suspense } from 'react';
import prisma from '@/prisma/db';
import Link from "next/link";
import { Metadata } from "next";
import { Expense } from "@prisma/client";
import Loading from '@/app/components/Loading';

type Props = {
	params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const expense: Expense = await prisma.expense.findUnique({
		where: {
			id: parseInt(params.id)
		}
	}) as Expense
	return {
		title: expense.name,
	}
}

export default async function IDExpense({ params }: Props) {
	const expense: Expense = await prisma.expense.findUnique({
		where: {
			id: parseInt(params.id)
		}
	}) as Expense
	return (
		<main>
			<Suspense fallback={<Loading icon='info' />}>
				<Link href={'/expenses'}>Back to Expenses</Link>
				<h5>Expense {expense.description} (Where ID: {expense.id})</h5>
				<div>
					<h2>{expense.description}</h2>
					<p>{expense.amount}</p>
				</div>
			</Suspense>
		</main>
	)
}