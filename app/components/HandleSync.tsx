'use client';
import { useRouter } from 'next/navigation';

type SyncExpensesProps = {
	enabled: boolean;
}

export default async function SyncExpenses({ enabled }: SyncExpensesProps) {
	function handleSync() {
		const router = useRouter();

		fetch('/api/todoist', {
			method: 'GET',
		}).then((response) => {
			if (response.ok) {
				alert('Successfully synced expenses!');
				router.push('/expenses');
			} else {
				alert('Error syncing expenses!');
				router.refresh();
			}
		});
	}

	if (!enabled) {
		return (
			< button className={'notification add-reminder'}
				style={{
					padding: '1rem',
					border: 'none',
				}}
				disabled
			>
				<i className={'material-icons-sharp'}>thumb_up</i>
				<span>Synced</span>
			</button >
		)
	} else {
		return (
			< button className={'notification add-reminder'}
				style={{
					padding: '1rem',
					border: 'none',
				}}
				onClick={handleSync}
			>
				<i className={'material-icons-sharp'}>sync</i>
				<span>Sync Expenses</span>
			</button >
		);
	}
}
