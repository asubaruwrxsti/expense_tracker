'use client'
import { FormEvent } from 'react'

export default function NewExpense() {
	async function handleSubmit(event: FormEvent) {
		event.preventDefault()
		const form = document.getElementById('new-expense-form') as HTMLFormElement
		const name = form.querySelector('#name') as HTMLInputElement
		const description = form.querySelector('#description') as HTMLInputElement
		const amount = form.querySelector('#amount') as HTMLInputElement
		const category = form.querySelector('#category') as HTMLInputElement
		const response = await fetch('/api/expenses/new', {
			method: 'POST',
			body: JSON.stringify({
				name: name.value,
				description: description.value,
				amount: amount.value,
				category: category.value
			})
		})
		const data = await response.json()
		console.log(data)
	}
	
	return (
		<main>
			<h1>New Expense Form</h1>
			<div className={'container card mt-5'}>
				<div className={'row mt-2'}>
					<div className={'col-5'}>
						<form className={'mt-2'} id={'new-expense-form'} onSubmit={handleSubmit}>
							<div className={'form-group'}>
								<label htmlFor={'name'}>Name</label>
								<input type={'text'} className={'form-control'} id={'name'} placeholder={'Enter name'} />
							</div>
							<div className={'form-group'}>
								<label htmlFor={'description'}>Description</label>
								<input type={'text'} className={'form-control'} id={'description'} placeholder={'Enter description'} />
							</div>
							<div className={'form-group'}>
								<label htmlFor={'amount'}>Amount</label>
								<input type={'number'} className={'form-control'} id={'amount'} placeholder={'Enter amount'} />
							</div>
							<div className={'form-group'}>
								<label htmlFor={'category'}>Category</label>
								<select className={'form-control'} id={'category'}>
									<option>Choose a category</option>
								</select>
							</div>
							<button type={'submit'} className={'btn btn-primary mt-5'}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	)
}