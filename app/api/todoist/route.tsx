import { TodoistApi } from "@doist/todoist-api-typescript"
import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

const api = new TodoistApi(
	process.env.TODOIST_API_TOKEN as string
);

export async function GET(request: Request) {
	const tasks = await api.getTasks();
	const projectTasks = tasks.filter((task) => {
		return task.projectId === process.env.TODOIST_EXPENSE_PROJECT_ID as string;
	});

	return NextResponse.json({
		projectTasks,
	});
}

export async function POST(request: Request) {

}