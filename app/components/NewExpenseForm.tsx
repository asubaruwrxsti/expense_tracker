'use client'
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'

type NewExpenseFormProps = {
	name: string;
	description: string;
	amount: number;
	category: string;
};

export default function NewExpenseForm() {
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
		}).then((response) => {
			if (response.ok) {
				router.push('/expenses');
			}
		}).catch((error) => {
			console.error(error);
		});
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [id]: value }));
	};

	return (
		<form className={'mt-2'} id={'new-expense-form'} onSubmit={handleSubmit}>
			<div className={'form-group'}>
				<label htmlFor={'name'}>Name</label>
				<input
					type={'text'}
					className={'form-control'}
					id={'name'}
					placeholder={'Enter name'}
					value={formData.name}
					onChange={handleInputChange}
				/>
			</div>
			<div className={'form-group'}>
				<label htmlFor={'description'}>Description</label>
				<input
					type={'text'}
					className={'form-control'}
					id={'description'}
					placeholder={'Enter description'}
					value={formData.description}
					onChange={handleInputChange}
				/>
			</div>
			<div className={'form-group'}>
				<label htmlFor={'amount'}>Amount</label>
				<input
					type={'number'}
					className={'form-control'}
					id={'amount'}
					placeholder={'Enter amount'}
					value={formData.amount}
					onChange={handleInputChange}
				/>
			</div>
			<div className={'form-group'}>
				<label htmlFor={'category'}>Category</label>
				<select
					className={'form-control'}
					id={'category'}
					value={formData.category}
					onChange={handleInputChange}
				>
					<option>Choose a category</option>
					{/* Add your category options here */}
				</select>
			</div>
			<button type={'submit'} className={'btn btn-primary mt-5'}>
				Submit
			</button>
		</form>
	);
}
