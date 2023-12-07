'use client';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
		<form className="mt-4 p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
			<div className="mb-4">
				<label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
					Name
				</label>
				<input
					type="text"
					className="border border-gray-300 p-2 w-full"
					id="name"
					placeholder="Enter name"
					value={formData.name}
					onChange={handleInputChange}
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
					Description
				</label>
				<input
					type="text"
					className="border border-gray-300 p-2 w-full"
					id="description"
					placeholder="Enter description"
					value={formData.description}
					onChange={handleInputChange}
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
					Amount
				</label>
				<input
					type="number"
					className="border border-gray-300 p-2 w-full"
					id="amount"
					placeholder="Enter amount"
					value={formData.amount}
					onChange={handleInputChange}
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
					Category
				</label>
				<select
					className="border border-gray-300 p-2 w-full"
					id="category"
					value={formData.category}
					onChange={handleInputChange}
				>
					<option disabled>Choose a category</option>
					{/* Add your category options here */}
				</select>
			</div>
			<button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
				Submit
			</button>
		</form>
	);
}
