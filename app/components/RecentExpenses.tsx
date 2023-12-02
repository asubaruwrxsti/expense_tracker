export default function RecentExpenses() {
	return (
		<div className="recent-orders">
			<h2>Recent Expenses</h2>
			<table>
				<thead>
				<tr>
					<th>Course Name</th>
					<th>Course Number</th>
					<th>Payment</th>
					<th>Status</th>
					<th></th>
				</tr>
				</thead>
				<tbody><tr>
					<td>JavaScript Tutorial</td>
					<td>85743</td>
					<td>Due</td>
					<td className="warning">Pending</td>
					<td className="primary">Details</td>
				</tr><tr>
					<td>CSS Full Course</td>
					<td>97245</td>
					<td>Refunded</td>
					<td className="danger">Declined</td>
					<td className="primary">Details</td>
				</tr><tr>
					<td>Flex-Box Tutorial</td>
					<td>36452</td>
					<td>Paid</td>
					<td className="primary">Active</td>
					<td className="primary">Details</td>
				</tr></tbody>
			</table>
			<a href="#">Show All</a>
		</div>
	)
}