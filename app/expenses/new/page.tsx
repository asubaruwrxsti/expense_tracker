import NewExpenseForm from "@/app/components/NewExpenseForm";
import Sidebar from "@/app/components/LeftSection";
import RightSection from "@/app/components/RightSection";
import prisma from "@/prisma/db";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";


export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'New Expense',
	}
}

export default async function NewExpense() {
	const categories = await prisma.categories.findMany();
	const selectData = categories.map(category => ({ ...category, id: String(category.id) }));
	return (
		<Suspense fallback={<Loading icon="info" />}>
			<div className={'container'}>
				<Sidebar active={'/expenses'} />
				<main>
					<h1>New Expense Form</h1>
					<NewExpenseForm selectData={selectData} />
				</main>
				<RightSection />
			</div>
		</Suspense>
	)
}