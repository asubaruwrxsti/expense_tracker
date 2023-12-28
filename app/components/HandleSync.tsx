'use client';
import { useRouter } from 'next/navigation';
import SweetAlert from "@/app/components/SweetAlert";

type SyncExpensesProps = {
	enabled: boolean;
}

export default async function SyncExpenses({ enabled }: SyncExpensesProps) {
	const router = useRouter();
	function handleSync() {
		fetch('/api/todoist', {
			method: 'GET',
		}).then((response) => {
			if (response.ok) {
				<SweetAlert
					title={'Success'}
					text={'Expenses synced successfully!'}
					icon={'success'}
					confirmButtonText={'Ok'}
					cancelButtonText={'Cancel'}
					confirmButtonColor={'#d33'}
					cancelButtonColor={'#3085d6'}
					showCancelButton={false}
					showConfirmButton={true}
					reverseButtons={false}
				/>
				router.refresh();
			} else {
				<SweetAlert
					title={'Error'}
					text={'Error syncing expenses!'}
					icon={'error'}
					confirmButtonText={'Ok'}
					cancelButtonText={'Cancel'}
					confirmButtonColor={'#d33'}
					cancelButtonColor={'#3085d6'}
					showCancelButton={false}
					showConfirmButton={true}
					reverseButtons={false}
				/>
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
