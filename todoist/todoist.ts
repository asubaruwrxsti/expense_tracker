import {TodoistApi} from "@doist/todoist-api-typescript";

const api = new TodoistApi(
	process.env.TODOIST_API_TOKEN as string
);

const globalForTodoist = globalThis as unknown as {
	todoist: TodoistApi | undefined
}

const todoist = globalForTodoist.todoist ?? api
export default todoist