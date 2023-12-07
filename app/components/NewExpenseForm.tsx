'use client';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type NewExpenseFormProps = {
	name: string;
	description: string;
	amount: number;
	category: string;
	selectData?: {
		id: string;
		name: string;
	}[];
};

export default function NewExpenseForm({ selectData }: { selectData: NewExpenseFormProps['selectData'] }) {
	const router = useRouter();

	const [formData, setFormData] = useState<NewExpenseFormProps>({
		name: '',
		description: '',
		amount: 0,
		category: 'Choose a category',
	});

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		await fetch('/api/expenses/new', {
			method: 'POST',
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (response.ok) {
					router.push('/expenses');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [id]: value }));
	};

	return (
		<div className='container' style={{ display: 'flex' }}>
			<div className='analyse'
				style={{
					margin: '0 auto',
					display: 'flex',
					width: '100%',
				}}>
				<div className='sales' style={{
					width: '100%',
				}}>
					<form onSubmit={handleSubmit}>
						<div style={{ marginBottom: '1rem' }}>
							<label htmlFor="name">
								Name
							</label>
							<input
								type="text"
								id="name"
								placeholder="Enter name"
								value={formData.name}
								onChange={handleInputChange}
							/>
						</div>
						<div style={{ marginBottom: '1rem' }}>
							<label htmlFor="description">
								Description
							</label>
							<input
								type="text"
								id="description"
								placeholder="Enter description"
								value={formData.description}
								onChange={handleInputChange}
							/>
						</div>
						<div style={{ marginBottom: '1rem' }}>
							<label htmlFor="amount">
								Amount
							</label>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									type="number"
									id="amount"
									placeholder="Enter amount"
									value={formData.amount}
									onChange={handleInputChange}
								/>
								<div style={{ marginLeft: '1rem' }}>
									<span style={{ marginLeft: '1rem' }}>ALL</span>
								</div>
							</div>
						</div>
						<div style={{ marginBottom: '1rem' }}>
							<label htmlFor="category">
								Category
							</label>
							{/* TODO: fix the styling of the select dropdown */}
							<select
								id="category"
								value={formData.category}
								onChange={handleInputChange}
							>
								<option disabled>Choose a category</option>
								{selectData?.map((category) => (
									<option key={category.id}>
										{category.name}</option>
								))}
							</select>
						</div>
						<button className={'notification add-reminder'}
							style={{
								marginTop: '2rem',
								padding: '0.8rem',
								border: 'solid 1px #6C9BCF',
								width: '30%',
								height: '45px',
							}}
							type='submit'
						>
							<span>Create Expense</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
